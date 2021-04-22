var tower, towerImage;
var door, doorImage, doorsGroup;
var spike, spikeImage,spikesGroup;
var ghost,ghostImage;
var invisible_block,invGroup;
var Gamestate = "PLAY";
var Deathsound;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  spikeImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  Deathsound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600)
  tower = createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  
  spikesGroup = new Group();
  
  invGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost standing",ghostImage);
  ghost.scale = 0.4;
  
  Deathsound.loop();
  
  
}

function draw(){
  background("black");
  
  if(Gamestate === "PLAY"){
    
  
  //vertically scrolling tower
  if(tower.y>400){
    tower.y=300; 
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
   //applying gravity
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(keyDown("left_arrow")){
   ghost.x = ghost.x -3; 
  }
  
  if(keyDown("right_arrow")){
   ghost.x = ghost.x+3; 
  }
  
  if(spikesGroup.isTouching(ghost)){
    ghost.velocityY = 0;
     
    
  }
    if(invGroup.isTouching(ghost)|| ghost.y>600){
      ghost.destroy();
      Gamestate = "END";
      
      
    }
  spawnDoor();
  
  drawSprites();
}//closing of play gamestate
  
if(Gamestate === "END"){
  strokeWeight(3);
  stroke("red");
  fill("yellow");
  textSize(25);
  text("Game Over",230,250);
 // Deathsound.play();
  
}
}//closing of function draw




function spawnDoor(){
  if(frameCount%250===0){
    door= createSprite(200,-50);
    door.addImage("door",doorImage);
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    door.lifetime = 800;
    doorsGroup.add(door);
    
    ghost.depth = door.depth;
    ghost.depth+=1;
    
    
    
    spike= createSprite(200,10);
    spike.addImage("climber",spikeImage);
    spike.velocityY = 1;
    spike.x = door.x;
    spike.lifetime = 800;
    spikesGroup.add(spike);
    
    invisible_block = createSprite(200,15);
    invisible_block.velocityY = 1;
    invisible_block.x = door.x;
    invisible_block.width = spike.width;
    invisible_block.height = 2;
    invisible_block.lifetime = 800;
    invisible_block.debug=true;
    invGroup.add(invisible_block);
    
  }
}

