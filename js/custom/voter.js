var matrixD,N,w,h,population;
var cnv;
var conformists=[]
var antagonists=[]
var conformType="flip"
var frames=0
function setup() {
  
  w=600;
  h=600;
  
  
  cnv = createCanvas(w,h+25);
  cnv.parent("#votercontain")
  //createCanvas(w,h+100);
  colorMode(HSB, 360, 100,100,100);
  initPop(1, 15)

  //console.log(population)
  frameRate(45);
}

function draw() {
  background(255)
  //fill(100,100,100);
  //ellipse(w/2,h/2,300,300);
  for (var i=0;i<population.length;i++) {
    population[i].show();
  }
  var s=Math.floor(random(population.length))
  population[s].updateRandom();
  frames+=1
  fill(0)
  textSize(20)
  text("t = "+frames,10,h+20)
  
}

function initPop(propConform, popSize) {
  population=[]
  conformists=[]
  antagonists=[]
  matrixD=popSize;
  N=matrixD*matrixD;
  $("#propConformist").text(Math.floor(propConform*100).toString()+"%");
  $("#propAntagonist").text(100-Math.floor(propConform*100).toString()+"%");
  $("#pSize").text(N.toString())
  var ct=0;
  frames=0
  for (var i=0;i<matrixD;i++) {
    for (var j=0;j<matrixD;j++) {
      var dice=random()
      var agentType;
      if (dice<=propConform) {
        agentType="c"
        conformists.push(ct)
      } else {
        agentType="a"
        antagonists.push(ct)
      }
      population.push(new Agent(agentType,ct,i*(w/matrixD),j*(w/matrixD),random(360)))
      ct+=1;
    }
  }
}

function Agent(kind, matrixIndex, locx, locy, hue) {
  this.x=locx;
  this.y=locy;
  this.kind=kind;
  this.kind;
  this.hue=hue;
  this.ind=matrixIndex;
  this.sz=w/matrixD;
  this.changeType=false
  this.changeEllipse=this.sz;
  this.changeDir="shrink"

  this.getPartners = function() {
    var posPartners =[];
      var l =this.ind-1;
      var r =this.ind+1;
      var t =this.ind-matrixD;
      var b=parseInt(this.ind+matrixD);
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
      //console.log(posPartners)
      return posPartners
  }

  this.antagonise= function() {
    //if this agent is anticonformist
    var posPartners=this.getPartners()
    var ri = Math.floor(random(posPartners.length))
    //choose a random partner
    var partnerIndex =posPartners[ri];

    //do the opposite
    if (this.kind =="a") {
      //console.log(this.ind, partnerIndex)
      var pHue=population[partnerIndex].giveHue()
      var newHue=pHue+180
      if (newHue>360) {
        newHue=newHue-360;
      }
      this.hue=newHue
    }
  }

  this.show = function() {
    if (this.changeType) {
      
      fill(200,0,70,50)
      //(CENTER)
      ellipse(this.x+(this.sz)/2,this.y+(this.sz)/2,this.changeEllipse,this.changeEllipse);
      if (this.changeEllipse < 2) {
        this.changeDir="grow"
      } 

      if (this.changeEllipse >this.sz) {
        this.changeDir="shrink"
      }
      if (this.changeDir=="shrink") {
          this.changeEllipse-=1;
      } else {
          this.changeEllipse+=1
      }
      
      
    } else {
      noStroke();
      fill(this.hue,80,80);
      if (this.kind=="c") {
        ellipse(this.x+this.sz/2,this.y+this.sz/2,this.sz-2,this.sz-2);
      } else {
        rect(this.x+1,this.y+1,this.sz-2,this.sz-2);
      }
    }

  }

  this.flipType = function(newType) {
    this.kind=newType
    this.changeType=true
    this.changeEllipse=this.sz
    setTimeout(function(arg) {
        population[arg].changeType=false
      },800, this.ind)
  }


  //l=index-1, unless at left edge
  //r=index+1,unless at right edge
  //top=index-matrixD, unless at top edge
  //bottom=index+matrixD,unless at bottom edge
  this.giveHue=function() {
    return this.hue;
  }

  this.isOver=function() {
    if (mouseX>=this.x && mouseX<=this.x+this.sz && mouseY>=this.y &&mouseY<=this.y+this.sz) {
      return true;
    } else {
      return false;
    }
  }

  

  this.updateRandom = function() {
    if (this.kind=="a") {
      this.antagonise()
    } else {
      var posPartners=this.getPartners()
      var ri = Math.floor(random(posPartners.length))
      var partnerIndex = posPartners[ri];
      var pHue=population[partnerIndex].giveHue()
      if (conformType=="flip") {
        this.hue=pHue
      } else {
        ///if my hue value is higher, get lower
        if (this.hue>pHue) {
          var diff=this.hue-pHue;
          var newhue=this.hue-diff/2
          this.hue=newhue
        } else {
          //my hue value is lower
          var diff=pHue-this.hue
          var newhue=this.hue+diff/2
          this.hue=newhue
        }
      }
      if (this.hue>360) {
        this.hue=this.hue-360
      }

    }
  }

  this.updateSimilar = function() {
    if (this.kind=="a") {
      this.antagonise()
    } else {
      var posPartners=this.getPartners()
      var partDistances=[]
      //of the adjacent agents, find the one with the most similar color to me
      var lowest=0;
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

      var lowest=2
      var closest=0
      for (var i=0;i<partDistances.length;i++) {
        if (partDistances[i]<lowest) {
          closest=i;
          lowest=partDistances[i]
        }
      }
      if (conformType=="flip") {
        this.hue=population[closest].giveHue()
      } else {
        ///if my hue value is higher, get lower
        if (this.hue>population[closest].giveHue()) {
          var diff=this.hue-population[closest].giveHue();
          var newhue=this.hue-diff/2
          this.hue=hewhue
        } else {
          //my hue value is lower
          var diff=population[closest].giveHue()-this.hue
          var newhue=this.hue+diff/2
          this.hue=newhue
        }
      }
      if (this.hue>360) {
        this.hue=this.hue-360
      }
    }    

  }
}

