function ShowLogin(){
	var Menu = document.getElementById('Menu')
	var tbLogin = document.createElement('input')
	tbLogin.className = 'LoginBox'
	tbLogin.id = 'tbLogin'
	tbLogin.style.background = 'fff'
	tbLogin.style.top = '40px'
	tbLogin.style.right = '10px'
	tbLogin.style.position = 'absolute'
	tbLogin.style.zIndex = 2
	tbLogin.style.height = '25px'
	tbLogin.value = 'Login'
	tbLogin.onclick = function() { 
	if (tbLogin.value == 'Login') 
		tbLogin.value = ''
	}
	
	var tbPass = document.createElement('input')
	tbPass.className = 'LoginBox'
	tbPass.id = 'tbPassword'
	tbPass.style.background = 'fff'
	tbPass.style.top = '65px'
	tbPass.style.right = '10px'	
	tbPass.style.height = '25px'
	tbPass.style.position = 'absolute'
	tbPass.style.zIndex = 2
	tbPass.value = 'Password'
	tbPass.onclick = function() { 
	if (tbPass.value == 'Password') 
		tbPass.value = ''
	}
	
	var bLogin = document.createElement('input')
	bLogin.className = 'LoginBox'
	bLogin.type = 'button'
	bLogin.id = 'bLogin'
	bLogin.value = 'Login'
	bLogin.style.background = 'fff'
	bLogin.style.top = '90px'
	bLogin.style.right = '97px'	
	bLogin.style.height = '25px'
	//bLogin.style.width = '144px';
	bLogin.style.position = 'absolute'
	bLogin.style.zIndex = 2
	bLogin.onclick = function() {Login()}
	
	Menu.appendChild(tbLogin)
	Menu.appendChild(tbPass)
	Menu.appendChild(bLogin)
}


function  Login (){
	var tbLogin = document.getElementById('tbLogin');
	var tbPass = document.getElementById('tbPassword');
	var url = "php/login.php?login=" + tbLogin.value + "&password=" + tbPass.value;	
	
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
			if (req.readyState == 4) {
				$answer = req.responseText;
				if (!$answer) alert("Неверное имя или пароль. " + $answer);
			}
		}		
		req.send(null);		
}

function showAdminPanel(){
	var Menu = document.getElementById('Menu');
	var bAddMarker = document.createElement('input');
	bAddMarker.className = 'AdminMenu'
	bAddMarker.type = 'button'
	bAddMarker.id = 'bAddMarker'
	bAddMarker.value = 'Login'
	bAddMarker.style.background = 'fff'
	bAddMarker.style.top = '90px'
	bAddMarker.style.right = '97px'	
	bAddMarker.style.height = '25px'
	//bLogin.style.width = '144px';
	bAddMarker.style.position = 'absolute'
	bAddMarker.style.zIndex = 2
	bAddMarker.onclick = function() {Login()}
	Menu.appendChild(bAddMarker)
}

