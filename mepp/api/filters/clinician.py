# coding: utf-8
from rest_framework.filters import BaseFilterBackend


class ClinicianFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):

        if request.user.is_superuser:
            # Remove user from the list. No need to expose them to the front end.
            # Update profile would happen through the settings route
            if view.action == 'list' and request.query_params.get('me') == 'false':
                queryset = queryset.exclude(uid=request.user.uid)

            return queryset

        queryset = queryset.filter(uid=request.user.uid)
        return queryset
