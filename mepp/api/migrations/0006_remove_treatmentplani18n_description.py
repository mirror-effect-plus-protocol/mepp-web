# Generated by Django 4.2.3 on 2023-10-06 15:45

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0005_user_mirror_settings'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='treatmentplani18n',
            name='description',
        ),
    ]
