/**
 * MyBar
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyBar(scene, slices, stacks) {
	CGFobject.call(this,scene);
	this.base = new MyCylinderBase(scene,slices);
	this.cylinder = new MyCylinder(scene,slices,stacks);
	this.base.initBuffers();
	this.cylinder.setTextureMapping1();
	this.cylinder.initBuffers();
  
};

MyBar.prototype = Object.create(CGFobject.prototype);
MyBar.prototype.constructor=MyBar;



MyBar.prototype.display = function(){ 
	var deg2rad=Math.PI/180.0;
    this.scene.pushMatrix();
        this.scene.translate(0,0,0.3);
        this.scene.scale(0.8,0.8,1);
	    this.base.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	    this.scene.scale(1,1,0.3);
	    this.scene.scale(0.8,0.8,1);
	    this.cylinder.display();
	this.scene.popMatrix();
	 this.scene.pushMatrix();
        this.scene.translate(0,0,0);
        this.scene.scale(0.8,0.8,1);
        this.scene.rotate(Math.PI,0,1,0);
	    this.base.display();
	this.scene.popMatrix();
   


	
}