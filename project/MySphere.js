import {CGFobject} from '../../lib/CGF.js';

export class MySphere extends CGFobject {
	constructor(scene, slices, stacks, inverted, radius) {
		super(scene);

        this.slices = slices;
        this.stacks = stacks * 2;
        this.inverted = inverted;
        this.radius = radius;

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
        this.indices = [];
		this.normals = [];
		this.texCoords = [];

        var latAngle = Math.PI/this.stacks;
        var longAngle = 2*Math.PI/this.slices;
    

        for (var i = 0; i <= this.stacks; i++) {
            var radiusStack = Math.sin(i*latAngle);
            var heightStack = Math.cos(i*latAngle);
            
            for (var j = 0; j <= this.slices; j++) {
                var xCoord = Math.cos(j*longAngle) * radiusStack;
                var yCoord = heightStack;
                var zCoord = Math.sin(-(j*longAngle)) * radiusStack;

                this.vertices.push(xCoord*this.radius,yCoord*this.radius,zCoord*this.radius);
                if (this.inverted){
                    this.normals.push(-xCoord,-yCoord,-zCoord);
                }
                else{
                    this.normals.push(xCoord,yCoord,zCoord);
                }
                this.texCoords.push(j/this.slices, i/this.stacks);

                
                if (i < this.stacks && j < this.slices) {
                    var currentPoint = i * (this.slices+1) + j;
                    var nextPoint = currentPoint + this.slices + 1;

                    if (this.inverted){
                        this.indices.push(currentPoint, currentPoint + 1, nextPoint);
                        this.indices.push(nextPoint, currentPoint + 1, nextPoint + 1);
                    }         
                    else{
                        this.indices.push(currentPoint + 1, currentPoint, nextPoint);
                        this.indices.push(currentPoint + 1, nextPoint, nextPoint + 1);
                    } 
                    
                }
            }
        }
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

}


