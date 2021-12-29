const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world,ground;

var backgroundImg;
var ground; 
var tower,towerImg;
var cannon, cannonBall; 
var balls = [];
var boats = []; 
var boat;

function preload() {
//Precargar imagen para fondo en una variable 
backgroundImg = loadImage("assets/background.gif");

//Precargar imagen de la torre 
towerImg = loadImage("assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200, 600);
  //Motor físico 
  engine = Engine.create();
  //Se crea el nuevo mundo 
  world = engine.world;
  //En el set up
  //Unidad de medida para ángulo 
  angleMode(DEGREES);//Degrees-grados
  angle = 15;
  //Agregar opciones del motor físico Matter para el cuerpo 
  var ground_options = {
    isStatic: true
  }
  
  //Crear un objeto en este muendo usando BODIES 
  ground = Bodies.rectangle(0,height-1,width*2,1,ground_options);
   //Agregar cuerpo al mundo 
  World.add(world,ground);
 
  //Crear un objeto en este muendo usando BODIES 
  tower = Bodies.rectangle(160,350,160,310,ground_options);
  World.add(world,tower);
  
  //Guardar clase Cannon en una variable
  angle = 20;
  cannon = new Cannon(180,110,130,100,angle);
  //Guardar clase CannonBall en una variable
  cannonBall = new CannonBall(cannon.x, cannon.y);
  //Guardar clase Boat en una variable
  boat = new Boat(width-79,height-60, 170,170,-80);
}

function draw() {
  image(backgroundImg,0,0,1200,600);
  //Se actualiza motor físico
  Engine.update(engine);
  
  //Asignar figura al cuerpo creado
  rect(ground.position.x, ground.position.y, width*2,1);
  
  //Asignar figura al cuerpo creado
  push();//Push captura la nueva posición 
    imageMode(CENTER);
    image(towerImg,tower.position.x, tower.position.y, 160,310);
  pop(); //Vuelve a la posición anterior 
  showBoats();
  //Bucle para sacar las balas d la matriz y colocarlas en el cañon 
  for(var i = 0; i < balls.length; i ++){
    showCannonBalls(balls[i]);
  }
  
  //Mostrar cañon
  cannon.display();
  
}

//Al presionar la tecla 
function keyPressed(){
  if(keyCode === DOWN_ARROW){
    //Crear una nueva bala con la clase 
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    //Guardar la nueva bala en la matriz 
    balls.push(cannonBall);
  }
}

//Mostrar balas 
function showCannonBalls(ball){
  //Si se crea una pelota hay que mostrarla 
  if(ball){
    ball.display();
  }
}

//Al soltar la tecla 
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    //Dispara las balas de la matriz 
    balls[balls.length-1].shoot();
  }
}
function showBoats(){
  if (boats.length > 0){ 
    //Condición-comprueba si el último elemento de la matriz es un cuerpo
    if(boats[boats.length - 1] === undefined ||
      boats[boats.length -1].body.position.x < width -300){
        //Posiciones para el nuevo barco
        var positions = [-40,-60,-70,-20];
        //Obtiene posición aleatoria de la matriz positions 
        var position = random(positions);
        //Asignar esta nueva posición al molde que se creara 
        var boat = new Boat(width,height-100,170,170,position);
        //Introducir barco en la matriz boats 
        boats.push(boat);
    }
    //Bucle para sacar barcos de la matriz 
    for ( var i = 0; i < boats.length; i = i+1){
      //Comprueba si hay un barco y le asigna velociodad 
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{
          x:-0.9,
          y: 0
        } )
        //Muestra el barco 
        boats[i].display();
      }
    }
  }
  else {
    var boat = new Boat(width,height-60,170,170,-60);
    boats.push(boat);
  }
}


