/*var pubTemplate ='<div class="qa-message-list" id="wallmessages"><div class="message-item" id="m16"><div class="message-inner"><div class="message-head clearfix"><div class="user-detail">< href="%EXTLINK" target="_blank"><h5 class="handle">%SUMMARY</h5><div class="post-meta"><div class="asker-meta"><span class="qa-message-when"><span class="qa-message-when-data"><a href="%PUBDL" target="_blank"><i class="pub-icon fa fa-download"></i>&nbsp</a>%FULLCITATION</span></a></span></div></div></div></div><div class="qa-message-content"><div class="shareBar" id="%SHAREID_inner"></div></div></div></div></div>'


	{
		"reference": "Cuskley, C., Loreto, V. and Kirby, S. (2018). A Social Approach to Rule Dynamics Using an Agent-Based Model. Topics in Cognitive Science. doi: 10.1111/tops.12327",
		"title":"A Social Approach to Rule Dynamics Using an Agent-Based Model",
		"dllink":"preprints/CuskleyLoretoKirby2018.pdf",
		"sharelink":""
		"id":"Cuskley_etal2018",
		"summary":"Investigating the role of population growth in rule dynamics",
		"type":"article",
	},
*/

var pubTemplate ='<div class="card pubContainer element-item %CATEGORY"><div class="card-header"><h5 class="paperTitle align-middle">%SUMMARY</h5></div><div class="card-body pubCard"><a href="%PUBDL" target="_blank"><p class="paperCitation"><i class="pub-icon fa fa-download"></i>&nbsp %FULLCITATION</p></a><div class="shareBar" id="%SHAREID_inner" style="top:-10px"></div></div></div>'
var ssFlipped =false;
var rdFlipped=false;
var gameFlipped=false;
var hobbyFlipped=false;


function flipCard(cardID) {
	$(cardID).css("transform", "rotateY(180deg)");
	$(cardID+'>.flipper').css("transform","rotateY(180deg)");
	$(cardID+'>.flip-container.hover .flipper').css("transform","rotateY(180deg)");
	$(cardID+'>.flip-container.flip .flipper').css("transform","rotateY(180deg)");
	setTimeout(function() {
		$(cardID+">.flipper>.front").hide();
	},200)
}

function reverseCard(cardID) {
	$(cardID).css("transform", "rotateY(0deg)");
	$(cardID+'>.flipper').css("transform","rotateY(0deg)");
	$(cardID+'>.flip-container.hover .flipper').css("transform","rotateY(0deg)");
	$(cardID+'>.flip-container.flip .flipper').css("transform","rotateY(0deg)");
	setTimeout(function() {
		$(cardID+">.flipper>.front").show();
	},200)
		
}

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

})(jQuery); // End of use strict

