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

from django.test import override_settings
from rest_framework import status

from mepp.api.models.expiring_token import ExpiringToken
from . import BaseV1TestCase


class TokenAPITestCase(BaseV1TestCase):

    OVERRIDDEN_TOKEN_EXPIRY_TTLS = {
        'authenticated': 3,  # 3 seconds
        'mirror': 3,  # 3 seconds
        'export': 3,  # 3 seconds
        'default': 3,  # 3 seconds
    }

    @override_settings(TOKEN_EXPIRY_TTLS=OVERRIDDEN_TOKEN_EXPIRY_TTLS)
    def test_expiry_ttl(self):
        # Retrieve session with John Smith
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.get(
            self.reverse('current-user-profile-user-session-view'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(ExpiringToken.objects.filter(key=token).exists())

        # Try another time before the token expires
        time.sleep(self.OVERRIDDEN_TOKEN_EXPIRY_TTLS['authenticated'] - 1)
        response = self.client.get(
            self.reverse('current-user-profile-user-session-view'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(ExpiringToken.objects.filter(key=token).exists())

        # Try another time after the token is expired
        time.sleep(self.OVERRIDDEN_TOKEN_EXPIRY_TTLS['authenticated'] + 2)
        response = self.client.get(
            self.reverse('current-user-profile-user-session-view'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(ExpiringToken.objects.filter(key=token).exists())

    @override_settings(TOKEN_EXPIRY_TTLS=OVERRIDDEN_TOKEN_EXPIRY_TTLS)
    def test_tmp_token_expiry_ttl_is_not_expended(self):
        # Remove all user's tokens.
        ExpiringToken.objects.filter(user=self.patient_john).delete()

        # Create a new one
        token = ExpiringToken.objects.create(
            user=self.patient_john, temporary=True
        )
        # Wait for 1 second before accessing user's profile
        time.sleep(1)
        response = self.client.get(
            self.reverse('current-user-profile-user-session-view'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(ExpiringToken.objects.filter(key=token).exists())

        # Try another time after. The token has been never extended and should
        # expire
        time.sleep(self.OVERRIDDEN_TOKEN_EXPIRY_TTLS['mirror'] - 1)
        response = self.client.get(
            self.reverse('current-user-profile-user-session-view'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(ExpiringToken.objects.filter(key=token).exists())
