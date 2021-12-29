class CannonBall {
    constructor(x,y){
        //Opciones del motor físico
        var options = {
            isStatic: true
        }
        //Radio para la bala
        this.r = 30;
        //Asignación de cuerpo circular
        this.body = Bodies.circle(x,y,this.r, options);
        //Cargar imagen de la bala 
        this.image = loadImage("assets/cannonball.png");
        //Agregar cuerpo de la bala al mundo
        World.add(world,this.body);
    }
    //Función para disparar la bala  
    shoot(){
        var newAngle = cannon.angle - 28;//Guardamos el angulo del cañon
        //Covertimos de radianes a grados
        newAngle = newAngle *(3.14/180)
        //Almacenamos angulo del cañon en un vector (matriz)
        var velocity = p5.Vector.fromAngle(newAngle);
        //Multiplicamos el valor por 0.5 para aumentar velocidad
        velocity.mult(0.5);
        //Cambiamos la condición isSattic a false
        Matter.Body.setStatic(this.body, false);
        //Establecemos velocidad 
        Matter.Body.setVelocity(this.body,
             { x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});
    }
    display(){
        //Almacena la posición X y Y de la bala
        var pos = this.body.position;
        push();//Push captura la nueva posición 
            imageMode(CENTER); //Centra de la imagen
            image(this.image, pos.x, pos.y, this.r,this.r); //Carga imagen con posición y dimensiones asignadas
        pop();//Vuelve a la posición anterior 
    }

}