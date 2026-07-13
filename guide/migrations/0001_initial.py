# Generated manually for the CityTram Guide demo
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Circuit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('description', models.TextField()),
                ('duration', models.CharField(max_length=40)),
                ('station_count', models.PositiveIntegerField(default=0)),
                ('rating', models.DecimalField(decimal_places=1, default=4.5, max_digits=2)),
                ('image', models.CharField(blank=True, max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('district', models.CharField(blank=True, max_length=120)),
                ('line', models.CharField(max_length=40)),
                ('image', models.CharField(blank=True, max_length=255)),
                ('description', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='TicketType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('description', models.TextField()),
                ('validity', models.CharField(max_length=80)),
            ],
        ),
        migrations.CreateModel(
            name='TramLine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80)),
                ('color', models.CharField(default='red', max_length=40)),
                ('start', models.CharField(max_length=120)),
                ('end', models.CharField(max_length=120)),
                ('station_count', models.PositiveIntegerField(default=0)),
                ('frequency', models.CharField(blank=True, max_length=80)),
            ],
        ),
        migrations.CreateModel(
            name='Monument',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=140)),
                ('description', models.TextField()),
                ('address', models.CharField(max_length=180)),
                ('walk_minutes', models.PositiveIntegerField(default=5)),
                ('image', models.CharField(blank=True, max_length=255)),
                ('category', models.CharField(blank=True, max_length=80)),
                ('nearest_station', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='guide.station')),
            ],
        ),
    ]
