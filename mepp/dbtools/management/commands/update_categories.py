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

from django.core.management.base import BaseCommand
from django.db import connection, transaction

from mepp.api.models import (
    Category,
    CategoryI18n,
    Exercise,
    ExerciseI18n,
)
from mepp.api.models.plan import TreatmentPlanExerciseM2M


class Command(BaseCommand):
    help = 'Update categories to inject 2 parents'

    def handle(self, *args, **options):

        self.stdout.write('Update `AVC` category...')
        with transaction.atomic():
            avc_category = self._update_avc_category()
            new_category = self._create_new_parent_category()
            self._update_other_categories(avc_category, new_category)
            self._update_indexes()

    def _create_new_parent_category(self):
        # Create new category
        self.stdout.write('Create new parent category...')
        new_parent_category = Category.objects.create(
            parent_id=None, index=1
        )
        CategoryI18n.objects.create(
            parent_id=new_parent_category.pk,
            language='fr',
            name='Paralysie faciale périphérique',
        )

        # Allemand
        CategoryI18n.objects.create(
            parent_id=new_parent_category.pk,
            language='de',
            name='Periphere Gesichtslähmung',
        )

        # Anglais
        CategoryI18n.objects.create(
            parent_id=new_parent_category.pk,
            language='en',
            name='Peripheral facial paralysis',
        )

        # Italien
        CategoryI18n.objects.create(
            parent_id=new_parent_category.pk,
            language='it',
            name='Paralisi facciale periferica',
        )

        # Espagnol
        CategoryI18n.objects.create(
            parent_id=new_parent_category.pk,
            language='es',
            name='Parálisis facial periférica',
        )

        # Portugais
        CategoryI18n.objects.create(
            parent_id=new_parent_category.pk,
            language='pt',
            name='Paralisia facial periférica',
        )
        return new_parent_category

    def _update_avc_category(self):
        avc_category = Category.objects.get(
            i18n__name='AVC', i18n__language='fr'
        )
        CategoryI18n.objects.filter(
            parent_id=avc_category.pk, language='fr'
        ).update(name='Paralysie faciale centrale')
        CategoryI18n.objects.filter(
            parent_id=avc_category.pk, language='de'
        ).update(name='Zentrale Gesichtslähmung')
        CategoryI18n.objects.filter(
            parent_id=avc_category.pk, language='en'
        ).update(name='Central facial paralysis')
        CategoryI18n.objects.filter(
            parent_id=avc_category.pk, language='it'
        ).update(name='Paralisi facciale centrale')
        CategoryI18n.objects.filter(
            parent_id=avc_category.pk, language='es'
        ).update(name='Parálisis facial central')
        CategoryI18n.objects.filter(
            parent_id=avc_category.pk, language='pt'
        ).update(name='Paralisia facial central')

        return avc_category

    def _update_indexes(self):
        for category in Category.objects.all():
            i18n = category.i18n.get(language='fr')

            category.index = 0

            if i18n.name == 'Articulation':
                category.index = 1
            if i18n.name == 'Phonèmes':
                category.index = 1
            if i18n.name == 'Mots':
                category.index = 2
            if i18n.name == 'Phrases':
                category.index = 3
            if i18n.name == 'Fonctionnel':
                category.index = 4
            if i18n.name == 'Déglutition':
                category.index = 2
            if i18n.name == 'Scellement labial':
                category.index = 4

            if i18n.name == 'Expressions faciales':
                category.index = 3
            if i18n.name == 'Émotions':
                category.index = 1
            if i18n.name == 'Groupe musculaire':
                category.index = 2
            if i18n.name == 'Groupe musculaire + émotions':
                category.index = 3

            if i18n.name == 'Mobilisation assistée':
                category.index = 4
            if i18n.name == 'Passif assisté':
                category.index = 1
            if i18n.name == 'Actif assisté':
                category.index = 2
            if i18n.name == 'Tiers supérieur':
                category.index = 1
            if i18n.name == 'Tiers médian':
                category.index = 2
            if i18n.name == 'Tiers inférieur':
                category.index = 2

            if i18n.name == 'Contrôle des syncinésies':
                category.index = 5
            if i18n.name == 'Par activité fonctionnelle':
                category.index = 1
            if i18n.name == 'Par groupe synkinétique':
                category.index = 2

            if i18n.name == 'Syncinésies du sourcil':
                category.index = 1
            if i18n.name == 'Syncinésies de l’oeil':
                category.index = 2
            if i18n.name == 'Syncinésies de la joue':
                category.index = 3
            if i18n.name == 'Syncinésies du cou':
                category.index = 4

            if i18n.name == 'Péri-opératoire':
                category.index = 6

            category.save()

    def _update_other_categories(self, avc_category: Category, new_parent: Category):
        main_categories = Category.objects.exclude(
            pk__in=[avc_category.pk, new_parent.pk]
        ).filter(parent__isnull=True).update(parent=new_parent)
