# Generated by Django 3.1.7 on 2021-03-22 07:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Notes', '0009_note_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diary',
            name='note',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='diary', to='Notes.note'),
        ),
    ]