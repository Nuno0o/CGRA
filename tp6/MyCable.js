/**
 * MyCable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyCable(scene, length) {
	CGFobject.call(this,scene);
	this.cylinder = new MyCylinder(scene,3,1);
	this.hook = new MyUnitCubeQuad(scene);
	this.length = length;
	this.hook.initBuffers();
	this.cylinder.initBuffers();
  
};

MyCable.prototype = Object.create(CGFobject.prototype);
MyCable.prototype.constructor=MyCable;


MyCable.prototype.display = function(){
	this.scene.pushMatrix();
	this.scene.scale(0.025,this.length,0.025);
	this.scene.rotate(Math.PI/2,1,0,0);
	this.cylinder.display();
	this.scene.popMatrix();
	
}