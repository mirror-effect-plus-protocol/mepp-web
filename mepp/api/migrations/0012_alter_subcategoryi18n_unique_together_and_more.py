# Generated by Django 4.2.11 on 2024-10-18 18:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0011_exercise_video'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='subcategoryi18n',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='subcategoryi18n',
            name='parent',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='sub_categories',
        ),
        migrations.AddField(
            model_name='category',
            name='parent',
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='sub_categories',
                to='api.category',
            ),
        ),
        migrations.AddField(
            model_name='exercise',
            name='categories',
            field=models.ManyToManyField(related_name='exercises', to='api.category'),
        ),
        migrations.DeleteModel(
            name='SubCategory',
        ),
        migrations.DeleteModel(
            name='SubCategoryI18n',
        ),
    ]
