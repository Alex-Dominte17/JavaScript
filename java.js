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



setInterval(generateRect,1000);

function generateRect(){
    let wid,hei;
    wid=(((Math.floor(Math.random()*1000))%476)/25)*25;
    hei=(((Math.floor(Math.random()*1000))%476)/25)*25;
    clearBoard();
    ctx.fillStyle="red";
    ctx.fillRect(wid,hei,25,25);

}

function clearBoard(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

let c=[1,2,3,4];
c.shift();
console.log(c[0]);