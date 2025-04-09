
let doneTendrils;
class Protrusion {
	constructor(x,y,loadRadius,textPoint) {
		this.textAttractor=textPoint;
		let hidex=random(windowWidth+400,windowWidth+500)
    	let hidey=random(10,windowWidth-10)
		this.hideTarget=createVector(hidex,hidey)
    	this.coreSize=int(random(20,loadRadius/4));
    	this.nCircs=int(this.coreSize/5)+1
    	this.actualCircs=0
    	this.allmaxed=false;
    	this.cBoundRad=loadRadius;
    	this.position=createVector(x,y)
    	this.velocity=createVector(randomGaussian(0,0.3),randomGaussian(-1,0.3))
    	this.acceleration=createVector(0,0)
    	this.maxSpeed=random(5,10)
    	this.turnRate=0.2;
    	this.approachDist=random(30,60)
    	this.circleBound=false;
    	this.cSpeed=random(-0.05,0.05)
    	this.angle=atan2(this.position.y-windowHeight/2,this.position.x-windowWidth/2)
    	//is this used?
    	this.textDist=dist(this.position,this.textAttractor)
    	this.currentSizes=[]
    	this.circSizes=[]
    	this.currentSizes.push(0)
    	this.circSizes.push(this.coreSize)
    	for (var i=0;i<this.nCircs;i++) {
    		let sz=this.coreSize-((i+1)*5);
    		if (sz>0) {
		    	this.circSizes.push(sz)
		    	this.currentSizes.push(0)
		    }
		}


    	this.tendrils=[]
    	this.tendrilsLive=true;
    	this.isSeeking=false;
    	for (var i=0;i<int(random(3,15));i++) {
    		this.tendrils.push(new Tendril(this.cBoundRad,this.coreSize,this.position));
    	}
    	this.tendrilsMade=false
	}

	run(rtype) {
		if (rtype=="spew") {
			this.update();
			if (this.circleBound) {
				this.grow()
			} else {
				this.smoke()
			}
		} else if(rtype=="text") {
			this.isSeeking=true
			this.seek(rtype)
			/*if (this.currentSize==1) {
				this.isSeeking=true
				this.seek(rtype)
			} else {
				this.shrink()
			}*/
		} else {
			this.isSeeking=true
			this.seek(rtype)
		}

	}
	update() {
		if (!this.tendrilsMade) {
			let madetendrils=0
			for (var i=0;i<this.tendrils.length;i++) {
				if (this.tendrils[i].made) {
					madetendrils+=1
				}
			}
			if (this.tendrils.length==madetendrils) {
				this.tendrilsMade=true;
				doneTendrils+=1
			}
		}
		if (dist(this.position.x,this.position.y,windowWidth/2,windowHeight/2)>this.cBoundRad) {
      
      		//updateAngle?
      		//if we're not circleBound yet, update the angle?
      		//but don't we need to do this at all times?
		    if(!this.circleBound) {
		        this.angle=atan2(this.position.y-windowHeight/2,this.position.x-windowWidth/2)
		      }
      		this.circleBound=true;
    	} else {
      		this.velocity.add(this.acceleration);
    	}

    	this.position.add(this.velocity);
    	this.acceleration.mult(0); // clear Acceleration
    	if (this.circleBound && !this.isSeeking) {
	      this.position.x= windowWidth/2+this.cBoundRad*cos(this.angle)
	      this.position.y= windowHeight/2+this.cBoundRad*sin(this.angle)
	      this.angle+=this.cSpeed;
	      this.velocity=createVector(0,0)
	      if (this.cSpeed<0) {
            this.cSpeed+=0.001
          } else if (this.cSpeed>0) {
            this.cSpeed-=0.001
        	}
	        /*
	        freeze suppressed for live online version
	        if (freeze) {
        		this.cSpeed=0
      		} else {
        		if (this.cSpeed<0) {
            		this.cSpeed+=0.001
          		} else if (this.cSpeed>0) {
            		this.cSpeed-=0.001
        		}
      		}*/
	    }
	    //should go at end of seek?
	    /*if (morphText) {
	      this.acceleration.add(createVector(0,0))
	      this.velocity.add(this.acceleration);
	      this.velocity.limit(this.maxSpeed)
	    }*/
	    for (var t=0;t<this.tendrils.length;t++) {
			this.tendrils[t].update(this.position)
		}


	}

