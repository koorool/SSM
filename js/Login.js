var admin = false;
var show=false;

//$(function(){
/*function click_submit(){
		//var login = document.getElementById('tbLogin').value;
		//var pass = document.getElementById('tbPassword').value;
		$.ajax({
			url: '/aviamap/PHP/login.php',
			type: 'POST',
			data: {user: document.getElementById('tbLogin').value, pass: document.getElementById('tbPassword').value},
			success: function(data){
				if(data==="true"){
					admin = true;
			//if (jQuery.infopanel.hasClass('visible')) jQuery.Panel();
			var new_marker_field = document.createElement('input');
			new_marker_field.type = "checkbox";
			new_marker_field.id = "new_marker";
			document.getElementById('navigate').innerHTML += "Add new markers"
			document.getElementById('navigate').appendChild(new_marker_field);
			     	//+'<b>Input new markers</b><input type="checkbox" id="new_marker">' 		
			$('#panel_content').html(//'<div id="panel_content">' 
				//+'<table height="100%">' 
												//+'<td id="close" onclick="jQuery.Panel()"> </td>'
				//+'<td id="content" valign="top">'
				'<form action="/aviamap/PHP/insert.php" name="form" method="post" id="form" target="frame" enctype="multipart/form-data" >'
				//+'<div align="left"><b>Code:</b>
				+'<input id="code" type="text" name="code" required="required" placeholder="ICAO" pattern="[A-Za-z]{4}"> </div>'
				//+'<div align="left"><b>Название маркера: </b>
				+'<input id="marker_name" name="name" required="required" placeholder="name"></div></br>'
				+'<b>lat:</b> <input id="lat" class="number" type="number" name="lat" min="-90" max="90" step="any" required pattern="\d{2}+(\,\d{15})?" title="Здесь должно быть число!"></br>' //pattern="\d{2}+(\,\d{15})?"
				+'<b>lng:</b> <input id="lng" class="number" type="number" name="lng" min="-90" max="90" step="any" required pattern="\d{2}+(\,\d{15})?" title="Здесь должно быть число!"></br>' //pattern="\d{2}+(\,\d{7})?"
														   	//+'<div><b>type:</b> <input id="type" type="range" min="0" max="2" name="type" required step="1"	</div>'
				+'<b>scenery:</b> <input id="scenery" name="scenery" placeholder="scenery"></br>'
				+'<input id="scenery_label" name="scenery_label" placeholder="scenery label"></br>' //class="autogrow"
				+'<b>free scenery:</b> <input id="scenery_free" name="scenery_free" placeholder="scenery_free"></br>'
				+'<input id="scenery_free_label" name="scenery_free_label" placeholder="free scenery label"></br>'
				//+'<input id="scenery_label" name="scenery_label"></br>' //class="autogrow"
														   	//+'<div><b>address:</b> <input id="address" type="text" name="address">	</div>'
				//+'<b>Add city box</b><input type="checkbox" id="city_check" onclick="city_checkbox()">'+'<div id="for_city"></div>' //<input id="city" type="text" name="city">
				+'<b>City:</b></br>'
				+'<input id="city" name="city"></br>'
														   	//+'<div><b>country:</b> <input id="country" type="text" name="country">	</div>'
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
				}
				else alert('Неверное имя или пароль');
			}

		});
	}
//});*/

