import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyBird } from "./MyBird.js";

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

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    //this.sphere = new MySphere(this, 50, 50, true);
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama4.jpg"));
    this.bird = new MyBird(this, 0, 0, 0);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.selectedTexture = 0;

    this.enableTextures(true);

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
      vec3.fromValues(50, 10, 15), //50, 10, 15
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

    //Function that updates texture coordinates in MyQuad
  /*updateTexCoords() {
    this.sphere.updateTexCoords(this.texCoords);
  }*/


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
      this.appearanceEarth.apply();
    }

    if(this.displayPanorama){
      this.panorama.display();
    }


    if(this.displayBird){
      this.pushMatrix();
      this.bird.display();
      this.popMatrix();
    }
    

    /*if (this.displaySphere){
      this.sphere.display();
    }*/

    // ---- BEGIN Primitive drawing section

    if(this.displayPlane){
      this.pushMatrix();
      this.appearance.apply();
      this.translate(0,-100,0);
      this.scale(400,400,400);
      this.rotate(-Math.PI/2.0,1,0,0);
      this.plane.display();
      this.popMatrix();
  
    }
    
    // ---- END Primitive drawing section
  }
}
