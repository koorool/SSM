	/*setTimeout(function() {
	document.getElementById('frame').onload = function(){
		if(document.getElementById('frame').contentWindow.document.body.innerHTML!="" && admin)
		{
		alert("marker with id: " + document.getElementById("frame").contentWindow.document.body.innerHTML +"Added!"); //можливо це не потрібно
	    markers_load("-1", document.getElementById("frame").contentWindow.document.body.innerHTML);
	    panelinformation(document.getElementById('code').value);
		}
	};
	}, 4000);*/
	

$(document).ready(function(){
    $("#search").autocomplete({ source: source });

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
});

function search(){
      //var arr_split;
      for (var i = 0; i < markers_arr.length; i++) {
        var arr_split = document.getElementById('search').value.split(',');
        if(arr_split[0] == markers_arr[i].get('code')){
          map.setCenter(markers_arr[i].getPosition()); 
          loadDataInfoPanel(markers_arr[i]);
          marker_animate(markers_arr[i]);
        } 
      }
  }
function marker_animate(marker){
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function(){marker.setAnimation(null)}, 2000);
}

function hide_markers(type){
	if(type === -1){
		for (var i = 0; i < markers_arr.length; i++)
        markers_arr[i].setVisible(true);      
	}
	else{
	for (var i = 0; i < markers_arr.length; i++) {
        if(type == markers_arr[i].get('type')){
          markers_arr[i].setVisible(true);
        }
        else markers_arr[i].setVisible(false);
      }
    }
}
