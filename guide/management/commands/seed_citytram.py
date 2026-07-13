from django.core.management.base import BaseCommand
from guide.models import Circuit, Monument, Station, TicketType, TramLine


class Command(BaseCommand):
    help = 'Ajoute des données de démonstration pour CityTram Guide.'

    def handle(self, *args, **options):
        stations_data = [
            ('Bab Lamrissa', 'Salé', 'Lignes 1 et 2'),
            ('Tour Hassan', 'Hassan', 'Lignes 1 et 2'),
            ('Mohammed V - Gare de Rabat', 'Centre-ville', 'Ligne 1'),
            ('Agdal - Av. de France', 'Agdal', 'Ligne 1'),
            ('Bab El Had', 'Médina', 'Ligne 2'),
            ('Hôpital Moulay Youssef', 'Rabat', 'Ligne 2'),
        ]
        stations = {}
        for name, district, line in stations_data:
            station, _ = Station.objects.get_or_create(name=name, defaults={'district': district, 'line': line})
            stations[name] = station

        lines_data = [
            ('Ligne 1', 'line1', 'Hay Karima', 'Madinat Al Irfane', 21, '8 min'),
            ('Ligne 2', 'line2', 'Hassan II', 'Hôpital Moulay Youssef', 14, '9 min'),
        ]
        for name, color, start, end, count, freq in lines_data:
            TramLine.objects.get_or_create(name=name, defaults={'color': color, 'start': start, 'end': end, 'station_count': count, 'frequency': freq})

        monuments_data = [
            ('Tour Hassan', 'Historique', 'Place du 16 Novembre', 'Tour Hassan', 5, 'guide/img/tour_hassan.png'),
            ('Kasbah des Oudayas', 'Patrimoine', 'Bab Oudaia', 'Bab Chellah', 7, 'guide/img/kasbah.png'),
            ('Chellah', 'Culturel', 'Chellah', 'Bab El Had', 6, 'guide/img/chellah_gate.png'),
            ('Musée Mohammed VI', 'Moderne', 'Centre-ville', 'Mohammed V - Gare de Rabat', 8, 'guide/img/musee_modern.png'),
            ('Marina Bouregreg', 'Famille', 'Rive du Bouregreg', 'Bab Lamrissa', 4, 'guide/img/bouregreg.png'),
        ]
        for name, category, address, station_name, walk, image in monuments_data:
            Monument.objects.get_or_create(
                name=name,
                defaults={
                    'category': category,
                    'address': address,
                    'nearest_station': stations.get(station_name),
                    'walk_minutes': walk,
                    'image': image,
                    'description': 'Lieu touristique accessible facilement par le tramway.',
                }
            )

        circuits_data = [
            ('Circuit Historique', 'Tour Hassan, médina, Chellah et Kasbah des Oudayas.', '4h', 12, '4.7', 'guide/img/tour_hassan.png'),
            ('Circuit Moderne', 'Musées, centre-ville et places principales.', '3h', 10, '4.6', 'guide/img/musee_modern.png'),
            ('Circuit Culturel', 'Patrimoine, expositions et points de vue.', '5h', 14, '4.8', 'guide/img/chellah_gate.png'),
            ('Circuit Familial', 'Balade simple autour du Bouregreg.', '2.5h', 8, '4.5', 'guide/img/bouregreg.png'),
        ]
        for name, desc, duration, station_count, rating, image in circuits_data:
            Circuit.objects.get_or_create(name=name, defaults={'description': desc, 'duration': duration, 'station_count': station_count, 'rating': rating, 'image': image})

        tickets_data = [
            ('Ticket simple', 6.00, 'Idéal pour un déplacement rapide.', '1 trajet'),
            ('Ticket enfant', 3.00, 'Tarif réduit pour les enfants.', '1 trajet'),
            ('Ticket étudiant', 4.00, 'Tarif adapté aux étudiants.', '1 trajet'),
            ('Ticket touristique', 25.00, 'Pour visiter plusieurs monuments.', 'Journée'),
        ]
        for name, price, description, validity in tickets_data:
            TicketType.objects.get_or_create(name=name, defaults={'price': price, 'description': description, 'validity': validity})

        self.stdout.write(self.style.SUCCESS('Données CityTram ajoutées avec succès.'))
