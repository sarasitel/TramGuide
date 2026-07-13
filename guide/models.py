from django.db import models


class Station(models.Model):
    name = models.CharField(max_length=120)
    district = models.CharField(max_length=120, blank=True)
    line = models.CharField(max_length=40)
    image = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Monument(models.Model):
    name = models.CharField(max_length=140)
    description = models.TextField()
    address = models.CharField(max_length=180)
    nearest_station = models.ForeignKey(Station, on_delete=models.SET_NULL, null=True, blank=True)
    walk_minutes = models.PositiveIntegerField(default=5)
    image = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=80, blank=True)

    def __str__(self):
        return self.name


class TramLine(models.Model):
    name = models.CharField(max_length=80)
    color = models.CharField(max_length=40, default='red')
    start = models.CharField(max_length=120)
    end = models.CharField(max_length=120)
    station_count = models.PositiveIntegerField(default=0)
    frequency = models.CharField(max_length=80, blank=True)

    def __str__(self):
        return self.name


class Circuit(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    duration = models.CharField(max_length=40)
    station_count = models.PositiveIntegerField(default=0)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=4.5)
    image = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class TicketType(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField()
    validity = models.CharField(max_length=80)

    def __str__(self):
        return self.name
