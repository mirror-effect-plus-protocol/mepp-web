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

from datetime import timedelta
from unittest.mock import patch

from django.core import mail
from django.utils import timezone
from rest_framework import status

from mepp.api.models.mfa import MFAChallenge
from mepp.api.services.mfa import _hash_code

from . import BaseV1TestCase


class MFALoginTestCase(BaseV1TestCase):
    """
    Two-step login for staff users (clinicians, admins).
    Patients keep the one-step flow.
    """

    def _post_credentials(self, username):
        return self.client.post(
            self.reverse('current-user-profile-list'),
            data={'username': username, 'password': self.common_password},
        )

    def test_patient_login_bypasses_mfa(self):
        response = self._post_credentials(self.patient_john.username)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn('mfa_required', response.data)
        self.assertIn('token', response.data)
        self.assertEqual(MFAChallenge.objects.count(), 0)
        self.assertEqual(len(mail.outbox), 0)

    def test_clinician_login_returns_mfa_challenge(self):
        response = self._post_credentials(self.john.username)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['mfa_required'])
        self.assertIn('challenge_id', response.data)
        self.assertIn('expires_at', response.data)
        self.assertNotIn('token', response.data)
        self.assertEqual(MFAChallenge.objects.filter(user=self.john).count(), 1)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn(self.john.email, mail.outbox[0].to)

    def test_admin_login_returns_mfa_challenge(self):
        response = self._post_credentials(self.admin.username)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['mfa_required'])

    def test_verify_with_correct_code_issues_token(self):
        with patch(
            'mepp.api.services.mfa._generate_code', return_value='123456'
        ):
            self._post_credentials(self.john.username)

        challenge = MFAChallenge.objects.get(user=self.john)
        response = self.client.post(
            self.reverse('current-user-profile-mfa-verify'),
            data={
                'challenge_id': str(challenge.challenge_id),
                'code': '123456',
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['profile']['email'], self.john.email)

        challenge.refresh_from_db()
        self.assertIsNotNone(challenge.consumed_at)

    def test_verify_with_wrong_code_increments_attempts(self):
        with patch(
            'mepp.api.services.mfa._generate_code', return_value='123456'
        ):
            self._post_credentials(self.john.username)

        challenge = MFAChallenge.objects.get(user=self.john)
        response = self.client.post(
            self.reverse('current-user-profile-mfa-verify'),
            data={
                'challenge_id': str(challenge.challenge_id),
                'code': '000000',
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        challenge.refresh_from_db()
        self.assertEqual(challenge.attempts, 1)
        self.assertIsNone(challenge.consumed_at)

    def test_verify_locks_after_max_attempts(self):
        with patch(
            'mepp.api.services.mfa._generate_code', return_value='123456'
        ):
            self._post_credentials(self.john.username)

        challenge = MFAChallenge.objects.get(user=self.john)
        for _ in range(5):
            self.client.post(
                self.reverse('current-user-profile-mfa-verify'),
                data={
                    'challenge_id': str(challenge.challenge_id),
                    'code': '000000',
                },
            )

        # Even the correct code is now rejected (locked).
        response = self.client.post(
            self.reverse('current-user-profile-mfa-verify'),
            data={
                'challenge_id': str(challenge.challenge_id),
                'code': '123456',
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('attempts', response.data['detail'].lower())

    def test_expired_challenge_is_rejected(self):
        with patch(
            'mepp.api.services.mfa._generate_code', return_value='123456'
        ):
            self._post_credentials(self.john.username)

        challenge = MFAChallenge.objects.get(user=self.john)
        challenge.expires_at = timezone.now() - timedelta(seconds=1)
        challenge.save(update_fields=['expires_at'])

        response = self.client.post(
            self.reverse('current-user-profile-mfa-verify'),
            data={
                'challenge_id': str(challenge.challenge_id),
                'code': '123456',
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('expired', response.data['detail'].lower())

    def test_consumed_challenge_cannot_be_reused(self):
        with patch(
            'mepp.api.services.mfa._generate_code', return_value='123456'
        ):
            self._post_credentials(self.john.username)

        challenge = MFAChallenge.objects.get(user=self.john)
        self.client.post(
            self.reverse('current-user-profile-mfa-verify'),
            data={
                'challenge_id': str(challenge.challenge_id),
                'code': '123456',
            },
        )

        response = self.client.post(
            self.reverse('current-user-profile-mfa-verify'),
            data={
                'challenge_id': str(challenge.challenge_id),
                'code': '123456',
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_new_login_invalidates_previous_challenge(self):
        with patch(
            'mepp.api.services.mfa._generate_code', return_value='111111'
        ):
            self._post_credentials(self.john.username)
        first = MFAChallenge.objects.get(user=self.john)

        with patch(
            'mepp.api.services.mfa._generate_code', return_value='222222'
        ):
            self._post_credentials(self.john.username)

        self.assertFalse(
            MFAChallenge.objects.filter(pk=first.pk).exists()
        )
        self.assertEqual(MFAChallenge.objects.filter(user=self.john).count(), 1)

        # Old code on the new challenge fails.
        new_challenge = MFAChallenge.objects.get(user=self.john)
        response = self.client.post(
            self.reverse('current-user-profile-mfa-verify'),
            data={
                'challenge_id': str(new_challenge.challenge_id),
                'code': '111111',
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_resend_creates_new_challenge_and_invalidates_old(self):
        with patch(
            'mepp.api.services.mfa._generate_code', return_value='111111'
        ):
            self._post_credentials(self.john.username)
        first = MFAChallenge.objects.get(user=self.john)

        with patch(
            'mepp.api.services.mfa._generate_code', return_value='222222'
        ):
            response = self.client.post(
                self.reverse('current-user-profile-mfa-resend'),
                data={'challenge_id': str(first.challenge_id)},
            )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(response.data['challenge_id'], str(first.challenge_id))
        self.assertFalse(MFAChallenge.objects.filter(pk=first.pk).exists())

    def test_code_is_hashed_not_stored_plain(self):
        with patch(
            'mepp.api.services.mfa._generate_code', return_value='123456'
        ):
            self._post_credentials(self.john.username)

        challenge = MFAChallenge.objects.get(user=self.john)
        self.assertNotEqual(challenge.code_hash, '123456')
        self.assertEqual(challenge.code_hash, _hash_code('123456'))

    def test_email_subject_and_body_use_user_language_fr(self):
        self.john.language = 'fr'
        self.john.save(update_fields=['language'])

        self._post_credentials(self.john.username)

        self.assertEqual(len(mail.outbox), 1)
        sent = mail.outbox[0]
        self.assertEqual(sent.subject, 'Votre code de vérification MEPP')
        self.assertIn('Bonjour', sent.body)
        self.assertIn('Ce code est valide pendant', sent.body)
        self.assertIn("Si vous n’êtes pas à l’origine", sent.body)
        self.assertNotIn('Hello ', sent.body)

        # HTML alternative is attached and also localized.
        self.assertEqual(len(sent.alternatives), 1)
        html_body, mime_type = sent.alternatives[0]
        self.assertEqual(mime_type, 'text/html')
        self.assertIn('Bonjour', html_body)
        self.assertIn('Ce code est valide pendant', html_body)

    def test_email_subject_and_body_use_user_language_en(self):
        self.john.language = 'en'
        self.john.save(update_fields=['language'])

        self._post_credentials(self.john.username)

        self.assertEqual(len(mail.outbox), 1)
        sent = mail.outbox[0]
        self.assertEqual(sent.subject, 'Your MEPP verification code')
        self.assertIn('Hello', sent.body)
        self.assertIn('This code is valid for', sent.body)
        self.assertNotIn('Bonjour', sent.body)

    def test_bad_password_does_not_create_challenge(self):
        response = self.client.post(
            self.reverse('current-user-profile-list'),
            data={'username': self.john.username, 'password': 'wrong'},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(MFAChallenge.objects.count(), 0)
        self.assertEqual(len(mail.outbox), 0)