function mousePressed() {
  for (var i=0;i<N;i++) {
    if (population[i].isOver()) {
      var ctype=population[i].kind
      if (ctype=="c") {
        population[i].flipType("a")
        antagonists.splice(i,1)
        conformists.push(i)
      } else {
        population[i].flipType("c")
        conformists.splice(i,1)
        antagonists.push(i)
      }
      var newProp=Math.floor((conformists.length/N)*100)
      $("#conformProp").val(newProp)
      $("#pConform").text(newProp.toString())
      $("#pAntag").text((100-newProp).toString())
    }
  }
}

$(document).ready(function() {
  $("#expModal").modal('show')

  $("#showExp").click(function() {
    $("#expModal").modal('show')
  })
  
  $("#popSize").on('change',function() {
    var newSize = $(this).val()
    var newProp=parseInt($("#conformProp").val())/100
    console.log(newProp)
    initPop(newProp,newSize)
  })

  $("#conformProp").on('change',function() {
    var newProp=parseInt($(this).val())
    console.warn(newProp)
    if (newProp==100 || newProp==0) {
      if (newProp==100) {
        for (var i=0; i<antagonists.length;i++) {
          conformists.push(antagonists[i])
          population[antagonists[i]].flipType("c")
        }
        antagonists=[]
      }

      if (newProp==0) {
        for (var i=0; i<conformists.length;i++) {
          antagonists.push(conformists[i])
          population[conformists[i]].flipType("a")
        }
        conformists=[]
      }
    } else {
      var conformCount=Math.floor((N*newProp)/100)
      if (conformists.length>conformCount) {
        console.log("take away conformists") 
        var addNAntagonists=conformists.length-conformCount
        console.log("addNAntagonists",addNAntagonists)
        for (var i =0;i<addNAntagonists;i++) {
          var flipper= Math.floor(Math.random()*conformists.length)
          var newAnt = conformists.splice(flipper,1)
          antagonists.push(newAnt)
          population[newAnt].flipType("a")
        }
      } else if (conformists.length<conformCount){
        console.log("add conformists")
        var addNConformists=conformCount-conformists.length
        for (var i =0;i<addNConformists;i++) {
          var flipper= Math.floor(Math.random()*antagonists.length)
          var newConf = antagonists.splice(flipper,1)
          conformists.push(newConf)
          population[newConf].flipType("c")
        }
      
      }
    }
    var newProp=Math.floor((conformists.length/N)*100)
    //$("#conformProp").val(newProp)
    $("#pConform").text(newProp.toString())
    $("#pAntag").text((100-newProp).toString())


  })

  $("#allcomp").click(function() {
    conformType="compromise"
  });

  $("#allflip").click(function() {
    conformType="flip"
  })

  $("#resetSim").click(function() {
    var newSize = $("#popSize").val()
    var newProp=parseInt($("#conformProp").val())/100
    initPop(newProp,newSize)
  });
})
