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

from rest_framework.filters import BaseFilterBackend, OrderingFilter

from mepp.api.enums.language import LanguageEnum


class ExerciseFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):

        language = request.query_params.get(
            'language', LanguageEnum.default.value
        )
        queryset = queryset.filter(i18n__language=language)

        try:
            category__uid = request.query_params['category__uid']
        except KeyError:
            pass
        else:
            queryset = queryset.filter(categories__uid=category__uid)

        return queryset.distinct()


class ExerciseOrderingFilter(OrderingFilter):

    def get_ordering(self, request, queryset, view):
        """
        Override parent class to support front-end ordering
        """
        params = request.query_params.get(self.ordering_param)
        if params:
            fields = [param.strip() for param in params.split(',')]
            fields_to_replace = {}
            for language, _ in list(LanguageEnum.choices()):
                fields_to_replace[f'i18n.description.{language}'] = ['i18n__description']

            fields_copy = list(fields)
            for field in fields_copy:
                direction = ''
                abs_field = field
                if field.startswith('-'):
                    abs_field = field[1:]
                    direction = '-'
                if abs_field not in fields_to_replace.keys():
                    continue

                idx = fields.index(field)
                fields.pop(idx)
                for cpt, new_field in enumerate(fields_to_replace[abs_field]):
                    fields.insert(idx + cpt, f'{direction}{new_field}')

            ordering = self.remove_invalid_fields(queryset, fields, view, request)
            if ordering:
                return ordering

        # No ordering was included, or all the ordering fields were invalid
        return super().get_ordering(request=request, queryset=queryset, view=view)
