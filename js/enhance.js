var mods = ["racist",
		"well-respected",
		"talking","moldy",
		"maggot infested",
		"blethering",
		"drooling",
		"festering",
		"noted",
		"bitter",
		"irate",
		"exasperated",
		"livid",
		"rusty",
		"rotting",
		"notorious",
		"putrid",
		"on fleek",
		"fetid",
		"decaying",
		"intellectually impotent",
		"mentally unstable",
		"mildewed",
		"myopic",
		"over-privileged",
		"spoiled",
		"filterless",
		"thoughtless",
		"foolish",
		"greedy",
		"self-involved",
		"narcissistic",
		"well-known",
		"renowned",
		"hapless",
		"gruesome",
		"unapologetic",
		"poorly-trained",
		"enraged",
		"aggravated",
		"petulant",
		"STD riddled",
		"useless",
		"diseased",
		"psychologically challenged",
		"lame-brained",
		"dishonest",
		"conceited",
		"arrogant",
		"egotistical",
		"contrived",
		"artificial",
		"shallow",
		"pompous",
		"vainglorious",
		"bawdy",
		"depraved",
		"obscene",
		"brazen"];
var nouns = [
		"hotshot",
		"cup of flat white privelege",
		"dried apricot",
		"expired canteloupe",
		"Garfield impersonator",
		"ball of cheeto dust",
		"used Hazmat suit",
		"oversize cheese Dorito",
		"political Guy Fieri",
		"clown",
		"fast food vaccuum",
		"hot air balloon",
		"slowly collapsing traffic cone",
		"eye sore",
		"windbag",
		"giant bathtub duckling",
		"wax museum figure on a hot day",
		"human-sized hair plug",
		"Donald Trump enthusiast",
		"candied yam",
		"pumpkin pie",
		"mix of lint and cheeto dust",
		"Kim Jong Un enthusiast",
		"douche canoe",
		"whopee cushion",
		"decaying citrus fruit",
		"orange cream pie",
		"collection of human cells",
		"islamophobe",
		"overweight goldfish",
		"maniac",
		"big mac enthusiast",
		"toupee stand",
		"spray tanned sphincter",
		"expired candycorn",
		"business orangutan",
		"spectre of mediocrity",
		"used dish rag",
		"gold-plated toilet-haver",
		"national embarassment",
		"bottle ginger",
		"white noise machine",
		"fever dream",
		"collective hallucination",
		"bad trip",
		"day-old jolly rancher",
		"bigot lure",
		"liar",
		"rotten persimmon",
		"wilting butternut squash",
		"ageing Carrot Top cosplayer",
		"expired bottle of spray tan",
		"damp box of Kraft macaroni and cheese",
		"bloviating narcissist",
		"boil on the nation's collective asshole",
		"web of lies",
		"hate megaphone",
		"blight on the national reputation",
		"hate preacher",
		"fifth horseman of the apocalypse",
		"sugar-free gum drop",
		"idiot magnet",
		"jerk snare",
		"echo chamber",
		"high-speed train to national ruin",
		"race-baiting spider",
		"oversteamed vegetable",
		"political Pokemon",
		"know nothing",
		"Ben Carson supporter",
		"snacked-on face",
		"suck on the nation's oxygen",
		"waste of space",
		"ethical vacuum",
		"moron",
		"cable news wet dream",
		"truth void",
		"sham",
		"Boris Johnson enthusiast"
		];

var usedphrases;

function makeDesc() {
	var m = mods[Math.floor(Math.random()*mods.length)];
	var n = nouns[Math.floor(Math.random()*nouns.length)];
	return m+" "+n;
}

