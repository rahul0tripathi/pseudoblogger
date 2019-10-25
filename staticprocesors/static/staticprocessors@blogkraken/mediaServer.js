//Dummy Data
//https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg
//<div class="plyr__video-embed mediaPlayer" ><iframe src="https://www.youtube.com/embed/'+value.id+'?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1" allowfullscreen allowtransparency allow="autoplay"></iframe></div> 
let premiere_content =[{
id:'12J9RVpnUBo',
src:'yt',
title:'Episode 1 - Puja Vaid | Lucknow\'s Most Favourite with Picker At Pace',
tags:['Lucknow\'s Most Favourite','Episode 1']
},{
	id:'nM9rZrzGBBA',
src:'yt',
title:'Episode 2 - Vishakha Shukla | Lucknow\'s Most Favourite with Picker At Pace',
tags:['Lucknow\'s Most Favourite','Episode 2']
},{
	id:'c9_BhZeLrEs',
src:'yt',
title:'Episode 3 - Gaurav Prakash | Lucknow\'s Most Favourite with Picker At Pace',
tags:['Lucknow\'s Most Favourite','Episode 3']
}]
function renderMedaiaContent(){
 $.each(premiere_content,function(index, value){
    	var tags='';
    	async function renderTags(){
    		$.each(value.tags,function(index, value){

tags+='<span class="badge black">'+value+'</span>'
    		})
    	}
    	renderTags().then(function(){$("#premiere-content").append('<div class="col s12 m4"><center><div class="mediaHolder" id="'+index+'_ofarray" sourceId="'+value.id+'"><img src="https://img.youtube.com/vi/'+value.id+'/maxresdefault.jpg" style="height:100%;width:100%;"/><div class="play" trigger_id="'+index+'"><center><i class="material-icons modal-trigger" data-target="vid_description" style="color:white; font-size: 70px;">play_circle_filled</i></center></div></div></center><div class="card" style="width: 100% !important"><div class="card-action mediaPlayerInfo"><b style="font-family: \'Merienda\', cursive;color:black">'+value.title+'</b><div class="row videoTags"><center>'+tags+'</center></div></div></div></div>')
        	$(".play").click(function(e){
e.stopImmediatePropagation();
            e.preventDefault();
	const id = "#"+$(this).attr('trigger_id')+"_ofarray";
	const sourceId = $(id).attr('sourceId')
$(id).html('<div class="plyr__video-embed mediaPlayer" ><iframe src="https://www.youtube.com/embed/'+sourceId+'?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1" allowfullscreen allowtransparency allow="autoplay"></iframe></div> ')
const player = new Plyr('.mediaPlayer');
// GET DESCRIPTION OF THE VIDEO
$.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+sourceId+'&key=AIzaSyAO6LPJA9hTOGR_n-KR8N0aJzgabLlW0WQ&part=snippet&callback=?',function(data){
   console.log(data.items)  
    $("#vid_description").html('<h5>Description</h5><div class="row" style="font-weight:bold;">'+data.items[0].snippet.description+'</div>')
         $("#desc_btm_sheet").modal('open')
    });

});
        	})
	})
}
$.getScript('https://cdnjs.cloudflare.com/ajax/libs/plyr/3.5.4/plyr.min.js', function()
{
    console.log('plyr initalized')
renderMedaiaContent()
});


