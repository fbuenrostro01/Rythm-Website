const playButton=document.getElementById('playButton');
const pauseButton=document.getElementById('pauseButton');

const workitButton=document.getElementById("work_it")
const makeitButton=document.getElementById("make_it")
const doitButton=document.getElementById("do_it")
const makeusButton=document.getElementById("makes_us")

const harderButton=document.getElementById("harder")
const betterButton=document.getElementById("better")
const fasterButton=document.getElementById("faster")
const strongerButton=document.getElementById("stronger")

const morethanButton=document.getElementById("more_than")
const hourButton=document.getElementById("hour")
const ourButton=document.getElementById("our")
const neverButton=document.getElementById("never")

const everButton=document.getElementById("ever")
const afterButton=document.getElementById("after")
const workisButton=document.getElementById("work_is")
const overButton=document.getElementById("over")
const mainAudioPlayer=document.getElementById('mainAudioPlayer');
const scoreForm=document.getElementById('scoreForm');
const recordButton = document.getElementById('recordButton');

let isRecording=false;
let recordedSequence=[];
let startTime;
let gameScore=0;

const correctSequence=[
    {key: 'q'},//work it
    {key: 'w'},//make it
    {key: 'e'},//do it
    {key: 'r'},//makes us
    {key: 'u'},//harder
    {key: 'i'},//better
    {key: 'o'},//faster
    {key: 'p'},//stronger
    {key: 'a'},//more than
    {key: 's'},//hour
    {key: 'd'},//our
    {key: 'f'},//never
    {key: 'j'},//ever
    {key: 'k'},//after
    {key: 'l'},//work is
    {key: ';'} //over
];

let isGameActive=false;
let currentIndex=0;
let gameStartTime;

const sequenceTimings={
    //first part
    'work_it_1': 1.4,
    'make_it_1': 2.2,
    'do_it_1': 3.4,
    'makes_us_1': 4.3,
    'harder_1': 9.5,
    'better_1': 10.6,
    'faster_1': 11.6,
    'stronger_1': 12.5,
    'more_than': 17.0,
    'power': 17.9,
    'hour': 18.9,
    'never': 19.8,
    'ever': 25.2,
    'after': 25.2,
    'work_it_2': 27.1,
    'over': 28.1,
    
    //second
    'work_it_3': 32.4,
    'make_it_2': 33.4,
    'do_it_2': 34.4,
    'makes_us_2': 35.4,
    'harder_2': 40.7,
    'better_2': 41.7,
    'faster_2': 42.7,
    'stronger_2': 43.6,
    
    //alst
    'work_it_4': 48.1,
    'harder_3': 48.5,
    'make_it_3': 49.1,
    'better_3': 49.5,
    'do_it_3': 50.0,
    'faster_3': 50.5,
    'makes_us_3': 51.0,
    'stronger_3': 51.5
};

function checkKeyTiming(key, currentTime) {
    const tolerance=0.55; // tming so its not eas strict
    let expectedTime;
    
    if (currentTime < 30) {
        switch(key) {
            case 'q': expectedTime=1.4; break;
            case 'w': expectedTime=2.2; break;
            case 'e': expectedTime=3.4; break;
            case 'r': expectedTime=4.3; break;
            case 'u': expectedTime=9.5; break;
            case 'i': expectedTime=10.6; break;
            case 'o': expectedTime=11.6; break;
            case 'p': expectedTime=12.5; break;
            case 'a': expectedTime=17.0; break;
            case 's': expectedTime=17.9; break;
            case 'd': expectedTime=18.9; break;
            case 'f': expectedTime=19.8; break;
            case 'j': expectedTime=25.2; break;
            case 'k': expectedTime=25.2; break;
            case 'q': expectedTime=27.1; break;
            case 'l': expectedTime=28.1; break;
        }
    } else if (currentTime < 45) {
        switch(key) {
            case 'q': expectedTime=32.4; break;
            case 'w': expectedTime=33.4; break;
            case 'e': expectedTime=34.4; break;
            case 'r': expectedTime=35.4; break;
            case 'u': expectedTime=40.7; break;
            case 'i': expectedTime=41.7; break;
            case 'o': expectedTime=42.7; break;
            case 'p': expectedTime=43.6; break;
        }
    } else {
        switch(key) {
            case 'q': expectedTime=48.1; break;
            case 'u': expectedTime=48.5; break;
            case 'w': expectedTime=49.1; break;
            case 'i': expectedTime=49.5; break;
            case 'e': expectedTime=50.0; break;
            case 'o': expectedTime=50.5; break;
            case 'r': expectedTime=51.0; break;
            case 'p': expectedTime=51.5; break;
        }
    }

   //lets me check if its withoug the timing window
    return Math.abs(currentTime - expectedTime) <= tolerance;
}

