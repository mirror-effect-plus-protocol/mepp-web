# coding: utf-8
from django.contrib.auth import get_user_model


class PrepareUserMixin:

    def prepare_users(self):
        User = get_user_model()  # noqa
        self.admin = User.objects.get(username='admin@mepp.local')
        self.helen = User.objects.get(username='helen@mepp.local')
        self.john = User.objects.get(username='john@mepp.local')
        self.patient_john = User.objects.get(username='john.smith@example.org')
        self.patient_tim = User.objects.get(username='tim.degner@example.org')
        self.common_password = 'Test123!'
