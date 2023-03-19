let canvas=document.getElementById("can");

let ctx=canvas.getContext("2d");

// ctx.beginPath();

// ctx.strokeStyle="blue";
// ctx.lineWidth=4;
// ctx.fillStyle="red";


// ctx.moveTo(250,300);

// ctx.arc(200,300,50,0,2*Math.PI);
// ctx.moveTo(350,300);

// ctx.arc(300,300,50,0,2*Math.PI);
// ctx.moveTo(275,180);
// ctx.ellipse(250,180,25,100,0,0,2*Math.PI);
// //ctx.arc(250,250,50,0,Math.PI/2)

// ctx.fill();
// ctx.stroke();



// ctx.beginPath();

// ctx.moveTo(0,0);
// //ctx.strokeStyle="red";
// ctx.fillStyle="green";
// //ctx.lineWidth=3;

// ctx.rect(0,0,25,25);
// ctx.rect(25,0,25,25);

// ctx.fill();
//ctx.stroke();
console.log(127/25);
let snake=[
    {x:0,y:0},
    {x:25,y:0},
    {x:50,y:0},
    {x:75,y:0},
    {x:100,y:0}
]

let lastX=snake[snake.length-1].x;
let lastY=snake[snake.length-1].y;
let foodX,foodY;
let foodNotOnSnake=true;

const Hscore=document.getElementById("score");


let way="right";
let running=true;
let Score=0;
let eatenFood=false;

window.addEventListener("keydown",movement);

function movement(event){
    switch(event.key){
        case "ArrowUp":
        case "w":
            if(way!="down" && way!="up"){
                snake.shift();
                snake.push({x:lastX,y:lastY-25});
                lastX=snake[snake.length-1].x;
                lastY=snake[snake.length-1].y;
                way="up";
            }
            break;
        case "ArrowDown":
        case "s":
            if(way!="up" && way!="down"){
                snake.shift();
                snake.push({x:lastX,y:lastY+25});
                lastX=snake[snake.length-1].x;
                lastY=snake[snake.length-1].y;
                way="down";
            }
            break;
        case "ArrowLeft":
        case "a":
            if(way!="left" && way!="right"){
                snake.shift();
                snake.push({x:lastX-25,y:lastY});
                lastX=snake[snake.length-1].x;
                lastY=snake[snake.length-1].y;
                way="left";
            }
            break;
        case "ArrowRight":
        case "d":
            if(way!="left" && way!="right"){
                snake.shift();
                snake.push({x:lastX+25,y:lastY});
                lastX=snake[snake.length-1].x;
                lastY=snake[snake.length-1].y;
                way="right";
            }
            break;
        
        default:
            break;
    }
}

function drawSnake(){
    clearBoard();
    ctx.fillStyle="lightgreen";
    ctx.strokeStyle="black";
    ctx.lineWidth=1;
    snake.forEach((value)=>{
        
        ctx.fillRect(value.x,value.y,25,25);
        ctx.strokeRect(value.x,value.y,25,25);
    })

}
//setInterval(generateRect,1000);

function generateFood(){
    do{
        foodNotOnSnake=true;
        foodX=Math.floor((((Math.floor(Math.random()*1000))%476)/25))*25;
        foodY=Math.floor((((Math.floor(Math.random()*1000))%476)/25))*25;
        snake.forEach((value)=>{
            if(value.x==foodX && value.y==foodY){
                foodNotOnSnake=false;
            }
        })
    }
    while(foodNotOnSnake==false);
   
}

function drawFood(){
    ctx.fillStyle="red";
    ctx.fillRect(foodX,foodY,25,25);
}

function clearBoard(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drawFood();
}

function defSnakeMov(){
    snake.shift();
    switch(way){
        case "right":
            snake.push({x:lastX+25,y:lastY});
            break;
        case "left":
            snake.push({x:lastX-25,y:lastY});
            break;
        case "up":
            snake.push({x:lastX,y:lastY-25});
            break;
        case "down":
            snake.push({x:lastX,y:lastY+25});
            break;
    }
    lastX=snake[snake.length-1].x;
    lastY=snake[snake.length-1].y;

}

function growSnake(){
    let tailX,tailY;
    switch(way){
        case "right":
            tailX=snake[0].x-25;
            tailY=0;
            break;
        case "left":
            tailX=snake[0].x+25;
            tailY=0;
            break;
        case "up":
            tailX=0;
            tailY=snake[0].y+25;
            break;
        case "down":
            tailX=0;
            tailY=snake[0].y-25;
            break;
        default:
            break;
    }
    snake.unshift({tailX,tailY});
}

function checkEatenFood(){
    if(lastX==foodX && lastY==foodY){
        eatenFood=true;
    }
    if(eatenFood==true){
        growSnake();
        Score++;
        Hscore.innerHTML=`Score:${Score}`;
        generateFood();
        eatenFood=false;
    }

}

function gameOver(){
    
    if(lastX>=500 || lastX<0 || lastY>=500 || lastY<0){
        running=false;  
    }
    for(i=0;i<snake.length-2;i++){
        if(snake[i].x==lastX && snake[i].y==lastY){
            running=false;
        }
    }
    if(running==false){
        console.log(...snake);
        clearInterval(stopDraw);
        clearInterval(stopSnakeMov);
        clearInterval(stopGameOver);
        clearInterval(stopEatenFood);
        window.alert("Game over!");

    }
}

let stopDraw,stopSnakeMov,stopGameOver,stopEatenFood;

function gameRun(){
    console.log(...snake);
    generateFood();
    stopDraw=setInterval(drawSnake,1);
    stopSnakeMov=setInterval(defSnakeMov,100);
    stopGameOver=setInterval(gameOver,1);
    stopEatenFood= setInterval(checkEatenFood,10);
   

    
}

function resetGame(){
    snake=[
        {x:0,y:0},
        {x:25,y:0},
        {x:50,y:0},
        {x:75,y:0},
        {x:100,y:0}
    ]
    lastX=snake[snake.length-1].x;
    lastY=snake[snake.length-1].y;
     way="right";
    running=true;
    Score=0;
    eatenFood=false;
    Hscore.innerHTML="Score:0";
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);

}

document.getElementById("start").onclick=function(){
    gameRun();
}

document.getElementById("reset").onclick=function(){
    
    resetGame();
}

// console.log(navigator.cookieEnabled);
// document.cookie= "Highscore=alex; expires=Sun, 1 January 2030 12:00:00 UTC; path=/  ";
// document.cookie = "username=John Doe; expires=Thu, 18 Dec 2045 12:00:00 UTC";

// console.log(document.cookie);
// alert(document.cookie);

// let c=[1,2,3,4];
// c.shift();
// console.log(c[0]);