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

import time
from django.conf import settings
from django.test import TestCase

from mepp.api.enums import ActionEnum, StatusEnum
from mepp.api.exceptions import SessionStatusException
from mepp.api.tests.mixins.prepare_users import PrepareUserMixin
from mepp.api.models.log import Log


class UserSessionTestCase(PrepareUserMixin, TestCase):

    def setUp(self):
        self.prepare_users()
        self.user_session = self.patient_john.active_session

    def test_session_active_on_creation(self):
        self.assertEqual(self.user_session.status, StatusEnum.CREATED.value)
        self.assertTrue(self.user_session.active)

    def test_get_same_session_until_over(self):
        user_session = self.patient_john.active_session
        self.assertEqual(self.user_session, user_session)
        self.user_session.close()
        user_session = self.patient_john.active_session
        self.assertNotEqual(self.user_session, user_session)

    def test_session_inactive_on_close(self):
        self.user_session.close()
        self.assertFalse(self.user_session.active)

    def test_cannot_update_status_when_inactive(self):
        self.user_session.active = False
        self.user_session.status = StatusEnum.IN_PROGRESS.value
        # Force update private property to make save() pass
        self.user_session._Session__status = StatusEnum.IN_PROGRESS.value  # noqa
        self.user_session.save()
        self.assertEqual(self.user_session.status, StatusEnum.IN_PROGRESS.value)
        self.user_session.status = StatusEnum.COMPLETED.value
        with self.assertRaises(SessionStatusException) as e:
            self.user_session.save()
        self.user_session.refresh_from_db()
        self.assertNotEqual(self.user_session.status, StatusEnum.COMPLETED.value)
        self.assertEqual(self.user_session.status, StatusEnum.IN_PROGRESS.value)

    def test_cannot_update_status_when_uncompleted(self):
        self.user_session.status = StatusEnum.UNCOMPLETED.value
        # Force update private property to make save() pass
        self.user_session._Session__status = StatusEnum.UNCOMPLETED.value  # noqa
        self.user_session.save()
        self.assertEqual(self.user_session.status, StatusEnum.UNCOMPLETED.value)
        self.user_session.status = StatusEnum.COMPLETED.value
        with self.assertRaises(SessionStatusException) as e:
            self.user_session.save()
        self.user_session.refresh_from_db()
        self.assertNotEqual(self.user_session.status, StatusEnum.COMPLETED.value)
        self.assertEqual(self.user_session.status, StatusEnum.UNCOMPLETED.value)

    def test_session_expiration(self):
        time.sleep(settings.MIRROR_SESSION_TIMEOUT + 1)
        active_session = self.patient_john.active_session
        self.user_session.refresh_from_db()
        self.assertNotEqual(self.user_session, active_session)
        self.assertFalse(self.user_session.active)
        self.assertEqual(self.user_session.status, StatusEnum.UNCOMPLETED.value)


class UserLogTestCase(PrepareUserMixin, TestCase):

    def setUp(self):
        self.prepare_users()
        self.user_session = self.patient_john.active_session

    def test_skip(self):
        self.assertEqual(self.user_session.status, StatusEnum.CREATED.value)
        Log.objects.create(
            session=self.user_session,
            action=ActionEnum.SKIP.value,
            exercise_index=0,
        )
        self.assertEqual(self.user_session.status, StatusEnum.UNCOMPLETED.value)

    def test_pause(self):
        self.assertEqual(self.user_session.status, StatusEnum.CREATED.value)
        Log.objects.create(
            session=self.user_session,
            action=ActionEnum.PAUSE.value,
            exercise_index=0,
        )
        self.assertEqual(self.user_session.status, StatusEnum.IN_PROGRESS.value)
        self.assertEqual(
            self.user_session.exercises[0]['status'], StatusEnum.PAUSED.name
        )

    def test_resume(self):
        self.assertEqual(self.user_session.status, StatusEnum.CREATED.value)
        Log.objects.create(
            session=self.user_session,
            action=ActionEnum.RESUME.value,
            exercise_index=0,
        )
        self.assertEqual(self.user_session.status, StatusEnum.IN_PROGRESS.value)
        self.assertEqual(
            self.user_session.exercises[0]['status'], StatusEnum.IN_PROGRESS.name
        )

    def test_start(self):
        self.assertEqual(self.user_session.status, StatusEnum.CREATED.value)
        Log.objects.create(
            session=self.user_session,
            action=ActionEnum.START.value,
            exercise_index=0,
        )
        self.assertEqual(self.user_session.status, StatusEnum.IN_PROGRESS.value)
        self.assertEqual(
            self.user_session.exercises[0]['status'], StatusEnum.IN_PROGRESS.name
        )

    def test_done(self):
        self.assertEqual(self.user_session.status, StatusEnum.CREATED.value)
        Log.objects.create(
            session=self.user_session,
            action=ActionEnum.DONE.value,
            exercise_index=0,
        )
        self.assertEqual(self.user_session.status, StatusEnum.IN_PROGRESS.value)
        self.assertEqual(
            self.user_session.exercises[0]['status'], StatusEnum.COMPLETED.name
        )

    def test_missing_actions(self):
        self.assertEqual(self.user_session.status, StatusEnum.CREATED.value)
        self.assertEqual(
            self.user_session.exercises[0]['status'], StatusEnum.CREATED.name
        )
        Log.objects.create(
            session=self.user_session,
            action=ActionEnum.DONE.value,
            exercise_index=1,
        )
        self.assertEqual(
            self.user_session.exercises[0]['status'], StatusEnum.UNCOMPLETED.name
        )
        self.assertEqual(
            self.user_session.exercises[1]['status'], StatusEnum.COMPLETED.name
        )

        # The session should be flagged as uncompleted too
        self.assertEqual(self.user_session.status, StatusEnum.UNCOMPLETED.value)

    def test_all_completed(self):
        self.assertEqual(self.user_session.status, StatusEnum.CREATED.value)
        for i in range(len(self.user_session.exercises)):
            self.assertEqual(
                self.user_session.exercises[i]['status'], StatusEnum.CREATED.name
            )
            Log.objects.create(
                session=self.user_session,
                action=ActionEnum.DONE.value,
                exercise_index=i,
            )
            self.assertEqual(
                self.user_session.exercises[i]['status'], StatusEnum.COMPLETED.name
            )

        # The session should be flagged as uncompleted too
        self.assertEqual(self.user_session.status, StatusEnum.COMPLETED.value)
