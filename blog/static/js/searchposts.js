
var postTemplate= '<li><a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="%RELURL%"><img src="static/images/%IMGURL%" class="bd-placeholder-img" width="96" height="100%"><div class="col-lg-8"><h6 class="mb-0">%TITLE%</h6><small class="text-body-secondary">%POSTDATE%</small><p class="p-about">%POSTLEDE%</p></div></a></li>'
var tagTemplate='<p><a class="nav-item nav-link link-body-emphasis" href="%TAGSEARCH%">#%TAGNAME%</a></p>'
var tags={}
var keywords=[]
var sterms;

$(document).ready(function() {

	$("#launchSearch").click(function() {
		$('#searchModal').modal('toggle')
	})

	$("#executeSearch").click(function() {
		let query=$("#searchQuery").val()
   		window.location.href='?search='+query;
	})

	let params = new URLSearchParams(document.location.search);
	searchTerms = params.get("search")
	if (searchTerms!=null) {
		searchTerms=searchTerms.split(" ");
	} 

	for (var i=0;i<posts.length;i++) {
		for (var t=0;t<posts[i]["tags"].length;t++) {
			if (posts[i]["tags"][t] in tags) {
				tags[posts[i]["tags"][t]]+=1
			} else {
				tags[posts[i]["tags"][t]]=1
			}
		}
		//if there's a search, test if this post is relevant before populating
		//if there's not, do the thing
		if (searchTerms!=null) {
			$("#searchResults").html("search results")
			let isrel=false;
			console.log(searchTerms[0])
			for (var s=0;s<searchTerms.length;s++) {
				console.log("checking for searchterms")
				let lowsearch=searchTerms[s].toLowerCase()
				console.log("searchterm is",lowsearch)
				if (posts[i]["tags"].includes(lowsearch)) {
					console.log("found search term")
					isrel=true
					break
				}
				if (posts[i]["keywords"].includes(lowsearch)) {
					isrel=true
					break
				}
			}
			if (isrel) {
				var postInfo=postTemplate.replace("%RELURL%",posts[i]["relurl"])
				postInfo=postInfo.replace("%IMGURL%",posts[i]["image"])
				postInfo=postInfo.replace("%TITLE%",posts[i]["title"])
				postInfo=postInfo.replace("%POSTDATE%",posts[i]["date"])
				postInfo=postInfo.replace("%POSTLEDE%",posts[i]["lede"])
				$("#postsList").append(postInfo)
			}
		} else {
			var postInfo=postTemplate.replace("%RELURL%",posts[i]["relurl"])
			postInfo=postInfo.replace("%IMGURL%",posts[i]["image"])
			postInfo=postInfo.replace("%TITLE%",posts[i]["title"])
			postInfo=postInfo.replace("%POSTDATE%",posts[i]["date"])
			postInfo=postInfo.replace("%POSTLEDE%",posts[i]["lede"])
			$("#postsList").append(postInfo)
		}
	}
	//populate frequent tags
	console.log(tags)
	for (var key in tags) {
  		if (tags[key]>1) {
  			var tagInfo=tagTemplate.replace("%TAGSEARCH%","?search="+key)
  			tagInfo=tagInfo.replace("%TAGNAME%",key)
  			$("#tags").append(tagInfo)
  		}
  	}

})
//populate latest post on homepage, and most recent on homepage
//calculate frequent tags to populate banner
//if there is a URL query, use this for search.
//use tags, ledes, and titles to allow for search function - this should be a modal
