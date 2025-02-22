# Generated by Django 4.2.16 on 2024-11-29 21:10

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0022_category_index'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name': 'category', 'verbose_name_plural': 'categories'},
        ),
        migrations.AlterField(
            model_name='articlei18n',
            name='language',
            field=models.CharField(
                choices=[
                    ('en', 'EN'),
                    ('fr', 'FR'),
                    ('it', 'IT'),
                    ('de', 'DE'),
                    ('es', 'ES'),
                    ('pt', 'PT'),
                ],
                default='en',
                max_length=2,
            ),
        ),
        migrations.AlterField(
            model_name='categoryi18n',
            name='language',
            field=models.CharField(
                choices=[
                    ('en', 'EN'),
                    ('fr', 'FR'),
                    ('it', 'IT'),
                    ('de', 'DE'),
                    ('es', 'ES'),
                    ('pt', 'PT'),
                ],
                default='en',
                max_length=2,
            ),
        ),
        migrations.AlterField(
            model_name='exercisei18n',
            name='language',
            field=models.CharField(
                choices=[
                    ('en', 'EN'),
                    ('fr', 'FR'),
                    ('it', 'IT'),
                    ('de', 'DE'),
                    ('es', 'ES'),
                    ('pt', 'PT'),
                ],
                default='en',
                max_length=2,
            ),
        ),
        migrations.AlterField(
            model_name='treatmentplani18n',
            name='language',
            field=models.CharField(
                choices=[
                    ('en', 'EN'),
                    ('fr', 'FR'),
                    ('it', 'IT'),
                    ('de', 'DE'),
                    ('es', 'ES'),
                    ('pt', 'PT'),
                ],
                default='en',
                max_length=2,
            ),
        ),
    ]
