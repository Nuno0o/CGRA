/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

	
 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
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
	var varAltura=1/this.stacks;
	this.vertices=[];
	this.normals = [];

	for(var i=0; i<=this.stacks;i+=1){
		for(angle = 0 ; angle < 2*Math.PI ; angle+=incAngle){

		this.vertices.push(Math.cos(angle)); //angulo pertencente a face anterior e a sua normal
		this.vertices.push(Math.sin(angle));
		this.vertices.push(i/this.stacks);
		this.normals.push(Math.cos(angle-(incAngle/2)));
		this.normals.push(Math.sin(angle-(incAngle/2)));
		this.normals.push(0);

		this.vertices.push(Math.cos(angle)); //angulo pertencente a face atual e a sua normal
		this.vertices.push(Math.sin(angle));
		this.vertices.push(i/this.stacks);
		this.normals.push(Math.cos(angle+(incAngle/2)));
		this.normals.push(Math.sin(angle+(incAngle/2)));
		this.normals.push(0);
		}
	}

	this.indices = [];
	
	for(var j = 0; j < this.stacks; j++){
		for(var i=0; i < this.slices*2 ; i+=2){
			this.indices.push((j*this.slices*2)+i+1);
			if(i == (this.slices*2)-2){
				this.indices.push(j*this.slices*2);
			} 
			else (this.indices.push(j*this.slices*2+i+2));
			this.indices.push((j+1)*this.slices*2+i+1);
			
			if(i == (this.slices*2)-2){
				this.indices.push(j*this.slices*2);
			} 
			else (this.indices.push(j*this.slices*2+i+2));

			if(i == (this.slices*2)-2){
				this.indices.push((j+1)*this.slices*2);
			} 
			else (this.indices.push((j+1)*this.slices*2+i+2));
			this.indices.push((j+1)*this.slices*2+i+1);
		}
	}
	
 	

 	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
