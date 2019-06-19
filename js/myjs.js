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
var subjIcon_eye='<i class="fas fa-eye"></i>'
var subjIcon_rules='<i class="fas fa-users"></i>'
var subjIcon_games='<i class="fas fa-gamepad"></i>'
var subjIcon_book='<i class="fas fa-book"></i>'
var subjIcon_abs='<i class="fas fa-signature"></i>'
var oaicon='<span class="ai ai-open-access"></span>'
var pdficon='<a href="%PDFLINK" target="_blank"><span class="far fa-file-pdf publink"></span></a>'
var githubicon='<a href="%GITHUBLINK" target="_blank"><span class="fab fa-github publink"></span></a>'
var osficon='<a href="%OSFLINK" target="_blank"><span class="ai ai-osf"></span></a>'

var pubTemplate ='<div class="row"><div class="col process p-3 %TYPECLASS">\
              <span class="number">%SUBJICON</span>\
              <div>\
                <h3>%OAICON<a href="%EXTLINK" target="_blank">%SUMMARY</a></h3>\
                <p>%PDFICON%GITHUB%FULLREF</p>\
              </div>\
            </div></div>'


$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();

	for (var i=0; i<mypubs.length;i++) {
		var output=mypubs[i]
		var thisPub=pubTemplate.replace("%SUMMARY",output["summary"])
		thisPub=thisPub.replace("%EXTLINK",output.sharelink)
		thisPub=thisPub.replace("%FULLREF",output.reference)
		thisPub=thisPub.replace("%TYPECLASS",output["type"])
		
		if (output.category=="ss") {
			thisPub=thisPub.replace("%SUBJICON",subjIcon_eye)
		}

		if (output.category=="rd") {
			thisPub=thisPub.replace("%SUBJICON",subjIcon_rules)
		}

		if (output.category=="eg") {
			thisPub=thisPub.replace("%SUBJICON",subjIcon_games)
		}

		if (output.category=="book") {
			thisPub=thisPub.replace("%SUBJICON",subjIcon_book)
		}

		if (output.isopen) {
			thisPub=thisPub.replace("%OAICON",oaicon)
			thisPub=thisPub.replace("%PDFICON","")
		} else {
			thisPub=thisPub.replace("%OAICON","")
			var plink=pdficon.replace("%PDFLINK",output.dllink)
			thisPub=thisPub.replace("%PDFICON",plink)
		}

		if (output.github) {
			var git=githubicon.replace("%GITHUBLINK",output.github)
			thisPub=thisPub.replace("%GITHUB",git)
		} else {
			thisPub=thisPub.replace("%GITHUB","")
		}

		if (output.osf) {
			var osf=osficon.replace("%OSFLINK",output.osf)
			thisPub=thisPub.replace("%OSF",osf)
			console.log("ooh found osf!")
		} else {
			console.log("deleting osf!")
			thisPub=thisPub.replace("%OSF","")
		}

		$("#publist").append(thisPub)



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
			$('.none').slideUp();
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
			$('.none').slideUp();
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
			$('.none').slideUp();
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
		$("#rdSelect").click();
	});

	$("#egGoToPubs").click(function() {
		$("#goPub").click();
		$("#egSelect").click();
	});

	$(".moretest").click(function() {
		var par=$(this).closest('.teachCard')
		$(par+">.body1").hide();
		$(par+">.body2").slideDown();


	});

	$(function () {
  		$('[data-toggle="tooltip"]').tooltip()
	})
	var hobbiesShowing=false;
	$("#toggleHobbies").click(function() {
		$(".hobbyInfo").slideToggle();
		if (hobbiesShowing) {
			$(this).removeClass('btn-default').addClass('btn-light')
			hobbiesShowing=false;
		} else {
			$(this).removeClass('btn-light').addClass('btn-default')
			hobbiesShowing=true;

		}
	})

});








