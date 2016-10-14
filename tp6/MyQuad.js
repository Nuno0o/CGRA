/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyQuad(scene,smin,smax,tmin,tmax) {
	CGFobject.call(this,scene);

    this.smin = smin;
    this.smax = smax;
    this.tmin = tmin;
    this.tmax = tmax;
	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, 0.0,
             0.5, -0.5, 0.0,
            -0.5,  0.5, 0.0,
             0.5,  0.5, 0.0,
			];

	this.indices = [
            0, 1, 2, 
			3, 2, 1
        ];

    this.normals=[
    		0,0,1,
    		0,0,1,
    		0,0,1,
    		0,0,1
    ];

    this.texCoords = [
    	this.smin,this.tmax,
    	this.smax,this.tmax,
    	this.smin,this.tmin,
    	this.smax,this.tmin
    ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
