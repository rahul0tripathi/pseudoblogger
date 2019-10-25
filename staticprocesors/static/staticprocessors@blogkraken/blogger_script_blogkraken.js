var res_ids =[{
 	id:19046136,
	rating:5.0,
	text:'Finally a true 24x7 cafe in Lucknow. This was so needed! Like for insomniacs like me who need to go out at night and hog onto food, this is a blessing! Recently visited with my pals and loved every bit of it. Beautiful ambience, welcoming staff and great food to munch on. My favorite are the chocolate shakes in beverages!The interiors are eye catching - with the London theme and the red telephone booth is the first in town, and so instagrammable. Prices are moderate - they serve all kinds of sheesha and the food menu is extravagant as well.'
},{
	id:18590436,
	rating:2.0,
	text:" Had called for food delivery for one of my neighbors. Tasted the food with her, and it was not that great! We understand you won't give the hotel taste but at least it should be consumable! Worst dal I've ever tasted, and rotis were pathetic as well. Sabzi and rajma is still bearable. "
},{
	id:18980427,
	rating:1.0,
	text:"They claim to be 24x7 but extremely poor service all the time. Been there quite a few times, but it's so hard to get a decent place to sit and proper food to eat, especially at night when there's a lot of crowd - I guess addition of furniture is a must if you're trying to cater to a larger audience.Also, please note : YOU ARE NOT A CLUB. I don't understand why don't they allow stags. I noticed they stopped a few guys (well dressed) but didn't have girls along so they didn't let the guys enter!I don't know why, but it's really not needed at a place like BR.Service - 0/5 - takes half an hour to get a glass of coke (ALWAYS), and about an hour to get a plate of pasta.Food - 2/5 - cup maggi tastes better (REALLY)Sitting - 1/5 - ADD MORE FURNITURE so that you don't have to send people back.Ambience - 2/5.Start selling your business in a proper way. Improve service - on priority. "}]

let resInfo=[]
const zomato_api_key='6c07c6ae4ef9c5bc9c3a3c796a28e29a';
const api_key = "AIzaSyAO6LPJA9hTOGR_n-KR8N0aJzgabLlW0WQ";
let instaFeed;
function getResInfo(input){
	var rating_chip=null;
	
		
	$.get("https://developers.zomato.com/api/v2.1/restaurant?res_id="+input.id+"&apikey="+ zomato_api_key, function (data, status) {
	async function loop(){
			if(input.rating==5||input.rating==4){
		rating_chip="green"
	}
	else if(input.rating==3||input.rating==2){
rating_chip="yellow"
	}
	else{
		rating_chip="red"
	}
	}
		loop().then(function(){
			console.log(rating_chip)
			var index=resInfo.push(data)-1;
			
			console.log(data)
			if(data.thumb!=""){
			$("#home_food").append('<div class="col s12 m4"><div class="card"><div class="card-content row"><div class="rest_info"><center><h5>'+data.name+'</h5><div class="light"><i class="material-icons" style="vertical-align:middle">location_on</i> '+data.location.address+'</center></div><div class="rating"><b>Rated </b><div class="rating_chip_'+rating_chip+' chip">'+input.rating+'</div></div><img src='+data.thumb+' style="height:auto;width:auto;"/></div><div class="card-action" style="text-align:center"><div class="btn-small openrestInfo"  id="' + index + '" style="border-radius:40px; background-color:black; color:white ;">View More</div></div></div>')
		}
		else {
			$("#home_food").append('<div class="col s12 m4"><div class="card"><div class="card-content row"><div class="rest_info"><center><h5>'+data.name+'</h5><div class="light"><i class="material-icons" style="vertical-align:middle">location_on</i> '+data.location.address+'</center></div><div class="rating"><b>Rated </b><div class="rating_chip_'+rating_chip+' chip">'+input.rating+'</div></div><div class="light" style="font-size:14px;text-align:left"><blockquote style="border-color:black;">'+input.text+'</blockquote></div></div><div class="card-action" style="text-align:center"><div class="btn-small openrestInfo"  id="' + index + '" style="border-radius:40px; background-color:black; color:white ;">View More</div></div></div></div>')
		
		}

$('.openrestInfo').click(function(e){
	openRestInfo($(this).attr("id"),input,rating_chip)
	e.stopImmediatePropagation();
            e.preventDefault();
 console.log('click')
})
	})
	});
}
function openRestInfo(pos,input,rating_chip){
	var img=null;
	async function check(){if(data.thumb!=""){img='<center><img src='+data.thumb+' style="height:auto;width:auto;text-align:center"/></center>'}
	else{img="<div></div>"}}
var source='<center><div clas="source light">Powered By <img src="https://b.zmtcdn.com/images/logo/zomato_flat_bg_logo.svg" style="height: 32px; width:auto; vertical-align: middle;"/></div></center>'
	$("#moreInfoFoodContent").html('')
	$("#foodThumb").html('')
$("#moreInfoFood").modal('open')
var data = resInfo[pos];
check().then(function(){
$("#moreInfoFoodContent").append('<div class="rest_info"><center><h5>'+data.name+'</h5><div class="light"><i class="material-icons" style="vertical-align:middle">location_on</i> '+data.location.address+'</div><div class="light"><i class="material-icons" style="vertical-align:middle">fastfood</i> Cuisines: '+data.cuisines+'</div><div class="light"><i class="material-icons" style="vertical-align:middle">people</i> Cost For Two: '+data.average_cost_for_two+' '+data.currency+'</div><div class="rating"><b>Rated </b><div class="rating_chip_'+rating_chip+' chip">'+input.rating+'</div></div><div class="rating"><b>Average User Rating </b><div class=" chip" style="background-color:#'+data.user_rating.rating_color+';color:white;">'+data.user_rating.aggregate_rating+'</div> '+data.user_rating.rating_text+'</div></center><div class="light" style="font-size:14px;text-align:left"><blockquote style="border-color:black;">'+input.text+'</blockquote></div></div>'+img+source)
});
$('#resOrderId').attr('href',data.url)
}

