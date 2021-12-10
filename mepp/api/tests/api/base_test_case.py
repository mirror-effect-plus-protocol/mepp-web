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

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from mepp.api.tests.mixins.prepare_users import PrepareUserMixin


class BaseTestCase(PrepareUserMixin, APITestCase):

    def setUp(self):
        self.prepare_users()

    def absolute_reverse(self, *args, **kwargs):
        return 'http://testserver/' + self.reverse(*args, **kwargs).lstrip('/')

    def login(self, username, password):
        data = {
            'username': username,
            'password': password,
        }
        response = self.client.post(
            self.reverse('current-user-profile-list'), data=data
        )
        user = get_user_model().objects.get(username=username)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['profile']['uid'], user.uid)
        self.assertEqual(response.data['token'], user.token)

        return response.data['token']

    def reverse(self, endpoint, *args, **kwargs):
        return reverse(f'{self.router_namespace}:{endpoint}', *args, **kwargs)

    def get_token_header(self, token):
        return {
            'HTTP_AUTHORIZATION': f'Token {token}'
        }