async function playRecording(sequence) {
    const actions=JSON.parse(sequence);
    for(const action of actions) {
        playSound(getSoundForKey(action.key));
        await new Promise(resolve => setTimeout(resolve, 950));
    }
}


function recordAction(key) {
    if(isRecording) {
        recordedSequence.push({
            key: key,
            delay: 950
        });
    }
}

function playSound(soundFile) {
    const audio=new Audio(soundFile);
    audio.currentTime=0;
    audio.play();
}

playButton.addEventListener('click', ()=>{
    const messageContent=document.getElementById('message-content');
    let count=3;
    
    const countdown=setInterval(()=>{
        messageContent.textContent=count;
        count--;
        
        if(count<0){
            clearInterval(countdown);
            messageContent.textContent="GO!";
            setTimeout(()=>{
                messageContent.textContent="";
                mainAudioPlayer.play();
                isGameActive=true;  
                currentIndex=0;     
                gameScore=0;       
            }, 1000);
        }
    }, 1000);
});

workitButton.addEventListener('click', () => {
    playSound(workitButtonSound); 
    console.log("test work it button")
});

makeitButton.addEventListener('click', () => {
    playSound(makeitButtonSound); 
    console.log("test make it")
});

doitButton.addEventListener('click', () => {
    playSound(doitButtonSound); 
    console.log("test do it")
});

makeusButton.addEventListener('click', () => {
    playSound(makeusButtonSound); 
    console.log("test make us")
});

harderButton.addEventListener('click', () => {
    playSound(harderButtonSound); 
    console.log("test harder button")
});

betterButton.addEventListener('click', () => {
    playSound(betterButtonSound); 
    console.log("test better button")
});

fasterButton.addEventListener('click', () => {
    playSound(fasterButtonSound); 
    console.log("test faster button")
});

strongerButton.addEventListener('click', () => {
    playSound(strongerButtonSound); 
    console.log("test strong button")
});

morethanButton.addEventListener('click', () => {
    playSound(morethanButtonSound); 
    console.log("test more than")
});

hourButton.addEventListener('click', () => {
    playSound(hourButtonSound); 
    console.log("test hour button")
});

ourButton.addEventListener('click', () => {
    playSound(ourButtonSound); 
    console.log("test hour button")
});

neverButton.addEventListener('click', () => {
    playSound(neverButtonSound); 
    console.log("test never button")
});

everButton.addEventListener('click', () => {
    playSound(everButtonSound); 
    console.log("test ever button")
});

afterButton.addEventListener('click', () => {
    playSound(afterButtonSound); 
    console.log("test after button")
});

workisButton.addEventListener('click', () => {
    playSound(workisButtonSound); 
    console.log("test work is")
});

overButton.addEventListener('click', () => {
    playSound(overButtonSound); 
    console.log("test make us")
});

//for stooping adn starting the rcording 
recordButton.addEventListener('click', () => {
    if (!isRecording) {
        isRecording=true;
        recordedSequence=[];
        startTime=performance.now();
        recordButton.textContent='Stop Recording';
    } else {
        isRecording=false;
        recordButton.textContent='Record';
        saveRecording();
    }
});

