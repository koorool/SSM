//filter free/non-free/all markers//
	function check(type){
		switch (type){
			case -1:
			markers_load(-1);
			document.getElementById('refresh').innerHTML = "Refresh";
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
	}
	setTimeout(function() {
	document.getElementById('frame').onload = function(){
		if(document.getElementById('frame').contentWindow.document.body.innerHTML!="" && admin){
		alert("marker with id: " + document.getElementById("frame").contentWindow.document.body.innerHTML +" Added!"); //можливо це не потрібно
	    markers_load("-1", document.getElementById("frame").contentWindow.document.body.innerHTML);
	    panelinformation(document.getElementById('code').value);
		}
	};
	}, 4000);
	
$(document).ready(function(){
    $("#search").autocomplete({ source: source });

    $("#CheckAll").click(function(){
    	check(-1);
    });
    $("#CheckFree").click(function(){
    	check(0);
    });
    $("#CheckPaid").click(function(){
    	check(1);
    });
    $("#CheckPaidAndFree").click(function(){
    	check(2);
    });
    /*$("#ShowLogin").click(function(){
        $("#LoginForm").toggle();
    });

    $("#LoginForm").submit(function(event){
        Login($("#InputLogin").val(), $("#InputPassword").val());
        event.preventDefault();
    });*/
});
