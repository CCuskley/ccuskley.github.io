//Collision detection - Bouncing behavior

var circles,manlist;
var healthy, infected, sick;

var symptomLatency=200;


function setup() {
	createCanvas(800, 400);
	healthy=loadAnimation
	circles = new Group();
	manlist =[]
	var patient0=int(random(0,49))
	for(var i=0; i<50; i++){ 
		var circle = new CircleMan(i)
		manlist.push(circle)
		circles.add(circle.body)
	}
	manlist[patient0].body.changeAnimation("infected")
}



function draw() {
	background(255, 255, 255);
	circles.bounce(circles, transmitVirus);
	for (var m=0;m<manlist.length;m++) {
		manlist[m].checkState(frameCount)
	}


  //all sprites bounce at the screen edges
	for(var i=0; i<allSprites.length; i++) {
		var s = allSprites[i];
		if(s.position.x<0) {
			s.position.x = 1;
			s.velocity.x = abs(s.velocity.x)
		}

		if(s.position.x>width) {
			s.position.x = width-1;
			s.velocity.x = -abs(s.velocity.x);
		}

		if(s.position.y<0) {
			s.position.y = 1;
			s.velocity.y = abs(s.velocity.y);
		}

		if(s.position.y>height) {
			s.position.y = height-1;
			s.velocity.y = -abs(s.velocity.y);
		}
	}
	drawSprites();

}

function transmitVirus(circleA,circleB) {
	var aState=circleA.getAnimationLabel()
	var bState=circleB.getAnimationLabel()
	if (aState!=bState && (aState=="healthy" || bState=="healthy")) {
		if (aState=="healthy") {
	  ///a gets sick
			circleA.changeAnimation("infected")
		} else {
	  //b gets sick
			circleB.changeAnimation("infected")
		}
  	}
}

function CircleMan(myIndex) {


	this.body = createSprite(random(0, width), random(0, height),10);
	this.body.addAnimation('healthy', 'images/sprites/cell-1-sm.png')
	this.body.addAnimation('infected', 'images/sprites/infectedcell-1-sm.png')
	this.body.addAnimation('sick', 'images/sprites/sickcell-1-sm.png')
	this.body.setCollider('circle', -2, 2, 10);
	this.body.setSpeed(random(2, 3), random(0, 360));
	this.body.locIndex=myIndex
	this.infectionTime=false

	this.checkState = function(frameNow) {
		console.log("checking state at ",frameNow)
		var mystate=this.body.getAnimationLabel()
		if (mystate=="healthy") {
			//do nothing
		} else {
			if (this.body.infectionTime==false) {
				this.body.infectionTime=frameNow;
			} else {

				if (frameNow-this.body.infectionTime > symptomLatency) {
					this.body.changeAnimation("sick")
				}
		  	}
		}
	}

}