function init(canvasHeight, canvasWidth){
    //define canvas
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    //draw background
    ctx.fillStyle = "#89CFF0";
    ctx.fillRect(0,0,canvasWidth, canvasHeight)
    //draw button
    ctx.fillStyle = "#00A36C";
    ctx.fillRect((canvasWidth/2) - ((canvasWidth/6)), canvasHeight*0.7, canvasWidth/3, canvasHeight/10);
    
    
}