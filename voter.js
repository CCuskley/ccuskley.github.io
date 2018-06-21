var matrixD,N,w,h,population;

function setup() {
  matrixD=50;
  N=matrixD*matrixD;
  w=600;
  h=600;
  population=[];
  createCanvas(w,h+100);
  colorMode(HSB, 360, 100,100);
  var ct=0;
  for (var i=0;i<matrixD;i++) {
    for (var j=0;j<matrixD;j++) {
      var dice=random()
      if (dice>0.25) {
        var at="c"
      } else {
        var at="a"
      }
      dice=random()
      if (dice>0.5) {
        var hue=100
      } else {
        var hue=300
      }
      population.push(new Agent("c",ct,i*(w/matrixD),j*(w/matrixD),random(360)))
      ct+=1;
    }
  }

  //console.log(population)
  frameRate(60);
}

function draw() {
  background(255)
  //fill(100,100,100);
  //ellipse(w/2,h/2,300,300);
  for (var i=0;i<population.length;i++) {
    population[i].show();
  }
  var s=Math.floor(random(population.length))
  population[s].updateSimilar();
  fill(0)
  textSize(20)
  text("t = "+frameCount.toString(),10,h+20)
  
}

function Agent(kind, matrixIndex, locx, locy, hue) {
  this.x=locx;
  this.y=locy;
  this.kind=kind;
  this.kind;
  this.hue=hue;
  this.ind=matrixIndex;
  this.sz=w/matrixD;

  this.show = function() {
    noStroke();
    fill(this.hue,80,80);
    rect(this.x,this.y,this.sz,this.sz);
    /*if (this.kind=="c") {
      ellipse(this.x+this.sz/2,this.y+this.sz/2, 10,10);
    } else {
      fill(0)
      rect((this.x+this.sz/2)-5,(this.y+this.sz/2)-5,10,10);
    }*/
  }

  //l=index-1, unless at left edge
  //r=index+1,unless at right edge
  //top=index-matrixD, unless at top edge
  //bottom=index+matrixD,unless at bottom edge
  this.giveHue=function() {
    return this.hue;
  }

  this.getPartners = function() {
    var posPartners =[];
      var l =this.ind-1;
      var r =this.ind+1;
      var t =this.ind-matrixD;
      var b=this.ind+matrixD;
      if (this.ind%matrixD == 0) {

      } else {
        posPartners.push(l)
      }

      if ((this.ind+1)%matrixD==0) {

      } else {
        posPartners.push(r)
      }

      if(t>=0) {
        posPartners.push(t)
      }

      if (b<population.length) {
        posPartners.push(b)
      } 
      return posPartners
  }

  this.updateBinary = function() {
    var posPartners=this.getPartners()
    var ri = Math.floor(random(posPartners.length))
    var partnerIndex =posPartners[ri];
    if (this.kind =="a") {
      var pHue=population[partnerIndex].giveHue()
      if (pHue==100) {
        this.hue=300;
      } else {
        this.hue=100;
      }
    }

    if (this.kind == "c") {
      var pHue=population[partnerIndex].giveHue()
      this.hue=pHue;

    }
  }

  this.updateSimilar = function() {

    var posPartners=this.getPartners()
    var partDistances=[]
    for (var i=0;i<posPartners.length;i++) {
      var partnerHue= population[posPartners[i]].giveHue()
      var degDist
      if (partnerHue>=this.hue) {
        degDist=partnerHue-this.hue;
      } else {
        degDist=this.hue-partnerHue
      }

      if (degDist>=180) {
        degDist=360-degDist;
      }
      partDistances.push(TWO_PI*(degDist/360))
    }

    var lowest = 0;
    for (var i = 1; i < partDistances.length; i++) {
      if (partDistances[i] < partDistances[lowest]) lowest = i;
    }

    if (this.kind =="a") {
      var pHue=population[partnerIndex].giveHue()
      if (pHue==100) {
        this.hue=300;
      } else {
        this.hue=100;
      }
    }

    if (this.kind == "c") {
      this.hue=population[lowest].giveHue()
    }

  }

  this.updateWinner =function() {
    var posPartners=this.getPartners()
    var ri = Math.floor(random(posPartners.length))
    var partnerIndex =posPartners[ri];
      
    if (this.kind =="a") {
      var newHue=population[partnerIndex].giveHue()-180
      if (newHue<0) {
        this.hue=360+newHue
      } else {
        this.hue=newHue;
      }
    }

    if (this.kind == "c") {
      var pHue=population[partnerIndex].giveHue()
      this.hue=pHue;
    }
  }
}