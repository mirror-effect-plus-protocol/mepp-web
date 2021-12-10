# coding: utf-8
from rest_framework_extensions.mixins import NestedViewSetMixin

from mepp.api.models.session import Session
from mepp.api.serializers.v1.session import SessionSerializer
from mepp.api.views import UUIDLookupFieldViewSet


class SessionViewSet(NestedViewSetMixin, UUIDLookupFieldViewSet):
    """
    API endpoint that expose patient's sessions.
    """
    serializer_class = SessionSerializer

    def get_queryset(self):
        queryset = Session.objects.all()
        return queryset
