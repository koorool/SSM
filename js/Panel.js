/*(function($) {
    $(document).ready(function() {
        jQuery.infopanel = $('#panel');	
		//var $map = $('#map');
        //if (jQuery.infopanel.length) {
    	//var $sticker = jQuery.infopanel.children('#panel-sticker');
	   	//jQuery.panelContent = $('#panel_content');
       	jQuery.Panel = function(){
           	if (!jQuery.infopanel.hasClass('visible')){
            	jQuery.infopanel.animate({ right: '+=300' }, 200, function() {
        	   $(this).addClass('visible');
            });
			setTimeout(function() { $('#map').width('-=300') }, 180);
			}                        
		}
                  
		$('#close').on('click', function(){
			if (jQuery.infopanel.hasClass('visible')){
                jQuery.infopanel.animate({
                right: '-=300'
                }, 200, function() { $(this).removeClass('visible'); });
			$('#map').width('+=300');
				}
        });              
    });
})(jQuery);*/

function loadDataInfoPanel(marker)
	{
		var city;
		if(document.getElementById("marker_name").textContent != marker.title ){
			document.getElementById('city').textContent = "";
			panelinformation(marker.get('code'), marker.get('type'));
			document.getElementById("code").textContent = marker.get('code'); 	
			//document.getElementById("code").innerText = marker.get('code');
			document.getElementById("marker_name").textContent=marker.title;
	
		geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        var components=results[0].address_components;

        for (var component=0;component<(components.length);component++){
            /*if(components[component].types[0]=="administrative_area_level_1"){
                var admin_area=components[component].long_name;
            }*/
            if(components[component].types[0]=="country"){
            	//if(!admin) //document.getElementById('country').value = components[component].long_name;
            	document.getElementById('country').textContent = components[component].long_name;
                //country=components[component].long_name;
            }

            if(components[component].types[0]=="locality"){
            	//alert(components[component].long_name);
            	//if(marker.get('city') !== "null") document.getElementById('city').textContent = marker.get('city');
            
		 		//else document.getElementById('city').textContent = components[component].long_name;
		 		city = components[component].long_name;
            }
        }
      } else {
        infowindow.setContent('<b styles="font-color:black;">No results found</b>');
        infowindow.open(map, marker);
      }
    } else {
      infowindow.setContent('<b styles="font-color:black;"> Geocoder failed due to: ' + status + '</b>');
      infowindow.open(map, marker); 
    }
  });
	if(marker.get('city') !== "null") document.getElementById('city').textContent = marker.get('city');
            
	else document.getElementById('city').textContent = city;
	}
	//if(admin && document.getElementById('city').value==="") document.getElementById('city').placeholder ="City is null!";
}

