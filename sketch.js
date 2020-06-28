var trex, trex_run,trex_collided;
var ground, invisible_ground, ground_img;
var cloud_group, cloud_img,obstacles_group,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score= 0;
var gameOver ,gameOverIMG, restart, restartimg;
var PLAY=1;
var END=0;
var gameState=PLAY;
var jump,die,hundred;
function preload()
{
 trex_run= loadAnimation("trex1.png","trex3.png","trex4.png") ;
  ground_img= loadImage("ground2.png");
  trex_collided= loadAnimation("trex_collided.png");
  cloud_img= loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  gameOverIMG= loadImage("gameOver.png");
  restartimg= loadImage("restart.png");
  jump = loadSound("jump.mp3");
  die= loadSound("die.mp3");
  hundred= loadSound("checkPoint.mp3");
}




function setup() 
{
  createCanvas(800, 400);
  trex= createSprite(50,315,20,50);
  trex.addAnimation("run",trex_run);
  trex.scale= 0.5;
  ground= createSprite(200,330,400,3);
  ground.addImage( ground_img);
  ground.x= ground.width/2;
  invisible_ground= createSprite(200,340,400,3);
  invisible_ground.visible= false;
  cloud_group= new Group();
  obstacles_group= new Group();
  restart= createSprite(300,200);
  restart.addImage(restartimg);
  restart.scale=0.5;
  restart.visible= false;
  gameOver= createSprite(300,150);
  gameOver.addImage(gameOverIMG);
  gameOver.scale=0.5;
  gameOver.visible= false;
  
}

function draw() 
{ 
  background("white");
  fill(0);
  textSize(20);
  text("HI "+ score, 600,80);
  if(gameState===PLAY)
  {
    if((keyDown("space")|| keyDown(UP_ARROW)||mousePressedOver( trex) )&& trex.y>310)
     {
     trex.velocityY=-12;
       jump.play();
     }
  trex.velocityY= trex.velocityY+0.7;
 trex.collide(invisible_ground);
  if(ground.x<0)
  {
  ground.x= ground.width/2;
  }
  ground.velocityX=-4;
  spawnCloud();
  spawnObstacles();
  if(frameCount%3==0)
  {
    score++;
  }
    if(score%100==0&& score>0)
    {
      hundred.play();
    }
  if(obstacles_group.isTouching(trex))
  {
    die.play();
    gameState=END;
  }
  }
  else if(gameState===END )
  {
    
    trex.changeAnimation("collide",trex_collided);
    ground.velocityX=0;
    obstacles_group.setVelocityXEach(0);
    obstacles_group.setLifetimeEach(-2);
    cloud_group.setLifetimeEach(-2);
    cloud_group.setVelocityXEach(0);
    trex.velocityY=0;
    restart.visible= true;
    gameOver.visible= true;
  }
  if(mousePressedOver(restart))
  {
    gameState=PLAY;
    reset();
  }
  drawSprites();
}
function spawnCloud()
{
  if(frameCount% 120===0)
  {
     cloud= createSprite(800,240);
  cloud. addImage(cloud_img);
  cloud.velocityX= -2;
  cloud.scale= 0.75;
  cloud.y=Math.round(random(100, 190));
  //assign lifetime to the variable
    cloud.lifetime = 400;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud_group.add(cloud);
 }
}
function spawnObstacles()
{
  if(frameCount%60==0)
  {
     obstacle = createSprite(800, 315,10,40 );
   
    obstacle.scale=0.5;
    obstacle.velocityX= -(10+ score/100);
    var rand= Math.round(random(1,6));
     switch(rand)
     {
       case 1:obstacle.addImage(obstacle1);
       break;
       case 2:obstacle.addImage(obstacle2);
       break;
       case 3:obstacle.addImage(obstacle3);
       break; 
       case 4:obstacle.addImage(obstacle4);
       break;
       case 5:obstacle.addImage(obstacle5);
       break;
        default :obstacle.addImage(obstacle6);
       break;
     }
     obstacle.lifetime=400;
     obstacles_group.add(obstacle);
    
  }
}
function reset()
{
  
 gameState=PLAY;
 restart.visible= false;
 gameOver.visible= false;
 obstacles_group.destroyEach();
 cloud_group.destroyEach();
 trex.changeAnimation("run",trex_run);
 score=0;
}