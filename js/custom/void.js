var w_w=window.innerWidth-30;
var w_h=window.innerHeight-30;
console.log(w_w,w_h)
var mx_dim;
var playvoid=false;
var writtenInput=false;
if (w_w>=w_h){
	mx_dim=w_w;
} else {
	mx_dim=w_h;
}
var voidsound;
function preload() {
	soundFormats('mp3','wav')
	voidsound=loadSound('../media/wind.mp3')

}
function setup() {
  	createCanvas(w_w, w_h);
	rectMode(CENTER);
	voidsound.setVolume(0.1)
}

function draw() {
	background(220);
	noFill()
	stroke(0)
	for (var i=0;i<mx_dim;i++) {
		stroke(i/8);
		rect(width/2,height/2,i,i);
	}
	if (playvoid) {
		voidsound.loop()
	} else {
		voidsound.stop()
	}
}

$(document).ready(function() {
	$("#faqModal").modal('show');
	$(".start").click(function() {
		$("#faqModal").modal('hide');
		$("#startModal").modal('show');
		console.log('start clicked')
	});
	$(".faq").click(function() {
		$("#startModal").modal('show');
		$("#faqModal").modal('show');
	})

	$("#sound").click(function() {
		//console.log("playvoid before change",playvoid)
		playvoid= !playvoid
		//console.log(playvoid)
	});

	$("#modality").click(function() {
		writtenInput= !writtenInput;
		if (writtenInput) {
			$(".wInput").show().focus()
			$("#scream").show()
			$(".modinput").text('on')
		} else {
			$(".wInput").hide()
			$("#scream").hide()
			$("#writeToVoid").val('')
			$(".modinput").text('off')
		}
	})

	$("#scream").click(function() {
		var thescream=$("#writeToVoid").val()
		$("#writeToVoid").val('')
		console.log(thescream)
		$(".wInput").hide()
		
		
		$("#toScream").text(thescream).addClass("rotate-scale-down")
		setTimeout(function() {
			$("#toScream").text('').removeClass('rotate-scale-down')
			$(".wInput").show();
		},3000)

	})

});