// Loading JSON  with CROS
docwrite = function (str){ document.body.insertAdjacentHTML("beforeend", str); }
function getjsondata(url) {
  var jsondata= {};
  $.ajax({
      type: 'GET',
      url: url,
      async: false,
      contentType: "application/json",
      dataType: 'json',
      success: function (data) {
          //alert('success');
         jsondata= data;
      },
      error: function (e) {
          jsondata= e;
          alert('error' + e);
      }
  });
  console.log(jsondata);
  return(jsondata);
}
function executeFunctionByName(functionName, context /*, args */) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
  /* https://stackoverflow.com/a/359910/710788
  You would call it like so:

executeFunctionByName("My.Namespace.functionName", window, arguments);
Note, you can pass in whatever context you want, so this would do the same as above:

executeFunctionByName("Namespace.functionName", My, arguments);
  */
}
function listaxeneros() {
  var url = 'https://api.gbif.org/v1/species/3065/children?limit=100';
  var jsondata=getjsondata(url);
  as=jlinq.from(jsondata.results).sort("-authorship","+genus").select();
  var rollo='';
  for (var i=0;i<as.length;i++)  {
    rollo+='<i>'+as[i].genus +"</i> <span class='author'>"+as[i].authorship+'</span> '+as[i].taxonomicStatus+'<br>';
      //docwrite(rollo);
  }
  document.getElementById('results').innerHTML=rollo;	
}
function buscaenCL(nome) {
  var url = 'https://api.gbif.org/v1/species?name=' + encodeURI(document.getElementById('string').value);
  var jsondata=getjsondata(url);
  //as=jlinq.from(jsondata.results).select();
  var asql = alasql('SELECT scientificName, taxonID,datasetKey FROM ? ORDER BY datasetKey',[jsondata.results]);
console.log(asql);
  var rollo="<a href="+url+" target=_blank>"+url+"</a>" +"<br>";
  asql.forEach(function(item, index) {
  	var datosCL=verCL(item.datasetKey)
    item.checklistname=datosCL.title;
    item.checklistdoi=datosCL.doi;
  	rollo+="<li><i>"+item.scientificName+"</i>";
  	rollo+=" ["+item.taxonID+"]";
  	rollo+=" <a target=_blank href="+item.checklistdoi+">" +item.checklistname+"</a>";
    rollo+="</li>";
  });
  document.getElementById('results').innerHTML =  rollo +"<hr>" + JSON.stringify(asql) + "<hr>" + JSON.stringify(jsondata);	

}
function verCL(checklistId) {
  var url = 'https://api.gbif.org/v1/dataset/' + checklistId;
  var jsondata=getjsondata(url);
	console.log("LISTA: " + JSON.stringify(jsondata));
  return({"title":jsondata.title, "doi":"http://dx.doi.org/"+jsondata.doi});
}
//listaxeneros();
$('#opcion').click( function() {
// https://stackoverflow.com/a/5431435/710788
   eval(this.value+"()");   
   //executeFunctionByName(this.value,'window');
});
