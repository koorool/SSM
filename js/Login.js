var admin = false;
var show=false;

function Login(login, password)
{
    $.ajax({
        url: './PHP/login.php',
        type: 'POST',
        data: {user: login, pass: password},
        success: function(data){
            if(data==="true"){
                admin = true;
                //if (jQuery.infopanel.hasClass('visible')) jQuery.Panel();
                /*var new_marker_field = document.createElement('input');
                new_marker_field.type = "checkbox";
                new_marker_field.id = "new_marker";
                document.getElementById('checkbox').innerHTML = "Add new markers";
                document.getElementById('checkbox').insertBefore(document.getElementById('panel_content'));*/
                //+'<b>Input new markers</b><input type="checkbox" id="new_marker">'
                $('#panel_content').html(//'<div id="panel_content">'
                    //+'<table height="100%">'
                    //+'<td id="close" onclick="jQuery.Panel()"> </td>'
                    //+'<td id="content" valign="top">'
                    '<form action="./PHP/insert.php" name="form" method="post" id="form" target="frame" enctype="multipart/form-data" >'
                        //+'<div align="left"><b>Code:</b>
                    +'<div class="form-group">'
                    +'<input id="code" name="code" required placeholder="code" pattern="[A-Za-z]{4}" class="form-control"> </div>'
                    +'</div>'
                        //+'<div align="left"><b>Название маркера: </b>
                    +'<div class="form-group">'
                    +'<input id="marker_name" name="name" required placeholder="Name" class="form-control"></br>'
                    +'</div>'
                    +'<div class="form-group">'
                    +'<input id="lat" name="lat" min="-90" max="90" step="any" required pattern="\d{2}+(\,\d{15})?" title="Здесь должно быть число!" class="form-control"></br>' //pattern="\d{2}+(\,\d{15})?"
                    +'</div>'
                    +'<div class="form-group">'
                    +'<input id="lng" name="lng" min="-90" max="90" step="any" required pattern="\d{2}+(\,\d{15})?" title="Здесь должно быть число!" class="form-control"></br>' //pattern="\d{2}+(\,\d{7})?"
                    +'</div>'
                        //+'<div><b>type:</b> <input id="type" type="range" min="0" max="2" name="type" required step="1"	</div>'
                    +'<div id="scenery_box" class="form-group">'
                    +'<b>scenery:</b>' /*<input id="scenery_chbx"type="checkbox" onclick="createfield(scenery)">*/ 
                    +'<input id="scenery" name="scenery" placeholder="scenery" class="form-control">' //onblur="createfield(scenery)"
                    +'</div>'
                        //+'<input id="scenery_label" name="scenery_label" placeholder="scenery label"></br>' //class="autogrow"
                    +'<div id="scenery_free_box" class="form-group">'
                    +'<b>free scenery:</b>'
                    +'<input id="scenery_free" name="scenery_free" placeholder="Free scenery" class="form-control">' //onblur="createfield(scenery_free)"
                    +'</div>'
                        //+'<input id="scenery_free_label" name="scenery_free_label" placeholder="free scenery label"></br>'
                        //+'<input id="scenery_label" name="scenery_label"></br>' //class="autogrow"
                        //+'<div><b>address:</b> <input id="address" type="text" name="address">	</div>'
                        //+'<b>Add city box</b><input type="checkbox" id="city_check" onclick="city_checkbox()">'+'<div id="for_city"></div>' //<input id="city" type="text" name="city">
                    +'<div class="form-group">'
                    +'<b>City:</b></br>'
                    +'<input id="city" name="city" class="form-control"></br>'
                    +'</div>'
                        //+'<div><b>country:</b> <input id="country" type="text" name="country">	</div>'
                    +'<div class="form-group">'
                    +'<textarea id="description" name="description" placeholder="description" ></textarea></br>' //class="autogrow"
                    +'</div>'
                        //checkbox "change city"
                    +'<div id="files"><input id="filesend" type="file" name="filename[]" multiple accept="image"/></div>'
                    +'<input type="submit" id="submit" value="save" class="btn btn-primary">'
                    +'<input type="button" id="reset_btn" value="reset" onclick="formReset()" class="btn btn-warning">'
                    +'<input type="button" id="del" value="delete" class="btn btn-danger">'
                    +'</form>'
                    //+'<input type="button" id="update" value="update">

                    //+'<button onclick="addcity()">Set city</button>'
                    //+'</td>'
                    //+'</table>'
                    //+'</div>'
                );

                //make draggable
                for (var i = 0; i < markers_arr.length; i++) markers_arr[i].setDraggable(true);
                show = false;
                $("#LoginForm").toggle();
                document.getElementById("scenery").onblur = function(){
                    createfield("scenery");
                };
                document.getElementById("scenery_free").onblur = function(){
                    createfield("scenery_free");
                };
                document.getElementById('marker_name').onblur= function(){
                    document.getElementById('scenery').focus();
                }
            }
            else alert('Wrong name or password!');
        }
    });
}

//function del(){
	//document.getElementById('tbLogin').parentNode.removeChild(document.getElementById('tbLogin'));
	//document.getElementById('tbPassword').parentNode.removeChild(document.getElementById('tbPassword'));	     		
//}