# coding: utf-8

# MEPP - A web application to guide patients and clinicians in the process of
# facial palsy rehabilitation, with the help of the mirror effect and principles
# of motor learning
# Copyright (C) 2021 MEPP <info@mirroreffectplus.org>
#
# This file is part of MEPP.
#
# MEPP is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# MEPP is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with MEPP.  If not, see <http://www.gnu.org/licenses/>.

"""
Export a de-identified research dataset.

Three sheets:
  * `subjects` — one row per patient with pseudonymous research_id
  * `sessions` — one row per session keyed by session_research_id
  * `logs`    — one row per recorded action

The command refuses to emit a file unless RESEARCH_DEID_SALT is configured.
Use `--dry-run` to preview counts without writing.
"""

from datetime import datetime

import xlsxwriter
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError

from mepp.api.models import Log, Session
from mepp.api.services.deidentification import (
    SAFE_LOG_FIELDS,
    SAFE_SESSION_FIELDS,
    SAFE_USER_FIELDS,
    DeidentificationConfigError,
    serialize_log,
    serialize_session,
    serialize_subject,
)


class Command(BaseCommand):
    help = 'Export a de-identified XLSX dataset for research use.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--output',
            help='Path of the XLSX file to write. Required unless --dry-run.',
        )
        parser.add_argument(
            '--since',
            help='Restrict sessions/logs to those modified on or after YYYY-MM-DD.',
        )
        parser.add_argument(
            '--clinician-uid',
            help='Restrict subjects to patients of this clinician uid.',
        )
        parser.add_argument(
            '--include-staff',
            action='store_true',
            help='Include staff/admin accounts as subjects (default: patients only).',
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Print row counts and exit without writing a file.',
        )

    def handle(self, *args, **options):
        output = options.get('output')
        dry_run = options['dry_run']
        if not dry_run and not output:
            raise CommandError('--output is required unless --dry-run is set.')

        since = self._parse_since(options.get('since'))
        clinician_uid = options.get('clinician_uid')
        include_staff = options['include_staff']

        try:
            subjects, sessions, logs = self._collect(
                since=since,
                clinician_uid=clinician_uid,
                include_staff=include_staff,
            )
        except DeidentificationConfigError as exc:
            raise CommandError(str(exc)) from exc

        self.stdout.write(
            f'Collected: {len(subjects)} subjects, {len(sessions)} sessions, '
            f'{len(logs)} logs.'
        )

        if dry_run:
            self.stdout.write('Dry run — no file written.')
            return

        self._write_xlsx(output, subjects, sessions, logs)
        self.stdout.write(self.style.SUCCESS(f'Wrote {output}'))

    def _parse_since(self, raw):
        if not raw:
            return None
        try:
            return datetime.strptime(raw, '%Y-%m-%d')
        except ValueError as exc:
            raise CommandError(
                f'--since must be YYYY-MM-DD ({raw!r} is invalid).'
            ) from exc

    def _collect(self, *, since, clinician_uid, include_staff):
        User = get_user_model()  # noqa: N806

        user_qs = User.objects.all()
        if not include_staff:
            user_qs = user_qs.filter(is_staff=False, is_superuser=False)
        if clinician_uid:
            try:
                clinician = User.objects.get(uid=clinician_uid)
            except User.DoesNotExist as exc:
                raise CommandError(
                    f'Clinician with uid {clinician_uid!r} not found.'
                ) from exc
            user_qs = user_qs.filter(clinician=clinician)

        users = list(user_qs.order_by('pk'))
        subjects = [serialize_subject(u) for u in users]
        subject_ids = [u.pk for u in users]

        session_qs = Session.objects.filter(patient_id__in=subject_ids)
        if since:
            session_qs = session_qs.filter(modified_at__gte=since)
        sessions_raw = list(
            session_qs.select_related('treatment_plan').order_by('pk')
        )
        sessions = [serialize_session(s) for s in sessions_raw]
        session_ids = [s.pk for s in sessions_raw]

        log_qs = Log.objects.filter(session_id__in=session_ids)
        if since:
            log_qs = log_qs.filter(created_at__gte=since)
        logs = [serialize_log(log) for log in log_qs.order_by('pk')]

        return subjects, sessions, logs

    def _write_xlsx(self, path, subjects, sessions, logs):
        workbook = xlsxwriter.Workbook(path)
        try:
            self._write_sheet(workbook, 'subjects', SAFE_USER_FIELDS, subjects)
            self._write_sheet(workbook, 'sessions', SAFE_SESSION_FIELDS, sessions)
            self._write_sheet(workbook, 'logs', SAFE_LOG_FIELDS, logs)
        finally:
            workbook.close()

    def _write_sheet(self, workbook, name, columns, rows):
        sheet = workbook.add_worksheet(name)
        for col_idx, column in enumerate(columns):
            sheet.write(0, col_idx, column)
        for row_idx, row in enumerate(rows, start=1):
            for col_idx, column in enumerate(columns):
                value = row.get(column)
                if value is None:
                    sheet.write_blank(row_idx, col_idx, None)
                else:
                    sheet.write(row_idx, col_idx, value)