	grow() {
		fill(255)
		let maxedCircles=0;
		for (var i=0;i<this.circSizes.length;i++) {
			let csz=this.currentSizes[i]
			if (i==0) {
				circle(this.position.x,this.position.y,csz)
			} else {
				circle(
		          	windowWidth/2+this.cBoundRad*cos(this.angle-(i*0.05)),
		          	windowHeight/2+this.cBoundRad*sin(this.angle-(i*0.05)),
		          	csz)
		        circle(
		        	windowWidth/2+this.cBoundRad*cos(this.angle+(i*0.05)),windowHeight/2+this.cBoundRad*sin(this.angle+(i*0.05)),csz)
			}
			if (this.circSizes[i]==this.currentSizes[i]) {
				maxedCircles+=1
			} else {
				this.currentSizes[i]+=1
			}
		}
		if (maxedCircles==this.circSizes.length) {
			//make the tendrils
			for (var t=0;t<this.tendrils.length;t++) {
				this.tendrils[t].grow()
			}
		}
		/*circle(this.position.x,this.position.y,this.currentSize)
		//if the protrusion is done protruding, grow the tendrils
		if (this.currentSize==this.coreSize&&this.actualCircs==this.nCircs) {
			//grow the tendrils
			///also do in show?
			for (var t=0;t<this.tendrils.length;t++) {
				this.tendrils[t].grow()
			}

		}
		//if the core circle is as big as it's going to get, start drawing the rest of the protrusion
		if (this.currentSize>=this.coreSize) {
			fill(255)
			//let circSizes=[]
		    for (var i=0;i<this.actualCircs;i++) {
		    	//circSizes.push(this.coreSize-((i+1)*5))

		        circle(
		          	windowWidth/2+this.cBoundRad*cos(this.angle-(i*0.05)),
		          	windowHeight/2+this.cBoundRad*sin(this.angle-(i*0.05)),
		          	this.coreSize-((i+1)*5))
		        circle(
		        	windowWidth/2+this.cBoundRad*cos(this.angle+(i*0.05)),windowHeight/2+this.cBoundRad*sin(this.angle+(i*0.05)),this.coreSize-((i+1)*5))
		    }
		}

	    if (this.currentSize<this.coreSize) {
			this.currentSize+=1
		}
		if (this.actualCircs<this.nCircs) {
			this.actualCircs+=1
		}*/
	}

	shrink() {
		circle(this.position.x,this.position.y,this.currentSize)
		//shrink the tendrils first
		if (this.tendrilsLive) {
			let activeTendrils=0;
			for (var t=0;t<this.tendrils.length;t++) {
				//first find out if it's an innie, or an outie.
				if (this.tendrils[t].innie && this.tendrils[t].currentSize<this.cBoundRad) {
					//tendril is still there
					activeTendrils+=1
					this.tendrils[t].shrink()

				} 
				if (!this.tendrils[t].innie && this. tendrils[t].currentSize>this.cBoundRad) {
					activeTendrils+=1
					this.tendrils[t].shrink()
				}
			}
			if (activeTendrils==0) {
				console.log("found no active tendrils")
				this.tendrilsLive=false
			}
		}

		//if tendrils are shrunk, shrink protrusion
		if (this.currentSize>1 && !this.tendrilsLive) {
			if (this.actualCircs>0) {
			    for (var i=0;i<int(this.actualCircs);i++) {
			        circle(
			          	windowWidth/2+this.cBoundRad*cos(this.angle-(i*0.05)),
			          	windowHeight/2+this.cBoundRad*sin(this.angle-(i*0.05)),
			          	this.nSize-((i+1)*5))
			        circle(windowWidth/2+this.cBoundRad*cos(this.angle+(i*0.05)),windowHeight/2+this.cBoundRad*sin(this.angle+(i*0.05)),this.nSize-((i+1)*5))
			    }
		    	this.actualCircs-=1
		    } else {
		    	this.currentSize-=1
		    	console.log("size shrunk to ",this.currentSize)
		    }
		}
		//need this?
		if (this.currentSize==1) {
			this.isShrunk=true;
		}
	}

	seek(t) {
		//add some alpha?
		let target;
		if (t=="text") {
      		target=createVector(this.textAttractor.x, this.textAttractor.y)
      		noStroke()
      		fill(255)
      		circle(this.position.x,this.position.y,3)
    	} else {
      		target=this.hideTarget;
      		noStroke()
      		fill(255)
        	circle(this.position.x,this.position.y,3)
      		
      
    	}
    	let desired=p5.Vector.sub(target,this.position);
    	let d=desired.mag();
    	if (d<this.approachDist) {
      		desired.setMag(map(d,0,this.approachDist,0,this.maxSpeed));
    	} else {
      		desired.setMag(this.maxSpeed)
    	}
    	let steer=p5.Vector.sub(desired,this.velocity);
    	steer.limit(this.turnRate)
    	this.acceleration.add(steer);
    	this.velocity.add(this.acceleration)
    	//update goes in different spot for this...
    	this.update()
    	//does this go here? was in update at end....
    	this.acceleration.add(createVector(0,0))
	    this.velocity.add(this.acceleration);
	    this.velocity.limit(this.maxSpeed)

  	}

  	smoke() {
  		//this.update()
  		//not realistic enough
  		//tint(50, this.lifespan);
        //imageMode(CENTER);
        //image(img, this.position.x, this.position.y)
  	}

  	applyForce(force) {
  		this.acceleration.add(force);
  	}
}

