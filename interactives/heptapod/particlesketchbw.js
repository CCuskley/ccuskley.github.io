///fog

let foggyAir = []
let t;
//let c;
//let cnv;
let fogParams;
let nFogs;
let morphText;
let particlePoints;
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Smoke Particle System

// A basic smoke effect using a particle system
// Each particle is rendered as an alpha masked image

let emitters=[];
let img;
let cloc;
let csize;
let speed=0.05
let angl;
let spew;
let splatterlocs=[];

let font;
let points;
let quotes=[];
let quotePoints=[];

function preload() {
  img = loadImage("particlewhite.png");
  //fogParams = loadJSON('darkFog.json')
  font = loadFont('ReenieBeanie-Regular.ttf');
}

function setup() {
  textAlign(CENTER,CENTER)
  particlePoints=0
  quotes.push("From the beginning,")
  quotes.push("I knew my destination")
  quotes.push("and I chose my route accordingly.")
  //quotes.push("Something else.")
  for (var q=0;q<quotes.length;q++) {
    let fpoints=font.textToPoints (quotes[q],
      windowWidth/4,(windowHeight/2)+q*50,50,{sampleFactor:0.5,simplifyThreshold:0})
    for (var f=0;f<fpoints.length;f++) {
      quotePoints.push(fpoints[f])
    }
  }



  //nFogs=fogParams.nFogs


  createCanvas(windowWidth,windowHeight);
  //Foggy background
  //for (let i = 0; i < nFogs; i++) {
    //to then plant seeds
  //  console.log("trying to push a fog")
  //  foggyAir.push(new Fog(height / 3 + (i * height) / (1.5 * nFogs), i, fogParams.fogList[i]));
  //}
  //c = createVector(random(10, 60), random(10, 60), random(10, 60));
  //console.log(c)

  //Particle system for heptapod
  
  cloc=createVector(windowWidth/2,windowHeight/2)
  csize=windowWidth/3
  console.log("radius is",csize/2)
  emitters.push(new Emitter(width / 2, height/2));
  emitters.push(new Emitter(width / 2, height/2));
  emitters.push(new Emitter(width / 2, height/2));
  angl=atan2(mouseY-windowHeight/2,mouseX-windowWidth/2)
  spew=true;

  //choose some random number of particles
  //when the mouseis clicked,
  //every particle that is circleBound becomes a inkSplotch
  //some random number of ink splotches resize and make a random trail
}

function draw() {
  // Try additive blending!
  // You also need clear or else the colors will accumulate between frames
  //blendMode(ADD);
  //clear();
  //console.log(mouseX,mouseY)
  //DRAW FOG
  background(0);
  noStroke()
  /*t = frameCount / 1000; //time moves thought
  for (let f = 0; f < fogParams.nFogs; f++) {
    //paint the trees
    foggyAir[f].display();
  }
*/

  /*let dx = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(dx, 0);
  emitter.applyForce(wind);
  emitter.run();
  emitter.addParticle();*/
  if (!spew) {
    stroke(255);
    strokeWeight(3)
    noFill();
    //if(!morphText) {
    //  circle(cloc.x,cloc.y,csize)
    //}
    //add random splatter and arcs
  }
  //angl=angl+speed
  //let cx=(windowWidth/2)+((csize/2)*cos(angl))
  //let cy=(windowHeight/2)+((csize/2)*sin(angl))
  //circle(cx,cy, 50,50)

  let winds = [createVector(-0.07, -0.07),createVector(0.07, -0.07),createVector(0,0.1)]
  for (let i=0;i<emitters.length;i++) {
    emitters[i].applyForce(winds[i]);
    emitters[i].run();
    if (spew) {
      emitters[i].addParticle(csize/2,createVector(quotePoints[particlePoints].x,quotePoints[particlePoints].y));
      //use particlepoints to add a force?
      particlePoints+=1
      emitters[i].addParticle(csize/2,createVector(quotePoints[particlePoints].x,quotePoints[particlePoints].y));
      //use particlepoints to add a force?
      particlePoints+=1
    }
  }
  if (particlePoints>=quotePoints.length) {
    spew=false;
  }
  /*for (var j=0;j<quotePoints.length;j++) {
      circle(quotePoints[j].x,quotePoints[j].y, 2);
  }*/

}

function mousePressed() {
  morphText=true;
}



