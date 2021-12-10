# coding: utf-8
from .base import BaseEnum


class StatusEnum(BaseEnum):
    """
    Values for session and exercise statuses
    """
    COMPLETED = 0
    CREATED = 1
    IN_PROGRESS = 2
    PAUSED = 3
    SKIPPED = 4
    STARTED = 5
    UNCOMPLETED = 6

    default = CREATED