$(document).ready(function() {
	$('#emailTT').tooltip({trigger:'manual'});

	for (var i=0; i<mypubs.length;i++) {
		var output=mypubs[i]
		var thisPub=pubTemplate.replace("%SUMMARY",output.summary)
		thisPub=thisPub.replace("%FULLCITATION",output.reference)
		thisPub=thisPub.replace("%PUBDL",output.dllink)
		thisPub=thisPub.replace("%SHAREID",output.id)
		thisPub=thisPub.replace("%CATEGORY",output.category)
		console.log(output.title,output.dllink)
		
		if (output.type=="article") {
			$("#journals").append(thisPub)
		} else {
			$("#other").append(thisPub)
		}

		$("#"+output.id+"_inner").jsSocials({
			shares:["twitter","facebook",{share:"pocket",logo:'fa fa-get-pocket'}],
			url:output.sharelink,
			shareCount:false,
			text:"Check out this research: "+output.title,
			shareIn:"popup",
			showLabel:false
		});


	}

	$('.navbar-nav>li>a').on('click', function(){
    	$('.navbar-collapse').collapse('hide');
	});

	$(".jssocials-shares").addClass("text-center");
	
	$("#ssFlip").click(function() {
		flipCard("#ssCard");
		$("#ssBody").show();
	});

	$("#ssReverse").click( function() {
		reverseCard("#ssCard");
		$("#ssBody").hide();
	});

	$("#rdFlip").click(function() {
		flipCard("#rdCard")
		$("#rdBody").show()
	});

	$("#rdReverse").click( function() {
		reverseCard("#rdCard")
		$("#rdBody").hide()
	});

	$("#egFlip").click(function() {
		flipCard("#egCard")
		$("#egBody").show()
	});

	$("#egReverse").click( function() {
		reverseCard("#egCard")
		$("#egBody").hide()
	});

	$("#hbFlip").click(function() {
		flipCard("#hbCard")
		$("#hbBody").show()
	});

	$("#hbReverse").click( function() {
		reverseCard("#hbCard")
		$("#hbBody").hide()
	});

	$("#allSelect").click(function() {
		$('.pubContainer').slideDown();
		$(this).removeClass('btn-light').addClass('btn-default')
		$("#ssSelect").removeClass('btn-default').addClass('btn-light')
		$("#rdSelect").removeClass('btn-default').addClass('btn-light')
		$("#egSelect").removeClass('btn-default').addClass('btn-light')
	});

	$("#ssSelect").click(function() {
		if ($(this).hasClass('btn-light')) {
			//hide others
			$('.rd').slideUp();
			$('.eg').slideUp();
			$('.none').slideToggle();
			//show this
			$('.ss').slideDown();
			$(this).removeClass('btn-light').addClass('btn-default')
			$("#allSelect").removeClass('btn-default').addClass('btn-light')
			$("#rdSelect").removeClass('btn-default').addClass('btn-light')
			$("#egSelect").removeClass('btn-default').addClass('btn-light')
		} else {
			$('.pubContainer').slideDown();
			$(this).removeClass('btn-default').addClass('btn-light')

		}
	});

	$("#rdSelect").click(function() {
		if ($(this).hasClass('btn-light')) {
			//hide others
			$('.ss').slideUp();
			$('.eg').slideUp();
			$('.none').slideToggle();
			//show this
			$('.rd').slideDown();
			$(this).removeClass('btn-light').addClass('btn-default')
			$("#allSelect").removeClass('btn-default').addClass('btn-light')
			$("#ssSelect").removeClass('btn-default').addClass('btn-light')
			$("#egSelect").removeClass('btn-default').addClass('btn-light')
		} else {
			$('.pubContainer').slideDown();
			$(this).removeClass('btn-default').addClass('btn-light')

		}
	});
	$("#egSelect").click(function() {
		if ($(this).hasClass('btn-light')) {
			//hide others
			$('.rd').slideUp();
			$('.ss').slideUp();
			$('.none').slideToggle();
			//show this
			$('.eg').slideDown();
			$(this).removeClass('btn-light').addClass('btn-default')
			$("#allSelect").removeClass('btn-default').addClass('btn-light')
			$("#ssSelect").removeClass('btn-default').addClass('btn-light')
			$("#rdSelect").removeClass('btn-default').addClass('btn-light')
		} else {
			$('.pubContainer').slideDown();
			$(this).removeClass('btn-default').addClass('btn-light')

		}
	});

	$("#ssGoToPubs").click(function() {
		$("#goPub").click();
		$("#ssSelect").click();
	});

	$("#rdGoToPubs").click(function() {
		$("#goPub").click();
		$("#ssSelect").click();
	});

	$("#egGoToPubs").click(function() {
		$("#goPub").click();
		$("#ssSelect").click();
	});

	$(".moretest").click(function() {
		var par=$(this).closest('.teachCard')
		$(par+">.body1").hide();
		$(par+">.body2").slideDown();


	});

	$(function () {
  		$('[data-toggle="tooltip"]').tooltip()
	})

});








