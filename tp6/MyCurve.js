/**
 * MyCurve
 * @constructor
 */
 function MyCurve(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

	this.setTextureMapping1();
 	this.initBuffers();
 };

 MyCurve.prototype = Object.create(CGFobject.prototype);
 MyCurve.prototype.constructor = MyCurve;
 
 MyCurve.prototype.setTextureMapping1 = function(){
 	this.texCoords = [];
 	var degree2rad= Math.PI/180.0;
 	var incAngle=(90/this.slices)*degree2rad;
	var angle=0;
 	for(var i=0; i<=this.stacks;i+=1){
		for(angle = 0 ; angle < Math.PI/2 ; angle+=incAngle){
             this.texCoords.push(0.01,0.01);
		}
	}
 }
 MyCurve.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	var degree2rad= Math.PI/180.0;
 	var incAngle=(90/this.slices)*degree2rad;
	var angle=0;
	var varAltura=1/this.stacks;
	this.vertices=[];
	this.normals = [];

	for(var i=0; i<=this.stacks;i+=1){
		for(angle = 0 ; angle < Math.PI/2 ; angle+=incAngle){

		this.vertices.push(Math.cos(angle)); //angulo pertencente a face anterior e a sua normal
		this.vertices.push(Math.sin(angle));
		this.vertices.push(i/this.stacks);
		this.normals.push(Math.cos(angle));
		this.normals.push(Math.sin(angle));
		this.normals.push(0);
		}
	}

	this.indices = [];
	
	for(var j = 0; j < this.stacks; j++){
		for(var i=0; i < this.slices ; i++){
			this.indices.push(j*this.slices+i);
			if(i == this.slices-1){
				//this.indices.push(j*this.slices);
			}else this.indices.push(j*this.slices+i+1);
			this.indices.push((j+1)*this.slices+i);

			if(i == this.slices-1){
				//this.indices.push(j*this.slices);
			}else this.indices.push(j*this.slices+i+1);

			if(i == this.slices-1){
				//this.indices.push((j+1)*this.slices);
			}else this.indices.push((j+1)*this.slices+i+1);
			this.indices.push((j+1)*this.slices+i);
		}
	}
	
 	

 	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
