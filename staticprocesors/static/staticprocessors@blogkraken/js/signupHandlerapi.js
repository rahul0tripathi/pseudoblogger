var local_data = {};
localStorage.clear();
function createbill(){
    var orderid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var original_json = localStorage.getItem("info_cache");
    var data = JSON.parse(original_json);
    data.billId=orderid;
    localStorage.setItem("info_cache",JSON.stringify(data));
    localStorage.setItem("bill_id",orderid);
    $("#billbody").append('<tr><td>Bill ID</td><td>'+orderid+'</td></tr>')
    $("#billbody").append('<tr><td>Server</td><td>'+data.server+'</td></tr>')
    $("#billbody").append('<tr><td>Storage</td><td>'+data.storage_Mib+' Mib</td></tr>')
    $("#billbody").append('<tr><td>Publisher</td><td>'+data.apps.publisher+'</td></tr>')
    $("#billbody").append('<tr><td>Social</td><td>'+data.apps.social+'</td></tr>')
    $("#billbody").append('<tr><td>Assist</td><td>'+data.apps.assist+'</td></tr>')
    $("#billbody").append('<tr><td>Wapi</td><td>'+data.plugins.wapi+'</td></tr>')
    $("#billbody").append('<tr><td>Bapi</td><td>'+data.plugins.bapi+'</td></tr>')
    $("#billbody").append('<tr><td>CustomApi</td><td>'+data.plugins.customapi+'</td></tr>')
    $("#billbody").append('<tr><td>Metrics</td><td>'+data.tools.metrics+'</td></tr>')
    $("#billbody").append('<tr><td>Support</td><td>'+data.tools.support+'</td></tr>')
    $("#billbody").append('<tr><td>Total</td><td>$'+data.totalCost+' Per Month</td></tr>')

    
}
function requestServBill(){
    var original_bill = JSON.parse(localStorage.getItem("info_cache"));
    var user_local = JSON.parse(localStorage.getItem("user_cache"));
    var staged_bill={
        user_info:user_local,
        bill_info:original_bill
    }
    $.post('http://'+window.location.hostname+'/setupapi/stage_bill',staged_bill,function(responseData){
    console.log(responseData);
    });
}
$("#step1").click(function () {
    $.when($("#instructions").fadeOut(500)).done(function () {
        $("#page2").fadeIn(500);
    });
})
$('.instance').click(function () {
    if ($(this).is(':checked')) {
        $("#step2").show();
        local_data.server = (this.id);
    } else {
        $("#step2").hide();
    }
})
$("#step2").click(function () {
    console.log(local_data)
    localStorage.setItem("info_cache", JSON.stringify(local_data));

    $.when($("#page2").fadeOut(500)).done(function () {
        $("#page3").fadeIn(500);
        M.toast({html: 'Slide Left To View More If You Are On A Mobile Device'})
    });
})
$('.storage').click(function () {
    if ($(this).is(':checked')) {
        $("#step3").show();
        local_data = JSON.parse(localStorage.getItem('info_cache'))
        local_data.storage_Mib = (this.id);
        local_data.totalCost = parseFloat($(this).val())*744;
    } else {
        $("#step3").hide();
    }
})
$("#step3").click(function () {
    localStorage.setItem("info_cache", JSON.stringify(local_data));
    $.when($("#page3").fadeOut(500)).done(function () {
        $("#page4").fadeIn(500);
    });
})
var app = {
    publisher:false,
    assist:false,
    social:false
}
var plugins={
    wapi:false,
    bapi:false,
    customapi:false
}
var tools={
    metrics:false,
    support:false
}
var total_appcost = 0;
$('#publisher').click(function () {
    if ($(this).is(':checked')) {
        app.publisher = true
        total_appcost += parseFloat($(this).val());
        console.log(total_appcost)
    } else {
        app.publisher=false
        total_appcost -= parseFloat($(this).val());

    }
})
$('#social').click(function () {
    if ($(this).is(':checked')) {
        app.social = true

        console.log(total_appcost)
    } else {
        app.social=false
        

    }
})
$('#assist').click(function () {
    if ($(this).is(':checked')) {
        app.assist = true
        total_appcost += parseFloat($(this).val());
        console.log(total_appcost)
    } else {
        app.assist=false
        total_appcost -= parseFloat($(this).val());

    }
})
$('#bapi').click(function () {
    if ($(this).is(':checked')) {
        plugins.bapi = true

        console.log(total_appcost)
    } else {
        plugins.bapi=false
        

    }
})
$('#metrics').click(function () {
    if ($(this).is(':checked')) {
        tools.metrics = true

        console.log(total_appcost)
    } else {
        tools.metrics=false
        

    }
})
$('#support').click(function () {
    if ($(this).is(':checked')) {
        tools.support = true

        console.log(total_appcost)
    } else {
        tools.support=false
        

    }
})
$('#wapi').click(function () {
    if ($(this).is(':checked')) {
    plugins.wapi = true
        total_appcost += parseFloat($(this).val());
        console.log(total_appcost)
    } else {
        plugins.wapi=false
        total_appcost -= parseFloat($(this).val());

    }
})

var click=0;
$("#step4").click(function () {
    
   if(click == 0){ local_data = JSON.parse(localStorage.getItem('info_cache'))
    local_data.apps = app;
    local_data.plugins = plugins;
    local_data.tools=tools;
    local_data.totalCost = parseFloat(local_data.totalCost) + parseFloat(total_appcost);
    console.log(local_data.totalCost)
    localStorage.setItem("info_cache", JSON.stringify(local_data));
    createbill();
    $.when($("#page4").fadeOut(500)).done(function () {
        $("#page5").fadeIn(500);


    });
}click=click+1;

})
$("#confirm_bill").click(function(){
    
    $.when($("#page5").fadeOut(500)).done(function () {
        $("#page6").fadeIn(500);
    });
});
$("#reset").click(function(){
    $.when($("#page5").fadeOut(500)).done(function () {
        $("#page6").fadeIn(500);
    });
});
function readURL(input) {
if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#previewImg').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}
$("#profileImage").change(function(){
    readURL(this)
    
})