var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {

	
    this.ClockOn = true;
    this.ClockPausedTime = 0;
    this.Light1 = true;
    this.Light2 = true;
    this.Light3 = true;
    this.Light4 = true;
    this.PlaneSpeed = 3;
    this.PropellerSpeed =1.0;
    this.DroneTexture = 1;


	CGFscene.prototype.init.call(this, application);

    this.enableTextures(true);

	this.initCameras();

	this.initLights();

    
    
 	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new MyQuad(this,-0.5,1.5,-0.5,1.5);
	this.floor = new MyQuad(this,0,10,0,12);
	this.prism = new MyPrism(this,8,20);
	this.cylinder = new MyCylinder(this,8,20);
	this.lamp = new myLamp(this,8,20);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS,-0.5,1.5,0,1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS,0,1,0,1);
	this.clock = new MyClock(this,12,1);
	this.drone = new MyDrone(this);
    this.box = new MyLoad(this);
    this.destiny = new MyLoadDestiny(this);
	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0.0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.materialFloor = new CGFappearance(this);
	this.materialFloor.setAmbient(0.3,0.2,0.1,0.5);
	this.materialFloor.setDiffuse(0.6,0.1,0.3,2);
	this.materialFloor.setSpecular(0.2,0.6,0.2,0.25);
	this.materialFloor.setShininess(50);

	this.materialWall = new CGFappearance(this);
	this.materialWall.setAmbient(0.3,0.3,0.3,1);
	this.materialWall.setDiffuse(0.6,0.6,0.6,0.25);
	this.materialWall.setSpecular(0.0,0.2,0.8,1);
	this.materialWall.setShininess(120);

	this.materialTampo = new CGFappearance(this);
	this.materialTampo.setAmbient(1.0,1.0,1.0,1.0);
	this.materialTampo.setDiffuse(0.52,0.37,0.26,2);
	this.materialTampo.setSpecular(0.1,0.1,0.1,0.05);
	this.materialTampo.setShininess(10);

	this.materialPerna = new CGFappearance(this);
	this.materialPerna.setAmbient(0.5,0.6,0.7,1);
	this.materialPerna.setDiffuse(0.45,0.45,0.45,1);
	this.materialPerna.setSpecular(1.0,1.0,1.0,1);
	this.materialPerna.setShininess(1000);
	
	this.tableAppearance = new CGFappearance(this);
	this.tableAppearance.loadTexture("resources/images/table.png");
	this.tableAppearance.setAmbient(.3,.3,.3,1);
	this.tableAppearance.setShininess(1);
	this.tableAppearance.setDiffuse(.8,.8,.8,0.8);
	this.tableAppearance.setSpecular(.1,.1,.1,0.9);


	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.loadTexture("resources/images/floor.png");
    this.floorAppearance.setShininess(1);
	this.floorAppearance.setDiffuse(1,1,1,1);
	this.floorAppearance.setSpecular(.1,.1,.1,1);
	this.floorAppearance.setAmbient(1,1,1,0.3);

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture("resources/images/window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
	this.windowAppearance.setShininess(1);
	this.windowAppearance.setDiffuse(1,1,1,1);
	this.windowAppearance.setSpecular(.1,.1,.1,1);

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.loadTexture("resources/images/slides.png");
	this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
	this.slidesAppearance.setShininess(1);
	this.slidesAppearance.setDiffuse(1,1,1,1);
	this.slidesAppearance.setSpecular(.1,.1,.1,1);

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture("resources/images/board.png");
	this.boardAppearance.setShininess(50);
	this.boardAppearance.setDiffuse(.6,.6,.6,1);
	this.boardAppearance.setSpecular(.4,.4,.4,1);

	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.loadTexture("resources/images/clock.png");

	this.secondsAppearance = new CGFappearance(this);
	this.secondsAppearance.setAmbient(0.3,0,0,1);
	this.secondsAppearance.setDiffuse(0.45,0,0,1);
	this.secondsAppearance.setSpecular(0.1,0,0,1);


	this.droneAppearance2 = new CGFappearance(this);
	this.droneAppearance2.loadTexture("resources/images/military.png");
	this.droneAppearance2.setSpecular(0,0,0,1);

	this.droneAppearance1 = new CGFappearance(this);
	this.droneAppearance1.loadTexture("resources/images/metal.png");
	this.droneAppearance1.setSpecular(0,0,0,1);

	this.droneAppearance12 = new CGFappearance(this);
	this.droneAppearance12.loadTexture("resources/images/metaltop.png");
	this.droneAppearance12.setSpecular(0,0,0,1);

	this.droneAppearance13 = new CGFappearance(this);
	this.droneAppearance13.loadTexture("resources/images/metalside.png");
	this.droneAppearance13.setSpecular(0,0,0,1);

	this.droneAppearance3 = new CGFappearance(this);
	this.droneAppearance3.loadTexture("resources/images/eye.png");
	this.droneAppearance3.setSpecular(0,0,0,1);

	this.droneAppearance32 = new CGFappearance(this);
	this.droneAppearance32.loadTexture("resources/images/eyetop.png");
	this.droneAppearance32.setSpecular(0,0,0,1);

	this.droneAppearance33 = new CGFappearance(this);
	this.droneAppearance33.loadTexture("resources/images/black.png");
	this.droneAppearance33.setSpecular(0,0,0,1);

	this.destinyAppearance = new CGFappearance(this);
	this.destinyAppearance.loadTexture("resources/images/helipad.png");
	this.destinyAppearance.setSpecular(0,0,0,1);

	this.redAppearance = new CGFappearance(this);
	this.redAppearance.setAmbient(0.3,0,0,1);
	this.redAppearance.setDiffuse(0.45,0,0,1);
	this.redAppearance.setSpecular(0.1,0,0,1);

	this.yellowAppearance = new CGFappearance(this);
	this.yellowAppearance.setAmbient(0.3,0.3,0,1);
	this.yellowAppearance.setDiffuse(0.45,0.45,0,1);
	this.yellowAppearance.setSpecular(0.1,0.1,0,1);

	this.greenAppearance = new CGFappearance(this);
	this.greenAppearance.setAmbient(0,0.3,0,1);
	this.greenAppearance.setDiffuse(0,0.45,0,1);
	this.greenAppearance.setSpecular(0,0.1,0,1);


    
    this.setUpdatePeriod(5);

    //Plane coords
    this.planeX = 7.5;
    this.planeY = 3.75;
    this.planeZ = 7.5;
    this.anguloY = Math.PI+0.3;
    this.anguloX=0;
	this.previousTime=-1;

	//KEY VARS
	this.wPressed=0;
	this.sPressed=0;
	this.aPressed=0;
	this.dPressed=0;
	this.iPressed=0;
	this.jPressed=0;
	this.pPressed=0;
	this.lPressed=0;

};

