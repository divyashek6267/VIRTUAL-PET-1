var dog,dogImg, happyDog,database,foodS,foodStock;

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  

  dog = createSprite(400,350,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87); 

  
  


  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  
  if (keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }



  drawSprites();
  textSize(20)
  fill("white")
  stroke(10)
  /text("Food Remaining: "+foodS,320,70);
  text("Press The Up Arrow key To Feed The Dog",250,20);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

 if(x<=0){
    x=0;
  }else{
    x=x-1
  }

  database.ref("/").update({
    Food:x
  })
}