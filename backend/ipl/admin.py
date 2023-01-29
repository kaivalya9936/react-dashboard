from django.contrib import admin
from .models import Deliveries
from .models import Matches

admin.site.register(Matches)
admin.site.register(Deliveries)
