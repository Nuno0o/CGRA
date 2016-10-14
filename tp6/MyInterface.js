/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'ToggleClock');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Luzes");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'Light1');
	group.add(this.scene, 'Light2');
	group.add(this.scene, 'Light3');
	group.add(this.scene, 'Light4');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'PlaneSpeed', 0, 10);

	this.gui.add(this.scene, 'PropellerSpeed',0.1,2.0);

	this.gui.add(this.scene, 'DroneTexture', {Metal: 1, Military: 2, RedEye: 3});

	if(this.wPressed == 1){
		this.scene.planeZ += Math.cos(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
		    this.scene.planeX += Math.sin(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
	} 
	if(this.sPressed == 1){
		this.scene.planeZ -= Math.cos(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
		this.scene.planeX -= Math.sin(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
	}
	if(this.aPressed == 1){
		this.scene.anguloY+= 0.15;
	}
	if(this.dPressed == 1){
		this.scene.anguloY-= 0.15;
	}

	return true;
};

MyInterface.prototype.update = function(){
	if(this.wPressed == 1){
		this.scene.planeZ += Math.cos(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
		    this.scene.planeX += Math.sin(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
	} 
	if(this.sPressed == 1){
		this.scene.planeZ -= Math.cos(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
		this.scene.planeX -= Math.sin(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
	}
	if(this.aPressed == 1){
		this.scene.anguloY+= 0.15;
	}
	if(this.dPressed == 1){
		this.scene.anguloY-= 0.15;
	}
}

/**
 * processKeyboard
 * @param event {Event}
 */
/*MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):	// only works for capital 'A', as it is
			this.scene.anguloY+= 0.15;
			break;
		case (68):
		    this.scene.anguloY-= 0.15;
		    break;
        case (73):
            this.scene.planeY += 0.15;
            break;
        case (74):
            this.scene.planeY -= 0.15;
            break;
		case (87):
		    this.scene.planeZ += Math.cos(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
		    this.scene.planeX += Math.sin(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
		    break;
		case (83):
		    this.scene.planeZ -= Math.cos(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
		    this.scene.planeX -= Math.sin(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
		    break;
	};
};*/

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyDown = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyDown.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):	// only works for capital 'A', as it is
			this.scene.aPressed=1;
			break;
		case(68): //'B'
			this.scene.dPressed=1;
			break;
		case(73): //'I'
			this.scene.iPressed=1;
			break;
		case(74): //'J'
			this.scene.jPressed=1;
			break;
		case(83): //'S'
			this.scene.sPressed=1;
			break;
		case(87): //'W'
			this.scene.wPressed=1;
			break;
		case(80): // P
			this.scene.pPressed=1;
			break;
		case(76): // L
			this.scene.lPressed=1;
			break;
	};

	/*if(this.scene.wPressed == 1){
		this.scene.planeZ += Math.cos(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
		    this.scene.planeX += Math.sin(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
	} 
	if(this.scene.sPressed == 1){
		this.scene.planeZ -= Math.cos(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
		this.scene.planeX -= Math.sin(this.scene.anguloY)*this.scene.PlaneSpeed / 10;
	}
	if(this.scene.aPressed == 1){
		this.scene.anguloY+= 0.15;
	}
	if(this.scene.dPressed == 1){
		this.scene.anguloY-= 0.15;
	}*/
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyUp = function(event) {
	
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyUp.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):	// only works for capital 'A', as it is
			this.scene.aPressed=0;
			break;
		case(68): //'D'
			this.scene.dPressed=0;
			break;
		case(73): //'I'
			this.scene.iPressed=0;
			break;
		case(74): //'J'
			this.scene.jPressed=0;
			break;
		case(83): //'S'
			this.scene.sPressed=0;
			break;
		case(87): //'W'
			this.scene.wPressed=0;
			break;
		case(80): // P
			this.scene.pPressed=0;
			break;
		case(76): // L
			this.scene.lPressed=0;
			break;
	};

};
