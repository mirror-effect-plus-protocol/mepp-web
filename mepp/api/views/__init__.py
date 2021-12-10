# coding: utf-8
from rest_framework import viewsets


class UUIDLookupFieldViewSet(viewsets.ModelViewSet):

    lookup_field = 'uid'
