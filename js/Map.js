//Initialise function, on load
function initialize() {
  /*var styles = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "gamma": 0.5
            }
        ]
    }
  ]*/
      map = new google.maps.Map(document.getElementById("map"), {
       center: new google.maps.LatLng(49.0630692517165, 31.201171875),
       zoom: 6,
       mapTypeId: 'terrain',
       streetViewControl: false
       //styles: styles
     });
     markers_load("-1");
     geocoder = new google.maps.Geocoder();

}

google.maps.event.addDomListener(window, 'load', initialize);

//Global Variables
var customIcons = {
      0: {icon: './images/freeware_new.png'},
      1: {icon: './images/payware_new.png'},
      2: {icon: './images/free-pay_new.png'}
    };
//var map;
var markers_arr = [];
//var this_marker;
var source = [];
//Global Variables//

// Load markers from DataBase
function markers_load(type, code){
  for (var i = 0; i < markers_arr.length; i++)
    markers_arr[i].setMap(null);
  markers_arr = [];
  //infowindow = new google.maps.InfoWindow();
  //if(free!= "-1") не брати з бази тип
      downloadUrl("/aviamap/PHP/load_markers.php?type="+ type +"&code=" + code, function(data) {
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
            draggable: admin,
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

        google.maps.event.addListener(marker, 'dragend', function() {
            //if(admin && jQuery.infopanel.hasClass('visible')){
              document.getElementById('lat').value = this.getPosition().lat();
              document.getElementById('lng').value = this.getPosition().lng();
            //}
            //infowindow.close();
            //loaddata(this);
        });

      }
});
var infowindow = new google.maps.InfoWindow();
     //add markers on the map   
  google.maps.event.addListener(map, "click", function(event) {          
      if (admin && document.getElementById('new_marker').checked) { //event.latLng &&

        var marker = new google.maps.Marker({
            map: map,
            position: event.latLng, 
            draggable:true
            });
        document.getElementById('city').placeholder = "";

            //google.maps.event.addListener(marker, "click", function() {
               
              markers_arr.push(marker);
              //window.infowindow.close();
              document.getElementById('galery').innerHTML = "";
              $('.placeholder').remove();
              var city;
              var country;
      
              document.getElementById('form').reset();
        //document.getElementById("description").textContent= "";
              document.getElementById('submit').value = "save";
              document.getElementById('del').disabled = true;
              document.getElementById('reset_btn').disabled = false;
              document.getElementById("lat").value = marker.getPosition().lat();
              document.getElementById("lng").value = marker.getPosition().lng();
              document.getElementById('form').action ="/aviamap/PHP/insert.php";
              document.getElementById('form').onsubmit = function(){reload()};
              //поліпшити! не results, but address format
              geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      if (results[0]) {
                        var components=results[0].address_components;
                    for (var component=0;component<(components.length);component++){

                      if(results[0].address_components[component].types[0]=="country")
                        country=results[0].address_components[component].long_name; 

                      if(components[component].types[0]=="locality"){
                        city = results[0].address_components[component].long_name;
                        /*if(components[component].long_name=="undefined"){
                          //якщо місто не знайшло, відобазити поле для вводу
                          var tbCity = document.createElement('input');
                          tbCity.type = "text";
                          tbCity.name = 'city';
                          tbCity.required = 'required';
                          document.getElementById('form').appendChild(tbCity);
                        }*/
                        //results[0].address_components[component].long_name;
                        /*else if(document.getElementById('tbCity')!=null)
                        document.getElementById('tbCity').parentNode.removeChild(document.getElementById('tbCity'));*/
                      }
                    }
                    infowindow.setContent("<b>"+city+', '+ country+'</b>');
                    infowindow.open(map, marker);
                  } else {
                        infowindow.setContent('No results found');
                        infowindow.open(map, marker);
                          }
                  } else {
                      infowindow.setContent('Geocoder failed due to: ' + status);
                      infowindow.open(map, marker);
                    }
                });
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
                //markers_arr.push(marker);
                document.getElementById('city').placeholder = "";
              //window.infowindow.close();
              document.getElementById('galery').innerHTML = "";
              $('.placeholder').remove();
              var city;
              var country;
      
              document.getElementById('form').reset();
        //document.getElementById("description").textContent= "";
              document.getElementById('submit').value = "save";
              document.getElementById('del').disabled = true;
              document.getElementById('reset_btn').disabled = false;
              document.getElementById("lat").value = marker.getPosition().lat();
              document.getElementById("lng").value = marker.getPosition().lng();
              document.getElementById('form').action ="/aviamap/PHP/insert.php";
              document.getElementById('form').onsubmit = function(){reload()};
              //поліпшити! не results, but address format
              geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      if (results[0]) {
                        var components=results[0].address_components;
                    for (var component=0;component<(components.length);component++){

                      if(results[0].address_components[component].types[0]=="country")
                        country=results[0].address_components[component].long_name; 

                      if(components[component].types[0]=="locality"){
                        city = results[0].address_components[component].long_name;
                        /*if(components[component].long_name=="undefined"){
                          //якщо місто не знайшло, відобазити поле для вводу
                          var tbCity = document.createElement('input');
                          tbCity.type = "text";
                          tbCity.name = 'city';
                          tbCity.required = 'required';
                          document.getElementById('form').appendChild(tbCity);
                        }*/
                        //results[0].address_components[component].long_name;
                        /*else if(document.getElementById('tbCity')!=null)
                        document.getElementById('tbCity').parentNode.removeChild(document.getElementById('tbCity'));*/
                      }
                    }
                    infowindow.setContent("<b>"+city+', '+ country+'</b>');
                    infowindow.open(map, marker);
                  } else {
                        infowindow.setContent('No results found');
                        infowindow.open(map, marker);
                          }
                  } else {
                      infowindow.setContent('Geocoder failed due to: ' + status);
                      infowindow.open(map, marker);
                    }
                });
              });
      }
    });

