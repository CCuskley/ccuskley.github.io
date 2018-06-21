
var cx;
var cy;
var N;
var L;
var tester;
var popul;
var tenWindow=[];
var lgRad; 
var frameSlider;
var typeButton;
var drawType="words";
var timeStamp=0;
var nameList =[];
var agreement;
var agentSize;
var mgn;
var eyeMgn;
var eyeRange;
var tMax;
var bottomY;
var startFrame;
var agentMax;
var acrossPop;
var interRate;

function preload() {
  
  for (var i = 0; i<50; i++) {
    var thisWord=makeWord();
    while (testDup(thisWord,nameList)) {
      thisWord=makeWord();
    }
    nameList.push(thisWord);
  }
  agentMax=(PI*(800/8)*2)/12;
  
}
var innerWidth = 800;
var cnv;
function setup() {
  cnv = createCanvas(1000,700);
  //cnv.position(325,175)
  cnv.parent("#ngcontain")
  colorMode(HSB, 360,100,100);
  background(0,0,100);
  textSize(10);
  lgRad=innerWidth/8;
  cx=((innerWidth-innerWidth/4)/2)+30;
  cy=((height-height/4)/2);
  bottomY=cy+height/3;
  popul=[];
  acrossPop=[];
  N=10;
  meaningHues=[330,360,30,60,90,120,150,180,210,240,270,300];
  L=7;
  setParams();
  startFrame=0;
  frameSlider=createSlider(5,65,35);
  frameSlider.size(width/10);
  frameSlider.position(innerWidth-75,cy-(height/3)+15);
  agentSlider=createSlider(5,30);
  agentSlider.size(width/10);
  agentSlider.position(innerWidth-75,100);
  meaningSlider=createSlider(1,11);
  meaningSlider.size(width/10);
  meaningSlider.position(innerWidth-75,150);
  meaningSlider.value(L);
  agentSlider.value(N);
  resetButton=createButton("Restart");
  resetButton.position(innerWidth-75,200);
  resetButton.mousePressed(resetSim);
  frameRate(30)
  interRate="30"
}

function draw() {
  interRate=frameSlider.value();
  frameRate(frameSlider.value());
  fill(0,0,100);
  noStroke();
  rect(0,0,width,10+height-height/4)
  var s= randInt(0,N-1);
  var h= randInt(0,N-1);
  var t= randInt(0,L-1);
  while (s==h) {
    h = randInt(0,N-1);
  }
  var result=inter(s,h,t);
  for (var i = 0; i<N; i++) {
    popul[i].drawSelf(color(0,0,100));
    popul[i].drawVocab();
  }
  popul[s].drawSelf(color(0,0,15));
  popul[h].drawSelf(color(0,0,15));
  line(popul[s].xloc,popul[s].yloc,popul[h].xloc,popul[h].yloc);
  if (frameCount-startFrame<50) {
    tenWindow.push(result);
  } else {
    tenWindow.shift();
    tenWindow.push(result)
  }
  var totSuc = 0;
  for (var i=0; i<tenWindow.length; i++) {
    totSuc+=tenWindow[i];
  }
  var sucRate=totSuc/tenWindow.length;
  avgBar(sucRate);
  if (frameCount%100==0) {
    for (var i =0; i<L; i++) {
      if (testAgreement(i)) {
        agreement[i]=true;
      }
    }
  }
  fill(0);
  textAlign(LEFT);
  textSize(20)
  text("Interactions/sec",innerWidth-100,cy-(height/3));
  text("Meanings", innerWidth-100,140);
  text("Agents", innerWidth-100,90);
  text(meaningSlider.value(),innerWidth+40,155);
  text(agentSlider.value(), innerWidth+40,105);
  text(interRate,innerWidth+40,cy-(height/3)+25);
  if (frameCount-startFrame>tMax) {
    resetSim();
  }
  
}

function resetSim() {
  background(0,0,100);
  popul=[];
  tenWindow=[];
  acrossPop=[];
  L=meaningSlider.value();
  N=agentSlider.value();
  setParams();
  startFrame=frameCount;
  
}

