# coding: utf-8
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from mepp.api.models.user import User

admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
