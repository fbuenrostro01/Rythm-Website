from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import UserHighScore

class CreateUserForm(UserCreationForm):
    class Meta:
        model=User
        fields=["username", "email", "password1", "password2"]
        #rmeovved the issue withe the forms showing me password2 for messeges

class UserHighScoreForm(forms.ModelForm): 
    class Meta:
        model=UserHighScore
        fields=['score']
    #this is for data validation 

    #it basic bu tchecks if the score is lans than 0 or higher than 10000 
    #although ti shoulnt eve trigger since i set the random thing not to get certain numbers 
    def validation_score(self):
        score=self.cleaned_data['score']
        
        if score<0:
            raise forms.ValidationError("Score cannot be negative")
        if score>10000:  
            raise forms.ValidationError("Score exceeds maximum allowed value")
        return score