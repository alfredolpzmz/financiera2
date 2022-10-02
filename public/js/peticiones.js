
function enviarForm(oHTTP, url){
	var form = document.forms.namedItem("mainForm");
	var oOutput = document.getElementById("output");

	oOutput.innerHTML = '';

	var oData = new FormData(form);
	
	if (window.XMLHttpRequest) {
		var oReq = new XMLHttpRequest();
		if (oReq.overrideMimeType) {
			oReq.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) {
		try {
			var oReq = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				var oReq = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}

	if (!oReq) {
		alert('Falla :( No es posible crear una instancia XMLHTTP');
		//oOutput.innerHTML = "Error " + st.error + ", los datos no se guardaron.<br \/>";
		return false;
	}

	oReq.open(oHTTP, url, true);
	
	oReq.onload = function(Event) {
		if (oReq.status == 200) {
			var st = JSON.parse(oReq.responseText);
			if(st.success == true){
				window.location.href= st.url;
			}
			else if (st.success == false)
			{
				oOutput.innerHTML = st.message;
			}
			else{
				oOutput.innerHTML = "Error " + st.error + ", los datos no se guardaron.<br \/>";
			}
		}
		else{
			oOutput.innerHTML = "Error " + oReq.status + " se perdió la conexion, no se pudo guardar los datos.<br \/>";
		}
	};	  
	
	oReq.send(oData);
}

// -----------------------------------------------------------------------------------------------------------------------------

function enviarFormOnClick (oHTTP, url) {

	var form = document.forms.namedItem("mainForm");
	
	form.addEventListener('click', function(ev){
			
		var oOutput = document.getElementById("output");
		var oData = new FormData(document.forms.namedItem("mainForm"));
	
		if(window.XMLHttpRequest) {
			var oReq = new XMLHttpRequest();
		}else if(window.ActiveXObject) {
			var oReq = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		oReq.open(oHTTP, url, true);
		oReq.onload = function(oEvent) {
			if (oReq.status == 200){
				var st = JSON.parse(oReq.responseText);
				
				if(st.success == true)
				{
					//oOutput.innerHTML = st.message;
					//window.location.href= st.url;
					window.location.reload();
				}
				else if (st.success == false)
				{
					oOutput.innerHTML = st.message;
				}
			}
			else{
				oOutput.innerHTML = "Error" + " " +oReq.status + " " +"los datos no fueron enviados.<br \/>";
			}
		};
		
		oReq.send(oData);
		ev.preventDefault();
	}, false);
}

// -----------------------------------------------------------------------------------------------------------------------------

document.getElementById('mainForm').addEventListener('submit', function(ev){
    ev.preventDefault();
	
	var url = document.getElementById("url").value;
	var oOutput = document.getElementById("output");
	var oData = new FormData(document.forms.namedItem("mainForm"));
	
	if(window.XMLHttpRequest) {
		var oReq = new XMLHttpRequest();
	}else if(window.ActiveXObject) {
		var oReq = new ActiveXObject("Microsoft.XMLHTTP");
	}
		
	oReq.open("POST", url, true);
	oReq.onload = function(oEvent) {
		if (oReq.status == 200){
			var st = JSON.parse(oReq.responseText);
				
			if(st.success == true)
			{
				window.location.href= st.url;
			}
			else if (st.success == false)
			{
				oOutput.innerHTML = st.message;
			}
		}
		else{
			oOutput.innerHTML = "Error" + " " +oReq.status + " " +"los datos no fueron enviados.<br \/>";
		}
	};
		
	oReq.send(oData);
})