function setParams() {
  agreement=[false, false, false, false, false, false, false, false];
  tMax=N*L*30;
  agentSize=(PI*lgRad*2)/N;
  if (agentSize>agentMax) {
    agentSize=agentMax;
  }
  mgn=agentSize/5;
  eyeMgn=agentSize/10;
  eyeRange=agentSize-(2*eyeMgn);
  for (var i = 0; i<N; i++) {
    var angle = i*TWO_PI/N;
    var x = (cx)+cos(angle)*lgRad;
    var y = (cy)+sin(angle)*lgRad;
    popul[i]= new Agent(x,y,L,agentSize,angle);
  }
  for (var i = 0; i<L;i++) {
    acrossPop[i]= new MeaningAcrossPop();
  }
}

function testAgreement(vocIndex) {
  var allAgree=true;
  for (var i = 1; i<N; i++) { 
    if (popul[i].vocab[vocIndex].hasNames() == false || popul[i-1].vocab[vocIndex].hasNames() == false) {
      allAgree=false;
    } else if (popul[i].vocab[vocIndex].topLabel()!=popul[i-1].vocab[vocIndex].topLabel()) {
      allAgree = false;
    }
  }
  return allAgree;
}

function avgBar(rate) {
  //for each meaning (first L in meaning hues list)
  //get a successrate across the population, write it in yrange

  stroke(0,25,25);
  strokeWeight(0.5);
  var graphTop=(height-height/4)+15;
  var graphBottom=height-20;
  line(20,graphTop,20,graphBottom+2);
  line(20,graphBottom+2,750,graphBottom+2);
  noStroke()
  var timeRange=750-20;
  var timeProp=(frameCount-startFrame)/tMax;
  var thexloc=20+(timeRange*timeProp);
  var sucYRange = graphBottom-graphTop;
  for (var i = 0; i<L; i++) {
    var theyloc=(height-20)-acrossPop[i].successRate*sucYRange;
    fill(meaningHues[i],100,100,60);
    ellipse(thexloc,theyloc,4,4);
  }
  var topY = cy-height/3;
  var yrange = bottomY-topY;
  fill(347,59,73,60);
  rect(innerWidth-115,topY-5,7,yrange);
  var sucLen=yrange*rate;
  var top=bottomY-sucLen;
  fill(125,100,45,100);
  rect(innerWidth-115,top-5,7,sucLen);
  fill(0);
  textSize(8);
  textAlign(CENTER);
  var theIntNum=frameCount-startFrame;
  textSize(20)
  text("Time (N interactions): "+round(theIntNum/agentSlider.value()),innerWidth-115,bottomY+20);
}


function updateAgent(a,t,utt,outcome) {
  if (outcome==false) {
    if (popul[a].vocab[t].hasLabel(utt)) {
      popul[a].vocab[t].updateLabel(utt,outcome);
    } else {
      popul[a].vocab[t].addLabel(utt,outcome);
    }
  } else {
    popul[a].vocab[t].purge(utt);
  }
  popul[a].updateRate(outcome);
  popul[a].drawVocab();
}

function inter(s,h,t) {
  var utt;
  var outcome;
  if (popul[s].vocab[t].hasNames()) {
    utt=popul[s].vocab[t].topLabel();
  } else {
    utt=nameList[randInt(0,nameList.length-1)];
  }

  outcome = popul[h].vocab[t].hasLabel(utt);//if hearer has the label uttered, outcome is "true"/positive
  acrossPop[t].update(outcome);
  updateAgent(s,t,utt,outcome);
  updateAgent(h,t,utt,outcome);
  return outcome;
}


function testDup(item, lst) {
  var res = false;
  for (var i = 0; i<lst.length; i++) {
    if (item===lst[i]){
      res=true;
    }
  }
  return res;
}

function makeWord() {
  var posCons = ["r","g","d","s","m","k","l"];
  var posVows = ["a","e","i","o","u"];
  return posCons[randInt(0,posCons.length-1)]+posVows[randInt(0,posVows.length-1)]+posCons[randInt(0,posCons.length-1)]+posVows[randInt(0,posVows.length-1)];

}

function randInt(minVal,maxVal) {
  return Math.floor(Math.random()*(maxVal-minVal+1))+minVal;
}


function MeaningAcrossPop() {
  this.tenWin=[];
  this.successRate=0;
  this.update=function(outcome) {
    if (this.tenWin.length<50) {
      this.tenWin.push(outcome);
    } else {
      this.tenWin.shift();
      this.tenWin.push(outcome);
    }
    var sucSum = 0;
    for (var i=0;i<this.tenWin.length; i++) {
      sucSum+=this.tenWin[i];
    }
    this.successRate=sucSum/this.tenWin.length
  }
}


