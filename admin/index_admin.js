//filter free/non-free/all markers//
	/*function check(type){
		switch (type){
			case -1:
			markers_load(-1);
			document.getElementById('refresh').innerHTML = "Refresh";
			document.getElementById("free").checked = false;
			document.getElementById("pay-free").checked = false;
			document.getElementById("non-free").checked = false;		
			break;
			case 0:
			markers_load(0);
			document.getElementById('refresh').innerHTML = "Reset";
			break;
			case 1:
			markers_load(1);
			document.getElementById('refresh').innerHTML = "Reset";
			break;
			case 2:
			markers_load(2);
			document.getElementById('refresh').innerHTML = "Reset";
			break;
		}
	}*/
	/*setTimeout(function() {
	document.getElementById('frame').onload = function(){
		if(document.getElementById('frame').contentWindow.document.body.innerHTML!=""){
		alert("marker with id: " + document.getElementById("frame").contentWindow.document.body.innerHTML +" Added!"); //можливо це не потрібно
	    markers_load("-1", document.getElementById("frame").contentWindow.document.body.innerHTML);
	    panelinformation(document.getElementById('code').value);
		}
	};
	}, 4000);*/
	
$(document).ready(function(){
    $("#search").autocomplete({ source: source });
//filter free/non-free/all markers//
	$('#tmp').click(function(){
		hide_markers(3);
	})

    $("#CheckAll").click(function(){
    	hide_markers(-1);//markers_load(-1);
    });

    $("#CheckFree").click(function(){
    	hide_markers(0);//markers_load(0);
    });
    $("#CheckPaid").click(function(){
    	hide_markers(1);//markers_load(1);
    });
    $("#CheckPaidAndFree").click(function(){
    	hide_markers(2);//markers_load(2);
    });
//filter free/non-free/all markers//

/*$(document).on('load', "#deleteArrow" ,  function(){
    $(this).toggle();
});*/
$('#galery0').click(function(){
	$("#deleteArrow").show();
});
$('#deleteArrow').click(function(e){
				$.ajax({
						url:'/aviamap/PHP/delete_image.php?name=' + array[index],
						success: function(){								
								array.splice(index-1,1);
								alert("Photo deleted");
								$("touchtouch" + index).remove();
								if(index+1 < window.length1)showNext();							
								else showPrevious();								
						}
				});
			});
$(document).on('click', ".ui-menu-item" ,  function(){    	
    
    //function search(){
	  	//var arr_split;
	  	search_func($(this).text().split(','));
	//}
	})

    /*$("#ShowLogin").click(function(){
        $("#LoginForm").toggle();
    });

    $("#LoginForm").submit(function(event){
        Login($("#InputLogin").val(), $("#InputPassword").val());
        event.preventDefault();
    });*/
	$("#scenery_free").blur(function(){
      createfield("scenery_free");
    });
    $("#scenery").blur(function(){
      createfield("scenery");
    });
//Callback handler for form submit event
$("#form").submit(function(e)
{ 
    var formObj = $(this);
    var formURL = formObj.attr("action");
    var formData = new FormData(this);
    $.ajax({
        url: formURL,
    	type: 'POST',
        data:  formData,
    	mimeType:"multipart/form-data",
    	contentType: false,
        cache: false,
        processData:false,
    success: function(data, textStatus, jqXHR)
    {
    	if(formURL == '/aviamap/PHP/update.php'){
    		alert("marker with id: " + document.getElementById('code').value+ " Updated!");
           		//marker.setMap(null);
           		//window.infowindow.setMap(null);
           	var marker = search_marker();
    		set_icon(marker);
		    document.getElementById("files").innerHTML = document.getElementById("files").innerHTML;
    	}
    	else{
 		$('.placeholder').remove();
		document.getElementById('submit').value = "update";
		document.getElementById('del').disabled = false;
		document.getElementById('reset_btn').disabled = true;
		var marker = search_marker_position();
		set_icon(marker);
		marker.setTitle(document.getElementById("marker_name").value);
		marker.set('code', document.getElementById('code').value);
		source.push (document.getElementById('code').value + ", " + document.getElementById("marker_name").value);
		google.maps.event.addListener(marker, 'click', function ()
      	{
          loadDataInfoPanel(this);
      	});
      	google.maps.event.addListener(marker, 'dragend', function() {
              loadDataInfoPanel(this);
              document.getElementById('lat').value = this.getPosition().lat();
              document.getElementById('lng').value = this.getPosition().lng();
        });
		alert("marker with id: "+ data + "added");
		}
    },
     error: function(jqXHR, textStatus, errorThrown)
     {
     	alert();
     }         
    });
    e.preventDefault(); //Prevent Default action.
    //e.unbind();
});
//$("#form").submit(); //Submit the form

});

function marker_animate(marker){
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function(){marker.setAnimation(null)}, 2000);
}
function search_func(text){
      //var arr_split;
      for (var i = 0; i < markers_arr.length; i++) {
        var arr_split = text;
        if(arr_split[0] == markers_arr[i].get('code')){
          map.setCenter(markers_arr[i].getPosition()); 
          loadDataInfoPanel(markers_arr[i]);
          marker_animate(markers_arr[i]);
        } 
      }
}

function hide_markers(type){
	if(type === -1){
		for (var i = 0; i < markers_arr.length; i++)
        markers_arr[i].setVisible(true);      
	}
	else if(type === 3){
		for (var i = 0; i < markers_arr.length; i++) {
        if(markers_arr[i].get('type')==3){
          markers_arr[i].setMap(null);
      }
    }
	}
	else{
	for (var i = 0; i < markers_arr.length; i++) {
        if(type == markers_arr[i].get('type') || markers_arr[i].get('type')==3){
          markers_arr[i].setVisible(true);
        }
        else markers_arr[i].setVisible(false);
      }
    }
}
function search_marker(){
	for (var i = 0; i < markers_arr.length; i++) {
        if(document.getElementById('code').value == markers_arr[i].get('code')){
          return markers_arr[i];
        } 
      }
}
function search_marker_position(){
	for (var i = 0; i < window.markers_arr.length; i++) {
        if(document.getElementById("lat").value == markers_arr[i].getPosition().lat() && document.getElementById("lng").value == markers_arr[i].getPosition().lng()){
          return markers_arr[i];
        } 
      }
}
function set_icon(marker){
	if(document.getElementById('scenery_free').value && !document.getElementById('scenery').value){
    		marker.setIcon(new google.maps.MarkerImage(customIcons[0].icon,
        	new google.maps.Size(20, 20),
	        null,//new google.maps.Point(0, 0),
	        null,//new google.maps.Point(0, 0),
	        new google.maps.Size(20, 20)));
	        }
		    else if(!document.getElementById('scenery_free').value && document.getElementById('scenery').value){
		        marker.setIcon(new google.maps.MarkerImage(customIcons[1].icon,
		        new google.maps.Size(20, 20),
		        null,//new google.maps.Point(0, 0),
		        null,//new google.maps.Point(0, 0),
		        new google.maps.Size(20, 20)));
		        }
		    else{
		        marker.setIcon(new google.maps.MarkerImage(customIcons[2].icon,
		        new google.maps.Size(20, 20),
		    	null,//new google.maps.Point(0, 0),
		        null,//new google.maps.Point(0, 0),
		        new google.maps.Size(20, 20)));
		    }
}