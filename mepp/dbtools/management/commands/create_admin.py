# coding: utf-8
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from mepp.api.models import (
    Category,
    CategoryI18n,
    SubCategory,
    SubCategoryI18n,
    Exercise,
    ExerciseI18n,
    Log,
    Session,
    TreatmentPlan,
    TreatmentPlanI18n,
)
from mepp.api.models.plan import TreatmentPlanExerciseM2M
from mepp.api.enums.side import SideEnum


class Command(BaseCommand):

    help = 'Create superuser'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating a super user for MEPP platform...')
        User = get_user_model()  # noqa
        email_address = input('E-mail address:')
        first_name = input('First name:')
        last_name = input('Last name:')
        good_passwords = False
        while not good_passwords:
            password = input('Password:')
            confirm_password = input('Confirm password:')
            if password != confirm_password:
                self.stdout.write('Passwords do not match')
            else:
                good_passwords = True

        admin = User.objects.create(
            username=email_address,
            email=email_address,
            first_name=first_name,
            last_name=last_name,
            is_superuser=True,
            is_staff=True,
        )
        admin.set_password(password)
        admin.save()

        self.stdout.write('Super user has been created!')