function makeCap(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function isVowel(c) {
	if (c=="a" || c=="e" || c=="i" || c=="o" || c =="u" || c=="S") {
		return true;
	} else {
		return false;
	}
}


$(document).ready(function() {
	$("#trumpify").click(function() {
		usedphrases=[];
		$("#loader").html("<div class=\"cssload-container\"><div class=\"cssload-whirlpool\"></div></div>");
		var origtext=$("#origText").val();
		if (origtext.indexOf("Trump")<0) {
			var d=makeDesc();
			d=makeCap(d);
			var d2=makeDesc();
			var art;
			console.log(d2);
			console.log(isVowel(d2.charAt(0)));
			if (isVowel(d2.charAt(0))) {
				art="an";
			} else {
				art ="a"
			}
			$("#enhancedText").text(d+" Donald Trump's presidency continues. Trump, "+art+" "+d2+", is already campainging for 2020.");
			$("#loader").empty();
		} else {
			var newtext= origtext.replace(/Mr. Trump's/g,' Donald Trump\'s'),
			newtext=newtext.replace(/Mr. Trump/g,' #MISTA');
			newtext=newtext.replace(/Mr. Donald J Trump/g,'#MISTA');
			//newtext=newtext.replace(/President Trump/g,'#RPCTR');
			newtext=newtext.replace(/the president/g,'#RPFRR');
			newtext=newtext.replace(/The president/g,'#RPFRR');
			newtext=newtext.replace(/US president/g,'#RPFRR');
			newtext=newtext.replace(/POTUS/g,'#RPFRR');
			newtext=newtext.replace(/Republican presidential hopeful Donald Trump/g,'#RPFHP');
			newtext=newtext.replace(/Republican presidential hopeful Donald J Trump/g,'#RPFHP');
			newtext=newtext.replace(/GOP presidential front-runner Donald Trump/g,'#RPFRR');
			newtext=newtext.replace(/GOP presidential front-runner Donald J Trump/g,'#RPFRR');
			newtext=newtext.replace(/GOP presidential frontrunner Donald Trump/g,'#RPFRR');
			newtext=newtext.replace(/President Trump/g,'#RPFRR');
			newtext=newtext.replace(/presidential candidate Donald Trump/g,'#PCTRU');
			newtext=newtext.replace(/Donald Trump/g,' #FIRST');
			newtext=newtext.replace(/Donald J. Trump/g,' #FIRST');
			newtext=newtext.replace(/Trump/g,' #LASTO');
			var txtarray=[];
			var temparray=newtext.split("\n");
			for (var j=0;j<temparray.length;j++) {
				if (temparray[j].length>1) {
					var par=temparray[j].split(" ");
					par.unshift("<p>");
					par.push("</p>");
					for (var i=0;i<par.length;i++) {
						if (par[i][0]=="\"") {
							par[i]=par[i].replace("\"","\" ");
						}
						txtarray.push(par[i]);
					}
				}
			}
			for (var i=0;i<txtarray.length;i++) {
				if (txtarray[i][0]=="#") {
					var d=makeDesc();
					var art;
					if (d[0]=="i" || d[0]=="a" || d[0]=="u"||d[0]=="o" || d[0]=="e") {
						art="an";
					} else {
						art ="a"
					}
					if (txtarray[i].substring(0,6)=="#MISTA") {
						if (txtarray[i]=="#MISTA") {
							txtarray[i] = "Mr. Trump, "+art+" "+d+","
						} else {
							if (txtarray[i-1].charAt(txtarray[i-1].length-1)=="." || txtarray[i-1].charAt(txtarray[i-1].length-1)=="\"") {
								d=makeCap(d);
							}
							if (txtarray[i].charAt(txtarray[i].length-1)=="s") {
								txtarray[i] = d+" Mr. Trump's"
							} else {
								txtarray[i]=d+" Mr.Trump."
							}
						}
					} else if (txtarray[i]=="#RPCTR") {
						if (i>0) {
							if (txtarray[i-1].charAt(txtarray[i-1].length-1)=="." || txtarray[i-1].charAt(txtarray[i-1].length-1)=="\"") {
								d=makeCap(d);
							}
						}
						txtarray[i]=d+ " and current US president Donald Trump";
					} else if (txtarray[i]=="#PCTRU" ) {
						if (i>0) {
							if (txtarray[i-1].charAt(txtarray[i-1].length-1)=="." || txtarray[i-1].charAt(txtarray[i-1].length-1)=="\"") {
								d=makeCap(d);
							}
						}
						txtarray[i] = d+" and current US president Donald Trump";
					} else if (txtarray[i].substring(0,6)=="#FIRST") {
						if (i>0) {
							if (txtarray[i-1].charAt(txtarray[i-1].length-1)=="." || txtarray[i-1].charAt(txtarray[i-1].length-1)=="\"") {
								d=makeCap(d);
							}
						}
						if (txtarray[i]=="#FIRST") {
							txtarray[i] = d+" Donald Trump";//, "+art+" "+makeDesc()+","
						} else {
							if (txtarray[i].charAt(txtarray[i].length-1)=="s") {
								txtarray[i] = d+" Donald Trump's";
							} else {
								txtarray[i] = d+" Donald Trump.";
							}
						}
					} else if (txtarray[i].substring(0,6)=="#LASTO") {
						if (txtarray[i]=="#LASTO") {
							txtarray[i] = "Trump, "+art+" "+d+","
						} else {
							if (txtarray[i].charAt(txtarray[i].length-1)=="s") {
								txtarray[i] = d+" Trump's"
							} else {
								txtarray[i] = d+" Donald Trump.";
							}
						}
					} else if (txtarray[i].substring(0,6)=="#RPFRR") {
						txtarray[i] = "Republican president and "+d+" Donald Trump";
					} else if (txtarray[i].substring(0,6)=="#RPFHP") {
						txtarray[i] = d+" and sitting president Donald Trump";
					}
				}
			}
			txtarray[0]=makeCap(txtarray[0]);
			var finaltext=txtarray.join(" ");
			finaltext=finaltext.replace(/ \" /,' \"');

			$("#enhancedText").html(finaltext);
			$("#loader").empty();	
			$("#entext").show()
		}			
	});//close click function
	$("#usewiki").click(function() {
		var wikitext=$("#wikitext").text()
		$("#origText").val(wikitext)
		$("#trumpify").click()
	})
});///close docready


