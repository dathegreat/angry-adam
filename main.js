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
}

let realStart = false;
let realX = 0;
let realY = 0;
let realCounter = 0;
let realInterval = -1;
let startScreen = true;
let cutScene = false;

function initLoop(){
    //load initial start screen
    if( startScreen ){
        //draw background
        ctx.fillStyle = "#89CFF0";
        ctx.fillRect(0,0, maxWidth, maxHeight)
        //draw floating clouds
        cloudLoop();
        //draw false start button
        if(!realStart){
            drawStart();
        }else{
            //draw real start button randomly
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
        
        let chance = Math.random()*100;
        if(chance <= 1){
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

let quizAnswers = [
    ["1892", "1998", "2022", "3069"],
    ["Plagued with mice", "Not Alive", "Three-Dimensional", "Two-Dimensional"],
    ["God", "The April Fools Gods", "Himself", "You"],
    ["Snuggly Blankets", "Puppies", "Whole Wheat", "None of these"],
    ["ANGER", "HANDSOMENESS", "PICKLES", "ALMOST PERFECT BALANCE"]
]
let quizQuestions = [
    "What year was Adam born?",
    "Describe Adam's living situation",
    "Who cursed Adam?",
    "Adam's indomitable rage could only be cured by:",
    "What was Adam cursed with?"
]
let quizIt = 0;
let answerY = [];
let chosenAnswer;

function quizLoop(){
    
    ctx.fillStyle = "#89CFF0";
    ctx.fillRect(0,0, maxWidth, maxHeight)
    ctx.fillStyle = "white";
    ctx.shadowOffsetX = maxWidth*0.01;
    ctx.shadowOffsetY = maxWidth*0.01;
    ctx.shadowBlur = 0.25;
    ctx.shadowColor = 'rgba(0, 0, 255, 0.5)';
    ctx.font = "bold 3em verdana, sans-serif";
    ctx.fillText("QUIZ TIME!", maxWidth/2, maxWidth*0.1);
    
    ctx.font = "bold 1.5em verdana, sans-serif";
    ctx.shadowOffsetX = maxWidth*0.005;
    ctx.shadowOffsetY = maxWidth*0.005;
    let question = quizQuestions[quizIt];
    
    ctx.fillText(question, maxWidth/2, maxWidth*0.25);
    answerY = [];
    answerY.push(maxHeight*0.35);
    for(var answer = 0; answer < quizAnswers[quizIt].length; answer++){
        ctx.fillStyle = "#00A36C";
        ctx.shadowOffsetX = maxWidth*0.01;
        ctx.shadowOffsetY = maxWidth*0.01;
        ctx.shadowBlur = 0.25;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect((maxWidth/2) - ((maxWidth/6)), answerY[answer], maxWidth/3, maxHeight/10);
        //draw start text
        ctx.shadowColor = 'rgba(0,0,0,0)';
        ctx.fillStyle = "white";
        ctx.font = "bold 1em verdana, sans-serif";
        ctx.textAlign = "center"
        ctx.textBaseline = "hanging";
        ctx.fillText(quizAnswers[quizIt][answer], maxWidth/2, answerY[answer] + maxHeight/25);
        answerY.push(answerY[answer] + maxHeight*0.15);
    }


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
        console.log(chosenAnswer);
    }
}