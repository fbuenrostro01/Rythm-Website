from django.contrib import admin
from .models import UserHighScore, Recording, UserRecordings

admin.site.register(UserHighScore)
admin.site.register(Recording)
admin.site.register(UserRecordings)