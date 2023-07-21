# Generated by Django 3.2.20 on 2023-07-21 15:28

from django.core.paginator import Paginator
from django.db import migrations, models

from mepp.api.helpers.mirror import default_settings


def update_mirror_settings(apps, schema_editor):

    User = apps.get_model('api', 'User')  # noqa

    page_size = 10000
    paginator = Paginator(
        User.objects.order_by('pk').filter(
            clinician__isnull=False
        ),
        page_size,
    )
    for page in paginator.page_range:
        users = paginator.page(page).object_list
        for user in users:
            user.mirror_settings = default_settings()
        User.objects.bulk_update(users, ['mirror_settings'])


def noop(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20230204_2247'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='mirror_settings',
            field=models.JSONField(null=True),
        ),
        migrations.RunPython(update_mirror_settings, noop)
    ]