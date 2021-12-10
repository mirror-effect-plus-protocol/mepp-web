# coding: utf-8
from mepp.api.models.category import Category
from mepp.api.serializers.v1.category import CategorySerializer
from mepp.api.views import UUIDLookupFieldViewSet
from mepp.api.filters.base import MeppAPIFilter
from mepp.api.filters.category import (
    CategoryFilter,
    CategoryOrderingFilter,
)


class CategoryViewSet(UUIDLookupFieldViewSet):
    """
    API endpoint that allows categories/sub categories to be viewed or edited.
    """
    serializer_class = CategorySerializer

    filter_backends = [
        MeppAPIFilter,
        CategoryFilter,
        CategoryOrderingFilter,
    ]
    ordering = 'i18n__name'
    ordering_fields = [
        'i18n__name',
    ]

    def get_queryset(self):
        queryset = Category.objects.all()
        return queryset
