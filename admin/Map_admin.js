//Initialise function, on load
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
       center: new google.maps.LatLng(49.0630692517165, 31.201171875),
       zoom: 6,
       mapTypeId: 'terrain',
       streetViewControl: false,
       minZoom: 3,
       styles: styles
     });
     markers_load("-1");
     geocoder = new google.maps.Geocoder();
     /*document.getElementById("free").checked = false;
     document.getElementById("pay-free").checked = false;
     document.getElementById("non-free").checked = false;
     document.getElementById('search').value = "";*/
}

google.maps.event.addDomListener(window, 'load', initialize);

//Global Variables
var customIcons = {
      0: {icon: '../images/freeware.png'},
      1: {icon: '../images/payware.png'},
      2: {icon: '../images/free-pay.png'}
    },
markers_arr = [], source = [],
infowindow = new google.maps.InfoWindow();
//Global Variables//

// Load markers from DataBase
function markers_load(type){
  for (var i = 0; i < markers_arr.length; i++)
    markers_arr[i].setMap(null);
  markers_arr = [];
  //infowindow = new google.maps.InfoWindow();
  //if(free!= "-1") не брати з бази тип
      downloadUrl("../PHP/load_markers.php?type="+ type, function(data) {
        //var xml = data.responseXML;
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
            new google.maps.Size(20, 20),
            null,//new google.maps.Point(0, 0),
            null,//new google.maps.Point(0, 0),
            new google.maps.Size(20, 20)),
            draggable: true,
	          title: markers[i].getAttribute("name")
          });
          marker.set('code', markers[i].tagName);
          if(markers[i].getAttribute("city").length) marker.set('city', markers[i].getAttribute("city"));
          marker.set('type', markers[i].getAttribute("type"));
          markers_arr.push(marker);
          source[i]= marker.code + ", " + marker.title;

      	google.maps.event.addListener(marker, 'click', function ()
      	{
          loadDataInfoPanel(this);
      	});

        google.maps.event.addListener(marker, 'dragend', function() {
              loadDataInfoPanel(this);
              document.getElementById('lat').value = this.getPosition().lat();
              document.getElementById('lng').value = this.getPosition().lng();
        });

      }
});

     //add markers on the map   
  google.maps.event.addListener(map, "click", function(event) {          
      if (event.latLng) { // && document.getElementById('new_marker').checked

        var marker = new google.maps.Marker({
            map: map,
            position: event.latLng, 
            draggable:true
            });
        marker.set('type', 3); 
        mew_marker_clicked(marker);
        markers_arr.push(marker);

            //google.maps.event.addListener(marker, "click", function() {
               
              
              //if(!jQuery.infopanel.hasClass('visible'))
              //jQuery.Panel();
            //});
          
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

/*function search(){
  var arr_split;
  for (var i = 0; i < markers_arr.length; i++) {
    arr_split = document.getElementById('search').value.split(',');
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
}*/

function mew_marker_clicked(marker) {
    formReset(); 
    var city, country;
    document.getElementById('city').placeholder = "";      
    //document.getElementById('form').reset();              
    document.getElementById("lat").value = marker.getPosition().lat();
    document.getElementById("lng").value = marker.getPosition().lng();
             
    geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          var components=results[0].address_components;
          for (var component=0;component<(components.length);component++){

            if(results[0].address_components[component].types[0]=="country")
              country=results[0].address_components[component].long_name; 

            if(components[component].types[0]=="locality")
              city = results[0].address_components[component].long_name;                     
          }
          infowindow.setContent('<b style="color:black">' + city+', '+ country + '</b>');
          infowindow.open(map, marker);
        } else {
            infowindow.setContent('<b style="color:black">No results found</b>');
            infowindow.open(map, marker);
          }
      } else {
        infowindow.setContent('<b style="color:black">Geocoder failed due to: ' + status + '</b>');
        infowindow.open(map, marker);
        }
    });      
      
    document.getElementById('submit').value = "save";
    document.getElementById('del').disabled = true;
    document.getElementById('form').action ="../PHP/insert.php";
    //document.getElementById('form').onsubmit = function(){reload()};
    document.getElementById('reset_btn').disabled = false;
    document.getElementById('galery0').src = '../images/2.png';
    $('.placeholder').remove();
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
    
}