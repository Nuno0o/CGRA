/**
 * myLamp
 * @constructor
 */
 function myLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

	
 	this.initBuffers();
 };

 myLamp.prototype = Object.create(CGFobject.prototype);
 myLamp.prototype.constructor = myLamp;

 myLamp.prototype.setTextureMapping1 = function(){
 	var degree2rad= Math.PI/180.0;
 	var incAngle=(360/this.slices)*degree2rad;
	var angle=0;
	var varAltura=1/this.stacks;
	this.texCoords = [];
	for(var i=0; i<=this.stacks;i+=1){
		for(angle = 0 ; angle < 2*Math.PI ; angle+=incAngle){
            this.texCoords.push(0.5+0.5*Math.cos(angle)*Math.cos((i)/(this.stacks)*Math.PI/2),0.5-0.5*Math.sin(angle)*Math.cos((i)/(this.stacks)*Math.PI/2));
		}
	}
 }
 myLamp.prototype.initBuffers = function() {
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
	//this.texCoords = [];

	for(var i=0; i<=this.stacks;i+=1){
		for(angle = 0 ; angle < 2*Math.PI ; angle+=incAngle){

		this.vertices.push(Math.cos(angle)*Math.cos((i)/(this.stacks)*Math.PI/2));
		this.vertices.push(Math.sin(angle)*Math.cos((i)/(this.stacks)*Math.PI/2));
		this.vertices.push(Math.sin(i/this.stacks*Math.PI/2));
		this.normals.push(Math.cos(angle)*Math.cos((i)/(this.stacks)*Math.PI/2));
		this.normals.push(Math.sin(angle)*Math.cos((i)/(this.stacks)*Math.PI/2));
		this.normals.push(Math.sin((i)/(this.stacks)*Math.PI/2));
		//this.texCoords.push(0.5+0.5*Math.cos(angle)*Math.cos((i)/(this.stacks)*Math.PI/2),1-(0.5+0.5*Math.sin(angle))*Math.cos((i)/(this.stacks)*Math.PI/2));
		}
	}

	this.indices = [];
	
	for(var j = 0; j < this.stacks; j++){
		for(var i=0; i < this.slices ; i++){
			this.indices.push(j*this.slices+i);
			if(i == this.slices-1){
				this.indices.push(j*this.slices);
			}else this.indices.push(j*this.slices+i+1);
			this.indices.push((j+1)*this.slices+i);

			if(i == this.slices-1){
				this.indices.push(j*this.slices);
			}else this.indices.push(j*this.slices+i+1);

			if(i == this.slices-1){
				this.indices.push((j+1)*this.slices);
			}else this.indices.push((j+1)*this.slices+i+1);
			this.indices.push((j+1)*this.slices+i);
		}
	}
	
 	

 	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };