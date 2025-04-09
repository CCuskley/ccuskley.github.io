// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


class Particle {
  constructor(x, y,loadRadius,textPoint) {
    this.textAttractor=textPoint;
    this.msize=random(3,15);
    this.cBoundRad=loadRadius;

    //also for "vehicle"
    this.position = createVector(x, y);
    let vx = randomGaussian(0, 0.3);
    let vy = randomGaussian(-1, 0.3);

    //also for "vehicle"
    this.velocity = createVector(vx, vy);
    //also for "vehicle"
    this.acceleration = createVector(0, 0);

    //added for "vehicle"
    this.maxSpeed=random(3,8);
    this.turnRate=0.1
    this.approachDist=50//I don't think we. want thiis; we want to trigger approach
    //THIS COULD BE A PROBLEM...
    this.lifespan = random(150,250);
    this.circleBound=false;
    this.cSpeed=random(-0.05,0.05)
    this.angle=atan2(this.position.y-windowHeight/2,this.position.x-windowWidth/2)
    this.isRogue=false;
    this.nSize=0;
    this.nCircs=0;
    this.tendrilInfo=[];
    this.hasReset=false;
    this.textDist=dist(this.position,this.textAttractor)
    let dice= random(0,1)
    if (dice<0.002) {
      this.isRogue=true
      this.nSize=Math.round(random(20,this.cBoundRad/4));
      this.nCircs=this.nSize/5;
      for (var i=0;i<int(random(3,20));i++) {
        let bBulb=random(0,1)
        this.tendrilInfo.push({
          //choose randomly between a length that is inside:
          //minimum 70% of the inner radius, maximum slightly 
          "ghostRad":random(random(this.cBoundRad*0.7,this.cBoundRad-this.nSize*1.2),random(this.cBoundRad+this.nSize,this.cBoundRad*1.5+this.nSize)),
          "xOffsets":[random(-10,10),random(-10,10),random(-10,10),random(-10,10)],
          "yOffsets":[random(-10,10),random(-10,10),random(-10,10),random(-10,10)],
          "hasBulb":bBulb>0.8,
          "bulbSize":int(random(1,15)),
          "hasSplatter":bBulb>0.2&&bBulb<0.8,
          "bulbAngle":random(-0.3,0.3),
          "strokeW":random(3,7)
        })
        //choose a random point somewhere between a distance of 10 and 100 from the edge of the circle
        //create 5 random coordinates between the edge and this point
        //save this as lots of vectors
      }
    } else {
      this.isRogue=false
      this.nSize=Math.round(random(10,70));
      this.nCircs=this.nSize/5;
    }
  }

  run() {
    if(morphText) {
      this.seek()
    }
    this.update();
    this.show();
    
    //console.log(spew)
  }

  // Method to apply a force vector to the Particle object
  // Note we are ignoring "mass" here
  applyForce(force) {
    if (!this.circleBound && !morphText) {
      console.log("adding wind from emitter")
      this.acceleration.add(force);
    }
  }

