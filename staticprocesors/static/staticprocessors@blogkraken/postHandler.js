
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
function postTab(){
	$('.postTabView').html('');
	console.log("executeed")
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
$('.postTabView').append('<div class="col s12 m3"><div class="card postHolder"><div class="activ" targetId='+id+'><div class="card-image waves-effect waves-block waves-light"> <img class="activator" src="'+images[0]+'"/></div><div class="card-content"><span class="card-title activator" ><h5 style="display:inline">'+data.items[i].title+'</h5><i class="material-icons right">more_vert</i> </span></div></div><div class="revealed-text row"  id='+id+'><span class="card-title grey-text text-darken-4" style="margin-top:8px;">'+data.items[i].title+'<i class="material-icons right close" targetId='+id+'>close</i></span><p>'+content+'<center><div class="btn-small openPost"  id="' + data.items[i].id + '" style="border-radius:40px; background-color:black; color:white ; ">Continue Reading</div></center></p></div></div>')
}else{
	continue;}
console.log(itemCount)
itemCount++;
}
$('.activ').click(function(){
		var id = '#'+$(this).attr("targetId");
		$(this).find('.card-content').css('color',"white ")
		$(this).css('filter','blur(1px)')
		$(this).css('opacity','0.6')
			$(id).show(200)
	

	})
$('.close').click(function(){
	var target = $(this).attr("targetId")
	$('.revealed-text').fadeOut(200,function(){$('.activ').fadeIn(200)
$('.activ').css('filter','blur(0px)')
$('.activ').find('.card-content').css('color',"black")
		$('.activ').css('opacity','1')})
	
	
})
$("#loader3").hide();
$('.openPost').click(function () {

		postDisplay($(this).attr("id"));
	})
});

}