# coding: utf-8
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
