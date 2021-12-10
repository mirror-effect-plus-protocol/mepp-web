# coding: utf-8
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
