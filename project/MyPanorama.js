import {CGFobject} from '../../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";

export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);
        this.texture = texture;
		this.initBuffers();
	}

	initBuffers() {

        this.sphere = new MySphere(this.scene, 50, 50, true, 200);
        

        this.panoramaMaterial = new CGFappearance(this.scene)
        this.panoramaMaterial.setEmission(1.0, 1.0, 1.0, 1.0);
        this.panoramaMaterial.setTexture(this.texture);
        this.panoramaMaterial.setTextureWrap('REPEAT', 'REPEAT');
		
	}

    display(){
        this.panoramaMaterial.apply();
        this.scene.pushMatrix();

        var camera = this.scene.camera.position;
        
        this.scene.translate(camera[0], camera[1], camera[2]);

        this.sphere.display();
        this.scene.popMatrix();
        this.scene.setDefaultAppearance();
    }

}


