# coding: utf-8
from .base import BaseEnum


class RoleEnum(BaseEnum):
    """
    Values for users' roles
    """
    ADMIN = 0
    STAFF = 1
    USER = 2

    @classmethod
    def get_role(cls, user: 'mepp.api.models.User') -> str:

        if user.is_superuser:
            return cls.ADMIN.name.lower()

        if user.is_staff:
            return cls.STAFF.name.lower()

        return cls.USER.name.lower()
