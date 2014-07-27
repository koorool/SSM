    var customIcons = {
      1: {
        icon: 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png'
      },
      0: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png'
      }
    };
var names = "";

    function load() {
      var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(50.0779, 14.4533),
        zoom: 7,
        mapTypeId: 'terrain'
      });
      //var infoWindow = new google.maps.InfoWindow;
      // Load markers from DataBase

      downloadUrl("/PHP/phpsqlajax_genxml.php", function(data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName("marker");
        for (var i = 0; i < markers.length; ++i) {
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
          bindInfoWindow(marker, map, name);
        }
      });
	  
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
var infoWindow = new google.maps.InfoWindow;
    function bindInfoWindow(marker, map, name) 
    { //infoWindow,
	//
      	google.maps.event.addListener(marker, 'click', function() 
        {			
		var text;
		window.names = name;	
		downloadInfoWindow("/PHP/phpsqlajax_genxml_InfoWindow.php?name=" + name, function(data) {
		var xml = data.responseXML
		var markers = xml.documentElement.getElementsByTagName("marker");//спростити запит, в файлі лише 1 маркер	
		//var name1 = markers[0].getAttribute("name");	
    	    var address = markers[0].getAttribute("address");
		var city = markers[0].getAttribute("city");
		var country = markers[0].getAttribute("country");
		window.text = '<div id="scrollFix">' + "<b>" + name + "</b> <br/>" + address +"</b> <br/>"+ city +"</b> <br/>"+ country + "</b> <br/>" +'<div id="additional">'+ '<span onclick="click_add ()">Дополнительно</span>'+'</div>'+ '</div>';//add name
		//document.getElementById("panel-content").firstChild.nodeValue+=name;
		});	
     	  	 infoWindow.setContent(window.text);
    	    infoWindow.open(map, marker);
        });
    }
function click_add(){jQuery.Panel(window.names)}


function downloadInfoWindow(url, callback) {
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
    }
//InfoWindow//

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

    function downloadUrl(url, callback) {
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
    }

    function doNothing() {}
