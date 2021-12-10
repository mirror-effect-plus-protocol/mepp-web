# coding: utf-8
from rest_framework.filters import BaseFilterBackend, OrderingFilter

from mepp.api.enums.language import LanguageEnum


class PlanFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):

        language = request.query_params.get(
            'language', LanguageEnum.default.value
        )
        queryset = queryset.filter(i18n__language=language)

        return queryset.distinct()


class PlanOrderingFilter(OrderingFilter):

    def get_ordering(self, request, queryset, view):
        """
        Override parent class to support front-end ordering
        """
        params = request.query_params.get(self.ordering_param)
        if params:
            fields = [param.strip() for param in params.split(',')]
            fields_to_replace = {
                'clinician_uid': ['clinician__first_name', 'clinician__last_name'],
            }
            for language, _ in list(LanguageEnum.choices()):
                fields_to_replace[f'i18n.name.{language}'] = ['i18n__name']

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
