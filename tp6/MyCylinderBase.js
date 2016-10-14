/**
 * MyCylinderBase
 * @constructor
 */
 function MyCylinderBase(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;

	
 	this.initBuffers();
 };

 MyCylinderBase.prototype = Object.create(CGFobject.prototype);
 MyCylinderBase.prototype.constructor = MyCylinderBase;

 MyCylinderBase.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	var degree2rad= Math.PI/180.0;
 	var incAngle=(360/this.slices)*degree2rad;
	var angle=0;
	this.vertices=[];
	this.normals = [];
	this.texCoords = [];

	for(angle = 0 ; angle < 2*Math.PI ; angle+=incAngle){

		this.vertices.push(Math.cos(angle)); //angulo pertencente a face anterior e a sua normal
		this.vertices.push(Math.sin(angle));
		this.vertices.push(0);
		this.normals.push(0);
		this.normals.push(0);
		this.normals.push(1);
        this.texCoords.push(0.5+0.5*Math.cos(angle),1-(0.5+0.5*Math.sin(angle)));
	}
	this.vertices.push(0,0,0);
	this.normals.push(0,0,1);
    this.texCoords.push(0.5,0.5);
	this.indices = [];
	
	for(var i=0; i < this.slices ; i++){
		if(i != this.slices-1)
		   this.indices.push(i,i+1,this.slices);
		else this.indices.push(i,0,this.slices);
	}
	
	
 	

 	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
