# Generated by Django 4.2.11 on 2024-11-25 20:45

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0020_alter_treatmentplan_auto_translate'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='has_cognitive_issues',
            new_name='use_video_only',
        ),
    ]
