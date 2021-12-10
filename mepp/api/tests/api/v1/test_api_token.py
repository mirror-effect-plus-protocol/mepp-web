# coding: utf-8
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
