import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyBird } from "./MyBird.js";
import { MyTerrain } from "./MyTerrain.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    var FPS = 20;


    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.enableTextures(true);
    this.setUpdatePeriod(FPS);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    //this.sphere = new MySphere(this, 50, 50, true);
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama4.jpg"));
    this.bird = new MyBird(this, 0, 0, 0, 3, 0);
    this.terrain=new MyTerrain(this);


    //Objects connected to MyInterface
    this.displayAxis = false;
    this.scaleFactor = 1;
    this.selectedTexture = 0;
    this.speedFactor = 1;

    var accelerate = false;
    var turnLeft = false;



    this.appearanceEarth = new CGFappearance(this)
    this.appearanceEarth.setAmbient(0.1, 0.1, 0.1, 1);
    this.appearanceEarth.setDiffuse(0.9, 0.9, 0.9, 1);
    this.appearanceEarth.setSpecular(0.1, 0.1, 0.1, 1);
    this.appearanceEarth.setShininess(10.0);
    this.appearanceEarth.loadTexture('images/earth.jpg');
    this.appearanceEarth.setTextureWrap('REPEAT', 'REPEAT');


    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');


    this.textureEarth = new CGFtexture(this, 'images/earth.jpg');

    this.textures = [this.textureEarth];
    //this.texCoords = [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0];
  
    this.textureIds = { 'Earth' : 0 };


    this.displayPlane = true;
    //this.displaySphere = true;
    this.displayAppearanceEarth = true;
    this.displayPanorama = true;
    this.displayBird = true;

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0, //quando for tirar a screenshot, experimentar com diferentes valores deste parâmetro (FoV)
      0.1,
      1000,
      vec3.fromValues(30, 20, 20), //50, 10, 15
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  updateAppliedTexture() {
    this.appearanceEarth.setTexture(this.textures[this.selectedTexture]);
  }

  update(t){
    this.checkKeys();
    this.bird.updateBirdMovement(t);
  }


  checkKeys() {
		var text = "Keys pressed: ";
		var keysPressed = false;
    this.accelerate = false;
    this.turnLeft = false;

		// Check for key codes e.g. in ​https://keycode.info/
		if (this.gui.isKeyPressed("KeyW")) {
			text += " W ";
      this.accelerate = true;
      this.bird.accelerate(this.accelerate);
			keysPressed = true;
		}

		if (this.gui.isKeyPressed("KeyS")) {
			text += " S ";
      this.accelerate = false;
      this.bird.accelerate(this.accelerate);
			keysPressed = true;
		}
    
    if (this.gui.isKeyPressed("KeyA")) {
			text += " A ";
      this.turnLeft = true;
      this.bird.turn(this.turnLeft)
			keysPressed = true;
		}

    if (this.gui.isKeyPressed("KeyD")) {
			text += " D ";
      this.turnLeft = false;
      this.bird.turn(this.turnLeft);
			keysPressed = true;
		}

    if (this.gui.isKeyPressed("KeyR")) {
			text += " R ";
      this.bird.reset();
			keysPressed = true;
		}
		
		if (keysPressed){
      console.log(text);
    }
	}


  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    if (this.displayAppearanceEarth){
      this.terrain.display();
    }

    if(this.displayPanorama){
      this.panorama.display();
    }
    

    /*if (this.displaySphere){
      this.sphere.display();
    }*/

    // ---- BEGIN Primitive drawing section


    if(this.displayBird){
      this.pushMatrix();
      this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      this.bird.display();
      this.popMatrix();
    }

    
    // ---- END Primitive drawing section
  }
}
