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

function reload(){
	document.getElementById('galery').innerHTML = "";
	$('.placeholder').remove();
	document.getElementById('submit').value = "update";
	document.getElementById('del').disabled = false;
	document.getElementById('reset_btn').disabled = true;
}

function formReset() {
	var lat = document.getElementById('form').elements.item(2).value;
	var lng = document.getElementById('form').elements.item(3).value;
	document.getElementById("form").reset();
	document.getElementById('form').elements.item(2).value = lat;
	document.getElementById('form').elements.item(3).value = lng;
	//var form = document.getElementById('form');
	   //var values = new Array(form.elements.length);
	   //values[0] = "";
	   //values[1] = "";
	   //for (var i = 2; i < (form.elements.length - 2); i++) values[i] = "";	      
	   
	   
	   //values[9] = form.elements.item(9).value;
	   //values[10] = form.elements.item(10).value; 
	   
	   //for (var i = 0; i < form.elements.length-3; i++) 
	      /*if(form.elements.item(i).type != 'file') form.elements.item(i).value = values[i];*/
	   
	   //document.getElementById("description").textContent= "";
}

function delete_marker(marker){
	$.ajax({
            url: '/aviamap/PHP/delete.php',
            data: "code=" + marker.get('code'),
            type: 'POST',
            dataType: "html",            
            success: function(data){
            	alert("marker with code"+ marker.get('code')+ " Deleted!" + data);
            	marker.setMap(null);
            	document.getElementById("form").reset();        	
            } 
    });
}

