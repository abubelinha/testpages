function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
// https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript/1144788#1144788
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function verold(fotostring,col,nh) {
	document.getElementById('panel').style.visibility='visible';
	//md_txt += "![weserv](https://images.weserv.nl/?url="+imgurl.replace("?","%3F").replace("&","%26").replace("http://","ssl:")+")"
	fotos = fotostring.split("#");
	rollohtml="";
	server = "193.144.34.193/iipsrv/iipsrv.fcgi?fif=/mnt/scratch/pyrtif/";
	wid="300";
	sampleimaxe = 'bc_SANT_201504_C/20150430_044.pyr.tif';
	for(i=0; i<fotos.length; i++) {
		fsplit=fotos[i].split("|");
		scale = fsplit[3] / 25.4;
		thumb = 'https://images.weserv.nl/?url='+replaceAll(replaceAll(server+fsplit[1]+'/'+fsplit[2]+'&CNT=1.1&WID='+wid+'&CVT=jpeg', '?','%3F'),'&','%26');
		big = 'https://images.weserv.nl/?url='+replaceAll(replaceAll(server+fsplit[1]+'/'+fsplit[2]+'&CNT=1.1&WID='+"1100"+'&CVT=jpeg','?','%3F'),'&','%26');
		url = 'https://herbarios.ga/imsrv/visorcesga.php?fif='+fsplit[1]+'/'+fsplit[2]+'&scale='+scale;
		rollohtml += "<a href="+url+" target=_blank><img class='imaxe' src='"+thumb+"'></a> ";
	}
	urlsant = "https://www.usc.es/herbario/"+col+"/"+nh;
	document.getElementById('visor').innerHTML = "<h1><a href='"+urlsant+"' target=_blank>"+col+" "+nh+"</a></h1>"+"<pre>"+fotos+"</pre><hr>"+rollohtml;
}
function verdatosex(col,nh) {
	return ('');
}
function ver(fotostring,col,nh) {
	document.getElementById('panel').style.visibility='visible';
	//md_txt += "![weserv](https://images.weserv.nl/?url="+imgurl.replace("?","%3F").replace("&","%26").replace("http://","ssl:")+")"
	fotos = fotostring.split("#");
	rollohtml="";
	// https://stackoverflow.com/questions/2694640/find-an-element-in-dom-based-on-an-attribute-value/16775485#16775485
	//datos = document.querySelectorAll('[ex="SANT.78325"]')[0]
	ex = document.querySelector('[ex="'+col+'.'+nh+'"]');
	dj = JSON.parse(ex.getAttribute("data-json"));
	rollohtml += "<div class='label'>"
	rollohtml += "<span class='label_exsic'><b>"+dj.h+"</b>";
	rollohtml += ". Centuria "+dj.c+", Nº"+dj.n+" ("+(parseInt(dj.c)+1995).toString()+"):</span>";
	rollohtml += "<br><span class='label_taxon'><i>"+dj.sci+"</i></span>";
	rollohtml += "<br><span class='campo'><i>Legit</i>:</span> "+dj.leg+"</i> ["+dj.ano+"/"+dj.mes+"/"+dj.dia+"]";
	rollohtml += "<br><span class='campo'>Lugar:</span> "+dj.loc;
	rollohtml += "<br><span class='campo'>Habitat:</span> "+dj.hab;
	rollohtml += "<br></div>"+"<hr>";
	server = "193.144.34.193/iipsrv/iipsrv.fcgi?fif=/mnt/scratch/pyrtif/";
	wid="200";
	sampleimaxe = 'bc_SANT_201504_C/20150430_044.pyr.tif';
	if(fotostring.length>0) {
		for(i=0; i<fotos.length; i++) {
			fsplit=fotos[i].split("|");
			scale = fsplit[3] / 25.4;
			thumb = 'https://images.weserv.nl/?url='+replaceAll(replaceAll(server+fsplit[1]+'/'+fsplit[2]+'&CNT=1.1&WID='+wid+'&CVT=jpeg', '?','%3F'),'&','%26');
			big = 'https://images.weserv.nl/?url='+replaceAll(replaceAll(server+fsplit[1]+'/'+fsplit[2]+'&CNT=1.1&WID='+"1100"+'&CVT=jpeg','?','%3F'),'&','%26');
			url = 'https://herbarios.ga/imsrv/visorcesga.php?fif='+fsplit[1]+'/'+fsplit[2]+'&scale='+scale;
			//rollohtml += "<a href="+url+" target=_blank><img class='imaxe' src='"+thumb+"'></a> "; // pa enlazar a SANT
			// pa cargar visor en iframe:
			rollohtml += "<a onclick=\"verdetalle('"+fotostring+"','"+col+"','"+nh+"','"+url+"');\"><img class='imaxe' src='"+thumb+"'></a> "; 
		}
	} else {
		rollohtml += "<h1>DIXITALIZACIÓN PENDENTE</h1>"
	}
	if(false) rollohtml += "<hr>"+JSON.stringify(dj); // DEBUG
	urlsant = "https://www.usc.es/herbario/"+col+"/"+nh;
	back = "<button onclick=\"ver('"+fotos+"','"+col+"','"+nh+"');\" title=\"ATRÁS\">&lt;&lt;&lt;</button>";
	back = "";
	datosex = verdatosex(col,nh);
	linksant = "<a href='"+urlsant+"' target=_blank title='ver datos en web Herbario SANT'>"+col+" "+nh+"</a>";
	// DEBUG: fotos
	document.getElementById('visor').innerHTML = "<h3>"+back+" "+linksant+"</h3>"+datosex+rollohtml;
	if(false) {
		document.getElementById('visor').innerHTML += "<hr><pre>"+fotos+"</pre>";
	}
}
function verdetalle(fotostring,col,nh,urlvisor) {
	back = "<button onclick=\"ver('"+fotostring+"','"+col+"','"+nh+"');\" title=\"ATRÁS\">&lt;&lt;&lt;</button>";
	urlsant = "https://www.usc.es/herbario/"+col+"/"+nh;
	linksant = "<a href='"+urlsant+"' target=_blank title='ver datos en web Herbario SANT'>"+col+" "+nh+"</a>";
	document.getElementById('visor').innerHTML = "<h3>"+back+" "+linksant+"</h3>" + "<iframe style='width:100%;height:90%;' src='"+urlvisor+"'></iframe>";
}
var readJson = (path, cb) => {
	// https://stackoverflow.com/questions/14484613/load-local-json-file-into-variable/18060638#18060638
	// precisa de require.js
	fs.readFile(require.resolve(path), (err, data) => {
		if (err)
		  cb(err)
		else
		  cb(null, JSON.parse(data))
	})
}
function filtrar() {
	classtotal=".exemplar";
	// PRIMEIRO OCULTAMOS TODOS:
	exs = document.querySelectorAll(classtotal);
	for (i=0; i<exs.length; i++) exs[i].style.display="none";
	// E LOGO AMOSAMOS SÓ OS SELECCIONADOS:
	// https://stackoverflow.com/questions/9427311/how-to-get-all-elements-by-class-name/9427330#9427330
	selc = document.getElementById("sel_centuria");
	classc = selc[selc.selectedIndex].value;
	if(classc>"") classtotal+=("."+classc);
	selz = document.getElementById("sel_zona");
	classz = selz[selz.selectedIndex].value;
	if(classz>"") classtotal+=("."+classz);
	selh = document.getElementById("sel_herbario");
	classh = selh[selh.selectedIndex].value;
	if(classh>"") classtotal+=("."+classh);
	console.log(classtotal);
	exs = document.querySelectorAll(classtotal);
	ux="";
	utax="";
	for (i=0; i<exs.length; i++) {
		exs[i].style.display="inline";
		nx=exs[i].textContent.split(" ")[0];
		tax=exs[i].getAttribute("t");
		x=tax.split(" ")[0];
		resto = tax.split(" ") ; resto.shift();
		if(i>0) sep=", ";
		else sep="";
		//console.log(tax, ": ",ux, x, x[0]," / ",resto.join(" "));
		if(x[0]!=ux[0]) {
			console.log("NOVA LETRA: ",x[0]);
			sep='<br><br>'; // nova letra
		}
		if(x!=ux) {
			exs[i].innerHTML = sep+"<i><b>"+x+"</b> " + resto.join(" ") + "</i>";
			//console.log("'"+x+"' é distinto do último xénero: '"+ux+"'");
			ux=x+"";
			//console.log("agora o último xénero é '"+ux+"'");
		} else {
			//console.log(x,ux,"iguais");
			if(tax!=utax) {
				exs[i].innerHTML = sep +"<i>"+ x[0]+"." + resto.join(" ") + "</i>";
			} else {
				exs[i].innerHTML = " (+)";
			}
		}
		utax=tax+"";
		/*
		// amosar todo, e logo ocultar se non entra nalgunha categoría das seleccionadas:
		w3RemoveClass(exs[i], "oculto");
		sels = [classc, classz, classh];
		for(s=0; s<sels.length; s++) {
			sel=sels[s];
			//console.log(sel);
			if(sel>"") {
				if (! exs[i].className.indexOf(sel) > -1) w3AddClass(exs[i], "oculto");
			}
		}
		*/
	}
}
function cancel_sel() {
	document.getElementById("sel_herbario").selectedIndex=0;
	document.getElementById("sel_centuria").selectedIndex=0;
	document.getElementById("sel_zona").selectedIndex=0;
	filtrar();
}
document.getElementById("sel_herbario").addEventListener("change", filtrar);
document.getElementById("sel_centuria").addEventListener("change", filtrar);
document.getElementById("sel_zona").addEventListener("change", filtrar);
document.getElementById("cancel_sel").addEventListener("click", cancel_sel);
filtrar();

function myFunction() {
  var x = document.getElementById("fname");
  x.value = x.value.toUpperCase();
}

/* https://www.w3schools.com/howto/howto_js_filter_table.asp
Tip: Remove toUpperCase() if you want to perform a case-sensitive search.
Tip: Change tr[i].getElementsByTagName('td')[0] to [1] if you want to search for "Country" (index 1) instead of "Name" (index 0).
Tip: Also check out Filter List.
*/
function myFunction() {
  // Declare variables 
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

/* https://www.w3schools.com/howto/howto_js_filter_lists.asp
*/

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1); 
    }
  }
  element.className = arr1.join(" ");
}