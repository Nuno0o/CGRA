/**
 * MyDrone
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
var degToRad = Math.PI/180;

function MyDrone(scene) {
	CGFobject.call(this,scene);
	this.bar= new MyBar(scene,30,1);
	this.center = new myLamp(scene,30,10);
	this.curve = new MyCurve(scene,5,1);
	this.feet = new MyUnitCubeQuad(scene);
	this.cable = new MyCable(scene, 2);
	this.hook = new MyBar(scene, 10, 1);
	this.curve.initBuffers();
	this.feet.initBuffers();
	this.center.setTextureMapping1();
	this.center.initBuffers();
	this.bar.initBuffers();
	this.cable.initBuffers();
	this.hook.initBuffers();
	this.initBuffers();
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor=MyDrone;


MyDrone.prototype.initBuffers = function () {
	this.h1angle=Math.PI/4;
	this.h2angle=Math.PI/4;
	this.h3angle=Math.PI/4;
	this.h4angle=Math.PI/4;	
    this.h1speed=1;
    this.h2speed=-1;
    this.h3speed=1;
    this.h4speed=-1;
};

MyDrone.prototype.update = function(currTime){
	this.h1angle+=this.h1speed*((currTime-this.scene.previousTime)/1000 * 360)*degToRad*this.scene.PropellerSpeed;
	this.h2angle+=this.h2speed*((currTime-this.scene.previousTime)/1000 * 360)*degToRad*this.scene.PropellerSpeed;
	this.h3angle+=this.h3speed*((currTime-this.scene.previousTime)/1000 * 360)*degToRad*this.scene.PropellerSpeed;
	this.h4angle+=this.h4speed*((currTime-this.scene.previousTime)/1000 * 360)*degToRad*this.scene.PropellerSpeed;
}

MyDrone.prototype.display = function(){
	this.scene.pushMatrix(); //center half ball
		this.scene.scale(0.5,0.5,0.5);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.applyDroneAppearance(2);
		this.center.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //base of the center
		this.scene.translate(0,-0.18,0);
		this.scene.scale(0.623,0.623,0.623);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.applyDroneAppearance(3);
		this.bar.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //first arm
		this.scene.translate(0,-0.1,-1.5);
		this.scene.scale(0.1,0.1,10);
		this.bar.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //second arm
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.translate(0,-0.1,-1.5);
		this.scene.scale(0.1,0.1,10);
		this.bar.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //base da helice 1
		this.scene.translate(0,-0.21,-1.5);
		this.scene.scale(0.2,0.8,0.2);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.bar.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //base da helice 2
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.translate(0,-0.21,-1.5);
		this.scene.scale(0.2,0.8,0.2);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.bar.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //base da helice 3
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.translate(0,-0.21,-1.5);
		this.scene.scale(0.2,0.8,0.2);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.bar.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //base da helice 4
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.translate(0,-0.21,-1.5);
		this.scene.scale(0.2,0.8,0.2);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.bar.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //center helice 1
		this.scene.translate(0,0.03,-1.5);
		this.scene.scale(0.1,0.1,0.1);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.applyDroneAppearance(1);
		this.center.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //center helice 2
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.translate(0,0.03,-1.5);
		this.scene.scale(0.1,0.1,0.1);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.center.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //center helice 3
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.translate(0,0.03,-1.5);
		this.scene.scale(0.1,0.1,0.1);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.center.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //center helice 4
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.translate(0,0.03,-1.5);
		this.scene.scale(0.1,0.1,0.1);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.center.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //helice 1
		this.scene.translate(0,0.042,-1.5);
		this.scene.rotate(this.h1angle,0,1,0);
		this.scene.scale(0.1,0.01,0.8);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.bar.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //helice 2
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.translate(0,0.042,-1.5);
		this.scene.rotate(this.h2angle,0,1,0);
		this.scene.scale(0.1,0.01,0.8);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.bar.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //helice 3
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.translate(0,0.042,-1.5);
		this.scene.rotate(this.h3angle,0,1,0);
		this.scene.scale(0.1,0.01,0.8);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.bar.display();
	this.scene.popMatrix();
	this.scene.pushMatrix(); //helice 4
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.translate(0,0.042,-1.5);
		this.scene.rotate(this.h4angle,0,1,0);
		this.scene.scale(0.1,0.01,0.8);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.bar.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();	//leg 1.1
		this.scene.translate(0.15,-0.76,0.32);
		this.scene.scale(0.7,0.7,0.07);
		this.applyDroneAppearance(3);
		this.curve.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();	//leg 1.2
		this.scene.translate(0.15,-0.76,-0.36);
		this.scene.scale(0.7,0.7,0.07);
		this.curve.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();	
		this.scene.translate(-0.15,-0.76,0.36);
		this.scene.scale(0.7,0.7,0.07);
		this.scene.rotate(Math.PI,0,1,0);
		this.curve.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();	
		this.scene.translate(-0.15,-0.76,-0.32);
		this.scene.scale(0.7,0.7,0.07);
		this.scene.rotate(Math.PI,0,1,0);
		this.curve.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
		this.scene.translate(-0.82,-0.76,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(1.5,0.07,0.07);
		this.feet.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
		this.scene.translate(0.82,-0.76,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(1.5,0.07,0.07);
		this.feet.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
		this.scene.rotate(-this.scene.anguloX,1,0,0);
		this.cable.display();
	this.scene.popMatrix();

	this.scene.pushMatrix(); 
	    this.scene.rotate(-this.scene.anguloX,1,0,0);
	    this.scene.translate(0,-this.cable.length,0);
	    this.scene.scale(0.1,0.5,0.1);
	    this.scene.rotate(-Math.PI/2,1,0,0);
		this.hook.display();
	this.scene.popMatrix();
	this.scene.materialDefault.apply();
}

MyDrone.prototype.applyDroneAppearance = function(part){
	//Part 1 = circles
	//Part 2 = top
	//Part 3 = flats
	if(this.scene.DroneTexture == 1){
		if(part == 1){
			this.scene.droneAppearance1.apply();
		}else if(part == 2){
			this.scene.droneAppearance12.apply();
		}else if(part == 3){
			this.scene.droneAppearance13.apply();
		}
	}else if(this.scene.DroneTexture == 2){
		if(part == 1){
			this.scene.droneAppearance2.apply();
		}else if(part == 2){
			this.scene.droneAppearance2.apply();
		}else if(part == 3){
			this.scene.droneAppearance2.apply();
		}
	}else if(this.scene.DroneTexture == 3){
		if(part == 1){
			this.scene.droneAppearance3.apply();
		}else if(part == 2){
			this.scene.droneAppearance32.apply();
		}else if(part == 3){
			this.scene.droneAppearance33.apply();
		}
	}
}
