var playButtonImage,playButton;
var gameState = "start";
var snake,snakeRightImage,snakeLeftImage,snakeForwardImage,snakeBackwardImage,instructionsImage,instructions;
var food,foodGroup,gameOverImage,gameOver;
var wall1,wall2,wall3,wall4;
var score = 0;

function preload(){
playButtonImage = loadImage("play button.png");
snakeForwardImage = loadImage("snake forward.png");
snakeBackwardImage = loadImage("snake backward.png");
snakeRightImage = loadImage("snake right.png");
snakeLeftImage = loadImage("snake left.png");
instructionsImage = loadImage("instructions button.png");
gameOverImage = loadImage("game over.png");
}

function setup(){
  createCanvas(400,400);

  playButton = createSprite(200,200);
  playButton.addImage(playButtonImage);

  snake = createSprite(50,300);
  snake.addImage(snakeForwardImage);
  snake.scale = 0.3;

  instructions = createSprite(50,350);
  instructions.addImage(instructionsImage);
  instructions.scale = 0.5;

  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;

  foodGroup = createGroup();

  wall1 = createSprite(400,200,10,400);
  wall2 = createSprite(0,200,10,400);
  wall3 = createSprite(200,0,400,10);
  wall4 = createSprite(200,400,400,10);
}

function draw(){
 background("black");

  wall1.visible = false;
  wall2.visible = false;
  wall3.visible = false;
  wall4.visible = false;

if(gameState==="start"){
  playButton.visible = true;
  snake.visible = false;
  instructions.visible = true;
  snake.scale = 0.3;
  foodGroup.destroyEach();
  score = 0;

  snake.x = 50;
  snake.y = 300;

  snake.velocityX = 0;
  snake.velocityY = 0;

  gameOver.visible = false;

  fill("cyan");
  text("hold down the instructions button to see how to play",0,50);

  if(mousePressedOver(instructions)){
    playButton.visible = false;
    instructions.visible = false;

    text("move the snake with arrow keys and eat the red blocks and never touch the ",0,200);
    text("edges",0,220);
  }

  if(mousePressedOver(playButton)){
    gameState = "play";


  }}else if(gameState==="play"){
    snake.visible = true;
    playButton.visible = false;
    instructions.visible = false;
    gameOver.visible = false;

    fill("yellow");
    text("food eaten-"+score,100,50);

    if(keyDown("up")){
    snake.velocityY = -2;
    snake.addImage(snakeForwardImage);
    }

    if(keyDown("down")){
      snake.addImage(snakeBackwardImage);
      snake.velocityY = 2;
    }

    if(keyDown("left")){
      snake.velocityX = -2;
      snake.addImage(snakeLeftImage);
    }

    if(keyDown("right")){
      snake.velocityX = 2;
      snake.addImage(snakeRightImage);
    }

    spawnFood();


  }

snake.setCollider("rectangle",0,0,150,150);
snake.debug = false;

if(snake.isTouching(wall1)||snake.isTouching(wall2)||snake.isTouching(wall3)||snake.isTouching(wall4)){
  gameState = "end";
}

if(gameState==="end"){
gameOver.visible = true;
snake.visible = false;
reset();
foodGroup.destroyEach;
}

 drawSprites();
}

function spawnFood(){
  if(frameCount%150===0){
    food = createSprite(200,200,10,10);
    food.shapeColor = "red";

    food.x = Math.round(random(10,390));
    food.y = Math.round(random(10,390));

    foodGroup.add(food);
  }

  if(snake.isTouching(foodGroup)){
    foodGroup.destroyEach();
    snake.scale = snake.scale+0.100;
    score = score+1;
  }

}

function reset(){
  if(mousePressedOver(gameOver)){
    gameState = "start";
  }
}