//let freeze;
class Tendril {
	constructor(cBoundRad,coreSize,pos) {
		this.made=false
		this.cBoundRad=cBoundRad
		this.ghostRad=random(random(this.cBoundRad*0.7,this.cBoundRad-coreSize*1.2),random(this.cBoundRad+coreSize,this.cBoundRad*1.5+coreSize)),
		this.xOffsets=[]
		this.yOffsets=[]
		this.position=createVector(pos.x,pos.y)
		this.angle=atan2(this.position.y-windowHeight/2,this.position.x-windowWidth/2)
		for (var i=0;i<5;i++) {
			//used to be -10,10 - rollback if needed
			this.xOffsets.push(random(-10,10))
			this.yOffsets.push(random(-10,10))
		}
		let bBulb=random(0,1);
		this.bulbSize=bBulb>0.6
		this.bulbAngle=random(-0.3,0.3)
		if (this.bulbSize) {
			this.bulbSize=int(random(2,15))
		}
		//not currently in use; probably too high probability
		this.hasSplatter=bBulb>0.3&&bBulb<0.9;
		
		this.strokeW=random(3,7);
		this.currentBulb=1;
		this.currentSize=int(this.cBoundRad+1)
		if (this.ghostRad>this.cBoundRad) {
			//OUTIE
			this.innie=false
			this.maxSize=this.ghostRad-this.cBoundRad;
			this.currentSize=int(this.cBoundRad+1)
			
		} else {
			this.innie=true
			this.maxSize=this.cBoundRad-this.ghostRad;
			this.currentSize=int(this.cBoundRad-1)
		}

	}

	update(pos) {
		this.position.x=pos.x;
		this.position.y=pos.y;
		this.angle=atan2(this.position.y-windowHeight/2,this.position.x-windowWidth/2)
	}

	makeTendril() {
		let ghostEnd = createVector(windowWidth/2+this.currentSize*cos(this.angle+this.bulbAngle),
            windowHeight/2+this.currentSize*sin(this.angle+this.bulbAngle)
            )

		let coords = [
            {"x":lerp(this.position.x,ghostEnd.x,0.2)+this.xOffsets[0],"y":lerp(this.position.y,ghostEnd.y,0.2)+this.yOffsets[0]},
            {"x":lerp(this.position.x,ghostEnd.x,0.4)+this.xOffsets[1],"y":lerp(this.position.y,ghostEnd.y,0.4)+this.yOffsets[1]},
            {"x":lerp(this.position.x,ghostEnd.x,0.6)+this.xOffsets[2],"y":lerp(this.position.y,ghostEnd.y,0.6)+this.yOffsets[2]},
            {"x":lerp(this.position.x,ghostEnd.x,0.8)+this.xOffsets[3],"y":lerp(this.position.y,ghostEnd.y,0.8)+this.yOffsets[3]}
            //{"x":ghostEnd.x,"y":ghostEnd.y}
          ]
        noFill()
        stroke(255)
        let sw=this.strokeW
        strokeWeight(sw)
        beginShape();
        curveVertex(this.position.x-5,this.position.y+5)
        curveVertex(this.position.x-5,this.position.y+5)
        curveVertex(this.position.x,this.position.y)
        curveVertex(coords[0]["x"],coords[0]["y"])
        curveVertex(coords[1]["x"],coords[1]["y"])
        curveVertex(coords[1]["x"],coords[1]["y"])
        endShape()
        strokeWeight(sw-1)
        beginShape()
        curveVertex(coords[1]["x"],coords[1]["y"])
        curveVertex(coords[1]["x"],coords[1]["y"])
        curveVertex(coords[2]["x"],coords[2]["y"])
        curveVertex(coords[3]["x"],coords[3]["y"])
        curveVertex(coords[3]["x"],coords[3]["y"])
        endShape()
        strokeWeight(sw-2)
       	beginShape()
        curveVertex(coords[3]["x"],coords[3]["y"])
        curveVertex(coords[3]["x"],coords[3]["y"])
        curveVertex(lerp(this.position.x,ghostEnd.x,0.9),lerp(this.position.y,ghostEnd.y,0.9))
        curveVertex(ghostEnd.x,ghostEnd.y)
        curveVertex(ghostEnd.x,ghostEnd.y)
        endShape()

	}


	makeBulb() {
		noStroke()
        fill(255)
        let extendRad,ghostEnd;
        if (this.innie) {
        	extendRad=createVector(
	            windowWidth/2+(this.ghostRad-this.bulbSize)*cos(this.angle+this.bulbAngle),
	            windowHeight/2+(this.ghostRad-this.bulbSize)*sin(this.angle+this.bulbAngle)
         	)
        	ghostEnd=createVector(
	            windowWidth/2+(this.ghostRad)*cos(this.angle+this.bulbAngle),
	            windowHeight/2+(this.ghostRad)*sin(this.angle+this.bulbAngle)
         	)

        } else {
        	extendRad=createVector(
	            windowWidth/2+(this.ghostRad+this.bulbSize)*cos(this.angle+this.bulbAngle),
	            windowHeight/2+(this.ghostRad+this.bulbSize)*sin(this.angle+this.bulbAngle)
         	)
        	ghostEnd=createVector(
	            windowWidth/2+(this.ghostRad)*cos(this.angle+this.bulbAngle),
	            windowHeight/2+(this.ghostRad)*sin(this.angle+this.bulbAngle)
         	)
        }

        //console.log("extend",extendRad)
        //console.log("ghost",ghostEnd) 
        let lerpInc=1/this.currentBulb
        for (var b=0;b<this.currentBulb;b++) {
            circle(lerp(ghostEnd.x,extendRad.x,b*lerpInc),lerp(ghostEnd.y,extendRad.y, b*lerpInc),b+this.strokeW-2)
        }

	}

	grow() {
        this.makeTendril()
        
        if (this.bulbSize) {
        	//console.log("just makin a bulb", this.bulbSize)
        	if (this.innie && this.currentSize<=this.ghostRad) {
        		this.makeBulb()
        		if(this.currentBulb<this.bulbSize) {
        			this.currentBulb+=1
        		} else {
        			this.made=true
        		}
        	}
        	if (!this.innie && this.currentSize>=this.ghostRad) {
        		this.makeBulb()
        		if(this.currentBulb<this.bulbSize) {
        			this.currentBulb+=1
        		} else {
        			this.made=true
        		}
        	}
            //this.currentBulb+=1
          }
       	if (this.innie) {
       		if(this.currentSize>this.ghostRad) {
       			this.currentSize-=1
       		} else {
       			if (!this.bulbSize) {
       				this.made=true
       			}
       		}
       	} else {
       		if (this.currentSize<this.ghostRad) {
        		this.currentSize+=1;
        	} else {
        		if (!this.bulbSize) {
       				this.made=true
       			}
        	}
        }
	}

	shrink() {

		if (this.bulbSize && this.currentBulb>0) {
        	this.makeTendril()
        	this.makeBulb()
            this.currentBulb-=1
        
        } else {
        
	        if (this.innie) {
	        	//while the current endpoint is still inside the outer radius, extend it
	       		if(this.currentSize<this.cBoundRad) {
	       			this.makeTendril()
	       			this.currentSize+=1
	       		} 
	       	} else {
	       		//while the current radius is still outside the outer radius, make it smaller
	       		if (this.currentSize>this.cBoundRad) {
	       			this.makeTendril()
	        		this.currentSize-=1;
	        	}
        	}
        }







        
	}



}