function MyLoad(scene) {
	CGFobject.call(this,scene);
	this.box = new MyUnitCubeQuad(scene);
	this.box.initBuffers();
	this.x = 12;
	this.y = 3.9;
	this.z = 8;
	this.angleOffSet;
	this.angle = 0;
    this.hooked = 0;
    this.inDestiny = 0;
};

MyLoad.prototype = Object.create(CGFobject.prototype);
MyLoad.prototype.constructor=MyLoad;


MyLoad.prototype.display = function(){
	this.scene.pushMatrix();
	this.scene.rotate(this.angle,0,1,0);
	this.scene.scale(1,0.5,1);
	if(this.hooked == 0 && this.inDestiny == 0)
	   this.scene.redAppearance.apply();
	else if(this.hooked == 1 && this.inDestiny == 0)
	   this.scene.yellowAppearance.apply();
	else if(this.inDestiny == 1)
	   this.scene.greenAppearance.apply();
	this.box.display();
	this.scene.materialDefault.apply();
	this.scene.popMatrix();
	
}

MyLoad.prototype.updateBox = function(currTime){
    if(this.inDestiny == 1){
    	hooked = 0;
    	this.y=3.93;
    	return;
    }
    if(this.hooked == 0){
       var distX = Math.abs(this.x-this.scene.planeX);
       var distY = Math.abs(this.y-this.scene.planeY+this.scene.drone.cable.length*0.6+0.25);
       var distZ = Math.abs(this.z-this.scene.planeZ);
       if(distX <= 0.15 && distY <= 0.15 && distZ <= 0.15){
       	this.hooked = 1;
       	this.angleOffSet = this.scene.anguloY;
       }
    }
    if(this.hooked == 1){
    	this.angle = this.scene.anguloY-this.angleOffSet;
    	this.x = this.scene.planeX;
    	this.y = this.scene.planeY - this.scene.drone.cable.length*0.6 -0.2;//* 0.6 por causa do scale feito em lightning scene
    	this.z = this.scene.planeZ;
    }
    if(this.inDestiny == 0){
    	var distX = Math.abs(this.x-this.scene.destiny.x);
        var distY = Math.abs(this.y-this.scene.destiny.y-0.3);
        var distZ = Math.abs(this.z-this.scene.destiny.z);
        if(distX <= 0.8 && distY <= 0.1 && distZ <= 0.8){
       	  this.inDestiny = 1;
       }
    }


}