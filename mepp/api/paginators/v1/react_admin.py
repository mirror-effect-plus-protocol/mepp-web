# coding: utf-8
from rest_framework.pagination import (
    LimitOffsetPagination,
)

from rest_framework.response import Response


class ReactAdminPagination(LimitOffsetPagination):

    limit_query_param = '_end'
    offset_query_param = '_start'
    max_limit = 100

    def get_paginated_response(self, data):
        headers = {
            'X-Total-Count': self.count
        }
        return Response(data, headers=headers)