/**
 * @return {string}
 */
function ISODateString(d) {
	function pad(n) {
		return n < 10 ? '0' + n : n
	}
	return d.getUTCFullYear() + '-' +
		pad(d.getUTCMonth() + 1) + '-' +
		pad(d.getUTCDate()) + 'T' +
		pad(d.getUTCHours()) + ':' +
		pad(d.getUTCMinutes() )+ ':' +
		pad(d.getUTCSeconds()) + 'Z'
}

function extractContent(s, t) {
	const span = document.createElement('span');
	span.innerHTML = s;
	let str = span.textContent || span.innerText;
	if (t < 6) {
		str = str.split(" ").splice(0, 60).join(" ") + " .....";
	} else {
		str = str.split(" ").splice(0, 50).join(" ") + " .....";
	}
	return str
}
function extractContentTab(s) {
	const span = document.createElement('span');
	span.innerHTML = s;
	var str = span.textContent || span.innerText;
		str = str.split(" ").splice(0, 20).join(" ") + " .....";
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


var d = new Date();
var e = ISODateString(d);

//Init Handler


String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
      };
$.get("https://www.googleapis.com/blogger/v3/blogs/223436113103407526/posts?key=" + api_key + "&maxResults=10&orderBy=published&fetchBodies=true", function (data, status) {
	var hrefs = ["#one!", "#two!", "#three!", "#four!", "#five!", "#six!", "#seven!", "#eight!", "#nine!", "#ten!"]
	var i = 0;
	console.log(data)
	for (i = 0; i < 10; i++) {
		var title_length = data.items[i].title.split(' ').length;
		console.log(title_length)
		var content = extractContent(data.items[i].content, title_length);

		Images=extractImages(data.items[i].content)

 if(Images.length != 0){
 	content = content.trunc(100)
 	$('.topPostHolder').append('<div  class="carousel-item  blogBody container" href="' + hrefs[i] + '" ><h5 class="blogTitle container"style="margin:auto;"><center>' + data.items[i].title + '</center></h5><br><center><img class="responsive-img container" src="'+Images[0]+'" style=""/></center><div class="row"><div style="height:" class="container blogContent">' + content + '<div class="fadeout"></div></div><div class="btn-small openPost"  id="' + data.items[i].id + '" style="border-radius:40px; background-color:black; color:white ; margin-top:-120px;">Continue Reading</div></div></div>');
 }
else{		$('.topPostHolder').append('<div  class="carousel-item  blogBody" href="' + hrefs[i] + '" ><h5 class="blogTitle container"style="margin:auto;"><center>' + data.items[i].title + '</center></h5><br><br><div style="height:" class="container blogContent">' + content + '<div class="fadeout"></div></div><div class="btn-small openPost"  id="' + data.items[i].id + '" style="border-radius:40px; background-color:black; color:white ; margin-top:-120px;">Continue Reading</div></div>');
}
		$('.topPostHolder').append('</div>');
	}
	$('.carousel.homeC').carousel({
		fullWidth: true,
		indicators: true
	});
	var interval = 2000;
	function slider(){
		$('.carousel.homeC').carousel('next');
	}
	var myInt = setInterval(slider, interval);

$('.carousel.homeC').hover(function(){
   clearInterval(myInt);
}, function() {  
    myInt = setInterval(slider, interval);
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
});
$("#fb_mob").click(function () {
	$("#fbfeed").html('<div class="container"><center><iframe style="margin-left:-30px;" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpickeratpace%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2322960014618558" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe></center></div>')
});
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
	$("#screen2").click(function(e){
		
console.log("click")
postTab();

		$('.blogHeader').fadeOut(100,function(){
			
		});
	})
	$("#screen3").click(function(){
		$('.blogHeader').fadeOut(100,function(){
			
		});
	})
$("#screen5").click(function(){
		$('.blogHeader').fadeOut(100,function(){
			
		});
	})
	$("#screen1").click(function(){
		$('.blogHeader').fadeIn(100);
	})
	 $('.carousel.homeD').carousel({
    fullWidth: true,
    
  });
         $('.tooltipped').tooltip();
       $.each(res_ids,function(index, value){
        	
        	getResInfo(value)
        }) 
       $("#triggerMediaTab").click(function() {
    $('ul.tabs').tabs('select_tab', 'mediaSection');
  });

});