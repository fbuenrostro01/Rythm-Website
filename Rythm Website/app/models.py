from django.db import models
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


# Create your models here#

class UserHighScore(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    score=models.IntegerField(default=0)
    #datetime field for letting me automattically record the date the score was made
    #i can overwrite it if they make a new score 
    #remever to implement into score table if i have time
    date_played=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"User: {self.user.username}  Score: {self.score}"


class UserRecordings(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    recording_name=models.CharField(max_length=100)
    sequence=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s sequence: {self.recording_name}"


class Recording(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
   

    def __str__(self):
        return f"{self.user.username}'s recording - {self.date}"