LightingScene.prototype.ToggleClock = function ()
{  
    if(this.ClockOn)
       this.ClockOn = false;
    else this.ClockOn = true;
};


LightingScene.prototype.update = function(currTime){

	if(this.ClockOn)
        this.clock.update(currTime-this.ClockPausedTime);
    else this.ClockPausedTime  += this.updatePeriod;
    this.updateLight();
	if(this.previousTime==-1){
		this.previousTime=currTime;
		return;
	}

    this.updateDronePos(currTime);
	this.drone.update(currTime);
	this.box.updateBox(currTime);

	this.previousTime=currTime;
}

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.0,0.0,0.0, 1.0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0,1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0,1.0,0,1.0);

	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0,1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0,1.0,1.0,1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1.0);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0,1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0,1.0,0,1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1.0);
	this.lights[3].enable();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		//this.materialFloor.apply();
		this.floorAppearance.apply();
		this.floor.display();
		this.materialDefault.apply();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.materialWall.apply();
		this.windowAppearance.apply();
		this.wall.display();
		this.materialDefault.apply();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialWall.apply();
		this.wall.display();
		this.materialDefault.apply();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 1.75, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 1.75, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.materialA.apply();
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.materialB.apply();
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();
	// Prism
	this.pushMatrix();
	   this.translate(13,0,13);
        this.scale(1,8,1);
        this.rotate(-Math.PI/2,1,0,0);
        this.prism.display();
	this.popMatrix();
	//Cylinder
	this.pushMatrix();
        this.translate(2,0,13);
        this.scale(1,8,1);
        this.rotate(-Math.PI/2,1,0,0);
        this.cylinder.display();
	this.popMatrix();
    //Lamp
	this.pushMatrix();
	    this.rotate(Math.PI/2,1,0,0);
        this.translate(7.5,7.5,-8);
        this.lamp.display();
	this.popMatrix();
	//Clock
	this.pushMatrix();
	    this.translate(7,7.1,0);
	    this.clock.display();

	this.popMatrix();
	//Drone
	this.pushMatrix();
	    this.translate(this.planeX,this.planeY,this.planeZ);
	    this.rotate(this.anguloY,0,1,0);
		this.rotate(this.anguloX,1,0,0);
		this.scale(0.6,0.6,0.6);
        this.drone.display();
    this.popMatrix();
    //Caixa
	this.pushMatrix();
	    this.translate(this.box.x,this.box.y,this.box.z);
        this.box.display();
    this.popMatrix();
    //Destino
	this.pushMatrix();
	    this.translate(this.destiny.x,this.destiny.y,this.destiny.z);
        this.destiny.display();
    this.popMatrix();

	// ---- END Primitive drawing section

};

