


$(document).ready(function() {
	$("#launchSearch").click(function() {
		$('#searchModal').modal('toggle')
	})

	$("#executeSearch").click(function() {
		let query=$("#searchQuery").val()
   		window.location.href='allposts.html?search='+query;
	})

	//content for the "featured post"
	$("#latestPostLink").attr('href',posts[0]["relurl"])
	$(".postTitle").html(posts[0]["title"])
	$(".postDate").html(posts[0]["date"])
	for (var i=0;i<posts[0]["tags"].length;i++) {
		$(".tags").append('<a href="allposts.html?search='+posts[0]["tags"][i]+'" target="_blank">#'+posts[0]["tags"][i]+'</a> ')
	}
	$("#fpSnippet").html(posts[0]["fpSnippet"])
	$("#readMorePostLink").attr('href',posts[0]["relurl"]+'#readMoreStart')

	//populate other recent posts
	$("#link1").attr("href",posts[1]["relurl"])
	$("#img1").attr("src","static/images/"+posts[1]["image"])
	$("#shortTitle1").html(posts[1]["shortTitle"])
	$("#date1").text(posts[1]["date"])

	$("#link2").attr("href",posts[2]["relurl"])
	$("#img2").attr("src","static/images/"+posts[2]["image"])
	$("#shortTitle2").html(posts[2]["shortTitle"])
	$("#date2").text(posts[2]["date"])

	$("#link3").attr("href",posts[3]["relurl"])
	$("#img3").attr("src","static/images/"+posts[3]["image"])
	$("#shortTitle3").html(posts[3]["shortTitle"])
	$("#date3").text(posts[3]["date"])

})
//populate exhaustive list of all latest posts
//calculate frequent tags (for now, anything with more than 2) to populate allposts, use recent>oldest to populate allposts
//use tags, ledes, and titles to allow for search function - this should be a modal
