/// INKS FROM: https://openprocessing.org/sketch/1434021

let foggyAir = []
let nFogs;
let t;
let c;
let cnv;
let fogParams;

///HEPTAPOD E VARS
let SEED;//=0;
let nFrames;// = 80;
let numCircles;// = 15;
const circles = [];
const simplex = new SimplexNoise();
let tc;

function preload() {
  fogParams = loadJSON('darkFog.json')
}
function setup() {
  c=600
  cnv = createCanvas(windowWidth,windowHeight);
  cnv.parent(tank)

  ///HEPTAPOD EASY SETUP

  //pixelDensity(1);
  nFrames=80
  numCircles=15
  SEED = SEED || floor(random(1000));
  //good ones: 844
  print(SEED);
  randomSeed(844);

  for (let i = 0; i < numCircles; i++) {
    circles.push(new Circle(i, 200, -1));
  }

  ///HEPTAPOD PARTICLE SETUP

  ///FOG SETUP
  nFogs = fogParams.nFogs;
  for (let i = 0; i < nFogs; i++) {
    //to then plant seeds
    console.log("trying to push a fog")
    foggyAir.push(new Fog(height / 3 + (i * height) / (1.5 * nFogs), i, fogParams.fogList[i]));
  }
  c = createVector(random(10, 60), random(10, 60), random(10, 60));
  noStroke();
}
function draw() {
  ///FOG DRAW
  background(c.x, c.y, c.z);
  t = frameCount / 1000; //time moves thought
  for (let i = 0; i < nFogs; i++) {
    //paint the trees
    foggyAir[i].display();
  }

  //HEPTAPOD E DRAW
  /*tc = (frameCount - 1) / nFrames;

  translate(width / 2, height / 2);
  circles.forEach((c, i) => {
    c.show(tc);
  });*/
}

class Fog {
  constructor(dy, i,fParams) {
    this.x = fParams.fogX;
    this.thickness = fParams.thickness;
    this.dy = dy;
    this.bend1 = fParams.bend1;
    this.bend2 = fParams.bend2;
    this.brouillard = fParams.veil;
    this.fCount = fParams.fCount
  }
  display() {
    fill(255, 255, 255, 2);
    //fog is but a breath coalescing to light
    for (let i = 0; i < this.fCount; i++) {
      circle(
        this.x + this.brouillard[i].x * sin(t + this.x + i * this.dy),
        this.dy -
          i / this.bend1 -
          this.thickness * 5 * abs(sin(t + i + this.x)),
        this.brouillard[i].z
      );
      circle(
        this.x + this.brouillard[i].x * sin(t + this.x + i * this.dy),
        this.dy -
          i / this.bend1 -
          this.thickness * 7 * abs(sin(t + i + this.x)),
        this.brouillard[i].z
      );
    }
  }
}

class Circle {
  constructor(i, r, dir) {
    this.dir = dir; // direction of rotation
    this.seed = random(10, 1000); // noise seed
    this.offset = random(TWO_PI); // location in the parametric equation
    this.part = 0.1 + 0.5 * pow(random(0.5), 2.0); // length of the part of the parametric curve
    this.radius = r + random(-2, 2); // radius
    this.displacement = random(10, 100); // intensity of displacement
    this.sw = random(1, 15); // strokeWeight
    this.alpha = random(1, 2.5); // alpha 
  }

  show(t) {
    const nbPoints = 1000;
    for (let i = 0; i < nbPoints; i++) {
      //let swspec=random(1,8)
      let p = i / nbPoints;
      let angle = this.offset + this.part * TAU * p;
      //let sw=2
      let noiseRadius = 0.5;
      let periods = 3;
      //      let noiseValue = noise((x + offset) * xScale, (y + offset) * yScale);

      let x = this.radius * cos(angle) +
        pow(p, 3.0) * this.displacement  * simplex.noise2D( this.seed + noiseRadius * cos(TWO_PI * (periods * p + t * this.dir)),noiseRadius * sin(TWO_PI * (periods * p + t * this.dir)));
      let y = this.radius * sin(angle) +
        pow(p, 3.0) * this.displacement * simplex.noise2D( 2 * this.seed + noiseRadius * cos(TWO_PI * (periods * p + t * this.dir)),noiseRadius * sin(TWO_PI * (periods * p + t * this.dir)));
      strokeWeight(this.sw);
      stroke(0, this.alpha * 25 * sin(PI * p));
      point(x, y);
    }
  }
}

