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

/*function reload(){
	//document.getElementById('galery').innerHTML = "";
	$('.placeholder').remove();
	document.getElementById('submit').value = "update";
	document.getElementById('del').disabled = false;
	document.getElementById('reset_btn').disabled = true;
}*/

function formReset() {
	var lat = document.getElementById('form').elements.item(2).value;
	var lng = document.getElementById('form').elements.item(3).value;
	document.getElementById("form").reset();
	document.getElementById('form').elements.item(2).value = lat;
	document.getElementById('form').elements.item(3).value = lng;
	if(document.getElementById('scenery_free_label')!==null){
      document.getElementById('scenery_free_label').parentNode.removeChild(document.getElementById('scenery_free_label'));
      if(document.getElementById('scenery_free_label1')){
        document.getElementById('scenery_free_label1').parentNode.removeChild(document.getElementById('scenery_free_label1'));
        document.getElementById('scenery_free1').parentNode.removeChild(document.getElementById('scenery_free1'));
      }
    }
    if(document.getElementById('scenery_label')!==null){
      document.getElementById('scenery_label').parentNode.removeChild(document.getElementById('scenery_label'));
      if(document.getElementById('scenery_label1')){
        document.getElementById('scenery_label1').parentNode.removeChild(document.getElementById('scenery_label1'));
        document.getElementById('scenery1').parentNode.removeChild(document.getElementById('scenery1'));
      }
    }
    document.getElementById("scenery").onblur = function(){
                    createfield("scenery");
    };
    document.getElementById("scenery_free").onblur = function(){
                    createfield("scenery_free");
    };
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
            url: '../PHP/delete.php',
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
			//if(admin){
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
		 	/*document.getElementById("scenery").onblur = function(){
					createfield("scenery");
				};
			document.getElementById("scenery_free").onblur = function(){
					createfield("scenery_free");
				};*/

			document.getElementById('form').action = '../PHP/update.php';
			/*document.getElementById('form').onsubmit = function(){ // rewrite
				alert("marker with id: " + marker.get('code')+ " Updated!");
           		//marker.setMap(null);
           		//window.infowindow.setMap(null);
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
           		//marker.setIcon(customIcons[document.getElementById('type').value].icon);

            	/*var content = '<div class="scrollFix"><b>' + document.getElementById("marker_name").value + "</b> <br/>" 
            	+ document.getElementById("address").value +"</b>, <br/>"
            	+ document.getElementById("city").value+"</b>, <br/>"+ document.getElementById("country").value
            	+'</b> <br/><div id="additionally"><span id="additional" onclick="jQuery.Panel(window.this_marker)">Дополнительно</span></div></div>';
        		window.infowindow.setContent(content);
        		window.infowindow.open(map, marker);*/
            	//document.getElementById("files").innerHTML = document.getElementById("files").innerHTML;
           	//};			

			/*if(marker.get('type') == 0) document.getElementById("type").value="free";
				else document.getElementById("type").value="nonfree";*/

			
			//document.getElementById("address").value = marker.get('address');
			//document.getElementById("country").value = marker.get('country');
			//document.getElementById("city").value = marker.get('city');
			// }
		/*else {
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
		//}		
	}
		var city;
		geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        var components=results[0].address_components;

        for (var component=0;component<(components.length);component++){
            /*if(components[component].types[0]=="administrative_area_level_1"){
                var admin_area=components[component].long_name;
            }*/
            /*if(components[component].types[0]=="country"){
            	if(!admin) //document.getElementById('country').value = components[component].long_name;
            	document.getElementById('country').textContent = components[component].long_name;
                //country=components[component].long_name;
            }*/

            if(components[component].types[0]=="locality"){
            	city = components[component].long_name;
            	//alert(components[component].long_name);
            	/*if(marker.get('city') !== "null"){
            		 document.getElementById('city').value = marker.get('city');
		 			//else document.getElementById('city').textContent = marker.get('city');
		 		}*/
		 		//else if(typeof components[component].long_name === undefined && admin) document.getElementById('city').placeholder ="City is null!";
		 		//else /*if(admin)*/ document.getElementById('city').placeholder ="City is set by geocoding";//document.getElementById('city').value = components[component].long_name;
		 		//else document.getElementById('city').textContent = components[component].long_name;
                //city=components[component].long_name;
            }
        }
        if(marker.get('city') !== "null") document.getElementById('city').value = marker.get('city');            
		else document.getElementById('city').value = city;
        //if(!document.getElementById('city').value.length && !document.getElementById('city').placeholder.length) document.getElementById('city').placeholder ="City is null!";
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
            infowindow.setContent('<b style="color:black">No results found</b>');
            infowindow.open(map, marker);
          }
      } else {
        infowindow.setContent('<b style="color:black">Geocoder failed due to: ' + status + '</b>');
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
	
	downloadUrl("../PHP/panel.php?code=" + code + "&type=" + type, function(data) {
		//var xml = data.responseXML;
		var markers = data.responseXML.firstChild; //documentElement.getElementsByTagName("marker")[0];
			//переробити, враховуючи залежність між type and scenery			
			//if(admin){
				
				switch(type){
					case '0':
					if(markers.getAttribute("scenery_free").indexOf(';')+1){					
					load_admin('scenery_free',markers.getAttribute("scenery_free").split(';'));					
					load_admin('scenery_free_label',markers.getAttribute("scenery_free_label").split(';'));
					}
					else{
						document.getElementById("scenery_free").value = markers.getAttribute("scenery_free");
						if(document.getElementById('scenery_free_label')===null) create_onefield('scenery_free_label');
						document.getElementById('scenery_free_label').value = markers.getAttribute("scenery_free_label");
						if(document.getElementById("scenery_free1")!==null){
						document.getElementById('scenery_free1').parentNode.removeChild(document.getElementById('scenery_free1'));
						document.getElementById('scenery_free_label1').parentNode.removeChild(document.getElementById('scenery_free_label1'));
						}
					}
					if(document.getElementById('scenery1')!==null && document.getElementById('scenery_label1')!==null){
						document.getElementById('scenery1').parentNode.removeChild(document.getElementById('scenery1'));
						document.getElementById('scenery_label1').parentNode.removeChild(document.getElementById('scenery_label1'));
					}
					document.getElementById("scenery").value = "";
					if(document.getElementById("scenery_label")!==null)document.getElementById('scenery_label').parentNode.removeChild(document.getElementById('scenery_label'));
					document.getElementById("scenery_free_label").onblur = function(){
	 					onblur_create("scenery_free");
	 				}
	 				/*document.getElementById("scenery_label").onblur = function(){
	 					onblur_create("scenery");
	 				}*/
					break;
					case '1':
					if(markers.getAttribute("scenery").indexOf(';')+1){
					/*var arr_scenery = markers.getAttribute("scenery_free").split(';');
					document.getElementById("scenery_free").value= arr_scenery[0];
					document.getElementById("scenery_free1").value= arr_scenery[1];*/
					load_admin('scenery',markers.getAttribute("scenery").split(';'));
					/*arr_scenery = markers.getAttribute("scenery_free_label").split(';');
					document.getElementById("scenery_free_label").value= arr_scenery[0];
					document.getElementById("scenery_free_label1").value= arr_scenery[1];*/
					load_admin('scenery_label',markers.getAttribute("scenery_label").split(';'));
					}
					else{
						document.getElementById("scenery").value= markers.getAttribute("scenery");
						if(document.getElementById('scenery_label')===null) create_onefield('scenery_label');
						document.getElementById('scenery_label').value = markers.getAttribute("scenery_label");
						if(document.getElementById("scenery1")!==null){
						document.getElementById('scenery1').parentNode.removeChild(document.getElementById('scenery1'));
						document.getElementById('scenery_label1').parentNode.removeChild(document.getElementById('scenery_label1'));
						}
					}
					if(document.getElementById('scenery_free1')!==null && document.getElementById('scenery_free_label1')!==null){
						document.getElementById('scenery_free1').parentNode.removeChild(document.getElementById('scenery_free1'));
						document.getElementById('scenery_free_label1').parentNode.removeChild(document.getElementById('scenery_free_label1'));
					}
					document.getElementById("scenery_free").value= "";
					/*document.getElementById("scenery_free_label").onblur = function(){
	 					onblur_create("scenery_free");
	 				}*/
	 				document.getElementById("scenery_label").onblur = function(){
	 					onblur_create("scenery");
	 				}
					if(document.getElementById("scenery_free_label")!==null)document.getElementById('scenery_free_label').parentNode.removeChild(document.getElementById('scenery_free_label'));
					break;
					case '2':
					if(markers.getAttribute("scenery_free").indexOf(';')+1){					
					load_admin('scenery_free',markers.getAttribute("scenery_free").split(';'));					
					load_admin('scenery_free_label',markers.getAttribute("scenery_free_label").split(';'));
					}
					else{
						document.getElementById("scenery_free").value= markers.getAttribute("scenery_free");
						if(document.getElementById('scenery_free_label')===null) create_onefield('scenery_free_label');
						document.getElementById('scenery_free_label').value = markers.getAttribute("scenery_free_label");
						if(document.getElementById("scenery_free1")!==null){document.getElementById('scenery_free1').parentNode.removeChild(document.getElementById('scenery_free1'));
						document.getElementById('scenery_free_label1').parentNode.removeChild(document.getElementById('scenery_free_label1'));}
						document.getElementById("scenery_free_label").onblur = function(){
	 					onblur_create("scenery_free");
	 					}
					}
					/*if(document.getElementById('scenery1')!==null && document.getElementById('scenery_label1')!==null){
						document.getElementById('scenery1').parentNode.removeChild(document.getElementById('scenery1'));
						document.getElementById('scenery_label1').parentNode.removeChild(document.getElementById('scenery_label1'));
					}*/					
					if(markers.getAttribute("scenery").indexOf(';')+1){					
					load_admin('scenery',markers.getAttribute("scenery").split(';'));					
					load_admin('scenery_label',markers.getAttribute("scenery_label").split(';'));
					}
					else{
						document.getElementById("scenery").value= markers.getAttribute("scenery");
						if(document.getElementById('scenery_label')===null) create_onefield('scenery_label');
						document.getElementById('scenery_label').value = markers.getAttribute("scenery_label");
						if(document.getElementById("scenery1")!==null){
						document.getElementById('scenery1').parentNode.removeChild(document.getElementById('scenery1'));
						document.getElementById('scenery_label1').parentNode.removeChild(document.getElementById('scenery_label1'));
						}						
	 					document.getElementById("scenery_label").onblur = function(){
	 					onblur_create("scenery");
	 					}
					}					
					/*if(document.getElementById('scenery_free1')!==null && document.getElementById('scenery_free_label1')!==null){
						document.getElementById('scenery_free1').parentNode.removeChild(document.getElementById('scenery_free1'));
						document.getElementById('scenery_free_label1').parentNode.removeChild(document.getElementById('scenery_free_label1'));
					}*/
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
			 	document.getElementById("description").value= markers.getAttribute("description");
			//}
			/*else{
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
					/*}
					else{
					document.getElementById("scenery_free").href= markers.getAttribute("scenery_free");
					if(markers.getAttribute("scenery_free_label")!==null && markers.getAttribute("scenery_free_label").length)
					document.getElementById("scenery_free").textContent = markers.getAttribute("scenery_free_label").substring(11, 40);
					else document.getElementById("scenery_free").textContent = markers.getAttribute("scenery_free").substring(11, 40);
					document.getElementById('scenery_free1').textContent = null;*/
					//document.getElementById('form').removeChild(document.getElementById('scenery_free1'));
					//document.getElementById('form').removeChild(document.getElementById('scenery_free_label1'));
					//}
					/*if(document.getElementById('scenery1').length && document.getElementById('scenery_label1').length){
						document.getElementById('form').removeChild(document.getElementById('scenery1'));
						document.getElementById('form').removeChild(document.getElementById('scenery_label1'));
					}*/
					/*document.getElementById('scenery').textContent = null;
					document.getElementById('scenery1').textContent = null;
					break;
					case '1':
					if(markers.getAttribute("scenery").indexOf(';')+1){
					load_href('scenery' , markers.getAttribute("scenery").split(';'));
					/*var arr_scenery = markers.getAttribute("scenery").split(';');
					document.getElementById("scenery").href= arr_scenery[0];
					document.getElementById("scenery1").href= arr_scenery[1];*/
					//load_text('scenery' , markers.getAttribute("scenery_label").split(';'));
					/*arr_scenery = markers.getAttribute("scenery_label").split(';');
					document.getElementById("scenery_label").textContent= arr_scenery[0];
					document.getElementById("scenery_label1").textContent= arr_scenery[1];*/					
					/*}
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
				//document.getElementById("description").textContent= markers.getAttribute("description");
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
				document.getElementById('galery0').src ="../img/" + arr[0];
				//arr1[0] = "./img/" + arr[0];
				for(var i=0; i<arr.length-1; i++){
					//if(arr[i]!=" " && arr[i]!=";" && arr[i].length && arr[i]!=null){
						//galery[i] = document.createElement('img');
						//galery[i].className = 'hidden';
						//galery[i].src = "./img/" + arr[i];
						arr1[i] = "../img/" + arr[i];
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
				document.getElementById('galery0').src = '../images/2.png';
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

function createfield(field){
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
	 		onblur_create(field);
	 	}
	} 	
 	/*else
 	{
 		document.getElementById('form').removeChild(document.getElementById(field.id + "_label"))
 	}*/
}

function onblur_create(field){
	if(document.getElementById(field + "_chbs").checked){
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
	 		}
}

/*function load_link(field){
	document.getElementById(field).href = markers[0].getAttribute(field);
	if(markers[0].getAttribute(field + "_label").length && markers[0].getAttribute(field + "_label")!= null)
	document.getElementById(field).textContent = markers[0].getAttribute(field + "_label");
	else document.getElementById(field).textContent = markers[0].getAttribute(field);
}*/
/*function load_href(field, array){
	document.getElementById(field).href= array[0];
	document.getElementById(field + "1").href= array[1];
}
function load_text(field, array){
	document.getElementById(field).textContent= array[0];
	document.getElementById(field + "1").textContent= array[1];
}*/
function load_admin(field, array){
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
}