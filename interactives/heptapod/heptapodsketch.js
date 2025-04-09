

let foggyAir = []
let t;
let morphText;
let particlePoints;
let emitters=[];
let img;
let cloc;
let csize;
let speed=0.05
let angl;
let spew;
let splatterlocs=[];
let protrusions=[];
let font;
let points;
let quotes=[];
let quotePoints=[];
let textDisplayStart;
let winds;
let allquotes;
let currentQuote;
let freeze;
let tendrilDelay;
let delayStart;

function preload() {
	////sm_img=loadImage("particlewhite.png")
  	img = loadImage("particlewhitebig.png");
  	font = loadFont('ReenieBeanie-Regular.ttf');
  	allquotes =loadJSON('quotes.json')
}

function setup() {
	delayStart=false
	doneTendrils=0
	console.log(quotePoints)
	createCanvas(windowWidth,windowHeight);
	background(0)
  	particlePoints=0
  	currentQuote=0;
  	morphText=true;
  	console.log(allquotes["quotes"][currentQuote])
  	quotePoints=setQuote(allquotes["quotes"][currentQuote])
  	csize=windowWidth/3
  	emitters.push(new Emitter(width / 2, height/2));
  	emitters.push(new Emitter(width / 2, height/2));
  	emitters.push(new Emitter(width / 2, height/2));
  	spew=true;
  	let nprotrusions = int(random(2,int(quotePoints.length/500)));
  	//I don't really want these to be random, i want them to be every x particles between 500 and quotePoints.length-1000
  	let animInterval=Math.floor((quotePoints.length-2000)/nprotrusions)
  	for (var n=0;n<nprotrusions;n++) {
			protrusions.push(500+n*animInterval)
		}
	console.log(protrusions)
	

	//frameRate(22)
  
}

function setQuote(quotes) {
	//clear particles; should make screen go black
	//emitters=[]
	//quotePoints=[]
	let ybase=random(300,windowHeight-300)
	for (var q=0;q<quotes.length;q++) {
		console.log(quotes[q])
	    let fpoints=font.textToPoints (quotes[q],
	      random(50,windowWidth/3),ybase+q*70,70,{sampleFactor:0.5,simplifyThreshold:0})
	    for (var f=0;f<fpoints.length;f++) {
	      quotePoints.push(fpoints[f])
	    }
	}
	return(quotePoints)
}

function draw() {

  	background(0);
  	winds = [createVector(-2, -2),createVector(2, -2),createVector(0,2)]
	  for (let i=0;i<emitters.length;i++) {
	    	
	    	if (spew) {
	   
	    		//emitters[i].applyForce(winds[i]);
	    		emitters[i].run("spew");
	    	} else {
	    		noStroke()
		    	fill(255)
	    		if(morphText) {
						emitters[i].run("text")
	    		} else {
	    			emitters[i].run("flee")
	    		}
	    	}
	    }

	  /*if (doneTendrils==protrusions.length && spew && !freeze && !delayStart) {
	  	tendrilDelay=frameCount
	  	delayStart=true
	  }
	  if (frameCount-tendrilDelay>=120 && spew && particlePoints<quotePoints.length-50) {
	  	freeze=true;
	  	//circle(40,40,100)
	  }*/
		if (spew) {
			
			//console.log("trying to spew")
			if (particlePoints<quotePoints.length) {
		    	if (protrusions.includes(particlePoints)) {
		    		emitters[0].addParticle(csize/2,createVector(quotePoints[particlePoints].x,quotePoints[particlePoints].y),true,true);
		    	} else {
		    		emitters[0].addParticle(csize/2,createVector(quotePoints[particlePoints].x,quotePoints[particlePoints].y),false,particlePoints<quotePoints.length-1500);
		    	}
		    	//apply force only to the particle just created here
		    	emitters[0].particles[emitters[0].particles.length-1].applyForce(createVector(random(random(-2,-1),random(1,2)),random(random(-2,-1),random(1,2))))
		    }

	    	particlePoints+=1
	    	if (particlePoints>=quotePoints.length) {
		    	spew=false;
		  	}

		  	if (particlePoints<quotePoints.length) {
			  	if (protrusions.includes(particlePoints)) {
		    		emitters[1].addParticle(csize/2,createVector(quotePoints[particlePoints].x,quotePoints[particlePoints].y),true,true);
		    	} else {
		    		emitters[1].addParticle(csize/2,createVector(quotePoints[particlePoints].x,quotePoints[particlePoints].y),false,particlePoints<quotePoints.length-1500);
		    	}
		    	emitters[1].particles[emitters[1].particles.length-1].applyForce(createVector(random(random(-2,-1),random(1,2)),random(random(-2,-1),random(1,2))))
		    }
	    	particlePoints+=1
	    	if (particlePoints>=quotePoints.length) {
		    	spew=false;
		  	}

		  	if (particlePoints<quotePoints.length) {
			  	if (protrusions.includes(particlePoints)) {
		    		emitters[2].addParticle(csize/2,createVector(quotePoints[particlePoints].x,quotePoints[particlePoints].y),true,true);
		    	} else {
		    		emitters[2].addParticle(csize/2,createVector(quotePoints[particlePoints].x,quotePoints[particlePoints].y),false,particlePoints<quotePoints.length-1500);
		    	}
		    	emitters[2].particles[emitters[2].particles.length-1].applyForce(createVector(random(random(-2,-1),random(1,2)),random(0,random(1,2))))
		    	particlePoints+=1
		    	if (particlePoints>=quotePoints.length) {
			    	spew=false;
			  	}
			}
		}

	}

function keyPressed() {
  if (key === 'f') {
    // disperse text
    morphText=false
  }
  if (key === "j") {
  	//should clear?
  	//console.log("trying to kill particles")
    emitters=[]
    currentQuote+=1
    particlePoints=0
    if (currentQuote<allquotes["quotes"].length) {
    	//console.log("setting new quote etc")
    	freeze=false;
    	doneTendrils=0
    	quotePoints=[]
    	quotePoints=setQuote(allquotes["quotes"][currentQuote]);
    	protrusions=[]
	  	let nprotrusions = int(random(2,int(quotePoints.length/500)));
	  	//I don't really want these to be random, i want them to be every x particles between 500 and quotePoints.length-1000
	  	let animInterval=Math.floor((quotePoints.length-2000)/nprotrusions)
	  	for (var n=0;n<nprotrusions;n++) {
				protrusions.push(500+n*animInterval)
			}
    	emitters.push(new Emitter(width / 2, height/2));
  		emitters.push(new Emitter(width / 2, height/2));
  		emitters.push(new Emitter(width / 2, height/2));
  		spew=true;
  		morphText=true;
  		fill(255)
  		stroke(255)
    } else {
    	fill(255)
    	text("FIN",windowWidth/2,windowHeight/2)
    }
  }
}