google.maps.event.addListener(map, 'zoom_changed', function() {

    var pixelSizeAtZoom0 = 6; //the size of the icon at zoom level 0
    var maxPixelSize = 40; //restricts the maximum size of the icon, otherwise the browser will choke at higher zoom levels trying to scale an image to millions of pixels

    var zoom = map.getZoom();

    if (zoom < 3) map.setZoom(3);
    else{
    switch(zoom){
      case 3:
      var relativePixelSize = Math.round(pixelSizeAtZoom0*Math.pow(1,zoom));
      break;
      case 4:
      var relativePixelSize = Math.round(pixelSizeAtZoom0*Math.pow(1.1,zoom));
      break;
      default:
      var relativePixelSize = Math.round(pixelSizeAtZoom0*Math.pow(1.2,zoom));// use 2 to the power of current zoom to calculate relative pixel size.  Base of exponent is 2 because relative size should double every time you zoom in
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
  }

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

function search(){
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
}

/*function getcity(code){
  //var x;
     $.ajax({
            url: '/aviamap/PHP/getcity.php',
            data: 'code=' + code,
            type: 'GET',
            dataType: "text",
            async: false,            
            success: function(msg){
               //code = data;
               //alert(msg); 
               return msg;              
             } 
    });
}*/

/*/InfoWindow//
function loaddata(marker)
    { 
    city_geocode = "undefined";
    

    /*var city = $.ajax({
              url: '/aviamap/PHP/getcity.php?code=' + marker.get('code'),
              global: false,
              type: "GET",
              dataType: "html",
              async:false
              /*success: function(msg){
                 alert(msg);
                      }*/
              //}).responseText;
    //marker.set('city', city); //if(city!="")
    //else marker.set('city', null); //= false;
    /*geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        //var components=results[0].address_components;

        for (var component=0;component<(results[1].address_components.length);component++){
            if(components[component].types[0]=="administrative_area_level_1")
                var city=components[component].long_name;
            
            if(results[1].address_components[component].types[0]=="country")
                var country=results[1].address_components[component].long_name;            
        
            if(results[1].address_components[component].types[0]=="locality"){
              //if(results[0].address_components[component].long_name!="undefined"){
                //city_bool = true;
               city_geocode = results[1].address_components[component].long_name;
                //if()                
              //}
              //else city_geocode = "undefined";
            }*/

            /*if(components[component].types[0]=="route")
                var address=components[component].short_name;            

            if(components[component].types[0]=="street_number")
                address+=components[component].short_name;*/
        //}
        //коряво, переробити
        /*if(typeof city === 'undefined'){          
            
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
        }
        
         //admin_area + "," +
        //$('#additional').on('click', function(){jQuery.Panel(marker)})
        infowindow.open(map, marker);*/
        /*var additional = document.document.createElement('span');
        additional.cla
        jQuery.Panel(marker);};
      /*} else {
        alert('No results found');
        //infowindow.open(map, marker);
      }
    } else {
      alert('Geocoder failed due to: ' + status);
      //infowindow.open(map, marker); 
    }
  });*/
  
              
        /*$.ajax({
        type: "GET",
        url: "/aviamap/PHP/InfoWindow.php?code=" + marker.get('code'), 
        cache: false,
        dataType: "html",
        async:true,  
        success: function(data){
        array = data.split(',' , 3);
        marker.set('address', array[0]);
        marker.set('city', array[1]);
        marker.set('country', array[2]);  
        window.this_marker = marker;
        var content = '<div class="scrollFix"><b>' + marker.title + "</b> <br/>"
         + array[0] +"</b>, <br/>"+ array[1]+"</b>, <br/>"
         + array[2]+'</b> <br/><span id="additional" onclick="jQuery.Panel(window.this_marker)" >Дополнительно</span></div>'; 
        
        infowindow.setContent(content);
        infowindow.open(map, marker);
        //document.getElementById('additional').onclick = function(){ jQuery.Panel(marker)};
        }
        /*error:function (xhr, ajaxOptions, thrownError){
        alert("ajax error:" + xhr.status);
        alert(thrownError);*/
     //});       
    //}
/*function additional(){
  jQuery.Panel();
  loadDataInfoPanel(window.this_marker);
}*/
//InfoWindow//