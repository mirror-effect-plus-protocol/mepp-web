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
from django.core.management import call_command
from django.core.management.base import BaseCommand

from mepp.api.models import (
    Exercise,
    TreatmentPlan,
    TreatmentPlanI18n,
)
from mepp.api.models.plan import TreatmentPlanExerciseM2M
from mepp.api.enums.side import SideEnum


class Command(BaseCommand):
    help = 'Populate DB with fake data'
    PASSWORD = 'Test123!'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating users...')
        User = get_user_model()  # noqa
        admin = User.objects.create(
            username='admin@mepp.local',
            email='admin@mepp.local',
            first_name='Admini',
            last_name='Strator',
            is_superuser=True,
            is_staff=True,
        )
        admin.set_password(self.PASSWORD)
        admin.save()

        john = User.objects.create(
            username='john@mepp.local',
            email='john@mepp.local',
            first_name='John',
            last_name='Doe',
            is_staff=True,
        )
        john.set_password(self.PASSWORD)
        john.save()

        helen = User.objects.create(
            username='helen@mepp.local',
            email='helen@mepp.local',
            first_name='Helen',
            last_name='Random',
            is_staff=True,
        )
        helen.set_password(self.PASSWORD)
        helen.save()

        users = [
            ('John', 'Smith', True, SideEnum.LEFT.value, john),
            ('Tim', 'Degner', True, SideEnum.RIGHT.value, john),
            ('Yan', 'Boelaars', True, SideEnum.LEFT.value, helen),
            ('John', 'Sall', True, SideEnum.LEFT.value, helen),
            ('Alexsa', 'Black', True, SideEnum.LEFT.value, john),
            ('Eric', 'Eric', True, SideEnum.LEFT.value, helen),
        ]

        for user_ in users:
            obj = User.objects.create(
                username=f'{user_[0].lower()}.{user_[1].lower()}@example.org',
                email=f'{user_[0].lower()}.{user_[1].lower()}@example.org',
                first_name=user_[0],
                last_name=user_[1],
                use_audio=user_[2],
                side=user_[3],
                clinician=user_[4],
                language='fr'
            )
            obj.set_password(self.PASSWORD)
            obj.save()

        call_command('populate_system')
        exercises = Exercise.objects.all().order_by('?')[:3]
        exercise = exercises[0]
        exercise1 = exercises[1]
        exercise2 = exercises[2]

        self.stdout.write('Creating treatment plan templates...')
        tp = TreatmentPlan.objects.create(daily_repeat=3, is_template=True,
                                          is_system=True,
                                          clinician=admin)
        TreatmentPlanExerciseM2M.objects.create(exercise=exercise,
                                                treatment_plan=tp)
        TreatmentPlanExerciseM2M.objects.create(exercise=exercise1,
                                                treatment_plan=tp)
        TreatmentPlanI18n.objects.create(parent=tp, language='fr',
                                         name='Paralysie de Bell',
                                         description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu sem id turpis vestibulum pretium ut et leo. Fusce metus nunc, posuere convallis dui vel, bibendum malesuada lacus.')
        TreatmentPlanI18n.objects.create(parent=tp, language='en',
                                         name="Bell's palsy",
                                         description='Nullam et augue et nulla varius congue at a ipsum. Pellentesque a metus nec lorem tempus lacinia id at erat.')

        tp2 = TreatmentPlan.objects.create(daily_repeat=3, is_template=True,
                                           clinician=admin)
        TreatmentPlanExerciseM2M.objects.create(exercise=exercise2,
                                                treatment_plan=tp2)
        TreatmentPlanI18n.objects.create(parent=tp2, language='fr',
                                         name='AVC sévère',
                                         description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu sem id turpis vestibulum pretium ut et leo. Fusce metus nunc, posuere convallis dui vel, bibendum malesuada lacus.')
        TreatmentPlanI18n.objects.create(parent=tp2, language='en',
                                         name='Severe stroke',
                                         description='Nullam et augue et nulla varius congue at a ipsum. Pellentesque a metus nec lorem tempus lacinia id at erat.')

        self.stdout.write(
            f'Creating a treatment plan for {users[0][0]} {users[0][1]}...')
        patient0 = User.objects.get(
            username=f'{users[0][0]}.{users[0][1]}@example.org'.lower())
        patient0_tp = tp.clone(new_clinician=helen, patient=patient0)

        self.stdout.write(
            f'Creating a treatment plan for {users[1][0]} {users[1][1]}...')
        patient1 = User.objects.get(
            username=f'{users[1][0]}.{users[1][1]}@example.org'.lower())
        patient1_tp = tp2.clone(new_clinician=john, patient=patient1)
