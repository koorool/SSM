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
    	markers_load(-1);
    });
    $("#CheckFree").click(function(){
    	markers_load(0);
    });
    $("#CheckPaid").click(function(){
    	markers_load(1);
    });
    $("#CheckPaidAndFree").click(function(){
    	markers_load(2);
    });
});
