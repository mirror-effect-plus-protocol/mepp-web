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

import os
import tempfile
import zipfile
from io import StringIO

import pytest
from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.core.management.base import CommandError
from django.test import override_settings

from mepp.api.models import Log, Session
from mepp.api.services.deidentification import (
    SAFE_USER_FIELDS,
    DeidentificationConfigError,
    research_id_for,
    serialize_subject,
    session_research_id_for,
)

from . import BaseV1TestCase

PII_FIELD_NAMES = {
    'email',
    'username',
    'first_name',
    'last_name',
    'full_name',
    'name',
    'phone',
    'address',
}


class DeidentificationServiceTestCase(BaseV1TestCase):

    def test_research_id_is_stable(self):
        first = research_id_for(self.patient_john.pk)
        second = research_id_for(self.patient_john.pk)
        self.assertEqual(first, second)

    def test_research_ids_are_unique(self):
        a = research_id_for(self.patient_john.pk)
        b = research_id_for(self.patient_tim.pk)
        self.assertNotEqual(a, b)

    def test_serialize_subject_contains_only_safe_fields(self):
        row = serialize_subject(self.patient_john)
        self.assertEqual(set(row.keys()), set(SAFE_USER_FIELDS))
        flattened = ' '.join(str(v) for v in row.values()).lower()
        for forbidden in PII_FIELD_NAMES:
            self.assertNotIn(forbidden, set(row.keys()))
        # Patient names should not leak into any value either.
        self.assertNotIn(self.patient_john.first_name.lower(), flattened)
        self.assertNotIn(self.patient_john.email.lower(), flattened)

    def test_missing_salt_raises(self):
        with override_settings(RESEARCH_DEID_SALT=None):
            with pytest.raises(DeidentificationConfigError):
                research_id_for(self.patient_john.pk)

    def test_different_salts_produce_different_ids(self):
        with override_settings(RESEARCH_DEID_SALT='salt-a'):
            a = research_id_for(self.patient_john.pk)
        with override_settings(RESEARCH_DEID_SALT='salt-b'):
            b = research_id_for(self.patient_john.pk)
        self.assertNotEqual(a, b)

    def test_session_research_id_stable_per_session(self):
        a = session_research_id_for(42)
        b = session_research_id_for(42)
        self.assertNotEqual(a, session_research_id_for(43))
        self.assertEqual(a, b)


class ExportResearchDatasetCommandTestCase(BaseV1TestCase):

    def _run(self, *args, **kwargs):
        out = StringIO()
        err = StringIO()
        call_command(
            'export_research_dataset', *args, stdout=out, stderr=err, **kwargs
        )
        return out.getvalue(), err.getvalue()

    def test_requires_output_unless_dry_run(self):
        with pytest.raises(CommandError):
            self._run()

    def test_dry_run_does_not_write_file(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = os.path.join(tmp, 'out.xlsx')
            stdout, _ = self._run('--dry-run', '--output', path)
            self.assertIn('Collected:', stdout)
            self.assertFalse(os.path.exists(path))

    def test_missing_salt_aborts(self):
        with override_settings(RESEARCH_DEID_SALT=None):
            with pytest.raises(CommandError):
                self._run('--dry-run')

    def test_invalid_since_aborts(self):
        with pytest.raises(CommandError):
            self._run('--dry-run', '--since', '2024/01/01')

    def test_writes_a_valid_xlsx_archive(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = os.path.join(tmp, 'out.xlsx')
            self._run('--output', path)
            self.assertTrue(os.path.exists(path))
            self.assertTrue(zipfile.is_zipfile(path))

            with zipfile.ZipFile(path) as zf:
                names = set(zf.namelist())
                # xlsxwriter emits one sheet file per worksheet.
                worksheet_files = {
                    n for n in names
                    if n.startswith('xl/worksheets/sheet')
                }
                self.assertEqual(
                    len(worksheet_files), 3,
                    f'Expected 3 worksheets, got: {worksheet_files}',
                )

                workbook_xml = zf.read('xl/workbook.xml').decode()
                for sheet in ('subjects', 'sessions', 'logs'):
                    self.assertIn(f'name="{sheet}"', workbook_xml)

                # Direct identifiers must not appear anywhere in the workbook —
                # check the shared strings table where text cells live.
                shared = zf.read('xl/sharedStrings.xml').decode().lower()
                self.assertNotIn(self.patient_john.email.lower(), shared)
                self.assertNotIn(
                    self.patient_john.first_name.lower(), shared
                )
                self.assertNotIn(self.patient_john.last_name.lower(), shared)
                for forbidden in PII_FIELD_NAMES:
                    self.assertNotIn(forbidden, shared)

    def test_excludes_staff_by_default(self):
        User = get_user_model()  # noqa: N806
        n_patients = User.objects.filter(
            is_staff=False, is_superuser=False,
        ).count()
        # Sanity check on fixture before we trust the command.
        self.assertGreater(n_patients, 0)

        with tempfile.TemporaryDirectory() as tmp:
            path = os.path.join(tmp, 'out.xlsx')
            stdout, _ = self._run('--output', path)
            self.assertIn(f'{n_patients} subjects', stdout)

    def test_include_staff_adds_them(self):
        User = get_user_model()  # noqa: N806
        n_all = User.objects.count()
        n_patients = User.objects.filter(
            is_staff=False, is_superuser=False,
        ).count()
        self.assertGreater(n_all, n_patients)

        with tempfile.TemporaryDirectory() as tmp:
            path = os.path.join(tmp, 'out.xlsx')
            stdout, _ = self._run('--output', path, '--include-staff')
            self.assertIn(f'{n_all} subjects', stdout)

    def test_filter_by_clinician(self):
        n_john_patients = self.john.patients.count()
        self.assertGreater(n_john_patients, 0)

        with tempfile.TemporaryDirectory() as tmp:
            path = os.path.join(tmp, 'out.xlsx')
            stdout, _ = self._run(
                '--output', path,
                '--clinician-uid', self.john.uid,
            )
            self.assertIn(f'{n_john_patients} subjects', stdout)

    def test_session_count_matches_db(self):
        n_sessions = Session.objects.filter(
            patient__is_staff=False,
            patient__is_superuser=False,
        ).count()
        n_logs = Log.objects.filter(
            session__patient__is_staff=False,
            session__patient__is_superuser=False,
        ).count()
        stdout, _ = self._run('--dry-run')
        self.assertIn(f'{n_sessions} sessions', stdout)
        self.assertIn(f'{n_logs} logs', stdout)

    def test_unknown_clinician_aborts(self):
        with pytest.raises(CommandError):
            self._run('--dry-run', '--clinician-uid', 'nope')
