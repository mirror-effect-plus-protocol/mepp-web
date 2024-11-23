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

from mepp.api.filters.base import MeppAPIFilter
from mepp.api.filters.category import (
    CategoryFilter,
    CategoryOrderingFilter,
)
from mepp.api.models.category import Category
from mepp.api.permissions import MeppStaffReadonly
from mepp.api.serializers.v1.category import CategorySerializer
from mepp.api.views import UUIDLookupFieldViewSet


class CategoryViewSet(UUIDLookupFieldViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """
    serializer_class = CategorySerializer
    permission_classes = (MeppStaffReadonly,)
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
        if self.action == 'list':
            return Category.objects.filter(parent_id__isnull=True)
        else:
            return Category.objects.all()
