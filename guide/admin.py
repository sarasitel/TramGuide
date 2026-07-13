from django.contrib import admin
from .models import Circuit, Monument, Station, TicketType, TramLine

admin.site.register(Station)
admin.site.register(Monument)
admin.site.register(TramLine)
admin.site.register(Circuit)
admin.site.register(TicketType)
