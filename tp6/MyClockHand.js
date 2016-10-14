/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene,size) {
	CGFobject.call(this,scene);
	this.quad=new MyQuad(this.scene,0,1,0,1);
	this.size = size;
	this.angle = 0;
	this.quad.initBuffers();
   

};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.setAngle = function(angle){
	this.angle = angle;
}

MyClockHand.prototype.display = function(){
	var deg2rad=Math.PI/180.0;

	
	this.scene.pushMatrix();

	this.scene.rotate(-this.angle*deg2rad,0,0,1);
	this.scene.scale(1,this.size,1);
	this.scene.translate(0,0.5,0);
	this.scene.scale(0.02,1,0.02);
	this.scene.translate(0.5,0,0);
	this.scene.rotate(90.0*deg2rad,0,1,0);
	this.quad.display();
	this.scene.translate(0,0,-1);
	this.scene.rotate(180.0*deg2rad,0,1,0);
	this.quad.display();
	this.scene.translate(0.5,0,-0.5);
	this.scene.rotate(90.0*deg2rad,0,1,0);
	this.quad.display();
	this.scene.translate(0,0,-1);
	this.scene.rotate(180.0*deg2rad,0,1,0);
	this.quad.display();
	this.scene.translate(0,-0.5,-0.5);
	this.scene.rotate(90.0*deg2rad,1,0,0);
	this.quad.display();
	this.scene.translate(0,0,-1);
	this.scene.rotate(180.0*deg2rad,1,0,0);
	this.quad.display();
	this.scene.popMatrix();
	/*this.scene.rotate(90.0*deg2rad,0,0,1);
	this.quad.display();
	this.scene.rotate(90.0*deg2rad,0,0,1);
	this.quad.display();*/
}

