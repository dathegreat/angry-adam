//GLOBAL VARIABLES
    let canvas;
    let ctx;
    let maxHeight;
    let maxWidth;
    let clouds = []; //array of cloud positions
    let monologue = [
        "Long ago...there was a man...",
        "A very angular man...",
        "More cube than man, really...",
        "Well, actually, more square than cube...",
        "Because he existed in two dimensions, you see...",
        "Anyway, every day this man would wake up...",
        "In this way he was very similar to you and I...",
        "But there was one major difference...",
        "Besides the whole two-dimensional thing...",
        "That is also a pretty major difference...",
        "Ok, there were two major differences...",
        "The first being that he was a two-dimensional being...",
        "And the second...",
        "He was born with a rare disorder, making him...",
        "INCREDIBLY ANGRY!!!",
        "Born on April 1st, 2022...",
        "The April Fools Gods cursed our hero, Adam, to be forever...",
        "ANGRY!!!",
        "No amount of anger management counseling could tame him...",
        "His indomitable rage weathered even the snuggliest blanket...",
        "And so, one day, he set out on a hero's journey...",
        "Adam wanted to find the cure for his rage...",
        "This is where you come in...",
        "Adam needs you to help him on his long, magical quest...",
        "We're not sure why...",
        "I guess he gets lonely and wants some company...",
        "Even angry people get lonely sometimes, you know...",
        "So here we are. At the beginning...",
        "Only YOU can decide the end!"

    ]

function init(canvasHeight, canvasWidth){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    //set canvas dimension attributes
    maxHeight = canvasHeight;
    maxWidth = canvasWidth;
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    //call title screen animation loop
    initLoop();
    canvas.onclick = (event) => clickHandler(event.offsetX, event.offsetY);
    document.onkeydown = keyDownHandler;
    document.onkeyup = keyUpHandler;
}

let realStart = false;
let realX = 0;
let realY = 0;
let realCounter = 0;
let realInterval = -1;
let startScreen = true;
let cutScene = false;
let chance = Math.random()*(300 - 200) + 200;
let frameCount = 0;

function initLoop(){
    //load initial start screen
    if( startScreen ){
        //draw background
//<--------------------------------------------------(nice)
        ctx.fillStyle = "#89CFF0";
        ctx.fillRect(0,0, maxWidth, maxHeight)
        //draw floating clouds
        cloudLoop();
        //draw false start button
        if(!realStart){
            drawStart();
            frameCount += 1;
        }else{//draw real start button
            //animate button flying
            if( realCounter < 50){
                realY += realInterval;
                realCounter += 1;
            }
            else{
                realInterval *= -1;
                realCounter = 0;
            }
            realX += 1;
            drawRealStart(realX, realY);
            drawStart();
        }
        //draw title text
        drawTitle();
        //every frame, determine whether real start spawns
        if(frameCount >= chance){
            realStart = true;
        }

        //call loop again about 30fps
        setTimeout(initLoop, 30);
    }//end start screen

    //call cutscene loop once correct start is clicked
    else if(cutScene){
        cutSceneLoop();
    }
   
}
let quizNumbers = [2, 3, 1, 3, 0];
let quizAnswers = [
    ["1892", "1998", "2022", "3069"],
    ["Plagued with mice", "Not Alive", "Three-Dimensional", "Two-Dimensional"],
    ["God", "The April Fools Gods", "Himself", "You"],
    ["Snuggly Blankets", "Puppies", "Whole Wheat", "None of these"],
    ["ANGER", "HANDSOMENESS", "PICKLES", "NOSTALGIA"]
];
let quizQuestions = [
    "What year was Adam born?",
    "Describe Adam's living situation",
    "Who cursed Adam?",
    "Adam's rage could only be cured by:",
    "What was Adam cursed with?"
];
let quizIt = 0;
let answerY = [];
let chosenAnswer;

