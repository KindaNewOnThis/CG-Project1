import { CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, Ymais, Zmais, Xmais, Zmenos, Xmenos, Ymenos) {
        super(scene);
        this.Ymais = new CGFtexture(this.scene, Ymais);
        this.Zmais = new CGFtexture(this.scene, Zmais);
        this.Xmais = new CGFtexture(this.scene, Xmais);
        this.Zmenos = new CGFtexture(this.scene, Zmenos);
        this.Xmenos = new CGFtexture(this.scene, Xmenos);
        this.Ymenos = new CGFtexture(this.scene, Ymenos);
        this.initBuffers();
    }
    initBuffers() {
        this.scene.quad = new MyQuad(this.scene);

        //Material
        this.MyUnitCubeQuadMaterial = new CGFappearance(this.scene);
        this.MyUnitCubeQuadMaterial.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.MyUnitCubeQuadMaterial.setDiffuse(0.9, 0.9, 0.9, 1.0);
        this.MyUnitCubeQuadMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.MyUnitCubeQuadMaterial.setShininess(10.0);
        this.MyUnitCubeQuadMaterial.loadTexture('images/default.png');
        this.MyUnitCubeQuadMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }
    display() {

         //LEFT
         this.scene.pushMatrix();
         this.scene.rotate(-Math.PI/2, 0, 1, 0);
         this.scene.translate(0.0, -0.5, 0.0);
         this.scene.rotate(-Math.PI/2, 0, 0, 1);
         this.scene.rotate(Math.PI/2, 0, 1, 0);
         this.MyUnitCubeQuadMaterial.setTexture(this.Ymenos);
         this.MyUnitCubeQuadMaterial.apply();
         this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
         this.scene.quad.display();
         this.scene.popMatrix();

        //RIGHT
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0.0, 0.5, 0.0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.MyUnitCubeQuadMaterial.setTexture(this.Ymais);
        this.MyUnitCubeQuadMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();

        //BOTTOM
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.MyUnitCubeQuadMaterial.setTexture(this.Zmenos);
        this.MyUnitCubeQuadMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();

        //FRONT
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.0, 0.0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.MyUnitCubeQuadMaterial.setTexture(this.Xmais);
        this.MyUnitCubeQuadMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();

        //BACK
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.0, 0.0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.MyUnitCubeQuadMaterial.setTexture(this.Xmenos);
        this.MyUnitCubeQuadMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();


        //TOP
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, 0.5);
        this.MyUnitCubeQuadMaterial.setTexture(this.Zmais);
        this.MyUnitCubeQuadMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();
        
    }
}