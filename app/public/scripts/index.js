function normalize(v)
{
    var length = Math.sqrt(v.x * v.x + v.y * v.y);
    return {x: v.x / length, y: v.y / length};
}

var canvas, context,
    position = {x: 200, y: 200},
    target = {x: 400, y: 400},
    step = normalize({x: target.x - position.x, y: target.y - position.y});

var img = document.getElementById('heart-pic');    
function init()
{
   canvas = document.getElementById('myCanvas');
   if(canvas.getContext)
      context = canvas.getContext('2d');
   else return;

   setInterval(draw, 50 / 6);
}

function draw()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgb(150,29,28)";
    context.beginPath(); 
    context.arc(position.x, position.y, 100, 0, Math.PI * 2, true);    
    context.fill();
    img.style.visibility = "visible";

    context.closePath(); 

    position.x += step.x;
    position.y += step.y;
}
BASE = "http://localhost:3000"
document.addEventListener("click", (type)=> {
    if (type.target == 'f') {
        console.log("hello")
    }

});