function loadDataInfoPanel(marker)
	{
		if(document.getElementById("marker_name").value != marker.title ){
			if(admin){
		 	panelinformation(marker.get('code'), marker.get('type'));
		 	document.getElementById('city').value = "";
		 	document.getElementById('city').placeholder = "";
		 	/*if(document.getElementById('tbCity')!=null)
		 	document.getElementById('bLogin').parentNode.removeChild(document.getElementById('bLogin'));*/
			document.getElementById("code").value = marker.get('code');
			document.getElementById("marker_name").value = marker.title;
			document.getElementById("lat").value = marker.getPosition().lat();
			document.getElementById("lng").value = marker.getPosition().lng();
			//document.getElementById('country').value = country;
			document.getElementById('submit').value = "update";
			document.getElementById('reset_btn').disabled = true;
		 	document.getElementById('del').disabled = false;
		 	document.getElementById('del').onclick = function(){ delete_marker(marker)};
		 	//addcity();
		 	//document.getElementById('country').value = country;

			document.getElementById('form').action = '/aviamap/PHP/update.php';
			document.getElementById('form').onsubmit = function(){
				alert("marker with id: " + marker.get('code')+ " Updated!");
           		marker.setMap(null);
           		//window.infowindow.setMap(null);
           		markers_load("-1", marker.get('code'));
           		//incorrect
           		//marker.setIcon(customIcons[document.getElementById('type').value].icon);

            	/*var content = '<div class="scrollFix"><b>' + document.getElementById("marker_name").value + "</b> <br/>" 
            	+ document.getElementById("address").value +"</b>, <br/>"
            	+ document.getElementById("city").value+"</b>, <br/>"+ document.getElementById("country").value
            	+'</b> <br/><div id="additionally"><span id="additional" onclick="jQuery.Panel(window.this_marker)">Дополнительно</span></div></div>';
        		window.infowindow.setContent(content);
        		window.infowindow.open(map, marker);*/
            	document.getElementById("files").innerHTML = document.getElementById("files").innerHTML;
           	};			

			/*if(marker.get('type') == 0) document.getElementById("type").value="free";
				else document.getElementById("type").value="nonfree";*/

			
			//document.getElementById("address").value = marker.get('address');
			//document.getElementById("country").value = marker.get('country');
			//document.getElementById("city").value = marker.get('city');
			 }
		else {
			document.getElementById('city').textContent = "";
			panelinformation(marker.get('code'), marker.get('type'));
			document.getElementById("code").textContent = marker.get('code'); 	
			document.getElementById("marker_name").textContent=marker.title;
			//document.getElementById("lng").textContent= marker.getPosition().lng();
			//document.getElementById("lat").textContent= marker.getPosition().lat();
			/*if(marker.get('city') != "null"){		 		
		 		document.getElementById('city').textContent = marker.get('city');
		 	}
		 	else{
		 		document.getElementById('city').textContent = city;		 			 		
		 	}*/
		 	//document.getElementById('country').textContent = country;
			
			/*if(marker.get('type') == 0) document.getElementById("type").textContent="free";
				else document.getElementById("type").textContent="nonfree";*/						
		}		
	}
		/*var city;
		var conuntry;*/
		geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        var components=results[0].address_components;

        for (var component=0;component<(components.length);component++){
            /*if(components[component].types[0]=="administrative_area_level_1"){
                var admin_area=components[component].long_name;
            }*/
            if(components[component].types[0]=="country"){
            	if(!admin) //document.getElementById('country').value = components[component].long_name;
            	document.getElementById('country').textContent = components[component].long_name;
                //country=components[component].long_name;
            }

            if(components[component].types[0]=="locality"){
            	//alert(components[component].long_name);
            	if(marker.get('city') != "null"){
            		if(admin) document.getElementById('city').value = marker.get('city');
		 			else document.getElementById('city').textContent = marker.get('city');
		 		}
		 		//else if(typeof components[component].long_name === undefined && admin) document.getElementById('city').placeholder ="City is null!";
		 		else if(admin) document.getElementById('city').placeholder ="City is set by geocoding";//document.getElementById('city').value = components[component].long_name;
		 		else document.getElementById('city').textContent = components[component].long_name;
                //city=components[component].long_name;
            }
        }
        if(admin && !document.getElementById('city').value.length && !document.getElementById('city').placeholder.length) document.getElementById('city').placeholder ="City is null!";
        //коряво, переробити
        /*if(typeof city === 'undefined'){          
            
        }*/
        /*if(marker.get('city') != "null"){		 		
		 		document.getElementById('city').value = marker.get('city');
		 	}
		 	else{
		 		document.getElementById('city').value = city;		 			 		
		 	}*/

          //city = window.this_text;
        //}
        //alert(getcity(marker.get('code')));

        /*window.this_marker = marker;
        //country = results[2].formatted_address;
        if(marker.get('city')!="null"){
          infowindow.setContent('<div id="scrollFix"><b>'+marker.title+"</b><br/>"+marker.get('city')+', '+
        country +'</div><span id="additional" onclick="additional()">Дополнительно</span>');
        }
        else{
          infowindow.setContent('<div id="scrollFix"><b>'+marker.title+"</b><br/>"+window.city_geocode+', '+
        country +'</div><span id="additional" onclick="additional()">Дополнительно</span>');
        }*/
      } else {
        infowindow.setContent('No results found');
        infowindow.open(map, marker);
      }
    } else {
      infowindow.setContent('Geocoder failed due to: ' + status);
      infowindow.open(map, marker); 
    }
  });
	//if(admin && document.getElementById('city').value==="") document.getElementById('city').placeholder ="City is null!";
}
var empty_galery = false;
//переробити
function panelinformation(code, type){
	//var k=0;
	//var j = 0;
	/*$.ajax({
		    type: "GET",  
		    url: "/aviamap/PHP/panel.php?code=" + code,  
		    cache: false,
		    dataType: "xml",
		    async:true,  
		    success: function(data){
		    	var xml = dat.responseXML;
		    	var xmlDoc=loadXMLDoc(data);
			    var markers = xmlDoc.documentElement.getElementsByTagName("marker");
			    arr = markers[1].getAttribute("images").split(',');
				document.getElementById("description").textContent= markers[1].getAttribute("description");
				if(admin) document.getElementById("simulator").value= markers[1].getAttribute("simulator");
				else{ 
					document.getElementById("scenery").textContent = markers[1].getAttribute("scenery");
					document.getElementById("simulator").textContent= markers[1].getAttribute("simulator");
				}

				
				for(var i=0; i<arr.length; i++){
					if(arr[i]!=" " && arr[i]!="," && arr[i]!="" && arr[i]!=null){
					document.getElementById("galery"+i).src = "/aviamap/img/"+ code+ i +"." +arr[i];
					//k++;
					}
				 };
				 if(k!=0) $('.thumbs img').slice( 0, arr.length).touchTouch();		

					//document.anchors[0].href = "/aviamap/img/10Krovokrat0.png";
					//document.getElementById("png").firstChild.href= "/aviamap/img/" + marker.get('id') + marker.title + ".png";
			}
				
	});*/
	$('.placeholder').remove();
	var galery = [];
	empty_galery = false;
	downloadUrl("/aviamap/PHP/panel.php?code=" + code + "&type=" + type, function(data) {
		//var xml = data.responseXML;
		var markers = data.responseXML.documentElement.getElementsByTagName("marker");
			//переробити, враховуючи залежність між type and scenery			
			if(admin){
				switch(type){
					case '0':
					document.getElementById("scenery_free").value= markers[0].getAttribute("scenery_free");
					document.getElementById('scenery_free_label').value = markers[0].getAttribute("scenery_free_label");
					document.getElementById("scenery").value= "";
					document.getElementById("scenery_label").value= "";
					break;
					case '1':
					document.getElementById("scenery").value= markers[0].getAttribute("scenery");
					document.getElementById('scenery_label').value = markers[0].getAttribute("scenery_label");
					document.getElementById("scenery_free").value= "";
					document.getElementById("scenery_free_label").value= "";
					break;
					case '2':
					document.getElementById("scenery_free").value= markers[0].getAttribute("scenery_free");
					document.getElementById('scenery_free_label').value = markers[0].getAttribute("scenery_free_label");
					document.getElementById("scenery").value= markers[0].getAttribute("scenery");
					document.getElementById('scenery_label').value = markers[0].getAttribute("scenery_label");
					break;
				}
				/*if(markers[0].getAttribute("scenery")!=null && markers[0].getAttribute("scenery")!="")
					document.getElementById("scenery").value= markers[0].getAttribute("scenery");
					//createfield('scenery');
				if(markers[0].getAttribute("scenery_label")!=null && markers[0].getAttribute("scenery_label")!=""){
					document.getElementById('scenery_label').value = markers[0].getAttribute("scenery_label");
				
			 	if(markers[0].getAttribute("scenery_free")!=null && markers[0].getAttribute("scenery_free")!=""){
			 	document.getElementById("scenery_free").value= markers[0].getAttribute("scenery_free");
			 	//createfield('scenery_free');
				document.getElementById('scenery_free_label').value = markers[0].getAttribute("scenery_free_label");
				}*/
			 	document.getElementById("description").value= markers[0].getAttribute("description");
			}
			else{
				switch(type){
					case '0':
					document.getElementById("scenery_free").href = markers[0].getAttribute("scenery_free");
					if(markers[0].getAttribute("scenery_free_label").length && markers[0].getAttribute("scenery_free_label")!= null)
					document.getElementById("scenery_free").textContent = markers[0].getAttribute("scenery_free_label");
					else document.getElementById("scenery_free").textContent = markers[0].getAttribute("scenery_free");
					document.getElementById('scenery').textContent = "";
					break;
					case '1':
					document.getElementById("scenery").href = markers[0].getAttribute("scenery");
					if(markers[0].getAttribute("scenery_label").length && markers[0].getAttribute("scenery_label")!= null)
					document.getElementById("scenery").textContent = markers[0].getAttribute("scenery_label");
					else document.getElementById("scenery").textContent = markers[0].getAttribute("scenery");
					document.getElementById('scenery_free').textContent = "";
					break;
					case '2':
					document.getElementById("scenery_free").href = markers[0].getAttribute("scenery_free");
					if(markers[0].getAttribute("scenery_free_label").length && markers[0].getAttribute("scenery_free_label")!= null)
					document.getElementById("scenery_free").textContent = markers[0].getAttribute("scenery_free_label");
					else document.getElementById("scenery_free").textContent = markers[0].getAttribute("scenery_free");
					document.getElementById("scenery").href = markers[0].getAttribute("scenery");
					if(markers[0].getAttribute("scenery_label").length && markers[0].getAttribute("scenery_label")!= null)
					document.getElementById("scenery").textContent = markers[0].getAttribute("scenery_label");
					else document.getElementById("scenery").textContent = markers[0].getAttribute("scenery");
					break;
				}
				/*if(markers[0].getAttribute("scenery")!="" && markers[0].getAttribute("scenery")!= null){ 
					document.getElementById("scenery").href = markers[0].getAttribute("scenery");
					if(markers[0].getAttribute("scenery_label")!="" && markers[0].getAttribute("scenery_label")!= null)
					document.getElementById("scenery").textContent = markers[0].getAttribute("scenery_free_label");
					else document.getElementById("scenery_free").textContent = markers[0].getAttribute("scenery");
				}
				else{
					//document.getElementById("scenery").href = null;
					document.getElementById("scenery").textContent = "";
				}
				if(markers[0].getAttribute("scenery_free")!="" && markers[0].getAttribute("scenery_free")!= null){				
				document.getElementById("scenery_free").href= markers[0].getAttribute("scenery_free");
					if(markers[0].getAttribute("scenery_free_label")!="" && markers[0].getAttribute("scenery_free_label")!= null)
					document.getElementById("scenery_free").textContent = markers[0].getAttribute("scenery_free_label");
					else document.getElementById("scenery_free").textContent = markers[0].getAttribute("scenery_free");
				}
				else document.getElementById("scenery").textContent = "";*/
				document.getElementById("description").textContent= markers[0].getAttribute("description");
			}
			document.getElementById('galery').innerHTML = "";
			galery0 = document.createElement('img');
			galery0.id = "galery0";
			document.getElementById('galery').appendChild(galery0);
			if(markers[0].getAttribute("images").indexOf(',')+1){
				var arr = markers[0].getAttribute("images").split(',');				
				document.getElementById('galery0').src ="/aviamap/img/"+ code +"0." + arr[0];
				for(var i=1; i<arr.length; i++){
					if(arr[i]!=" " && arr[i]!="," && arr[i].length && arr[i]!=null){
						galery[i] = document.createElement('img');
						galery[i].className = 'hidden';
						galery[i].src = "/aviamap/img/"+ code+ i +"." +arr[i];
						galery[i].title = code;
						document.getElementById('galery').appendChild(galery[i]);
					//document.getElementById("galery"+i).src = "/aviamap/img/"+ code+ i +"." +arr[i];
						//k++;
					}
				};

			//if(arr.length!=0) 
			$('.thumbs img').touchTouch();
			}
			else empty_galery = true;
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

/*$('#scenery').change(function() {
   createfield('scenery');
});

$('#scenery_free').change(function(){
	createfield('scenery_free');
});*/

function createfield(field){
	if(document.getElementById(field +'_label') == null){
	var tbSceneryLabel = document.createElement('input');
	//tbCity.type = "text";
 	tbSceneryLabel.name = field + "_label";
 	tbSceneryLabel.id = field + "_label";
 	tbSceneryLabel.placeholder = field + "_label";
 	document.getElementById('form').appendChild(tbSceneryLabel);
 	}
}

function load_link(field){
	document.getElementById(field).href = markers[0].getAttribute(field);
	if(markers[0].getAttribute(field + "_label").length && markers[0].getAttribute(field + "_label")!= null)
	document.getElementById(field).textContent = markers[0].getAttribute(field + "_label");
	else document.getElementById(field).textContent = markers[0].getAttribute(field);
}