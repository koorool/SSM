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
	setTimeout(function() {
	document.getElementById('frame').onload = function(){
		if(document.getElementById('frame').contentWindow.document.body.innerHTML!=""){
		alert("marker with id: " + document.getElementById("frame").contentWindow.document.body.innerHTML +" Added!"); //можливо це не потрібно
	    markers_load("-1", document.getElementById("frame").contentWindow.document.body.innerHTML);
	    panelinformation(document.getElementById('code').value);
		}
	};
	}, 4000);
	
$(document).ready(function(){
    $("#search").autocomplete({ source: source });

    $("#search").autocomplete({ source: source });

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