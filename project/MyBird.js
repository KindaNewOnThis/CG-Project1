import {CGFobject, CGFappearance, CGFtexture} from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyCone } from "./MyCone.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyPyramid } from "./MyPyramid.js";
import { MyQuad } from "./MyQuad.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

export class MyBird extends CGFobject {
    constructor(scene, xPosition, yPosition, zPosition){
        super(scene);
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.zPosition = zPosition;

        this.head = new MySphere(scene, 10, 10, false, 1);
        this.beak = new MyPyramid(scene, 50, 50);
        this.tail = new MyPyramid(scene, 5, 5);

        this.birdColor = new CGFappearance(scene);
        this.birdColor.setAmbient(0.1, 0.1, 0.1, 1);
        this.birdColor.setDiffuse(0.9, 0.9, 0.9, 1);
        this.birdColor.setSpecular(0.1, 0.1, 0.1, 1);
        this.birdColor.setShininess(10.0);

        this.bodyTexture = new CGFappearance(scene);
        this.bodyTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.bodyTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bodyTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.bodyTexture.setShininess(10.0);
        this.bodyTexture.setTexture(new CGFtexture(scene, 'images/birdbodytexture.jpg'));
        this.bodyTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.beakTexture = new CGFappearance(scene);
        this.beakTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.beakTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.beakTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.beakTexture.setShininess(10.0);
        this.beakTexture.setTexture(new CGFtexture(scene, 'images/birdbeaktexture.png'));
        this.beakTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.eyeTexture = new CGFappearance(scene);
        this.eyeTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.eyeTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eyeTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.eyeTexture.setShininess(10.0);
        this.eyeTexture.setTexture(new CGFtexture(scene, 'images/birdeyetexture.png'));
        this.eyeTexture.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){

        //bird's head
        this.scene.pushMatrix();
        this.bodyTexture.apply();
        this.scene.scale(0.7, 0.8, 0.7);
        this.head.display();
        this.scene.popMatrix();

        //bird's beak
        this.scene.pushMatrix();
        this.scene.scale(0.7,0.25,0.25);
        this.scene.rotate((-Math.PI)/2, 0,0,1);
        this.scene.translate(0,0.5,0);
        this.beakTexture.apply();
        this.beak.display();
        this.scene.popMatrix();

        //bird's eye 1
        this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.translate(3.7, 4.5, 3.5);
        this.scene.rotate(Math.PI/10, 0, 0, 1);
        this.scene.rotate(Math.PI/1.2, 0, 1, 0);
        this.eyeTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's eye 2
        this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.translate(3.7, 4.5, -3.5);
        this.scene.rotate(Math.PI/10, 0, 0, 1);
        this.scene.rotate(-Math.PI/1.2, 0, 1, 0);
        this.eyeTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's black eye part 1
        this.scene.pushMatrix();
        this.scene.scale(0.05, 0.05, 0.05);
        this.scene.translate(8.3, 9.5, 8.3);
        this.scene.rotate(Math.PI/10, 0, 0, 1);
        this.scene.rotate(Math.PI/1.2, 0, 1, 0);
        this.beakTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's black eye part 2
        this.scene.pushMatrix();
        this.scene.scale(0.05, 0.05, 0.05);
        this.scene.translate(8.3, 9.5, -8.3);
        this.scene.rotate(Math.PI/10, 0, 0, 1);
        this.scene.rotate(Math.PI/1.2, 0, 1, 0);
        this.beakTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's body
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/5, 0, 0, 1);
        this.scene.translate(-2.3, 0, 0);
        this.scene.scale(1.8, 1.2, 1.5);
        this.bodyTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's wing 1st part 1
        this.scene.pushMatrix();
        this.scene.translate(-1, -1, -2);
        this.scene.rotate(-Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.8, 0.15, 0.7);
        this.bodyTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's wing 1st part 1
        this.scene.pushMatrix();
        this.scene.translate(-1, -1, 2);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(0.8, 0.15, 0.7);
        this.bodyTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's wing 2nd part 1
        this.scene.pushMatrix();
        this.scene.translate(-1, -1.1, 2.3);
        this.scene.rotate(Math.PI/17, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.8, 0.2, 0.7);
        this.bodyTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's wing 2nd part 2
        this.scene.pushMatrix();
        this.scene.translate(-1, -1.1, -2.3);
        this.scene.rotate(-Math.PI/17, 1, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(0.8, 0.2, 0.7);
        this.bodyTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's tail
        this.scene.pushMatrix();
        this.scene.scale(0.7,0.25,0.25);
        this.scene.rotate((-Math.PI)/2, 0,0,1);
        this.scene.translate(0,0.5,0);
        this.beakTexture.apply();
        this.beak.display();
        this.scene.popMatrix();
    }
}