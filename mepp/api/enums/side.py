# coding: utf-8
from .base import BaseEnum


class SideEnum(BaseEnum):
    """
    Values of paralyzed users' sides
    """
    LEFT = 0
    RIGHT = 1

    default = LEFT
