/*
basic leaflet javascript map
*/
var map;
function basemap(lat=42.682435, lon=-8.179344,zoom=14,div="divmap") {// BASE MAPPING:
	map = L.map(div).setView([lat,lon],zoom);
	var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			osmAttribution = 'Map data &copy; OpenStreetMap contributors',
			osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
	var ocmUrl = 'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=your_api_key',
		ocmAttribution = "",
		ocm = new L.TileLayer(ocmUrl, {/*minZoom: 14,*/ maxZoom: 18, attribution: ocmAttribution});
	//map.addLayer(ocm); 

	var WMSs = {
	"pnoa":{"wms":"http://www.ign.es/wms-inspire/pnoa-ma","layers":"pnoa","formats":"image/jpeg","attribution":"PNOA"},
	"mtn-vello":{"wms":"http://www.idee.es/wms/MTN-Raster/MTN-Raster","layers":"mtn_rasterizado","formats":"image/png","attribution":"MTN-Raster"},
	"mtn":{"wms":"http://www.ign.es/wms-inspire/mapa-raster","layers":"mtn_rasterizado","formats":"image/png","attribution":"MTN-Raster"},
	"cartociudad":{"wms":"http://www.cartociudad.es/wms/CARTOCIUDAD/CARTOCIUDAD","layers":"DivisionTerritorial,Toponimo","formats":"image/png","attribution":"Cartociudad"},
	"catastro":{"wms":"http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx","layers":"catastro","formats":"PNG","attribution":"Catastro"},
	"vacia":"nada"
	};
	var quelayer="catastro";
	var wms1 = new L.TileLayer.WMS(WMSs[quelayer].wms, {
		layers: WMSs[quelayer].layers,
		format: WMSs[quelayer].formats,
		transparent: true,maxZoom: 22,attribution: WMSs[quelayer].attribution
	});
	quelayer="pnoa";
	//quelayer="mtn";
	var wms2 = new L.TileLayer.WMS(WMSs[quelayer].wms, {
		layers: WMSs[quelayer].layers,
		format: WMSs[quelayer].formats,
		transparent: true,minZoom: 13,maxZoom: 20,attribution: WMSs[quelayer].attribution
	});
	quelayer="mtn";
	var wms3 = new L.TileLayer.WMS(WMSs[quelayer].wms, {
		layers: WMSs[quelayer].layers,
		format: WMSs[quelayer].formats,
		transparent: true, /* minZoom: 10,*/ maxZoom: 18,attribution: WMSs[quelayer].attribution
	});
	map.addLayer(wms3);
	
	var baseMaps = {
		"Open Cycling Map": ocm
		,"Open Street Map": osm
		,"Topográfico": wms3
		,"Foto aérea": wms2
		,"Catastro": wms1
	}
	var overlayMaps = {
		"Catastro": wms1
	};
	L.control.layers(baseMaps,overlayMaps).addTo(map);
	L.control.scale({maxWidth:100}).addTo(map);
} // END OF BASE MAPPING function basemap()