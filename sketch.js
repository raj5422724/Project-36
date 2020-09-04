var dog,dogImg;
var happyDog,happyDogImg;
var db;
var foodS;
var foodStock;
var fedTime;
var lastFed;
var foodObj;
var gameState,readState;

function preload()
{
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/Happy.png");
  garden=loadImage("images/Garden.png");
  washroom=loadImage("images/WashRoom.png");
  bedroom=loadImage("images/BedRoom.png");
}

function setup() {
	createCanvas(1000, 500);
  db = firebase.database();

  dog = createSprite(550,250);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodObj = new Food();

  foodStock = db.ref('Food');
  foodStock.on("value",readStock);
  feed = createButton("FEED DRAGO");
  feed.position(500,15);
  feed.mousePressed(FeedDog);
  add = createButton("ADD FOOD");
  add.position(400,15);
  add.mousePressed(AddFood);
}

function draw() {  
  background(46, 139, 87);

  fedTime = db.ref("FeedTime");
  fedTime.on("value",function(data) {
    lastFed = data.val();
  });

  currentTime=hour();
  if(currentTime === (lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime === (lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime > (lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodObj.display();
   }

  if(gameState != "Hungry"){
    feed.hide();
    add.hide();
    dog.remove();
  }else{
   feed.show();
   add.show();
  }

  foodObj.display(); 
  drawSprites();

  fill(255);
  textSize(22);
  if(lastFed > 12) {
    text("Last Feed: " + lastFed%12 + "PM",200,30);
  }else if(lastFed === 0) {
    text("Last Feed: 12 AM",200,30);
  }else {
    text("Last Feed: " + lastFed + "AM",200,30);
  }
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x) {
  if(x<=0) {
    x = 0;
  }else {
    x = x-1;
  }
  db.ref('/').update({
    Food: x
  })
}

function AddFood() {
  foodS++;
  db.ref('/').update({
    Food:foodS
  })
}

function FeedDog(){
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  db.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime: hour()
  })
}

function update(state){
  db.ref('/').update({
    gameState:state
  })
}