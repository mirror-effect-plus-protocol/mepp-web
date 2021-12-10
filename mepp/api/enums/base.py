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
