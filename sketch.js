var balloon , balloonAnimation
var bImage 
var database
var position


function preload(){
   bImage = loadImage("Hot Air Ballon-01.png")
  balloonAnimation = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
  
}

function setup() {
  database= firebase.database();
  createCanvas(500,500);
   balloon = createSprite(90, 325, 25, 25);
  balloon.addAnimation("moving",balloonAnimation);
  balloon.scale = 0.4

  var balloonPos = database.ref("balloon/position")
  balloonPos.on("value",readPosition,showError)
}


function draw() {
  background(bImage);  

  if(position!==undefined){

  if(keyDown(LEFT_ARROW)){
    changePosition(-10,0) 
  
  }
  
  else if(keyDown(RIGHT_ARROW)){
    changePosition(10,0) 
  }
  
  else if(keyDown(UP_ARROW)){
    changePosition(0,-10) 
    balloon.scale = balloon.scale-0.01
  }
  
  else if(keyDown(DOWN_ARROW)){
    changePosition(0,10) 
    balloon.scale = balloon.scale+0.01
  }


  drawSprites();

  textSize(20)
  fill("red")
  text("**Use the Arorw Key to Move the Hot Air Balloon!",20,20)


}
}


function changePosition(x,y)
{
    database.ref('balloon/position').set({
        'x':position.x+x,
        'y': position.y+y
    })
   
}

function readPosition(data){
  position=data.val();
    balloon.x = position.x;
    balloon.y = position.y;

}

function showError(){
  console.log("error")
}

