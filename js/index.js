//filter free/non-free/all markers//
    function check(type){
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
        /*if(document.getElementById("pay-free").checked === true)
        markers_load(-1);
        else if(document.getElementById("free").checked === true)
        markers_load(type);
        else if(document.getElementById("non-free").checked === true)
        markers_load(type);*/
    }
    //filter free/non-free/all//
/*function city_checkbox(){
    if(document.getElementById('city_check').checked){
    var tbCity = document.createElement('input');
    //tbCity.type = "text";
    tbCity.name = 'city';
    tbCity.id = 'city_field';
    //tbCity.required = 'required';
    tbCity.placeholder = 'city';
    document.getElementById('for_city').appendChild(tbCity);
    }
    else document.getElementById('city_field').parentNode.removeChild(document.getElementById('city_field'));
}*/

    setTimeout(function() {
    document.getElementById('frame').onload = function(){
        if(document.getElementById('frame').contentWindow.document.body.innerHTML!="" && admin){
        alert("marker with id: " + document.getElementById("frame").contentWindow.document.body.innerHTML +" Added!"); //можливо це не потрібно
        markers_load("-1", document.getElementById("frame").contentWindow.document.body.innerHTML);
        panelinformation(document.getElementById('code').value);
        }
        else if(document.getElementById('frame').contentWindow.document.body.innerHTML === 'true') 
        {
            admin = true;
            //if (jQuery.infopanel.hasClass('visible')) jQuery.Panel();
            var new_marker_field = document.createElement('input');
            new_marker_field.type = "checkbox";
            new_marker_field.id = "new_marker";
            document.getElementById('checkbox').innerHTML = "Add new markers"
            document.getElementById('checkbox').appendChild(new_marker_field);
                    //+'<b>Input new markers</b><input type="checkbox" id="new_marker">'        
            $('#panel_content').html(//'<div id="panel_content">' 
                //+'<table height="100%">' 
                                                //+'<td id="close" onclick="jQuery.Panel()"> </td>'
                //+'<td id="content" valign="top">'
                '<form action="/aviamap/PHP/insert.php" name="form" method="post" id="form" target="frame" enctype="multipart/form-data" >'
                //+'<div align="left"><b>Code:</b>
                +'<input id="code" type="text" name="code" required="required" placeholder="code" pattern="[A-Za-z]{4}"> </div>'
                //+'<div align="left"><b>Название маркера: </b>
                +'<input id="marker_name" name="name" required="required" placeholder="name"></div></br>'
                +'<b>lat:</b> <input id="lat" class="number" type="number" name="lat" min="-90" max="90" step="any" required pattern="\d{2}+(\,\d{15})?" title="Здесь должно быть число!"></br>' //pattern="\d{2}+(\,\d{15})?"
                +'<b>lng:</b> <input id="lng" class="number" type="number" name="lng" min="-90" max="90" step="any" required pattern="\d{2}+(\,\d{15})?" title="Здесь должно быть число!"></br>' //pattern="\d{2}+(\,\d{7})?"
                                                            //+'<div><b>type:</b> <input id="type" type="range" min="0" max="2" name="type" required step="1"   </div>'
                +'<b>scenery:</b> <input id="scenery" name="scenery" placeholder="scenery"></br>'
                +'<input id="scenery_label" name="scenery_label" placeholder="scenery label"></br>' //class="autogrow"
                +'<b>free scenery:</b> <input id="scenery_free" name="scenery_free" placeholder="scenery_free"></br>'
                +'<input id="scenery_free_label" name="scenery_free_label" placeholder="free scenery label"></br>'
                //+'<input id="scenery_label" name="scenery_label"></br>' //class="autogrow"
                                                            //+'<div><b>address:</b> <input id="address" type="text" name="address">    </div>'
                //+'<b>Add city box</b><input type="checkbox" id="city_check" onclick="city_checkbox()">'+'<div id="for_city"></div>' //<input id="city" type="text" name="city">
                +'<b>City:</b></br>'
                +'<input id="city" name="city"></br>'
                                                            //+'<div><b>country:</b> <input id="country" type="text" name="country">    </div>'
                +'<textarea id="description" name="description" placeholder="description" ></textarea></br>' //class="autogrow"
                                        //checkbox "change city"                                                     
                +'<div id="files"><input id="filesend" type="file" name="filename[]" multiple accept="image"/></div>'
                +'<input type="submit" id="submit" value="save"> <input type="button" id="reset_btn" value="reset" onclick="formReset()">  <input type="button" id="del" value="delete">'
                +'</form>'
                                                        //+'<input type="button" id="update" value="update">
                
                //+'<button onclick="addcity()">Set city</button>'
                //+'</td>'
                //+'</table>'   
                //+'</div>'
                );

                document.getElementById('form_login').parentNode.removeChild(document.getElementById('form_login'));
                alert('Добро пожаловать, Админ');
                            //make draggable
                for (var i = 0; i < markers_arr.length; i++) markers_arr[i].setDraggable(true);
                show = false;

                            //$("input.autogrow").autoGrowInput({minWidth:30,comfortZone:30});      
        }
                else if(document.getElementById('frame').contentWindow.document.body.innerHTML === 'false')  alert('Неверное имя или пароль');
    };
    }, 4000);
    

    $( "#search" ).autocomplete({ source: source });