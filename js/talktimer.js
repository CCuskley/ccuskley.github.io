var catFrames = {}
var userDefinedCategories = {
	"cat1":"woman",
	"cat2":"man",
	"cat3":"other"
}
var currentCat
var paused=true
var started=false

$(document).ready(function () {
	$("#showDat").click(function() {
		$("#streamGraphCanvas").toggle()
	});

	$(".catTimer").click(function() {
		if (!started && paused) {
			
		}
		currentCat= $(this).attr('id')
	});
})

function setup() {
	let canvasDiv = document.getElementById('streamGraphCanvas');
	let width = canvasDiv.offsetWidth;
	let height = canvasDiv.offsetHeight;
	let sketchCanvas = createCanvas(width, height);

	sketchCanvas.parent("streamGraphCanvas");
	sketchCanvas.id('myCanvas');
	$("#streamGraphCanvas").hide()

}

function draw() {
	noStroke();
	if (!paused) {
		catFrames[currentCat]+=frameCount
	}
  	//fill(random(255), random(255), random(255));
  	//ellipse(random(width), random(height), 30, 30);
}