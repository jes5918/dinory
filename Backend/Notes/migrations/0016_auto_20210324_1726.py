# Generated by Django 3.1.7 on 2021-03-24 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Notes', '0015_auto_20210324_1559'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diary',
            name='img',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='note',
            name='img',
            field=models.CharField(max_length=255),
        ),
    ]
