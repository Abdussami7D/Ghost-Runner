var tower,towerImage
var ghost,ghostStanding,ghostJumping
var door,doorImage,climber,climberImage,invisibleClimber
var gameState = "PLAY"
var climberGroup,invisibleGroup
var spookySound

function preload(){
  
 towerImage = loadImage("tower.png");
 ghostStanding=loadImage("ghost-standing.png");
 ghostJumping = loadImage("ghost-jumping.png");
 doorImage = loadImage("door.png");
 climberImage = loadImage("climber.png");
 spookySound = loadSound("spooky.wav");
  
  
  
  
  
}

function setup(){
  
  createCanvas(400,400)
  tower = createSprite(200,200);
  tower.addImage("tower",towerImage)
  tower.scale = 0.8;
  tower.velocityY =4;
  tower.y = 200
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostJumping);
  ghost.scale=0.3;
  
  climberGroup = createGroup();
  invisibleGroup = createGroup();
  
}
function draw(){
  background(0)
  
  if(gameState === "PLAY"){
  
  if(tower.y>=300){
     tower.y = 200
   }
  
  if(keyDown("space")){
    ghost.velocityY = -3;
    ghost.addImage(ghostJumping);
  }
  
   if(keyDown("right")){
    ghost.x = ghost.x + 2;
  }
  
  if(keyDown("left")){
    ghost.x = ghost.x - 2;
  }
  
   
    if(climberGroup.isTouching(ghost)){
      
      ghost.velocityY = 0
      ghost.addImage(ghostStanding)
      
      
    }
    
   //spookySound.loop(); 
  
    
  
  ghost.velocityY = ghost.velocityY + 0.8;
    
spawnDoor();

   
  if(invisibleGroup.isTouching(ghost) || ghost.y>400){
    
    gameState = "END";
  }
  
  
  
  
  
  drawSprites();
  }
  if(gameState === "END"){
    
    textSize(30)
    text("GAME OVER",140,200)
    
    
  }
  
}

function spawnDoor(){
  
  if(frameCount%200===0){
  
  door = createSprite(200,-20)
  door.velocityY = 2;
  door.addImage("window",doorImage);
  door.x = Math.round(random(120,350))
  door.depth = ghost.depth
  ghost.depth = ghost.depth + 1;
 
  climber = createSprite(200,40)
  climber.x = door.x;
  climber.addImage("reeling",climberImage)
  climber.velocityY = 2;
  climberGroup.add(climber);
  
  invisibleClimber = createSprite(200,50,80,10);
  invisibleClimber.x = door.x;
  invisibleClimber.velocityY = 2;
  invisibleClimber.visible = false
  invisibleGroup.add(invisibleClimber);
  
  
  }
  
  
  
}

