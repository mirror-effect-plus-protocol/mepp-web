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
import logging

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import translation


def send_onboarding_patient_email(user: 'api.User') -> bool:
    # send an e-mail to the user
    mepp_host = settings.HTTP_HOST
    context = {
        'first_name': user.first_name,
        'email': user.email,
        'mepp_host': mepp_host,
    }

    translation.activate(user.language)
    template = (
        'staff_registration'
        if user.is_staff
        else 'user_registration'
    )
    # render email text
    email_html_message = render_to_string(
        f'email/{template}.html', context
    )
    email_plaintext_message = render_to_string(
        f'email/{template}.txt', context
    )

    msg = EmailMultiAlternatives(
        # title:
        translation.gettext('Your profile has been activated'),
        # message:
        email_plaintext_message,
        # from:
        settings.DEFAULT_FROM_EMAIL,
        # to:
        [user.email]
    )
    msg.attach_alternative(email_html_message, 'text/html')
    try:
        msg.send()
    except Exception as e:
        logging.error(str(e))
        return False
    return True


def send_alert_email(user: 'api.User') -> bool:
    # send an e-mail to the user
    mepp_host = settings.HTTP_HOST
    context = {
        'first_name': user.first_name,
        'email': user.email,
        'previous_email': user.previous_email,
        'mepp_host': mepp_host,
    }

    translation.activate(user.language)

    # render email text
    email_html_message = render_to_string(
        'email/user_email_changed.html', context
    )
    email_plaintext_message = render_to_string(
        'email/user_email_changed.txt', context
    )

    msg = EmailMultiAlternatives(
        # title:
        translation.gettext('Your e-mail address has been changed'),
        # message:
        email_plaintext_message,
        # from:
        settings.DEFAULT_FROM_EMAIL,
        # to:
        [user.previous_email]
    )
    msg.attach_alternative(email_html_message, 'text/html')
    try:
        msg.send()
    except Exception as e:
        logging.error(str(e))
        return False
    return True
