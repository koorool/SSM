//Global Variables    
    var customIcons = {
      1: {
        icon: 'green_marker.png'
      },
      0: {
        icon: 'http://www.google.com/mapfiles/marker.png'
      }
    };
var names = "";
var infowindow = null;
var infotext="";

//Initialise function, on load
    function load() {
      var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(50.0779, 14.4533),
        zoom: 10,
        mapTypeId: 'terrain',
	streetViewControl: false,
	mapTypeControl: false
      });
      infowindow = new google.maps.InfoWindow();

// Load markers from DataBase

      downloadUrl("/PHP/phpsqlajax_genxml.php", function(data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName("marker");
        for (var i = 0; i < markers.length; i++) { 
          name = markers[i].getAttribute("name");          
          var type = markers[i].getAttribute("type");
          var point = new google.maps.LatLng(
              parseFloat(markers[i].getAttribute("lat")),
              parseFloat(markers[i].getAttribute("lng")));          
          var icon = customIcons[type];
          var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: icon.icon,
	          title: name
          });

	google.maps.event.addListener(marker, 'click', function (event)
	{
    if(jQuery.infopanel.hasClass('visible'))
  {
      loadDataInfoPanel(this.title);
      //jQuery.panelContent.html(this.title); //add info from base
  } 
    //infotext = loaddata(this.title);
    //alert(infotext);
		//window.infotext = loaddata(this.title);
		// where I have added .html to the marker object.
		infowindow.setContent(loaddata(this.title));
		infowindow.open(map, this);
	});	

        /* google.maps.event.addListener(marker, 'click', function() 
       		{			
		
		window.names = name;	
		downloadInfoWindow("/PHP/phpsqlajax_genxml_InfoWindow.php?name=" + name, function(data) {
		var xml = data.responseXML
		var markers = xml.documentElement.getElementsByTagName("marker");	
		//var name1 = markers[0].getAttribute("name");	
    	    var address = markers[0].getAttribute("address");
		var city = markers[0].getAttribute("city");
		var country = markers[0].getAttribute("country");
		window.text = '<div id="scrollFix">' + "<b>" + name + "</b> <br/>" + address +"</b> <br/>"+ city +"</b> <br/>"+ country + "</b> <br/>" +'<div id="additional">'+ '<span onclick="click_add ()">Дополнительно</span>'+'</div>'+ '</div>';		
		});	
     	  	infoWindow.setOptions({
position: point,
size: new google.maps.Size(50, 50),
content:window.text});
    	    	infoWindow.open(map, marker);
        	});*/
         }
      }, true);
	  
	  //
	  
	  /*google.maps.event.addListener(map, "click", function(event) {          
		  if (event.latLng) {
            marker = new google.maps.Marker({
			map: map,
			position: event.latLng, 
			draggable:true
			});
            google.maps.event.addListener(marker, "click", function() {
              var html = 			  
			  var infowindow = new google.maps.InfoWindow({
			  map: map,
			  content: html,
			  position: event.latLng
			  });
              infowindow.open(map, marker);
            });
           // map.addOverlay(marker);
          }
        });*/
 
}
	
	/*function saveData() {
      var name = escape(document.getElementById("name").value);
      var address = escape(document.getElementById("address").value);
      var type = document.getElementById("type").value;
      var latlng = marker.getPosition();
      var lat = latlng.lat();
      var lng = latlng.lng();
		
      addRow("php/phpsqlinfo_addrow.php?name=" + name + "&address=" + address + "&type=" + type + "&lat=" + lat + "&lng=" + lng);		
    }*/

//InfoWindow work only after second click//
var text;
function loaddata(name) 
    {      				    		
    		window.names = name;	
    		downloadUrl("/PHP/phpsqlajax_genxml_InfoWindow.php?name=" + name, function(data) {
    		var xml = data.responseXML
    		var markers = xml.documentElement.getElementsByTagName("marker");	
    		//var name1 = markers[0].getAttribute("name");	
        var address = markers[0].getAttribute("address");
    		var city = markers[0].getAttribute("city");
    		var country = markers[0].getAttribute("country");
    		window.text = '<div id="scrollFix">' + "<b>" + name + "</b> <br/>" + address +"</b>, <br/>"+ city +"</b>, <br/>"+ country + "</b> <br/>" +'<div id="additional">'+ '<span onclick="click_add ()">Дополнительно</span>'+'</div>'+ '</div>';		
    		}, false);
        //alert(window.text);
        //while(requestDoneAndOK==false){doNothing();}
        return  window.text;        
    }

function click_add(){
/*if(jQuery.infopanel.hasClass('visible'))
  {
      jQuery.panelContent.html(window.names);
  }
else
  {*/

      jQuery.Panel(window.names);
  //}
}


/*function downloadInfoWindow(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
    }*/
//InfoWindow//	
var requestDoneAndOK = false;
    function downloadUrl(url, callback, bool) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
          
                requestDoneAndOK = true;
                callback(request, request.status);
                    
        }
      };

      request.open('GET', url, bool); //async == true, speed the system
      request.send(null);
    }

//Addrowfunction
/*function addRow(url)
	{
		var req ;

		// Browser compatibility check  		
		if (window.XMLHttpRequest) {
			req = new XMLHttpRequest();
		} 
		else if (window.ActiveXObject) {
			try {
				req = new ActiveXObject("Msxml2.XMLHTTP");
			} 
			catch (e) {
				try {
					req = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}

		var req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.onreadystatechange = function () {
		//document.getElementById('divTxt').innerHTML = "Contents : " + req.responseText;
		}

		req.send(null);
	}*/

    function doNothing() {}
