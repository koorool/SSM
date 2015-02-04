//Initialise function, on load
//Global Variables
var map;
var customIcons = {
      0: {icon: './images/freeware.png'},
      1: {icon: './images/payware.png'},
      2: {icon: './images/free-pay.png'}
    },
markers_arr = [], source = [],
infowindow = new google.maps.InfoWindow();
//Global Variables//
function initialize() { 
var styles = [
    {
        "featureType": "transit.station.airport",
        "elementType": "labels",
        "stylers": [ { "visibility": 'off' } ]
    },
    {
        "featureType": "transit.line",
        "stylers": [ { "visibility": "off" } ]
    },
    {
        "featureType": "transit.station.rail", "stylers": [ { "visibility": "off" } ]
    },
    {
        "featureType": "transit.station.bus", "stylers": [ { "visibility": "off" } ]
    },
    { 
      "featureType": "poi",
      "stylers": [ { "visibility": "off" } ]
    }
];
      map = new google.maps.Map(document.getElementById("map"), {
       center: new google.maps.LatLng(51.0137546571882, 20.6103515625),
       zoom: 5,
       mapTypeId: 'terrain',
       streetViewControl: false,
       minZoom: 3,
       styles: styles
     });
     markers_load("-1");
     geocoder = new google.maps.Geocoder();
     /*document.getElementById("free").checked = false;
     document.getElementById("pay-free").checked = false;
     document.getElementById("non-free").checked = false;*/
     document.getElementById('search').value = "";
}

google.maps.event.addDomListener(window, 'load', initialize);

// Load markers from DataBase
function markers_load(type){
  for (var i = 0; i < markers_arr.length; i++)
    markers_arr[i].setMap(null);
  markers_arr = [];
  //infowindow = new google.maps.InfoWindow();
  //if(free!= "-1") не брати з бази тип
      downloadUrl("./PHP/load_markers.php?type="+ type, function(data) {
        //var xml = data.responseXML;
        if (navigator.appName == 'Microsoft Internet Explorer')var markers = data.responseXML.childNodes[1].childNodes;
        else 
        var markers = data.responseXML.childNodes[0].childNodes;
        for (var i = 0; i < markers.length; i++) {
          //var code = markers[i].getAttribute("code"); 
          //var name = markers[i].getAttribute("name");          
          //var type = markers[i].getAttribute("type");
          //var icon = customIcons[markers[i].getAttribute("type")];
          /*var point = new google.maps.LatLng(
              parseFloat(markers[i].getAttribute("lat")),
              parseFloat(markers[i].getAttribute("lng")));*/
          var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(
              parseFloat(markers[i].getAttribute("lat")),
              parseFloat(markers[i].getAttribute("lng"))),
            icon: new google.maps.MarkerImage(customIcons[markers[i].getAttribute("type")].icon,
            new google.maps.Size(15, 15),
            null,//new google.maps.Point(0, 0),
            null,//new google.maps.Point(0, 0),
            new google.maps.Size(15, 15)),
            //draggable: admin,
	          title: markers[i].getAttribute("name")
          });
          marker.set('code', markers[i].tagName);
          if(markers[i].getAttribute("city").length) marker.set('city', markers[i].getAttribute("city"));
          marker.set('type', markers[i].getAttribute("type"));
          markers_arr.push(marker);
          source[i]= marker.code + ", " + marker.title;

      	google.maps.event.addListener(marker, 'click', function ()
      	{
          //loaddata(this);
          loadDataInfoPanel(this);
          /*if(jQuery.infopanel.hasClass('visible'))  
              ;*/
      	});
      }
});

google.maps.event.addListener(map, 'zoom_changed', function() {

    var pixelSizeAtZoom0 = 6, //the size of the icon at zoom level 0
    maxPixelSize = 40; //restricts the maximum size of the icon, otherwise the browser will choke at higher zoom levels trying to scale an image to millions of pixels

    //var zoom = map.getZoom();

    //if (zoom < 3) map.setZoom(3);
    //if (zoom > 3){
    switch(map.getZoom()){
      case 3:
      var relativePixelSize = Math.round(pixelSizeAtZoom0*Math.pow(1,map.getZoom()));
      break;
      case 4:
      var relativePixelSize = Math.round(pixelSizeAtZoom0*Math.pow(1.1,map.getZoom()));
      break;
      default:
      var relativePixelSize = Math.round(pixelSizeAtZoom0*Math.pow(1.2,map.getZoom()));// use 2 to the power of current zoom to calculate relative pixel size.  Base of exponent is 2 because relative size should double every time you zoom in
      break;
    }
     

    if(relativePixelSize > maxPixelSize) //restrict the maximum size of the icon
        relativePixelSize = maxPixelSize;
      for (var i = 0; i < markers_arr.length; i++){
        //change the size of the icon
        markers_arr[i].setIcon(
        new google.maps.MarkerImage(
            markers_arr[i].getIcon().url, //marker's same icon graphic
            null,//size
            null,//origin
            null, //anchor
            new google.maps.Size(relativePixelSize, relativePixelSize) //changes the scale
        )
    );
    }
  //}

});
}

//load markers from base
function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {          
                callback(request, request.status);                    
        }
      };

      request.open('GET', url, true);
      request.send(null);
}