# coding: utf-8
from .base import BaseEnum


class ActionEnum(BaseEnum):
    """
    Values for patients' actions
    """
    DONE = 0
    LOGIN = 1
    LOGOUT = 2
    PAUSE = 3
    RESUME = 4
    SKIP = 5
    START = 6
    START_SESSION = 7
    RESTART_SESSION = 8

    default = START
