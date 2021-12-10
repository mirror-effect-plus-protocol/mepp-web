# coding: utf-8
from mepp.api.tests.api.base_test_case import BaseTestCase


class BaseV1TestCase(BaseTestCase):

    def setUp(self):
        self.router_namespace = 'api_v1'
        super().setUp()