function quizLoop(){
    //draw quiz screen title
    ctx.fillStyle = "#89CFF0";
    ctx.fillRect(0,0, maxWidth, maxHeight)
    ctx.fillStyle = "white";
    ctx.shadowOffsetX = maxWidth*0.01;
    ctx.shadowOffsetY = maxWidth*0.01;
    ctx.shadowBlur = 0.25;
    ctx.shadowColor = 'rgba(0, 0, 255, 0.5)';
    ctx.font = "bold 3em verdana, sans-serif";
    ctx.fillText("QUIZ TIME!", maxWidth/2, maxWidth*0.1);
    //draw quiz question
    ctx.font = "bold 1.5em verdana, sans-serif";
    ctx.shadowOffsetX = maxWidth*0.005;
    ctx.shadowOffsetY = maxWidth*0.005;
    let question = quizQuestions[quizIt];
    ctx.fillText(question, maxWidth/2, maxWidth*0.25);
    answerY = [];
    answerY.push(maxHeight*0.35);
    //draw each possible answer
    for(var answer = 0; answer < quizAnswers[quizIt].length; answer++){
        //draw answer box
        ctx.fillStyle = "#00A36C";
        ctx.shadowOffsetX = maxWidth*0.01;
        ctx.shadowOffsetY = maxWidth*0.01;
        ctx.shadowBlur = 0.25;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect((maxWidth/2) - ((maxWidth/6)), answerY[answer], maxWidth/3, maxHeight/10);
        //draw answer text
        ctx.shadowColor = 'rgba(0,0,0,0)';
        ctx.fillStyle = "white";
        ctx.font = "bold 1em verdana, sans-serif";
        ctx.textAlign = "center"
        ctx.textBaseline = "hanging";
        ctx.fillText(quizAnswers[quizIt][answer], maxWidth/2, answerY[answer] + maxHeight/25);
        answerY.push(answerY[answer] + maxHeight*0.15);
    }

}

function wrongAnswer(){
    //draw WRONG randomly on the page
    ctx.fillStyle = "red";
    ctx.shadowOffsetX = maxWidth*0.005;
    ctx.shadowOffsetY = maxWidth*0.005;
    ctx.shadowBlur = 0.25;
    ctx.shadowColor = 'rgba(0, 0, 255, 0.5)';
    ctx.font = "bold 1.5em verdana, sans-serif";
    ctx.fillText("WRONG", (Math.random() * (maxWidth*0.8 - maxWidth*0.2) + maxWidth*0.2), 
        (Math.random() * (maxWidth*0.8 - maxWidth*0.2) + maxWidth*0.2) );
}

let game = false;
function rightAnswer(){
    //draw CORRECT randomly on the page
    //then call next question set until all questions answered
    ctx.fillStyle = "green";
    ctx.shadowOffsetX = maxWidth*0.005;
    ctx.shadowOffsetY = maxWidth*0.005;
    ctx.shadowBlur = 0.25;
    ctx.shadowColor = 'rgba(0, 0, 255, 0.5)';
    ctx.font = "bold 2em verdana, sans-serif";
    ctx.fillText("CORRECT!", (Math.random() * (maxWidth*0.8 - maxWidth*0.2) + maxWidth*0.2), 
        (Math.random() * (maxWidth*0.8 - maxWidth*0.2) + maxWidth*0.2) );
    //display correct for half a second
    nextQuestion = () => { setTimeout(function() { 
        if(quizIt == quizQuestions.length -1){
            quiz = false;
            game = true;
            gameInit();
        }
        else{
            quizIt += 1;
            quizLoop();
        }
     }, 500); }

    nextQuestion();
}

function drawSky(){
    ctx.fillStyle = "#89CFF0";
    ctx.fillRect(0,0, maxWidth, maxHeight)
}

let adamHeight;
let adamWidth;

const Adam = {
    _x : 0,
    _y : 0,
    _isJumping : false,
    _acceleration : 0,
    _power : 10,
    _jump_juice : 10,

    get x(){ return this._x },
    set x(value){ this._x = value },
    get y(){ return this._y },
    set y(value){ this._y = value},
    get jumping(){ return this._isJumping },
    set jumping(bool){ this._isJumping = bool},
    get acceleration() { return this._acceleration },
    set acceleration(acc) { this._acceleration = acc},
    get power(){ return this._power },
    set power(pow){ this._power = pow },
    get juice(){ return this._jump_juice },
    set juice(juice_quantity){ this._jump_juice = juice_quantity},

    drawAdam: function(){
        //draw body
        ctx.fillStyle = "#B51C2D"
        ctx.fillRect(this._x, this._y, adamWidth, adamHeight)
        //draw pants
        ctx.fillStyle = "#241CB5"
        ctx.fillRect(this._x, this._y + (maxHeight * 0.075), adamWidth, adamHeight /4)
        //draw eyes
        let eyeball_size = maxHeight * 0.02;
        let pupil_size = maxHeight * 0.01;
        //draw whites
        ctx.fillStyle = "white";
        ctx.beginPath();
        // ctx.arc(this._x + eyeball_size, this._y + eyeball_size, 
        //     eyeball_size, 0, Math.PI*2);
        ctx.arc(this._x + adamWidth - eyeball_size, this._y + eyeball_size, 
            eyeball_size, 0, Math.PI*2);
        ctx.fill();
        //draw irises
        ctx.fillStyle = "black";
        ctx.beginPath();
        // ctx.arc(this._x + pupil_size, this._y + pupil_size, 
        //     pupil_size, 0, Math.PI*2);
        ctx.arc(this._x + adamWidth - pupil_size, this._y + pupil_size, 
            pupil_size, 0, Math.PI*2);
        ctx.fill();
    }
}

