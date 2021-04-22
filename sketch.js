var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

var cycleBellSound,cycleBell;

var pinkCG,pinkCyclists;
var oppPink1Img,oppPink2Img;

var yellowCG,yellowCyclists;
var oppYellow1Img,oppYellow2Img;

var redCG,redCyclists;
var oppRed1Img,oppRed2Img;

var  obstaclesGroup, obstacle1, obstacle2, obstacle3;

var gameOver1Img,gameOver;

function preload(){
  pathImg = loadImage("images/Road.png");
  
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  cycleBell=loadSound("sound/bell.mp3");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img= loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img= loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img= loadAnimation("images/opponent9.png");
  
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  
  gameOver1Img = loadImage("images/gameOver1.png");
}

function setup(){
  
  createCanvas(700,250);
  
  // Moving background
  path=createSprite(150,120);
  path.addImage(pathImg);
  path.velocityX = -5;

 mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.05;
  
//set collider for mainCyclist
mainCyclist.setCollider("rectangle",0,0,40,40);
  
gameOver=createSprite(500,100);
gameOver.addImage(gameOver1Img);
 gameOver.scale = 0.8;
  gameOver.visible = false;
  
  pinkCG = new Group();
  yellowCG= new Group();
  redCG= new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,550,30);

  
  if(gameState===PLAY){
    
     distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
    
   mainCyclist.y = World.mouseY;
    
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
    
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    
     //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
    
    var select_oppPlayer =Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
    
  if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
     if(yellowCG.isTouching(mainCyclist)){
     gameState = END;
     player2.velocityY = 0;
     player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
     if(redCG.isTouching(mainCyclist)){
     gameState = END;
     player3.velocityY = 0;
     player3.addAnimation("opponentPlayer3",oppRed2Img);
    } 
  }
   else if(gameState===END){
     gameOver.visible = true;
     
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 300,200);


  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
  }
}
     
function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function reset(){
  gameState=PLAY;
  gameOver.visible = false;
  
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);

  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
}