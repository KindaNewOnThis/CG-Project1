import {CGFobject, CGFappearance, CGFtexture} from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyCone } from "./MyCone.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyPyramid } from "./MyPyramid.js";
import { MyQuad } from "./MyQuad.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

export class MyBird extends CGFobject {

    constructor(scene, angle, speed, xPosition, yPosition, zPosition){
        super(scene);
        this.angle = angle;
        this.speed = speed;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.zPosition = zPosition;

        this.lastTime = 0;
        this.t = 0;

        this.head = new MySphere(scene, 10, 10, false, 1);
        this.beak = new MyPyramid(scene, 100, 100);
        
        
        this.bodyTexture = new CGFappearance(scene);
        this.bodyTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.bodyTexture.setDiffuse(1.5, 1.5, 1.5, 1);
        this.bodyTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.bodyTexture.setShininess(10.0);
        this.bodyTexture.setTexture(new CGFtexture(scene, 'images/birdbodytexture.jpg'));
        this.bodyTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.outterEyeTexture = new CGFappearance(scene);
        this.outterEyeTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.outterEyeTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.outterEyeTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.outterEyeTexture.setShininess(10.0);
        this.outterEyeTexture.setTexture(new CGFtexture(scene, 'images/birdouttereyetexture.png'));
        this.outterEyeTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.eyeTexture = new CGFappearance(scene);
        this.eyeTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.eyeTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eyeTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.eyeTexture.setShininess(10.0);
        this.eyeTexture.setTexture(new CGFtexture(scene, 'images/birdeyetexture.png'));
        this.eyeTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.beakTexture = new CGFappearance(scene);
        this.beakTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.beakTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.beakTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.beakTexture.setShininess(10.0);
        this.beakTexture.setTexture(new CGFtexture(scene, 'images/birdbeaktexture.jpg'));
        this.beakTexture.setTextureWrap('REPEAT', 'REPEAT');

    }

    reset(){
        this.xPosition = 0;
        this.yPosition = 3;
        this.zPosition = 0;
        this.speed = 0;
        this.angle = 0;
    }

    accelerate(v){
        if (v && this.speed <= 7){
            console.log(this.speed);
            this.speed++;
        }
        if(!v && this.speed >= -7){
            console.log(this.speed);
            this.speed--;
        }
    }

    turn(v){

        if(v){
            this.angle = this.angle + Math.PI/30 * this.scene.speedFactor;
        }
        else{
            this.angle = this.angle - Math.PI/30 * this.scene.speedFactor;
        }        
    }

	updateBirdMovement(t) {

        this.xPosition = this.xPosition + Math.cos(this.angle) * (this.speed / 30) * this.scene.speedFactor;
		this.zPosition = this.zPosition - Math.sin(this.angle) * (this.speed / 30) * this.scene.speedFactor;

		this.t = t;
		
	}

    display(){

        //bird's movement
        this.scene.pushMatrix();
		this.scene.translate(this.xPosition, this.yPosition, this.zPosition);
		this.scene.rotate(this.angle, 0, 1, 0);	
		this.scene.translate(0, Math.sin(this.t/(1000/(2*Math.PI))), 0);

        //bird's head
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/7, 0, 0, 1);
        this.scene.scale(0.35, 0.4, 0.3);
        this.bodyTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's beak
        this.scene.pushMatrix();
        this.scene.translate(0.1, 0.07, 0);
        this.scene.scale(0.4, 0.2, 0.15);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.beakTexture.apply();
        this.beak.display();
        this.scene.popMatrix();

        //bird's eye 1
        this.scene.pushMatrix();
        this.scene.scale(0.035, 0.055, 0.04);
        this.scene.translate(8, 3.5, 3);
        this.scene.rotate(Math.PI/10, 0, 0, 1);
        this.scene.rotate(Math.PI/1.2, 0, 1, 0);
        this.outterEyeTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's eye 2
        this.scene.pushMatrix();
        this.scene.scale(0.035, 0.055, 0.04);
        this.scene.translate(8, 3.5, -3);
        this.scene.rotate(Math.PI/10, 0, 0, 1);
        this.scene.rotate(-Math.PI/1.2, 0, 1, 0);
        this.outterEyeTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's white eye part 1
        this.scene.pushMatrix();
        this.scene.translate(0.3, 0.22, 0.13);
        this.scene.rotate(Math.PI/8, 0, 0, 1);
        this.scene.scale(0.01, 0.02, 0.015);
        this.eyeTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's white eye part 2
        this.scene.pushMatrix();
        this.scene.translate(0.3, 0.22, -0.13);
        this.scene.rotate(Math.PI/8, 0, 0, 1);
        this.scene.scale(0.01, 0.02, 0.015);
        this.eyeTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's body
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/5, 0, 0, 1);
        this.scene.translate(-1, 0, 0);
        this.scene.scale(0.9, 0.4, 0.6);
        this.bodyTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's inner wing 1
        this.scene.pushMatrix();
        this.scene.rotate(-Math.sin(this.t/(1000/(2*Math.PI))) * 0.25 * this.scene.speedFactor, 1, 0, 0);
        this.scene.translate(-0.55, -0.55, -0.55);
        this.scene.rotate(Math.PI/5, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(0.8, 0.1, 0.4);
        this.bodyTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's inner wing 2
        this.scene.pushMatrix();
        this.scene.rotate(Math.sin(this.t/(1000/(2*Math.PI))) * 0.25 * this.scene.speedFactor, 1, 0, 0);
        this.scene.translate(-0.55, -0.55, 0.55);
        this.scene.rotate(Math.PI/5, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.8, 0.1, 0.4);
        this.bodyTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's outter wing 1
        this.scene.pushMatrix();
        this.scene.rotate(-Math.sin(this.t/(1000/(2*Math.PI))) * 0.25 * this.scene.speedFactor, 1, 0, 0);
        this.scene.translate(-0.55, -0.55, -1.4);
        this.scene.rotate(Math.PI/5, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(0.5, 0.1, 0.25);
        this.bodyTexture.apply();
        this.head.display();
        this.scene.popMatrix();

        //bird's outter wing 2
        this.scene.pushMatrix();
        this.scene.rotate(Math.sin(this.t/(1000/(2*Math.PI))) * 0.25 * this.scene.speedFactor, 1, 0, 0);
        this.scene.translate(-0.55, -0.55, 1.4);
        this.scene.rotate(Math.PI/5, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.5, 0.1, 0.25);
        this.bodyTexture.apply();
        this.head.display();
        this.scene.popMatrix();

    }
}