function Label(nme, success) {
  this.theName=nme;
  this.numInts=1;
  this.numSuccess=success;
  this.successRate=success/this.numInts;
  this.active=false;

  this.update = function(outcome) {
    this.numInts+=1;
    if (outcome === true) {
      this.numSuccess+=1;
    }
    this.successRate=this.numSuccess/this.numInts;
  }
}

function Meaning(defaultColor) {
  this.dispColor=defaultColor;
  this.allLabels = [];
  
  this.addLabel =  function (lbl,outcome) {
    if (outcome===false) {
      this.allLabels.push(new Label(lbl,0));
    } else {
      this.allLabels.push(new Label(lbl,1));
    }
  }
  
  this.updateLabel = function (lbl,outcome) {
    for (var i = 0; i<this.allLabels.length; i++) {
      if (this.allLabels[i].theName == lbl) {
        this.allLabels[i].update(outcome);
      }
    }
  }
  
  this.hasNames = function() {
    if (this.allLabels.length>0) {
      return true;
    } else {
      return false;
    }
  }
  
  this.hasLabel = function (lbl) {
    var res = false;
    for (var i =0; i<this.allLabels.length; i++) {
      if (this.allLabels[i].theName == lbl) {
        res=true;
      }
    }
    return res;
  }
  
  this.topLabel = function() {
    var topWord;
    if (this.allLabels.length == 1) {
      topWord=this.allLabels[0].theName
    } else {
      var maxScore = 0;
      var topIndex = 0;
      for (var i = 0; i<this.allLabels.length; i++) {
        if (this.allLabels[i].successRate > maxScore) {
          maxScore=this.allLabels[i].successRate;
          topIndex=i;
        }
      }
      topWord = this.allLabels[topIndex].theName;
    }
    return topWord;
  }

  this.purge= function(lbl) {
    this.allLabels=[];
    this.allLabels.push(new Label(lbl, 1));
  }
  
}

function Agent(x,y,vSize, aSize,angl) {
  this.xloc = x;
  this.yloc = y;
  this.locAngle=angl;
  this.vocab = [];
  this.sz =aSize;
  this.tenWin = [];
  this.interactions=0;
  this.sucInters=[];
  for (var i =0; i<vSize; i++) {
    this.vocab[i] = new Meaning(color(150,0,25,100));
  }
  
  this.drawVocab = function() {
    var new_cx = (cx)+cos(this.locAngle)*(lgRad+this.sz*.8);
    var new_cy = (cy)+sin(this.locAngle)*(lgRad+this.sz*.8);
    push();
    translate(new_cx,new_cy);
    rotate(this.locAngle+radians(90));
    for (var i=0;i<this.vocab.length;i++) {
      if (agreement[i] == true) {
        fill(meaningHues[i],100,100);
      } else {
        fill(meaningHues[i],50,50);
      }
      var wrd;
      if (this.vocab[i].hasNames()===true) {
        wrd = this.vocab[i].topLabel();
      } else {
        wrd = "?";
      }
      noStroke();
      textAlign(CENTER);
      textSize(15);
      text(wrd, 0,-i*15);
    }
    pop();
  }

  this.updateRate = function(outcome) {
    this.interactions+=1;
    if (this.interactions>50) {
      this.sucInters.shift();
    }
    this.sucInters.push(outcome);
    
  }
  this.resetVis = function(newX,newY,newSize,newAngle) {
    this.xloc=newX;
    this.yloc=newY;
    this.sz=newSize;
    this.locAngle=newAngle;
  }

  this.getRate = function() {
    var totSuc = 0;
    for (var i=0; i<this.sucInters.length; i++) {
      totSuc+=this.sucInters[i];
    }
    return totSuc/this.sucInters.length;
  }

  this.drawSelf=function(col) {
    stroke(0)
    fill(255);
    ellipse(this.xloc,this.yloc,this.sz,this.sz);
    fill(col);
    arc(this.xloc,this.yloc,this.sz-mgn*1.5,this.sz-mgn*1.5, this.locAngle+radians(90),this.locAngle+radians(270),CHORD);
    push();
    translate(this.xloc,this.yloc);
    rotate(this.locAngle);
    noStroke()
    fill(347,59,73)
    rect(eyeMgn*1.3,-eyeMgn*4,eyeMgn,eyeRange);
    var sucLen=eyeRange*this.getRate();
    fill(125,100,46);
    rect(eyeMgn*1.3,-eyeMgn*4,eyeMgn,sucLen);
    pop();

  }
}



