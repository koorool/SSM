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
    $("#search").autocomplete({ source: source,
    	select: function (event, ui) {
                search_func(ui.item.label.split(',')[0]);
                
                // On enter key
                // if (event.keyCode == 13) {}
                
                // On button click
                //$(#'zip-form').submit()
            }
     });
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

/*$(document).on('click', ".ui-menu-item" ,  function(){    	
    
    //function search(){
	  	//var arr_split;
	  	search_func($(this).text().split(',')[0]);
	//}
	})*/
/*$("#searchbutton").click(function(e){
    search_func($("#search").text().split(',')[0]);
})*/
/*$(document).on('click', "#searchbutton" ,  function(){      
    
    //function search(){
      //var arr_split;
      search_func($('#search').text().split(',')[0]);
  //}
  })*/


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
    	if(formURL == '../PHP/update.php'){
    		alert("marker with id: " + document.getElementById('code').value+ " Updated!");
           		//marker.setMap(null);
           		//window.infowindow.setMap(null);
           	var marker = search_marker();
    		set_icon(marker);
		    document.getElementById("filesend").innerHTML = document.getElementById("filesend").innerHTML;
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
		if(document.getElementById("city").value.length) marker.set('city', document.getElementById("city").value);
		infowindow.close();
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
        //var arr_split = text;
        if(/*arr_split[0]*/ text == markers_arr[i].get('code')){
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
	        marker.set('type', '0');
	        }
		    else if(!document.getElementById('scenery_free').value && document.getElementById('scenery').value){
		        marker.setIcon(new google.maps.MarkerImage(customIcons[1].icon,
		        new google.maps.Size(20, 20),
		        null,//new google.maps.Point(0, 0),
		        null,//new google.maps.Point(0, 0),
		        new google.maps.Size(20, 20)));
		        marker.set('type', '1');
		        }
		    else{
		        marker.setIcon(new google.maps.MarkerImage(customIcons[2].icon,
		        new google.maps.Size(20, 20),
		    	null,//new google.maps.Point(0, 0),
		        null,//new google.maps.Point(0, 0),
		        new google.maps.Size(20, 20)));
		        marker.set('type', '2');
		    }
}
function codeAddress() {
    var address = document.getElementById("address").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      	//if()
        map.setCenter(results[0].geometry.location);
        //alert(results[0].address_components[airport].types[0]);
        map.fitBounds(results[0].geometry.viewport);
        //alert airport name!
        //document.getElementById('bounds_area').innerHTML="bounds:"+results[0].geometry.viewport;
        var marker = new google.maps.Marker({
            map: map, 
            position: results[0].geometry.location,
            draggable:true
        });
        marker.set('type', 3);
        markers_arr.push(marker);
        document.getElementById("lat").value = marker.getPosition().lat();
        document.getElementById("lng").value = marker.getPosition().lng();
        mew_marker_clicked(marker);
        google.maps.event.addListener(marker, 'dragend', function() {
              //if(jQuery.infopanel.hasClass('visible')){
               document.getElementById('lat').value = this.getPosition().lat();
               document.getElementById('lng').value = this.getPosition().lng();
               formReset();
               //infowindow.close();
              //}
             });

             google.maps.event.addListener(marker, 'click', function ()
              {
               if(document.getElementById("lat").value!== marker.getPosition().lat()
                  && document.getElementById("lng").value!== marker.getPosition().lng())
                mew_marker_clicked(this);                
              });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

 document.getElementById("searchbutton").addEventListener("click", function(){
    search_func(document.getElementById('search').value.split(',')[0]);
 });