  // Method to update position
  update() {
    

    if (dist(this.position.x,this.position.y,windowWidth/2,windowHeight/2)>this.cBoundRad) {
      
      //updateAngle?
      if(!this.circleBound) {
        this.angle=atan2(this.position.y-windowHeight/2,this.position.x-windowWidth/2)
      }
      this.circleBound=true;
    } else {
      this.velocity.add(this.acceleration);
    }

    this.position.add(this.velocity);
    this.acceleration.mult(0); // clear Acceleration
    if (morphText) {
      this.acceleration.add(createVector(0,0))
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed)
    }
    if (this.circleBound && !morphText) {
      this.position.x= windowWidth/2+this.cBoundRad*cos(this.angle)
      this.position.y= windowHeight/2+this.cBoundRad*sin(this.angle)
      this.angle+=this.cSpeed;
      this.velocity=createVector(0,0)
        if (this.cSpeed<0) {
          this.cSpeed+=0.001
        } else if (this.cSpeed>0) {
          this.cSpeed-=0.001
        }
    } 
  }
  seek() {
    //this.reset()
    //console.log(this.position)
    //console.log(this.textAttractor)
    let target=createVector(this.textAttractor.x,this.textAttractor.y)
    //let origin=this.position
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
  }

  // Method to draw
  show() {
    if (this.circleBound && !morphText) {
      
      fill(255)
      noStroke()
      
      if (this.isRogue && this.circleBound && !morphText) {
        
        circle(this.position.x,this.position.y,this.nSize)
        //make nCircs along each side
        for (var i=0;i<this.nCircs;i++) {
          circle(windowWidth/2+this.cBoundRad*cos(this.angle-(i*0.05)),windowHeight/2+this.cBoundRad*sin(this.angle-(i*0.05)),this.nSize-((i+1)*5))
          circle(windowWidth/2+this.cBoundRad*cos(this.angle+(i*0.05)),windowHeight/2+this.cBoundRad*sin(this.angle+(i*0.05)),this.nSize-((i+1)*5))
        }

        for (var tn=0;tn<this.tendrilInfo.length;tn++) {
          let ghostEnd=createVector(
            windowWidth/2+this.tendrilInfo[tn].ghostRad*cos(this.angle+this.tendrilInfo[tn].bulbAngle),
            windowHeight/2+this.tendrilInfo[tn].ghostRad*sin(this.angle+this.tendrilInfo[tn].bulbAngle)
            )
          //console.log(this.tendrilInfo[tn])
          let coords = [
            {"x":lerp(this.position.x,ghostEnd.x,0.2)+this.tendrilInfo[tn]["xOffsets"][0],"y":lerp(this.position.y,ghostEnd.y,0.2)+this.tendrilInfo[tn]["yOffsets"][0]},
            {"x":lerp(this.position.x,ghostEnd.x,0.4)+this.tendrilInfo[tn]["xOffsets"][1],"y":lerp(this.position.y,ghostEnd.y,0.4)+this.tendrilInfo[tn]["yOffsets"][1]},
            {"x":lerp(this.position.x,ghostEnd.x,0.6)+this.tendrilInfo[tn]["xOffsets"][2],"y":lerp(this.position.y,ghostEnd.y,0.6)+this.tendrilInfo[tn]["yOffsets"][2]},
            {"x":lerp(this.position.x,ghostEnd.x,0.8)+this.tendrilInfo[tn]["xOffsets"][3],"y":lerp(this.position.y,ghostEnd.y,0.8)+this.tendrilInfo[tn]["yOffsets"][3]},
            //{"x":ghostEnd.x,"y":ghostEnd.y}
          ]
          noFill()
          stroke(255)
          let sw=this.tendrilInfo[tn].strokeW
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
          if (this.tendrilInfo[tn].hasBulb) {
            noStroke()
            fill(255)
            if (this.tendrilInfo[tn].ghostRad>this.cBoundRad) {
              let extendRad=createVector(
                windowWidth/2+(this.tendrilInfo[tn].ghostRad+this.tendrilInfo[tn].bulbSize)*cos(this.angle+this.tendrilInfo[tn].bulbAngle),
                windowHeight/2+(this.tendrilInfo[tn].ghostRad+this.tendrilInfo[tn].bulbSize)*sin(this.angle+this.tendrilInfo[tn].bulbAngle)
              )
              let bSteps=this.tendrilInfo[tn].bulbSize
              let lerpInc=1/bSteps
              for (var b=0;b<bSteps;b++) {
                circle(lerp(ghostEnd.x,extendRad.x,b*lerpInc),lerp(ghostEnd.y,extendRad.y, b*lerpInc),b+sw-2)
              }
            } else {
              let extendRad=createVector(
                windowWidth/2+(this.tendrilInfo[tn].ghostRad-this.tendrilInfo[tn].bulbSize)*cos(this.angle+this.tendrilInfo[tn].bulbAngle),
                windowHeight/2+(this.tendrilInfo[tn].ghostRad-this.tendrilInfo[tn].bulbSize)*sin(this.angle+this.tendrilInfo[tn].bulbAngle)
              )

              let bSteps=this.tendrilInfo[tn].bulbSize
              let lerpInc=1/bSteps
              for (var b=0;b<bSteps;b++) {
                circle(lerp(ghostEnd.x,extendRad.x,b*lerpInc),lerp(ghostEnd.y,extendRad.y, b*lerpInc),b+sw-2)
              }
            }
          }
        }

        //choose a random point somewhere between a distance of 10 and 100 from the edge of the circle
        //create 5 random coordinates between the edge and this point
        //save this as lots of vectors
          //make this circle big, and then a few around it descending down to 5 on either end, at a varying rate
          ///make between 5 and 10 protrosions, randomly going in or out
          //make each protrosion either worm out, or worm and then end in a bulbous

      } else {
        circle(this.position.x,this.position.y,this.msize)
      }
    } else {
      if (morphText) {
        let myD=dist(this.position.x,this.position.y,this.textAttractor.x,this.textAttractor.y)
        //want to scale the dot so that it is it's msize and shrinks to 2 the closer it gets to the target
        //for now it's just 1
        circle(this.position.x,this.position.y,0.5)
      } else {
        tint(250, 50);
        imageMode(CENTER);
        image(img, this.position.x, this.position.y)
      };
    }
    // Drawing a circle instead
    // fill(255, lifespan);
    // noStroke();
    // circle(pos.x, pos.y, img.width);
  }

  // Is the particle still useful?
  isDead() {
    return false;
   //return (this.lifespan < 0.0);
  }
}
