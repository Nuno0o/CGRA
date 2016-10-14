/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene, slices, stacks) {
	CGFobject.call(this,scene);
	this.cbase = new MyCylinderBase(scene,slices);
	this.cylinder = new MyCylinder(scene,slices,stacks);
	this.hours = new MyClockHand(scene,0.5);
	this.minutes = new MyClockHand(scene,0.7);
	this.seconds = new MyClockHand(scene,0.7);
	this.seconds.setAngle(270);
	this.minutes.setAngle(180);
	this.hours.setAngle(90);
	this.timeinit = -1;
	this.cbase.initBuffers();
	this.cylinder.initBuffers(); 
  
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.update = function(currTime){
	if(this.timeinit == -1)
	    this.timeinit = currTime;
	this.seconds.setAngle(270+(currTime-this.timeinit)/1000 * 360 / 60);
	this.minutes.setAngle(180+(currTime-this.timeinit)/1000 * 360 / (60*60));
	this.hours.setAngle(90+(currTime-this.timeinit)/1000 * 360 / (60*60*24));
}

MyClock.prototype.display = function(){
	var deg2rad=Math.PI/180.0;
    this.scene.pushMatrix();
        this.scene.translate(0,0,0.3);
        this.scene.scale(0.8,0.8,1);
        this.scene.clockAppearance.apply();
	    this.cbase.display();
        this.scene.materialDefault.apply();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	    this.scene.scale(1,1,0.3);
	    this.scene.scale(0.8,0.8,1);
	    this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	    this.scene.translate(0,0,0.34);
        this.hours.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
	    this.scene.translate(0,0,0.36);
        this.minutes.display();
    this.scene.popMatrix();
   
    this.scene.pushMatrix();
	    this.scene.translate(0,0,0.38);
	    this.scene.secondsAppearance.apply();
        this.seconds.display();
        this.scene.materialDefault.apply();
    this.scene.popMatrix();

	
}