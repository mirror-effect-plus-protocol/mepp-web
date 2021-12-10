# coding: utf-8
import pytest

from django.core.management import call_command


@pytest.fixture(scope='session')
def django_db_setup(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock():
        call_command('mock_data')


@pytest.fixture(autouse=True)
def enable_db_access_for_all_tests(db):
    pass
