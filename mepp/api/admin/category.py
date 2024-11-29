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

from django import forms
from django.db import models
from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from mepp.api.enums.language import LanguageEnum
from mepp.api.fields.uuid import UUIDField

from ..models.category import Category, CategoryI18n


class CategoryI18nInlineAdmin(admin.StackedInline):

    model = CategoryI18n
    fields = ['language', 'name']
    extra = 0


class CategoryAdmin(admin.ModelAdmin):

    list_display = ['get_hierarchy']
    fields = ['parent', 'index']
    inlines = [CategoryI18nInlineAdmin]

    @admin.display(description=_('Category'))
    def get_hierarchy(self, obj):
        if obj.parent is None:
            return obj.i18n.get(language=LanguageEnum.default.value).name

        return obj.label

    def get_queryset(self, request):
        # Retrieve all categories
        categories = super().get_queryset(request)
        # Get the ordered categories
        ordered_categories = self._get_ordered_categories(categories)
        # Extract the IDs of the categories in the correct order
        ordered_ids = [cat.id for cat in ordered_categories]
        # Rebuild the queryset with the determined order
        return categories.filter(id__in=ordered_ids).order_by(
            models.Case(*[
                models.When(id=cat_id, then=pos)
                for pos, cat_id in enumerate(ordered_ids)
            ])
        )

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        # Check if the field is the 'parent' ForeignKey
        if db_field.name == 'parent':
            # Get the original queryset
            return CategoryAdminChoiceField(queryset=self.get_queryset(request))

        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    @classmethod
    def _get_ordered_categories(cls, categories, parent=None):
        """
        Retrieve categories sorted by their hierarchy and index.
        """
        ordered = []
        # Filter categories with the given parent and sort by index
        children = categories.filter(parent=parent).order_by('index')
        for child in children:
            # Add the current category
            ordered.append(child)
            # Recursively add the children of the current category
            ordered += cls._get_ordered_categories(categories, parent=child)
        return ordered


class CategoryAdminChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return obj.label
