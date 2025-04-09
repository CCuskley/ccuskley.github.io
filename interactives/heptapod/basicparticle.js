class Particle {
  constructor(x, y,loadRadius,textPoint,isVisible) {
    this.isVisible=isVisible
    this.textAttractor=textPoint;
    this.msize=random(3,15);
    this.cBoundRad=loadRadius;
    let hidex=random(windowWidth+400,windowWidth+500);
    let hidey=random(10,windowWidth-10);
    this.hideTarget=createVector(hidex,hidey);
    this.position = createVector(x, y);
    this.velocity = createVector(randomGaussian(0,0.3),randomGaussian(-1,0.3))
    this.acceleration = createVector(0, 0);
    this.maxSpeed=random(5,10);
    this.turnRate=0.2
    this.approachDist=50
    this.circleBound=false;
    this.cSpeed=random(-0.05,0.05)
    this.isSeeking=false;
    this.angle=atan2(this.position.y-windowHeight/2,this.position.x-windowWidth/2)
  }

  run(rtype) {
    //will calling this here conflict with seek?
    if (rtype=="spew") {
      this.update()
      if (this.isVisible) {
        if (this.circleBound) {
          this.show()
        } else {
          this.smoke()
        }
      }
    } else {
      this.isSeeking=true
      this.seek(rtype)
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
    /*if (morphText) {
      this.acceleration.add(createVector(0,0))
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed)
    }*/
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
    //this.isSeeking=true
    
    
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

  // Method to draw
  //if this is being called, it is already circleBound
  show() {
    //this.update()

      fill(255)
      noStroke()
      circle(this.position.x,this.position.y,this.msize)
    }

  smoke() {
    //not realistic enough
      fill(255)
      noStroke()
      circle(this.position.x,this.position.y,2)
  }

  applyForce(force) {
      if(!this.isSeeking) {
        this.acceleration.add(force);
      }
    }



}