var empty_galery = false;
//переробити
function panelinformation(code, type){
	
	downloadUrl("./PHP/panel.php?code=" + code + "&type=" + type, function(data) {
		//var xml = data.responseXML;
		if (navigator.appName == 'Microsoft Internet Explorer') var markers = data.responseXML.childNodes[1];
        else 
        var markers = data.responseXML.firstChild;
				switch(type){
					case '0':					
					if(markers.getAttribute("scenery_free").indexOf(';')+1){
					//var arr_scenery = markers.getAttribute("scenery_free").split(';');
					load_href('scenery_free' , markers.getAttribute("scenery_free").split(';'));
					//document.getElementById("scenery_free").href= arr_scenery[0];
					//document.getElementById("scenery_free1").href= arr_scenery[1];
					load_text('scenery_free', markers.getAttribute("scenery_free_label").split(';'));
					/*arr_scenery = markers.getAttribute("scenery_free_label").split(';');
					document.getElementById("scenery_free").textContent= arr_scenery[0];
					document.getElementById("scenery_free1").textContent= arr_scenery[1];*/					
					}
					else{
					document.getElementById("scenery_free").href= markers.getAttribute("scenery_free");
					if(markers.getAttribute("scenery_free_label")!==null && markers.getAttribute("scenery_free_label").length)
					document.getElementById("scenery_free").textContent = markers.getAttribute("scenery_free_label")//.substring(11, 40);
					else document.getElementById("scenery_free").textContent = markers.getAttribute("scenery_free").substring(11, 40);
					document.getElementById('scenery_free1').textContent = null;
					//document.getElementById('form').removeChild(document.getElementById('scenery_free1'));
					//document.getElementById('form').removeChild(document.getElementById('scenery_free_label1'));
					}
					/*if(document.getElementById('scenery1').length && document.getElementById('scenery_label1').length){
						document.getElementById('form').removeChild(document.getElementById('scenery1'));
						document.getElementById('form').removeChild(document.getElementById('scenery_label1'));
					}*/
					document.getElementById('scenery').textContent = null;
					document.getElementById('scenery1').textContent = null;
					break;
					case '1':
					if(markers.getAttribute("scenery").indexOf(';')+1){
					load_href('scenery' , markers.getAttribute("scenery").split(';'));
					/*var arr_scenery = markers.getAttribute("scenery").split(';');
					document.getElementById("scenery").href= arr_scenery[0];
					document.getElementById("scenery1").href= arr_scenery[1];*/
					load_text('scenery' , markers.getAttribute("scenery_label").split(';'));
					/*arr_scenery = markers.getAttribute("scenery_label").split(';');
					document.getElementById("scenery_label").textContent= arr_scenery[0];
					document.getElementById("scenery_label1").textContent= arr_scenery[1];*/					
					}
					else{
					document.getElementById("scenery").href= markers.getAttribute("scenery");
					if(markers.getAttribute("scenery_label")!==null && markers.getAttribute("scenery_label").length)
					document.getElementById("scenery").textContent = markers.getAttribute("scenery_label");
					else document.getElementById("scenery").textContent = markers.getAttribute("scenery").substring(11, 40);
					document.getElementById('scenery1').textContent = null;
					//document.getElementById('form').removeChild(document.getElementById('scenery_free1'));
					//document.getElementById('form').removeChild(document.getElementById('scenery_free_label1'));
					}
					document.getElementById('scenery_free').textContent = null;
					document.getElementById('scenery_free1').textContent = null;
					break;
					case '2':
					if(markers.getAttribute("scenery_free").indexOf(';')+1){
					load_href('scenery_free' , markers.getAttribute("scenery_free").split(';'));
					load_text('scenery_free', markers.getAttribute("scenery_free_label").split(';'));				
					}
					else{
					document.getElementById("scenery_free").href= markers.getAttribute("scenery_free");
					if(markers.getAttribute("scenery_free_label")!==null && markers.getAttribute("scenery_free_label").length)
					document.getElementById("scenery_free").textContent = markers.getAttribute("scenery_free_label");
					else document.getElementById("scenery_free").textContent = markers.getAttribute("scenery_free").substring(11, 40);
					document.getElementById('scenery_free1').textContent = null;
					//document.getElementById('form').removeChild(document.getElementById('scenery_free1'));
					//document.getElementById('form').removeChild(document.getElementById('scenery_free_label1'));
					}
					if(markers.getAttribute("scenery").indexOf(';')+1){
					load_href('scenery' , markers.getAttribute("scenery").split(';'));
					load_text('scenery', markers.getAttribute("scenery_label").split(';'));					
					}
					else{
					document.getElementById("scenery").href= markers.getAttribute("scenery");
					if(markers.getAttribute("scenery_label")!==null && markers.getAttribute("scenery_label").length)
					document.getElementById("scenery").textContent = markers.getAttribute("scenery_label");
					else document.getElementById("scenery").textContent = markers.getAttribute("scenery").substring(11, 40);
					document.getElementById('scenery1').textContent = null;
					//document.getElementById('form').removeChild(document.getElementById('scenery_free1'));
					//document.getElementById('form').removeChild(document.getElementById('scenery_free_label1'));
					}
					break;
				}
				document.getElementById("description").textContent= markers.getAttribute("description");
			//}
			//document.getElementById('galery').innerHTML = "";
			$('.placeholder').remove();
			//var galery = [];
			empty_galery = false;
			/*while (document.getElementById('galery').lastChild.id !== 'galery0') {
    		document.getElementById('galery').removeChild(document.getElementById('galery').lastChild);
			}*/
			if(markers.getAttribute("images").indexOf(';')+1){
				//galery0 = document.createElement('img');
				//galery0.id = "galery0";
				//document.getElementById('galery').appendChild(galery0);
				var arr = markers.getAttribute("images").split(';');
				var arr1 = [];
				document.getElementById('galery0').src ="./img/" + arr[0];
				//arr1[0] = "./img/" + arr[0];
				for(var i=0; i<arr.length-1; i++){
					//if(arr[i]!=" " && arr[i]!=";" && arr[i].length && arr[i]!=null){
						//galery[i] = document.createElement('img');
						//galery[i].className = 'hidden';
						//galery[i].src = "./img/" + arr[i];
						arr1[i] = "./img/" + arr[i];
						//galery[i].title = code;
						//document.getElementById('galery').appendChild(galery[i]);
					//document.getElementById("galery"+i).src = "/aviamap/img/"+ code+ i +"." +arr[i];
						//k++;
					//}
				};

			//if(arr.length!=0) 
			window.length1 = arr1.length;
			$('').touchTouch(arr1);
			}
			else {
				empty_galery = true;
				document.getElementById('galery0').src = './images/NoImage.png';
			}
	});
}

//var show_city=false;
/*function addcity(){
	if(document.getElementById('city_field')==null){
	if(show_city){
		document.getElementById('city_field').parentNode.removeChild(document.getElementById('city_field'));
		show_city = false;
	}
	else{
		show_city = true;
	var tbCity = document.createElement('input');
 	//tbCity.type = "text";
 	tbCity.name = 'city';
 	tbCity.id = 'city_field';
 	//tbCity.required = 'required';
 	tbCity.placeholder = 'city';
 	document.getElementById('for_city').appendChild(tbCity);
 	}
}*/