function drawGoal(){
    //draw building
    ctx.fillStyle = "#954535";
    ctx.fillRect(maxWidth*0.65, maxHeight*0.5, maxWidth*0.35, maxHeight*0.3)
    //draw door
    ctx.fillStyle = "#87CEEB"
    ctx.fillRect(maxWidth*0.7, maxHeight*0.65, maxWidth*0.1, maxHeight*0.15);
    ctx.font = "bold 0.95em verdana, sans-serif";
    ctx.fillText("THERAPY", maxWidth*0.75, maxHeight*0.55 );
}

function gameInit(){
    //draw sky
    drawSky();
    //draw clouds
    cloudLoop();
    //draw ground
    ctx.fillStyle = "#00A36C";
    ctx.fillRect(0, maxHeight*0.8, maxWidth, maxHeight*0.2);
    //draw adam at inital coords
    adamHeight = maxHeight * 0.1;
    adamWidth = maxHeight * 0.1;
    Adam.x = maxWidth*0.1;
    Adam.y = (maxWidth*0.8) - adamHeight;
    Adam.drawAdam();
    //draw goal building
    drawGoal();
    //call game loop which loops recursively
    gameLoop();
}

function gameLoop(){
    //draw sky
    drawSky();
    //draw clouds
    cloudLoop();
    //draw ground
    ctx.fillStyle = "#00A36C";
    ctx.fillRect(0, maxHeight*0.8, maxWidth, maxHeight*0.2);
    //draw adam
    Adam.drawAdam();
    //draw goal building
    drawGoal();
    //call user movements based on cached input keys
    moveAdam();
    //call loop again around 30fps
    setTimeout(gameLoop, 30);
}

let monologueIt = 0;
let quiz = false;
function cutSceneLoop(){
    if(cutScene){
        //fill background
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, maxWidth, maxHeight)
        ctx.fillStyle = "white";
        ctx.font = "bold 0.95em verdana, sans-serif";
        //fill monologue text in a typing fashion
        printText();
        console.log("done");
    }else if(quiz){
        quizLoop();
    }  
}

let text = "";
let letter = 0;
let typing = true;
let typingSpeed = 500;
function printText(){
    if(cutScene){
        typing = true;
        //draw background
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, maxWidth, maxHeight)
        ctx.fillStyle = "white";
        //add current letter to monologue
        text += monologue[monologueIt].charAt(letter);
        //print each letter of the monologue if cutscene still active
        ctx.fillText(text, maxWidth/2, maxWidth*0.25);
        ctx.fillStyle = "rgba(256,256,256,0.5)";
        
        if( letter <= monologue[monologueIt].length){
            ctx.fillText("Click to Speed Up", maxWidth/2, maxHeight*0.75)
            letter += 1;

            setTimeout(printText, typingSpeed + Math.random()*(5) - 1); 
        }else{ //print continue prompt after finished typing
            ctx.fillStyle = "rgba(256,256,256,0.5)";
            ctx.fillText("Click to Continue", maxWidth/2, maxHeight*0.75)
            text = "";
            letter = 0;
            typing = false;
        }
    }
            
}

function cloudLoop(){
    //define random spawn values for clouds
    let xCoord = maxWidth * -0.4;
    let yCoord = Math.floor(Math.random()*maxHeight);
    let cloudSpawnRate = 2;
    let randomChance = Math.ceil(Math.random()*100);
    //spawn a new cloud based on random chance every loop
    if( randomChance <= cloudSpawnRate){
        //define semi-random dimensions for cloud
        const firstX = Math.random()*maxWidth*0.1;
        const secondY = yCoord - maxHeight * 0.05;
        const firstRadius = (maxHeight*0.1)*(Math.random()*(1.5-0.5) + 0.5);
        const secondRadius = (maxHeight*0.1)*(Math.random()*(2-0.5) + 0.5);
        const secondArc = (firstX + firstRadius + secondRadius);
        //push new cloud to array as object
        clouds.push( 
            Cloud = {
                x: xCoord, 
                y: yCoord, 
                line1: function() {return this.x + firstX},
                line2: function() {return this.y - maxHeight * 0.05}, 
                arc1: firstRadius, 
                arc2: secondRadius,
                arcX: function() {return this.line1() + this.arc1 + this.arc2}, 
                setX: function(x) {this.x = x}, 
                getX: function() {return this.x},  
                iterX: function() {this.x = this.x + 2}
            }
        );
    }
    //draw each cloud in the array, and iterate it's x-value
    clouds.forEach(cloud => {
        drawCloud(cloud.x, cloud.y, cloud.line1(), cloud.line2(), 
            cloud.arc1, cloud.arc2, cloud.arcX());
        cloud.iterX();
        //if cloud is offscreen, delete it
        if(cloud.x > maxWidth){
            cloud = [];
        }
    });
} 

