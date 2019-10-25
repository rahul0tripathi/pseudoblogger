var api_key = "YOUR GOOGLE API KEY";
var instaFeed;

function ISODateString(d) {
	function pad(n) {
		return n < 10 ? '0' + n : n
	}
	return d.getUTCFullYear() + '-' +
		pad(d.getUTCMonth() + 1) + '-' +
		pad(d.getUTCDate()) + 'T' +
		pad(d.getUTCHours()) + ':' +
		pad(d.getUTCMinutes()) + ':' +
		pad(d.getUTCSeconds()) + 'Z'
}

function extractContent(s, t) {
	var span = document.createElement('span');
	span.innerHTML = s;
	var str = span.textContent || span.innerText;
	if (t < 6) {
		str = str.split(" ").splice(0, 60).join(" ") + " .....";
	} else {
		str = str.split(" ").splice(0, 50).join(" ") + " .....";
	}
	return str
};
function extractContentTab(s) {
	var span = document.createElement('span');
	span.innerHTML = s;
	var str = span.textContent || span.innerText;
		str = str.split(" ").splice(0, 30).join(" ") + " .....";
	return str
};

function extractContentwL(s) {
	var span = document.createElement('span');
	span.innerHTML = s;
	var str = s.replace("[<](/)?div[^>]*[>]", "");

	var innerHtml = "";


	return str
};

function extractImages(s) {
	var imgUrl = [];
	var span = document.createElement('span');
	span.innerHTML = s;
	$(span).find('img').each(function () {
		src = $(this).attr('src');
		imgUrl.push(src);
	});

	return imgUrl
};
//Comment Handler
function commentDisplay(postId) {
	$.get("https://www.googleapis.com/blogger/v3/blogs/223436113103407526/posts/" + postId + "/comments?key=" + api_key, function (data, status) {

		console.log(data)


	});

}
//Post Display Handler
function postDisplay(postId) {
	$('#postDisplayArea').modal('open');
	$("#loader2").show();
	$(".img_modal_carousel").hide()
	$(".img_cover").hide()
	$('.carousel.postC').hide(500)
	$('#postTitle').text('');
	$('#postAreaContent').html('')
	$(".imageCarousel").hide();
	$("#postCarousel").html('');
	$.get("https://www.googleapis.com/blogger/v3/blogs/223436113103407526/posts/" + postId + "?key=" + api_key, function (data, status) {

		var content = extractContentwL(data.content);
		var images = extractImages(data.content);
		if (images.length != 0) {
			console.log()
			$(".imageCarousel").show();
			if (images.length == 1) {
				$(".img_cover").html('<center><img src="' + images[0] + '" class="cover_image responsive-img"></img></center>')
				$(".img_cover").show();
			} else {
				for (var i = 0; i < images.length; i++) {
					$("#postCarousel").append('  <a class="carousel-item" href="' + images[i] + '"><img  src="' + images[i] + '"/></a>')
				}
				$('.carousel.postC').carousel({
					fullWidth: true
				});
				$(".img_modal_carousel").show()
			}
		}
		console.log(images)
		$('#postTitle').text(data.title);
		$('#postAreaContent').html(content);



		$("#loader2").fadeOut(500, function () {
			$("#postContent").fadeIn(500);
			$('.carousel.postC').show(500)

			$("#author_img").attr("src", "https://" + data.author.image.url)
			$("#author_name").text(data.author.displayName)
			$("#comm_count").text(data.replies.totalItems)
			$("#pub_date").text(Date(data.published).slice(0, 10))
			commentDisplay(postId);
		})
	});
}
//Post Tab Handler
function postTab(){
	$('.postTabView').html('');
	$("#loader3").show();
	$.get("https://www.googleapis.com/blogger/v3/blogs/223436113103407526/posts?key=" + api_key + "&maxResults=20&orderBy=published&fetchBodies=true", function (data, status) {
	var itemCount = 0;
	$('.postTabView').append('<div class="row">');
	for (var i = 0; i < data.items.length; i++) {
				if(itemCount == 4 && i != data.items.length-1){
					$('.postTabView').append('</div><div class="row">');
					itemCount = 0;
				}
				else if(i == data.items.length-1){$('.postTabView').append('</div>');}
		var content = extractContentTab(data.items[i].content);
		var images = extractImages(data.items[i].content);
		var id=(((1+Math.random())*0x10000)|0).toString(16).substring(1);
		if(images.length !=0){
$('.postTabView').append('<div class="col s12 m3"><div class="card postHolder"><div class="activ" targetId='+id+'><div class="card-image waves-effect waves-block waves-light"> <img class="activator" src='+images[0]+'/></div><div class="card-content"><span class="card-title activator grey-text text-darken-4" ><h5 style="display:inline">'+data.items[i].title+'</h5><i class="material-icons right">more_vert</i> </span></div></div><div class="revealed-text container"  id='+id+'><span class="card-title grey-text text-darken-4" style="margin-top:8px;">'+data.items[i].title+'<i class="material-icons right close" targetId='+id+'>close</i></span><p>'+content+'<div class="fadeout" style="margin-top:-4px;"></div><center><div class="btn-small openPost"  id="' + data.items[i].id + '" style="border-radius:40px; background-color:black; color:white ; margin-top:-120px;">Continue Reading</div></center></p></div></div>')
}else{
	$('.postTabView').append('<div class="col s12 m3"><div class="card  postHolder"><div class="card-content " style=""><span class="card-title">'+data.items[i].title+'</span><p>'+content+'<div class="fadeout"></div><center><div class="btn-small openPost"  id="' + data.items[i].id + '" style="border-radius:40px; background-color:black; color:white ;">Continue Reading</div></center></p></div></div></div></div>');
}
console.log(itemCount)
itemCount++;
}
$('.activ').click(function(){
		var id = '#'+$(this).attr("targetId");
		
		$(this).hide(200)
			$(id).show(200)
	

	})
$('.close').click(function(){
	var target = $(this).attr("targetId")
	$('.revealed-text').hide(200,function(){$('.activ').show(200)})
	
	
})
$("#loader3").hide();
$('.openPost').click(function () {

		postDisplay($(this).attr("id"));
	})
});

}

