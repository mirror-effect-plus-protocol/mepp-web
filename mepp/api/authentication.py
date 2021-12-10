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

from django.utils.translation import gettext_lazy as _
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

from mepp.api.models.expiring_token import ExpiringToken


class ExpiringTokenAuthentication(TokenAuthentication):
    """
    Same as in DRF, but also handle Token expiration.

    When token is expired, returns a 401. But nothing is implemented to
    help the client to fetch a new token except sending login/password to `/me`
    and retrieving a new token.

    Otherwise, the token is extended for another number of seconds.
    See settings.TOKEN_EXPIRY_TTL.
    """

    model = ExpiringToken

    def authenticate_credentials(self, key):
        user, token = super().authenticate_credentials(key)

        if token.is_expired:
            token.delete()
            raise AuthenticationFailed(_('Invalid token.'))
        else:
            token.extend_expiry()

        return user, token