function ShowLogin(){	
if (show == false){
	if(admin)alert('You are logged in already!');
	else{
	var form_login = document.createElement('form');
			/*form_login.target = 'frame';*/
	form_login.onsubmit=function(){return false;};
			//form_login.addEventListener("submit", 'return false');
			//form_login.action = '/aviamap/PHP/login.php';
	form_login.autocomplete = 'on';
			//form_login.method = 'POST';
	form_login.id = 'form_login';
	form_login.className = 'pull-right form-inline'

	//var Menu = document.getElementById('Menu');
	var 
	var tbLogin = document.createElement('input');
	//tbLogin.className = 'LoginBox';
	tbLogin.id = 'tbLogin';
	tbLogin.name = 'user';
	tbLogin.class = ''
	tbLogin.autocomplete = 'on';
	//tbLogin.style.background = 'fff';
	tbLogin.style.top = '0px';
	tbLogin.style.right = '10px';
	tbLogin.style.position = 'absolute';
	tbLogin.style.zIndex = 2;
	tbLogin.style.height = '25px';
	tbLogin.style.width = '80px';
	tbLogin.placeholder = 'Login';
	//tbLogin.visibility = 'visible';
	/*tbLogin.onclick = function() { 
	if (tbLogin.value == 'Login') 
		tbLogin.value = '';
	};*/
	
	var tbPass = document.createElement('input');
	//tbPass.className = 'LoginBox';
	tbPass.id = 'tbPassword';
	tbPass.name = 'pass';
	tbPass.type="password";
	//tbPass.style.background = 'fff';
	tbPass.style.top = '30px';
	tbPass.style.right = '10px';
	tbPass.style.height = '25px';
	tbPass.style.width = '80px';
	tbPass.style.position = 'absolute';
	tbPass.style.zIndex = 2;
	tbPass.placeholder = 'Password';
	/*tbPass.onclick = function() { 
	if (tbPass.value === 'Password') 
		tbPass.value = '';
	};*/
	
	var bLogin = document.createElement('input');
	//bLogin.className = 'LoginBox';
	bLogin.type = 'submit';
	bLogin.id = 'bLogin';
	bLogin.value = 'Login';
	//bLogin.onclick = function(){click_submit();};
	//bLogin.style.background = 'fff';
	bLogin.style.top = '35px';
	bLogin.style.right = '97px';
	bLogin.style.height = '25px';
	bLogin.style.position = 'absolute';
	bLogin.style.zIndex = 2;
	bLogin.onclick = function() {
			$.ajax({
			url: '/aviamap/PHP/login.php',
			type: 'POST',
			data: {user: document.getElementById('tbLogin').value, pass: document.getElementById('tbPassword').value},
			success: function(data){
				if(data==="true"){
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
				+'<input id="code" name="code" required="required" placeholder="code" pattern="[A-Za-z]{4}"> </div>'
				//+'<div align="left"><b>Название маркера: </b>
				+'<input id="marker_name" name="name" required="required" placeholder="name"></div></br>'
				+'<b>lat:</b> <input id="lat" class="number" type="number" name="lat" min="-90" max="90" step="any" required pattern="\d{2}+(\,\d{15})?" title="Здесь должно быть число!"></br>' //pattern="\d{2}+(\,\d{15})?"
				+'<b>lng:</b> <input id="lng" class="number" type="number" name="lng" min="-90" max="90" step="any" required pattern="\d{2}+(\,\d{15})?" title="Здесь должно быть число!"></br>' //pattern="\d{2}+(\,\d{7})?"
														   	//+'<div><b>type:</b> <input id="type" type="range" min="0" max="2" name="type" required step="1"	</div>'
				+'<b>scenery:</b>' /*<input id="scenery_chbx"type="checkbox" onclick="createfield(scenery)">*/ +'<input id="scenery" name="scenery" placeholder="scenery" onblur="createfield(scenery)"></br>' //onchange="createfield(scenery)"
				//+'<input id="scenery_label" name="scenery_label" placeholder="scenery label"></br>' //class="autogrow"
				+'<b id="before_scenery">free scenery:</b> <input id="scenery_free" name="scenery_free" placeholder="scenery_free" onblur="createfield(scenery_free)"></br>'
				//+'<input id="scenery_free_label" name="scenery_free_label" placeholder="free scenery label"></br>'
				//+'<input id="scenery_label" name="scenery_label"></br>' //class="autogrow"
														   	//+'<div><b>address:</b> <input id="address" type="text" name="address">	</div>'
				//+'<b>Add city box</b><input type="checkbox" id="city_check" onclick="city_checkbox()">'+'<div id="for_city"></div>' //<input id="city" type="text" name="city">
				+'<b id="before_scenery_free">City:</b></br>'
				+'<input id="city" name="city"></br>'
														   	//+'<div><b>country:</b> <input id="country" type="text" name="country">	</div>'
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
			    
			        		//make draggable
			    for (var i = 0; i < markers_arr.length; i++) markers_arr[i].setDraggable(true);
			    show = false;
				}
				else alert('Wrong name or password!');
			}

		});
	};
	
	document.getElementById('Menu').appendChild(form_login);
	form_login.appendChild(tbLogin);
	form_login.appendChild(tbPass);
	form_login.appendChild(bLogin);
	show = true;
	}
}
	else {
			document.getElementById('form_login').parentNode.removeChild(document.getElementById('form_login'));
		    show = false;
		 }	
}

//function del(){
	//document.getElementById('tbLogin').parentNode.removeChild(document.getElementById('tbLogin'));
	//document.getElementById('tbPassword').parentNode.removeChild(document.getElementById('tbPassword'));	     		
//}