var d = new Date();
var e = ISODateString(d);

//Init Handler

$.get("https://www.googleapis.com/blogger/v3/blogs/223436113103407526/posts?key=" + api_key + "&maxResults=10&orderBy=published&fetchBodies=true", function (data, status) {
	var hrefs = ["#one!", "#two!", "#three!", "#four!", "#five!", "#six!", "#seven!", "#eight!", "#nine!", "#ten!"]
	var i = 0;
	console.log(data)
	for (i = 0; i < 10; i++) {
		var title_length = data.items[i].title.split(' ').length;
		console.log(title_length)
		var content = extractContent(data.items[i].content, title_length);

		//extractImages(data.items[i].content)


		$('.topPostHolder').append('<div  class="carousel-item  blogBody" href="' + hrefs[i] + '"><h5 class="blogTitle container"style="margin:auto;"><center>' + data.items[i].title + '</center></h5><br><br><div style="height:" class="container blogContent">' + content + '<div class="fadeout"></div></div><div class="btn-small openPost"  id="' + data.items[i].id + '" style="border-radius:40px; background-color:black; color:white ; margin-top:-120px;">Continue Reading</div></div>');

		$('.topPostHolder').append('</div>');
	}
	$('.carousel.homeC').carousel({
		fullWidth: true,
		indicators: true
	});
	$('.openPost').click(function () {

		postDisplay($(this).attr("id"));
	})
	$("#loader1").fadeOut(500, function () {
		$(".topPostHolder").fadeIn(500)
	})
});
$("#ig_mob").click(function () {
	var ig = $("#ig_embed").html();

	$("#instafeed").html(ig);
})
$("#fb_mob").click(function () {
	$("#fbfeed").html('<div class="container"><center><iframe style="margin-left:-30px;" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpickeratpace%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2322960014618558" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe></center></div>')
})

//OnPageLoad Jquery
$(document).ready(function () {
	
	$('.tabs').tabs();
	$('.modal').modal();
	$('.materialboxed').materialbox();

	$("#closePost").click(function () {
		$("#postDisplayArea").modal('close')
	})

	$("#next").click(function (argument) {
		$('.carousel').carousel('next');
	})
	$("#prev").click(function (argument) {
		$('.carousel').carousel('prev');
	})
	$('.pushpin').pushpin();
	$("#screen2").click(function(){
		$('.blogHeader').fadeOut(100,function(){
			postTab();
		});
	})
	$("#screen3").click(function(){
		$('.blogHeader').fadeOut(100,function(){
			
		});
	})

	$("#screen1").click(function(){
		$('.blogHeader').fadeIn(100);
	})
	 $('.carousel.homeD').carousel({
    fullWidth: true,
    
  });
        
});
