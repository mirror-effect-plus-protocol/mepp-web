from django.apps import AppConfig


class ApiConfig(AppConfig):
    name = 'mepp.api'

    def ready(self):
        import mepp.api.signals  # noqa
        super().ready()
