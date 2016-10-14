/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

	
 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.setTextureMapping1 = function(){
 	this.texCoords = [];
 	var degree2rad= Math.PI/180.0;
 	var angle = 0;
 	var incAngle = (360/this.slices)*degree2rad;
 	for(var i=0; i<=this.stacks;i+=1){
		for(angle = 0 ; angle < 2*Math.PI ; angle+=incAngle){
            this.texCoords.push(angle/(2*Math.PI),i/(this.stacks));
		}
	}
 }
 MyCylinder.prototype.initBuffers = function() {
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
