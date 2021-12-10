# coding: utf-8
from django.contrib import admin
from django.urls import include, path

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path(
        'api/v1/password_reset/',
        include('django_rest_passwordreset.urls', namespace='password_reset'),
    ),
    path('api/', include('mepp.api.urls')),
]
