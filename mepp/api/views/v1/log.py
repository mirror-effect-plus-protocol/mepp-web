# coding: utf-8
from rest_framework import permissions
from rest_framework_extensions.mixins import NestedViewSetMixin

from mepp.api.models.log import Log
from mepp.api.serializers.v1.log import LogSerializer
from mepp.api.views import UUIDLookupFieldViewSet


class LogViewSet(NestedViewSetMixin, UUIDLookupFieldViewSet):
    """
    API endpoint that allows exercises to be viewed or edited.
    """
    serializer_class = LogSerializer

    def get_queryset(self):
        queryset = Log.objects.all()
        return queryset
