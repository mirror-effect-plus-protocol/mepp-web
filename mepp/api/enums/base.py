# coding: utf-8
from enum import Enum


class BaseEnum(Enum):

    @classmethod
    def choices(cls, reverse: bool = False) -> tuple:
        """
        Build a list (a tuple of tuples) of choices based on enum choices.
        Useful to provide choices to Django fields which take a choice parameter
        """
        choices = list()

        # Loop thru defined enums
        for item in cls:
            if reverse:
                choices.append((item.name, item.value))
            else:
                choices.append((item.value, item.name))

        # return as tuple
        return tuple(choices)
