# Generated by Django 4.2.11 on 2024-11-01 15:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0013_remove_exercise_clinician'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='parent',
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='children',
                to='api.category',
            ),
        ),
        migrations.AlterField(
            model_name='exercise',
            name='auto_translate',
            field=models.BooleanField(default=False),
        ),
    ]
