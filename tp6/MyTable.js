/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);
	this.MyUnitCubeQuad=new MyUnitCubeQuad(this.scene);
	this.MyUnitCubeQuad.initBuffers();


};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function(){
	var deg2rad=Math.PI/180.0;

	//this.scene.translate(0,0.5,0);
	this.scene.pushMatrix();

    
	this.scene.translate(0,1.75,0);//tampo da mesa subir 1.75 (3/2) 
	this.scene.scale(5,0.3,3);
	this.scene.tableAppearance.apply();
	this.MyUnitCubeQuad.display();
	this.scene.materialDefault.apply();

	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.materialPerna.apply();
	this.scene.translate(-2.25,0,-1.25);
	this.scene.scale(0.3,3.5,0.3);
	//this.scene.translate(0,0.5,0);
	this.MyUnitCubeQuad.display();
	
	this.scene.popMatrix();

	this.scene.pushMatrix();
	
	this.scene.translate(-2.25,0,1.25);
	this.scene.scale(0.3,3.5,0.3);
	//this.scene.translate(0,0.5,0);
	this.MyUnitCubeQuad.display();
	
	this.scene.popMatrix();

	this.scene.pushMatrix();
	
	this.scene.translate(2.25,0,-1.25);
	this.scene.scale(0.3,3.5,0.3);
	//this.scene.translate(0,0.5,0);
	this.MyUnitCubeQuad.display();
	
	this.scene.popMatrix();

	this.scene.pushMatrix();
	
	this.scene.translate(2.25,0,1.25);
	this.scene.scale(0.3,3.5,0.3);
	//this.scene.translate(0,0.5,0);
	this.MyUnitCubeQuad.display();
	this.scene.materialDefault.apply();
	this.scene.popMatrix();
}