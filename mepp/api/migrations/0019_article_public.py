# Generated by Django 4.2.11 on 2024-11-08 20:53

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        (
            'api',
            '0018_rename_auto_translate_article_auto_translate_description_and_more',
        ),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='public',
            field=models.BooleanField(default=False),
        ),
    ]
