/* IIIF Protocol Handler
 */

Protocols.IIIF = new Class({

  /* Return metadata URL
   */
  getMetaDataURL: function(server,image){
    return server + "/" + image + "/info.json";
  },

  /* Return an individual tile request URL
   */
  getTileURL: function(t){
    var f = this.getMultiplier(t.resolution);
    var orig_x = t.x*f;
    var orig_y = t.y*f;
    var tile_x = this.tileSize.w * Math.pow(2,  this.num_resolutions - t.resolution - 1);
    var tile_y = this.tileSize.h * Math.pow(2,  this.num_resolutions - t.resolution - 1);
    var src = t.server + "/" + t.image + "/" + orig_x + "," + orig_y + "," + tile_x + "," + tile_y;

    // Handle bottom edge tiles that may be smaller than the standard tile size
    // https://github.com/ruven/iipmooviewer/issues/80#issuecomment-1892269949
    if( this.resolutions && 
      (t.x+1) * this.tileSize.w > this.resolutions[t.resolution].w  &&
      (t.y+1) * this.tileSize.h > this.resolutions[t.resolution].h){
      src += "/" + (this.resolutions[t.resolution].w - t.x * this.tileSize.w ) + ",";
    }
    else if( tile_x != this.tileSize.w ){
      src += "/!" + this.tileSize.w + "," + this.tileSize.h;
    } else {
      src += "/full"; // 20240112 abubelinha: old IIIF specification? I changed "/max" to "/full"
    }
    src += "/0/default.jpg";
    return src;
  },

  /* Parse an IIIF protocol metadata request
   */
  parseMetaData: function(response){
    var p = eval("(" + response + ")");
    var w = parseInt(p.width);
    var h = parseInt(p.height);
    if (typeof client_w !== 'undefined') { // 20240111 abubelinha: for incomplete IIIF server info.json (missing image dimensions)
        w = parseInt(client_w);
        h = parseInt(client_h);
    }
    console.log("client's provided image size: "+w.toString()+","+h.toString()); // abubelinha test

    // Handle both 1.1 and 2.0 IIIF API's
    if( typeOf( p.scale_factors ) !== "null" ){ this.num_resolutions = p.scale_factors.length; }
    else this.num_resolutions = p.tiles[0].scaleFactors.length;
    
    this.tileSize = { w: 256, h: 256 }; // default client setting (can be modified below depending on server's or user's settings)
    console.log("default tilesize:",this.tileSize); // abubelinha's log

    if( p.tiles[0].width ) { // Let server's info.json override default tilesize settings:
        this.tileSize.w = parseInt( p.tiles[0].width );
        if( p.tiles[0].height ) this.tileSize.h = parseInt( p.tiles[0].height ); // But some servers provide only tiles width in info.json
        else this.tileSize.h = parseInt( p.tiles[0].width ); // ... so we should use width value when height is not provided by server
        /* Taken from: https://iiif.io/api/image/2.0/#image-information
        height: The height of the predefined tiles to be requested. 
        If it is not specified in the JSON, then it defaults to the same as width, resulting in square tiles.
        */
    }
    if (typeof client_tw !== 'undefined') { // Let user's client html override current tilesize settings:
        // force requested tilesize to override server's sugested tilesize
        // i.e. Zenodo IIIF server provides width=256 in info.json
        // but if viewers use that when zooming in, then server responses "too many requests"
        // so to reduce number of tiles, let client define a bigger tilesize in .html and override that
        this.tileSize.w = client_tw; 
        if (typeof client_th !== 'undefined') this.tileSize.h = client_th; // use height when provided
        else this.tileSize.h = client_tw; // but use width for height if not
    }
    console.log("final tilesize:",this.tileSize); // abubelinha's log

    var result = {
      'max_size': { w: w, h: h },
      'tileSize': this.tileSize,
      'num_resolutions': this.num_resolutions
    };

    // Add a list of resolutions if given
    if( typeOf(p.sizes) !== "null" && p.sizes.length == this.num_resolutions-1 ){
      result.resolutions = new Array(this.num_resolutions);
      for( var r=0; r<this.num_resolutions-1; r++ ){
	var size = p.sizes[r];
	result.resolutions[r] = {w:size.width,h:size.height};
      }
      // Add the full size image
      result.resolutions[this.num_resolutions-1] = {w:w,h:h};
    }
    // Otherwise calculate ourselves
    else{
      result.resolutions = new Array();
      var tx = w;
      var ty = h;
      result.resolutions.push({w:tx,h:ty});
      for( var i=1; i<this.num_resolutions; i++ ){
        tx = Math.floor(tx/2);
        ty = Math.floor(ty/2);
        result.resolutions.push({w:tx,h:ty});
      }
      // We reverse so that the smallest resolution is at index 0
      result.resolutions.reverse();
    }
    // Store these resolution sizes
    this.resolutions = result.resolutions;
    console.log("protocol's .js parseMetaData result:",result); // abubelinha's log

    return result;
  },

  /* Return URL for a full view
   */
  getRegionURL: function(server,image,region,width,height){
    return server + "/" + image + "/" + region.x + "," + region.y
      + "," + region.w + "," + region.h + "/" + width + ",/0/default.jpg"; // 20240112 abubelinha: old IIIF spec.? changed "native.jpg" to "default.jpg"
  },

  /* Return thumbnail URL
   */
  getThumbnailURL: function(server,image,width){
    return server + "/" + image + "/full/" + width + ",/0/default.jpg";
  },

  /* Like Djatoka, IIIF wants the region offests in terms of the highest resolution it has.
   * Here, we multiply up the offsets to that resolution.
   */
  getMultiplier: function(resolution) {
    return this.tileSize.w * Math.pow(2, this.num_resolutions - resolution - 1);
  }

});