/*(function($) { //In case jQuery no conflict is being used
    $(document).ready(function() { //wait for document ready
        var timer;
        var delay = 600; // 0.6 seconds delay after last input
 
        $('.scenery').bind('input', function() {
            window.clearTimeout(timer);
            timer = window.setTimeout(function(){
                  //insert delayed input change action/event here
                              createfield('scenery');
 
            }, delay);
        })
    }); // END READY           
})(jQuery);*/

/*function createfield(field){
	//if(document.getElementById(field.id +'_chbx').checked){
	if(document.getElementById(field).value && !document.getElementById(field + "_label")){//.id
		var tbSceneryLabel = document.createElement('input');
		document.getElementById(field).onblur = null;
		//tbCity.type = "text";
	 	tbSceneryLabel.name = field + "_label"; //.id
	 	tbSceneryLabel.id = field + "_label";//.id
	 	tbSceneryLabel.className = "form-control";
	 	tbSceneryLabel.placeholder = field + "_label"; //.id	 	
	 	document.getElementById(field +"_box").appendChild(tbSceneryLabel);
	 	tbSceneryLabel.focus();
	 	tbSceneryLabel.onblur = function(){
	 		//if(document.getElementById("scenery_free1") === null || document.getElementById("scenery1")===null){
	 		document.getElementById(field + "_label").onblur = null;
	 		var tbScenery = document.createElement('input');
	 		tbScenery.name = field + "1"; //.id
	 		tbScenery.id = field + "1";//.id
	 		tbScenery.placeholder = field; //.id
	 		tbScenery.className = "form-control";
	 		if(field === 'scenery_free_label' || field === 'scenery_free_label1'|| field === 'scenery_free1' || field === 'scenery_free' )
	 		document.getElementById('scenery_free_box').appendChild(tbScenery);
	 		else
	 		document.getElementById('scenery_box').appendChild(tbScenery);	
	 		tbScenery.focus();
	 		var tbSceneryLabel = document.createElement('input');
	 		tbSceneryLabel.name = field + "_label1"; //.id
	 		tbSceneryLabel.className = "form-control";
	 		tbSceneryLabel.id = field + "_label1";//.id
	 		tbSceneryLabel.placeholder = field + "_label"; //.id
	 		if(field === 'scenery_free_label' || field === 'scenery_free_label1'|| field === 'scenery_free1' || field === 'scenery_free' )
	 		document.getElementById('scenery_free_box').appendChild(tbSceneryLabel);
	 		else
	 		document.getElementById('scenery_box').appendChild(tbSceneryLabel);
	 		//}
	 	}
	} 	
 	/*else
 	{
 		document.getElementById('form').removeChild(document.getElementById(field.id + "_label"))
 	}*/
//}

/*function load_link(field){
	document.getElementById(field).href = markers[0].getAttribute(field);
	if(markers[0].getAttribute(field + "_label").length && markers[0].getAttribute(field + "_label")!= null)
	document.getElementById(field).textContent = markers[0].getAttribute(field + "_label");
	else document.getElementById(field).textContent = markers[0].getAttribute(field);
}*/
function load_href(field, array){
	document.getElementById(field).href= array[0];
	document.getElementById(field + "1").href= array[1];
}
function load_text(field, array){
	document.getElementById(field).textContent= array[0];
	document.getElementById(field + "1").textContent= array[1];
}
/*function load_admin(field, array){
	if(document.getElementById(field)===null) create_onefield(field);
	document.getElementById(field).value= array[0];
	if(document.getElementById(field + "1")===null) create_onefield(field+'1');
	document.getElementById(field + "1").value= array[1];
}
function create_onefield(field){
	//if(document.getElementById(field).value && !document.getElementById(field + "_label")){//.id
		var tbSceneryLabel = document.createElement('input');
		tbSceneryLabel.className = "form-control";
	 	tbSceneryLabel.name = field; //.id
	 	tbSceneryLabel.id = field;//.id
	 	tbSceneryLabel.placeholder = field; //.id
	 	if(field === 'scenery_free_label' || field === 'scenery_free_label1'|| field === 'scenery_free1' )
	 	//document.getElementById('before_free').insertBefore(tbSceneryLabel, document.getElementById('before_scenery_free'));
	 	document.getElementById('scenery_free_box').appendChild(tbSceneryLabel);
	 	else document.getElementById('scenery_box').appendChild(tbSceneryLabel);
	 	//document.getElementById('before').insertBefore(tbSceneryLabel, document.getElementById('before_scenery'));
	 	//document.getElementById('form').insertBefore(document.createElement('br'), document.getElementById('before_' + field));
}*/