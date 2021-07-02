var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feedTheDog;
var foodObj;
var timeofday;

//create feed and lastFed variable here
var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}
function updateLastFed() {

  lastFed = hour();

  database.ref('/').update({

    FeedTime:lastFed

  });


}

function updateTime() {

  if (lastFed >= 12) {

    lastFed = lastFed - 12;

    timeofday = "PM";

  }

  else{

    timeofday = "AM";

  }

}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedTheDog=createButton("Feed");
  feedTheDog.position(700,95);
  feedTheDog.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  updateLastFed();
  updateTime();
 
  //write code to display text lastFed time here
  fill("white");
  text("Last feed : " + lastFed + " " + timeofday, 350, 30);
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  

  //write code here to update food stock and last fed time
  foodS = foodObj.getFoodStock();
  if(foodS<=0){
    foodObj.updateFoodStock(foodS *0);

  }else{
    foodObj.updateFoodStock(foodS -1);
  }
  database.ref('/').update({

    Food:foodS

  });

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
