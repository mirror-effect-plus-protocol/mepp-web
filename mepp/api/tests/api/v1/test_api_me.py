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

import pytest
from rest_framework import status

from mepp.api.enums.action import ActionEnum
from . import BaseV1TestCase


class MeAPITestCase(BaseV1TestCase):

    def test_successful_login(self):
        self.login(self.patient_john.username, self.common_password)

    def test_bad_login(self):
        with pytest.raises(AssertionError):
            self.login(self.patient_john.username, '64321')

    def test_get_profile(self):
        pass


class MeSessionAPITestCase(BaseV1TestCase):

    def test_get_user_session(self):
        # Retrieve session with John Smith
        token = self.login(self.patient_john.username, self.common_password)
        auth_headers = {
            'HTTP_AUTHORIZATION': f'Token {token}'
        }
        response = self.client.get(
            self.reverse('current-user-profile-user-session-view'),
            **auth_headers,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        john_smith_session = self.patient_john.active_session
        self.assertEqual(response.data['id'], john_smith_session.uid)

        # Ensure that another user cannot read John Smith's session
        token = self.login(self.patient_tim.username, self.common_password)
        auth_headers = {
            'HTTP_AUTHORIZATION': f'Token {token}'
        }
        response = self.client.get(
            self.reverse('current-user-profile-user-session-view'),
            **auth_headers,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        tim_degner_session = self.patient_tim.active_session
        self.assertEqual(response.data['id'], tim_degner_session.uid)
        self.assertNotEqual(response.data['id'], john_smith_session.uid)

    def test_anonymous_get_session(self):
        response = self.client.get(
            self.reverse('current-user-profile-user-session-view'),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_with_no_treatmentplan(self):
        pass


class MeLogAPITestCase(BaseV1TestCase):

    def setUp(self):
        super().setUp()
        # Retrieve session with John Smith
        token = self.login(self.patient_john.username, self.common_password)
        self.auth_headers = {
            'HTTP_AUTHORIZATION': f'Token {token}'
        }
        response = self.client.get(
            self.reverse('current-user-profile-user-session-view'),
            **self.auth_headers,
        )
        self.patient_john_session_uid = response.data['id']

    def test_log_login(self):
        data = {
            'action': ActionEnum.LOGIN.name
        }
        response = self.client.post(
            self.reverse(
                'current-user-profile-user-logs-view',
                kwargs={'session_uid': self.patient_john_session_uid},
            ),
            data=data,
            **self.auth_headers,
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_log_logout(self):
        data = {
            'action': ActionEnum.LOGOUT.name
        }
        response = self.client.post(
            self.reverse(
                'current-user-profile-user-logs-view',
                kwargs={'session_uid': self.patient_john_session_uid},
            ),
            data=data,
            **self.auth_headers,
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Try to log another action should not work (i.e.: Logout deactivate the session)
        data = {
            'action': ActionEnum.LOGOUT.name
        }
        response = self.client.post(
            self.reverse(
                'current-user-profile-user-logs-view',
                kwargs={'session_uid': self.patient_john_session_uid},
            ),
            data=data,
            **self.auth_headers,
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # Validate session is not the same anymore
        response = self.client.get(
            self.reverse('current-user-profile-user-session-view'),
            **self.auth_headers,
        )
        self.assertNotEqual(self.patient_john_session_uid, response.data['id'])

    def test_log_action(self):
        data = {
            'action': ActionEnum.START.name,
            'exercise_index': 0
        }
        response = self.client.post(
            self.reverse(
                'current-user-profile-user-logs-view',
                kwargs={'session_uid': self.patient_john_session_uid},
            ),
            data=data,
            **self.auth_headers,
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_log_action_wrong_exercise(self):
        data = {
            'action': ActionEnum.START.name,
            'exercise_index': 9999
        }
        response = self.client.post(
            self.reverse(
                'current-user-profile-user-logs-view',
                kwargs={'session_uid': self.patient_john_session_uid},
            ),
            data=data,
            **self.auth_headers,
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_log_wrong_action(self):
        data = {
            'action': 'foo',
            'exercise_index': 0
        }
        response = self.client.post(
            self.reverse(
                'current-user-profile-user-logs-view',
                kwargs={'session_uid': self.patient_john_session_uid},
            ),
            data=data,
            **self.auth_headers,
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_log_actions_wrong_user(self):
        # Login with another user
        token = self.login(self.patient_tim.username, self.common_password)
        auth_headers = {
            'HTTP_AUTHORIZATION': f'Token {token}'
        }

        # Try to log actions on John Smith session
        data = {
            'action': ActionEnum.START.name,
            'exercise_index': 0
        }
        response = self.client.post(
            self.reverse(
                'current-user-profile-user-logs-view',
                kwargs={'session_uid': self.patient_john_session_uid},
            ),
            data=data,
            **auth_headers,
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_log_restart_session(self):
        data = {
            'action': ActionEnum.RESTART_SESSION.name
        }
        response = self.client.post(
            self.reverse(
                'current-user-profile-user-logs-view',
                kwargs={'session_uid': self.patient_john_session_uid},
            ),
            data=data,
            **self.auth_headers,
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Try to log another action should not work
        data = {
            'action': ActionEnum.START_SESSION.name
        }
        response = self.client.post(
            self.reverse(
                'current-user-profile-user-logs-view',
                kwargs={'session_uid': self.patient_john_session_uid},
            ),
            data=data,
            **self.auth_headers,
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # Validate session is not the same anymore
        response = self.client.get(
            self.reverse('current-user-profile-user-session-view'),
            **self.auth_headers,
        )
        self.assertNotEqual(self.patient_john_session_uid, response.data['id'])