function drawCloud(x, y, firstX, secondY, firstRadius, secondRadius, secondArc){
    //draw cloud
    ctx.beginPath();
    ctx.fillStyle = "rgba(256,256,256,0.5)";
    ctx.moveTo(x, y);
    ctx.lineTo(firstX, y);
    ctx.moveTo(x, y);
    ctx.lineTo(firstX+20, secondY);
    ctx.lineTo(firstX, y);
    ctx.fill();
    ctx.arc(firstX + firstRadius, y, firstRadius, 0, Math.PI, true);
    ctx.arc(secondArc, y, secondRadius, 0, Math.PI, true);
    ctx.closePath();
    ctx.fill('nonzero');
    //ctx.stroke();
    
}

function drawTitle(){
//draw title text
    ctx.fillStyle = "white";
    ctx.shadowOffsetX = maxWidth*0.01;
    ctx.shadowOffsetY = maxWidth*0.01;
    ctx.shadowBlur = 0.25;
    ctx.shadowColor = 'rgba(0, 0, 255, 0.5)';
    ctx.font = "bold 3em verdana, sans-serif";
    ctx.fillText("ANGRY ADAM:", maxWidth/2, maxWidth*0.25);
    ctx.font = "bold 2.75em verdana, sans-serif";
    ctx.fillText("RETURN 2 PAIN", maxWidth/2, maxWidth*0.375);
    ctx.shadowColor = "rgba(0,0,0,0)";
}

function drawStart(){
    //draw start button
    ctx.fillStyle = "#00A36C";
    ctx.shadowOffsetX = maxWidth*0.01;
    ctx.shadowOffsetY = maxWidth*0.01;
    ctx.shadowBlur = 0.25;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect((maxWidth/2) - ((maxWidth/6)), maxHeight*0.7, maxWidth/3, maxHeight/10);
    //draw start text
    ctx.shadowColor = 'rgba(0,0,0,0)';
    ctx.fillStyle = "white";
    ctx.font = "2em verdana, sans-serif";
    ctx.textAlign = "center"
    ctx.textBaseline = "hanging";
    ctx.fillText("START", maxWidth/2, maxHeight*0.72);
    
}

function drawRealStart(realX, realY){
    
    //draw start button
    ctx.fillStyle = "#00A36C";
    ctx.shadowOffsetX = maxWidth*0.01;
    ctx.shadowOffsetY = maxWidth*0.01;
    ctx.shadowBlur = 0.25;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(realX, realY, maxWidth/3, maxHeight/10);
    //draw start text
    ctx.shadowColor = 'rgba(0,0,0,0)';
    ctx.fillStyle = "white";
    ctx.font = "1.5em verdana, sans-serif";
    ctx.textAlign = "center"
    ctx.textBaseline = "hanging";
    ctx.fillText("REAL START", realX + maxWidth/6, realY + maxHeight/40);
    
}

