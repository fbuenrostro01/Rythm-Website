from django.shortcuts import render,redirect
from django.shortcuts import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
import random
from .forms import *
from app.models import *
import json
from django.http import JsonResponse
from django.utils import timezone



# Create your views here.

def login_func(request):
    if request.method=="POST":
        username=request.POST.get("username")
        password=request.POST.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request,user)
            print("tes for the ternminal t")
            return redirect("game_page")
        else:
            messages.info(request,"username or password incorrect")
            
    context={}
    return render(request,"login.html",context)



# kicks user out when they click on log out
#termintes teh seccsion 
def logout_func(request):
    logout(request)
    return redirect('login_page')


#they can only biew the page if the are logg otheriwse i have them redirect to login 
@login_required(login_url='login_page')  
def high_score_func(request):
    # Get all scores ordered by score value (highest first)
    scores = UserHighScore.objects.all().order_by('-score')
    
    print("tresting  scores ", scores)
    
    return render(request, 'HighScores.html', {'scores': scores})


def register_func(request):
    form=CreateUserForm()
    if request.method=="POST":
        form=CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("game_page")

    context={'form':form}
    return render(request,"register.html",context)




#sit whows the the high scores to the main game page table
#only tirgres if they a logged othewise i kick them to the login page

@login_required(login_url='login_page')
def show_game_func(request):
    if request.method=="POST":
        score=int(request.POST.get('game_score', 0))
        
        user_score=UserHighScore.objects.filter(user=request.user).first()
        if user_score:
            user_score.score=score
            user_score.save()
        else:
            UserHighScore.objects.create(user=request.user, score=score)
            
        return redirect("game_page")
    
    user_score=UserHighScore.objects.filter(user=request.user).first()
    return render(request, "Game.html", {'user_score': user_score})


@login_required(login_url='login_page')
def recordings_page(request):
    if request.method=='POST':
        UserRecordings.objects.filter(user=request.user).delete()
        messages.success(request, 'All your recordings have been deleted!')
        return redirect('recordings_page')

    all_recordings=UserRecordings.objects.all().order_by('-created_at')
    all_users=User.objects.all()

    return render(request, 'Recordings.html', {'all_recordings': all_recordings,'all_users': all_users})


@login_required
def save_recording(request):
    if request.method=='POST':
        data=json.loads(request.body)
        UserRecordings.objects.create(
            user=request.user,
            recording_name=data['name'],
            sequence=json.dumps(data['sequence'])
        )
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)


@login_required(login_url='login_page')
def delete_score(request, score_id):
    score=UserHighScore.objects.filter(id=score_id).first()
    if score and (score.user==request.user or request.user.is_superuser):
        score.delete()
        messages.success(request, 'Score deleted successfully!')
    return redirect('high_scores_page')


@login_required(login_url='login_page')
def game_page(request):
    if request.method=='POST':
        score=request.POST.get('game_score')
        if score:
            UserHighScore.objects.create(
                user=request.user,
                score=int(score),
                date_played=timezone.now()
            )
            return JsonResponse({'status': 'success', 'score': score})
    return JsonResponse({'status': 'error'}, status=400)


def register_page(request):
    if request.method=='POST':
        form=UserCreationForm(request.POST)
        if form.is_valid():
            user=form.save()
            messages.success(request, 'Account created successfully! Please login.')
            return redirect('login_page')
    else:
        form=UserCreationForm()
    return render(request, 'Register.html', {'form': form})


    

