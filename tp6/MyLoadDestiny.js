function MyLoadDestiny(scene) {
	CGFobject.call(this,scene);
	this.box = new MyUnitCubeQuad(scene);
	this.box.initBuffers();
	this.x = 5.5;
	this.y = 3.65;
	this.z = 8;
};

MyLoadDestiny.prototype = Object.create(CGFobject.prototype);
MyLoadDestiny.prototype.constructor=MyLoadDestiny;


MyLoadDestiny.prototype.display = function(){
	this.scene.pushMatrix();
	this.scene.scale(2.5,0.04,2.5);
	this.scene.destinyAppearance.apply();
	this.box.display();
	this.scene.materialDefault.apply();
	this.scene.popMatrix();
	
}