let clickCounter = 0;
//click handler
function clickHandler(x, y){
    let buttonTopX = (maxWidth/2) - ((maxWidth/6));
    let buttonTopY = maxHeight*0.7;
    let buttonBottomX = buttonTopX + maxWidth/3;
    let buttonBottomY = buttonTopY + maxHeight/10;
    console.log(x, y, buttonTopX, buttonTopY, buttonBottomX, buttonBottomY);
    //handles clicks for start screen
    if(startScreen){
        //if fake start is clicked
        if(x > buttonTopX && y > buttonTopY 
            && x < buttonBottomX && y < buttonBottomY){
                alert("Start Closing The Window?");
                window.close();
        }
        //if real start is clicked
        if(x > realX && y > realY 
            && x < realX + maxWidth/3 && y < realY + maxHeight/10){
                startScreen = false;
                cutScene = true;
            }
    }
    //handles clicks for cutscene
    else if(cutScene){
        if(!typing){ //click to continue after typing is done
            monologueIt += 1;
            cutSceneLoop();
        }else{ //if click during typing, speed up typing
            clickCounter += 1;
            typingSpeed /= 2;
        }
        if(clickCounter == 3){ //if speed increased too much, skip cutscene
            cutScene = false;
            quiz = true;
            alert("You must be in a hurry! Skip cut scene?");
            quizLoop();
        }
    }
    //handles clicks for quiz
    else if(quiz){
        if(y > answerY[0] && y < answerY[0] + maxHeight/10){
                chosenAnswer = 0;
            }
        else if(y > answerY[1] && y < answerY[1] + maxHeight/10){
            chosenAnswer = 1;
        }
        else if(y > answerY[2] && y < answerY[2] + maxHeight/10){
            chosenAnswer = 2;
        }
        else if(y > answerY[3] && y < answerY[3] + maxHeight/10){
            chosenAnswer = 3;
        }

        if(chosenAnswer == quizNumbers[quizIt]){
            rightAnswer();
        }
        else{
            wrongAnswer();
        }
        
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//moves adam in a given direction, with acceleration and deceleration 
let maxSpeed = 10;
let inertia = 0.5;
let moveSpeed = 30 //ms
let keyCache = {
    right : false,
    left: false,
    up: false
};
async function moveRight(momentum){
//if keydown, accelerate right
    if(momentum == "acc"){
        if( Adam.acceleration < maxSpeed ){
            Adam.acceleration += inertia;
        }
        Adam.x += Adam.acceleration;
        await sleep(moveSpeed);
     }else{ //if keyup, decelerate right unless right key is pressed
        if( Adam.acceleration > 0 && !keyCache.left){
            Adam.x += Adam.acceleration;
            Adam.acceleration -= inertia;
            await sleep(moveSpeed);
            await moveRight("dec");
        }
    }
}
async function moveLeft(momentum){
    //if keydown, accelerate left
    if(momentum == "acc"){
        if( Adam.acceleration < maxSpeed ){
            Adam.acceleration += inertia;
        }
        Adam.x -= Adam.acceleration;
        await sleep(moveSpeed);
    }else{ //if keyup, decelerate left unless right key is pressed
        if( Adam.acceleration > 0 && !keyCache.right){
            Adam.x -= Adam.acceleration;
            Adam.acceleration -= inertia;
            await sleep(moveSpeed);
            await moveLeft("dec");
        }
    }
}
let gravity_acceleration = 1;
async function moveDown(){
    //make Adam fall back to the ground
    if(Adam.y < maxHeight * 0.7){
        Adam.y += Adam.power + gravity_acceleration;
        gravity_acceleration *= 1.5;
        await sleep(moveSpeed)
        await moveDown();
    }
    //lock adam to the ground once he hits it and replenish juice
    if (Adam.y >= maxHeight * 0.7){
        Adam.y = maxHeight * 0.7;
        Adam.juice = 10;
        Adam.jumping = false;
        gravity_acceleration = 1;
    }
}
async function moveUp(){
    //if jump juice is full, move up
    if( Adam.juice > 0 ){
        Adam.y -= Adam.power + (Adam.juice*2);
        Adam.juice -= 1;
        await sleep(moveSpeed);
        await moveUp();
    } //if jump juice runs out, fall back down
    if(Adam.juice <= 0){
        await moveDown();
    }
    
}

async function moveAdam(){
    //if right keypress held
    if(keyCache.right){
        await moveRight("acc");
    }
    //if left keypress held
    if(keyCache.left){
        await moveLeft("acc");
    }
    //if up keypress held    
    if(keyCache.up){
        //adam can only jump if on the ground 
        if( !Adam.jumping ){
            Adam.jumping = true;
            await moveUp();
        }
    }
    
}

async function keyDownHandler(event){
    if(game){
        if( event.code == "ArrowRight" ){
            //cancel left motion if right is pressed before left is released
            if(keyCache.left = true){
                keyCache.left = false;
            }
            keyCache.right = true;
        }else if( event.code == "ArrowLeft" ){
            //cancel right motion if left is pressed before right is released
            if(keyCache.right = true){
                keyCache.right = false;
            }
            keyCache.left = true;
        }else if( event.code == "ArrowUp" ){
            keyCache.up = true;
        }
    }
}

async function keyUpHandler(event){
    if(game){
        if( event.code == "ArrowRight" ){
            keyCache.right = false;
            await moveRight("dec");
        }else if( event.code == "ArrowLeft" ){
            keyCache.left = false;
            await moveLeft("dec");
        }else if( event.code == "ArrowUp"){
            keyCache.up = false;
        }
    }
}