// lets me plat the kesy while recording
document.addEventListener('keydown', function(event) {
    
    switch(event.key) {
        case 'q': playSound(workitButtonSound); break;
        case 'w': playSound(makeitButtonSound); break;
        case 'e': playSound(doitButtonSound); break;
        case 'r': playSound(makeusButtonSound); break;
        case 'u': playSound(harderButtonSound); break;
        case 'i': playSound(betterButtonSound); break;
        case 'o': playSound(fasterButtonSound); break;
        case 'p': playSound(strongerButtonSound); break;
        case 'a': playSound(morethanButtonSound); break;
        case 's': playSound(hourButtonSound); break;
        case 'd': playSound(ourButtonSound); break;
        case 'f': playSound(neverButtonSound); break;
        case 'j': playSound(everButtonSound); break;
        case 'k': playSound(afterButtonSound); break;
        case 'l': playSound(workisButtonSound); break;
        case ';': playSound(overButtonSound); break;
    }

   
    if (isRecording) {
    //recordsif we lcikc record 
        recordedSequence.push({
            key: event.key,
            timestamp: performance.now() - startTime
        });
    }
});

//saves the mofo 
async function saveRecording() {
    if (recordedSequence.length > 0) {
        const name=prompt("Name your recording:");
        if (name) {
            await fetch('/save-recording/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify({
                    name: name,
                    sequence: recordedSequence
                })
            });
        }
    }
}

document.addEventListener('keydown', (event)=>{
    if(!isGameActive) return;

    const expectedKey=correctSequence[currentIndex];
    if(!expectedKey) return;

    const isCorrectKey=event.key===expectedKey.key;
    const messageContent=document.getElementById('message-content');
    
    //keys toids
    const keyToButtonId = {
        'q': 'work_it',
        'w': 'make_it',
        'e': 'do_it',
        'r': 'makes_us',
        'u': 'harder',
        'i': 'better',
        'o': 'faster',
        'p': 'stronger',
        'a': 'more_than',
        's': 'hour',
        'd': 'our',
        'f': 'never',
        'j': 'ever',
        'k': 'after',
        'l': 'work_is',
        ';': 'over'
    };

    
    const buttonId=keyToButtonId[event.key];
    if(buttonId) {
        const button=document.getElementById(buttonId);
        if(button) {
            button.classList.add('pressed');
            setTimeout(() => {
                button.classList.remove('pressed');
            }, 200);  
        }
    }
    
    if(isCorrectKey){
        messageContent.textContent="GOOD!";
        messageContent.style.color="#4CAF50";
        gameScore = gameScore + 300;
        currentIndex++;
    } else {
        messageContent.textContent="BAD!";
        messageContent.style.color="#f44336";
        gameScore=Math.max(0, gameScore - 10);
    }

    setTimeout(()=>{
        messageContent.textContent="";
    }, 500);
});
        
        
        
      

mainAudioPlayer.addEventListener('ended', ()=>{
    //submets final score 
    if(isGameActive){
        isGameActive=false;
        
        
        const scoreInput=document.createElement('input');
        scoreInput.type='hidden';
        scoreInput.name='game_score';
        scoreInput.value=gameScore;
        
        //ovewirte the score so i dont get that too many err
        const oldScoreInput=scoreForm.querySelector('input[name="game_score"]');
        if(oldScoreInput){
            scoreForm.replaceChild(scoreInput, oldScoreInput);
        } else {
            scoreForm.appendChild(scoreInput);
        }
        
        scoreForm.submit();  
        // This will send the score to Django models thing
    }
});
        
        
        

        
        
      

function endGame() {
    isGameActive=false;
    
    const scoreData=new FormData();
    scoreData.append('game_score', gameScore);
    
    fetch('', {
        method: 'POST',
        body: scoreData,
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => response.json())
    .then(data => {
        const scoreDisplay=document.getElementById('display-current-user-score');
        if(scoreDisplay) {
            scoreDisplay.textContent=`Score: ${gameScore}`;
        }
    })
    .catch(error => {});
}


function getCookie(name) {
    const value=`; ${document.cookie}`;
    const parts=value.split(`; ${name}=`);
    if(parts.length===2) return parts.pop().split(';').shift();
}
        
        
        
      