LightingScene.prototype.updateLight = function(){
	if(this.Light1)
	   this.lights[0].enable();
	else this.lights[0].disable();

	if(this.Light2)
	   this.lights[1].enable();
	else this.lights[1].disable();

	if(this.Light3)
	   this.lights[2].enable();
	else this.lights[2].disable();

	if(this.Light4)
	   this.lights[3].enable();
	else this.lights[3].disable();
}

LightingScene.prototype.updateDronePos = function(currTime){
	if(this.wPressed == 1){
    	//mover para a frente
		this.planeZ += (currTime-this.previousTime)*Math.cos(this.anguloY)*this.PlaneSpeed /1000;
		this.planeX += (currTime-this.previousTime)*Math.sin(this.anguloY)*this.PlaneSpeed /1000;
		
		//animação de movimento
		if(this.anguloX<(Math.PI/8)){
			this.anguloX+=Math.PI/32*this.PlaneSpeed*(currTime-this.previousTime)/100;
		}
		if(this.anguloX>Math.PI/8){
			this.anguloX = Math.PI/8;
		}
		
		//helices
		if(this.aPressed == 1 || this.dPressed == 1 ){
			this.drone.h1speed=10; //traseira
			this.drone.h2speed=-10; //direita
			this.drone.h3speed=0.2; //frente
			this.drone.h4spped=-10; //esquerda
		}else{
			this.drone.h1speed=10;
			this.drone.h2speed=-1;
			this.drone.h3speed=0.2;
			this.drone.h4speed=-1;
		}
	} 

	if(this.sPressed == 1){
		this.planeZ -= (currTime-this.previousTime)*Math.cos(this.anguloY)*this.PlaneSpeed /1000;
		this.planeX -= (currTime-this.previousTime)*Math.sin(this.anguloY)*this.PlaneSpeed /1000;

		if(this.anguloX>-(Math.PI/8)){
			this.anguloX-=Math.PI/32*this.PlaneSpeed*(currTime-this.previousTime)/100;
		}
		if(this.anguloX<-Math.PI/8){
			this.anguloX = -Math.PI/8;
		}

		if(this.aPressed == 1 || this.dPressed == 1 ){
			this.drone.h1speed=0.2;
			this.drone.h2speed=-10;
			this.drone.h3speed=10;
			this.drone.h4speed=-10;
		}else{
			this.drone.h1speed=0.2;
			this.drone.h2speed=-1;
			this.drone.h3speed=10;
			this.drone.h4speed=-1;
		}
	}

	if(this.aPressed == 1){
		this.anguloY+= 0.075*this.PlaneSpeed/5*(currTime-this.previousTime)/1000*60;
		
		if(this.wPressed==1){
			this.drone.h1speed=10;
			this.drone.h2speed=-10;
			this.drone.h3speed=0.2;
			this.drone.h4speed=-10;
		}else if(this.sPressed==1){
			this.drone.h1speed=0.2;
			this.drone.h2speed=-10;
			this.drone.h3speed=10;
			this.drone.h4speed=-10;
		}else{
			this.drone.h1speed=0.2;
			this.drone.h2speed=-10;
			this.drone.h3speed=0.2;
			this.drone.h4speed=-10;

			if(this.anguloX>0 && this.wPressed == 0){
				this.anguloX-=Math.PI/32*this.PlaneSpeed*(currTime-this.previousTime)/100;
				if(this.anguloX<0)
				   this.anguloX = 0;

			}else if(this.anguloX<0 && this.sPressed == 0){
				this.anguloX+=Math.PI/32*this.PlaneSpeed*(currTime-this.previousTime)/100;
				if(this.anguloX>0)
				   this.anguloX = 0;
			}
		}
	}

	if(this.dPressed == 1){
		this.anguloY-= 0.075*this.PlaneSpeed/5*(currTime-this.previousTime)/1000*60;

		if(this.wPressed==1){
			this.drone.h1speed=10;
			this.drone.h2speed=-10;
			this.drone.h3speed=0.2;
			this.drone.h4speed=-10;
		}else if(this.sPressed==1){
			this.drone.h1speed=0.2;
			this.drone.h2speed=-10;
			this.drone.h3speed=10;
			this.drone.h4speed=-10;
		}else{
			this.drone.h1speed=0.2;
			this.drone.h2speed=-10;
			this.drone.h3speed=0.2;
			this.drone.h4speed=-10;

			if(this.anguloX>0&& this.wPressed == 0){
				this.anguloX-=Math.PI/32*this.PlaneSpeed*(currTime-this.previousTime)/100;
				if(this.anguloX<0)
				   this.anguloX = 0;

			}else if(this.anguloX<0&& this.sPressed == 0){
				this.anguloX+=Math.PI/32*this.PlaneSpeed*(currTime-this.previousTime)/100;
				if(this.anguloX>0)
				   this.anguloX = 0;
			}
		}
	}

	if(this.iPressed == 1){
		this.planeY+=0.1*this.PlaneSpeed*(currTime-this.previousTime)/100;
	
		this.drone.h1speed=10;
		this.drone.h2speed=-10;
		this.drone.h3speed=10;
		this.drone.h4speed=-10;

		if(this.anguloX>0 && this.wPressed == 0){
				this.anguloX-=Math.PI/32*this.PlaneSpeed*(currTime-this.previousTime)/100;
				if(this.anguloX<0)
				   this.anguloX = 0;

			}else if(this.anguloX<0 && this.sPressed == 0){
				this.anguloX+=Math.PI/32*this.PlaneSpeed*(currTime-this.previousTime)/100;
				if(this.anguloX>0)
				   this.anguloX = 0;
			}
	}
	
	if(this.jPressed == 1){
		this.planeY-=0.1*this.PlaneSpeed*(currTime-this.previousTime)/100;
		
		this.drone.h1speed=0.2;
		this.drone.h2speed=-0.2;
		this.drone.h3speed=0.2;
		this.drone.h4speed=-0.2;

		if(this.anguloX>0&& this.wPressed == 0){
				this.anguloX-=Math.PI/32*this.PlaneSpeed*(currTime-this.previousTime)/100;
				if(this.anguloX<0)
				   this.anguloX = 0;

			}else if(this.anguloX<0 && this.sPressed == 0){
				this.anguloX+=Math.PI/32*this.PlaneSpeed*(currTime-this.previousTime)/100;
				if(this.anguloX>0)
				   this.anguloX = 0;
			}
	}

	if(this.pPressed==1){
		if(this.drone.cable.length>0.5){
			this.drone.cable.length-=0.8*(currTime-this.previousTime)/100;
		}else 
			this.drone.cable.length=0.5;	
	}

	if(this.lPressed==1){
		if(this.drone.cable.length>=8){
			this.drone.cable.length=8;
		}else 
			this.drone.cable.length+=0.8*(currTime-this.previousTime)/100;
	}

	if(this.wPressed==0 && this.sPressed==0 && this.aPressed==0 && this.dPressed==0 && this.iPressed==0 && this.jPressed==0){
		this.drone.h1speed=1;
		this.drone.h2speed=-1;
		this.drone.h3speed=1;
		this.drone.h4speed=-1;

		if(this.anguloX>0 && this.wPressed == 0){
				this.anguloX-=Math.PI/32*this.PlaneSpeed*(currTime-this.previousTime)/100;
				if(this.anguloX<0)
				   this.anguloX = 0;

			}else if(this.anguloX<0 && this.sPressed == 0){
				this.anguloX+=Math.PI/32*this.PlaneSpeed*(currTime-this.previousTime)/100;
				if(this.anguloX>0)
				   this.anguloX = 0;
			}
	}
	this.drone.update(currTime);
}
