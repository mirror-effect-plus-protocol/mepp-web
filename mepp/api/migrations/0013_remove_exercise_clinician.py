# Generated by Django 4.2.11 on 2024-10-18 20:30

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0012_alter_subcategoryi18n_unique_together_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="exercise",
            name="clinician",
        ),
    ]
