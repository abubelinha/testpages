# Spatial Data
----------
## Data sources
- [Spain Atlas TopoJSON](https://github.com/martgnz/es-atlas)
- 
----------
## Software
### PostGIS
- [Introduction to PostGIS](https://postgis.net/workshops/postgis-intro/) (workshop material by [Boundless](http://boundlessgeo.com/)): 
[Geometries](https://postgis.net/workshops/postgis-intro/geometries.html), [Projecting Data](https://postgis.net/workshops/postgis-intro/projection.html) and many more topics.
- [Working with PostgreSQL and PostGIS: How To Become A GIS Expert](https://www.percona.com/blog/2020/04/15/working-with-postgresql-and-postgis-how-to-become-a-gis-expert/) (Percona blog)
- [Install Postgres/PostGIS and get started with spatial SQL](http://zevross.com/blog/2019/12/04/install-postgres-postgis-and-get-started-with-spatial-sql/)
- OSGeoLive: [PostGIS QuickstartS](https://live.osgeo.org/en/quickstart/postgis_quickstart.html)
#### PostgreSQL
- Psycopg (python PostgreSQL driver): https://www.psycopg.org/docs/usage.html
- [sql-workbench](https://www.sql-workbench.eu/getting-started.html) SQL [blog](https://blog.sql-workbench.eu/)
- 
### R
- [Simple features for R](https://r-spatial.github.io/sf/index.html): [package](https://cloud.r-project.org/package=sf) + [github](https://github.com/r-spatial/sf/) + vignettes [1](https://r-spatial.github.io/sf/articles/sf1.html) [2](https://r-spatial.github.io/sf/articles/sf2.html) [3](https://r-spatial.github.io/sf/articles/sf3.html) [4](https://r-spatial.github.io/sf/articles/sf4.html) [5](https://r-spatial.github.io/sf/articles/sf5.html) [6](https://r-spatial.github.io/sf/articles/sf6.html) [7](https://r-spatial.github.io/sf/articles/sf7.html) + [article](https://journal.r-project.org/archive/2018/RJ-2018-009/index.html) & [PDF](https://journal.r-project.org/archive/2018/RJ-2018-009/RJ-2018-009.pdf)
- [Given a vector of coordinates, identify the polygon from a shapefile it falls into
](https://stackoverflow.com/questions/49290536/given-a-vector-of-coordinates-identify-the-polygon-from-a-shapefile-it-falls-in)
- [Intersecting Points and Polygons in R](https://stackoverflow.com/questions/3647744/intersecting-points-and-polygons-in-r)
- Disque funciona: [check if point is inside (multi)polygon/s](https://stackoverflow.com/questions/21971447/check-if-point-is-in-spatial-object-which-consists-of-multiple-polygons-holes/21987964#21987964) (also [plotting multipolygons](https://stackoverflow.com/questions/21962452/plot-spatial-area-defined-by-multiple-polygons/21963215#21963215) in R)
### Python
- https://github.com/mdiener21/python-geospatial-analysis-cookbook
- https://gis.stackexchange.com/questions/2276/installing-gdal-with-python-on-windows/7617#7617
- 

#### Packages:
- Unofficial Windows Binaries for Python Extension Packages (wheels): https://www.lfd.uci.edu/~gohlke/pythonlibs/
- Pyproj:  
  - (v.>= 2.6.1) [create Transformer co convert from CRS to CRS](https://pyproj4.github.io/pyproj/v2.6.1rel/examples.html#step-2-create-transformer-to-convert-from-crs-to-crs)
  ```
    from pyproj import Transformer
    transformer = Transformer.from_crs("EPSG:4326", "EPSG:25829")
    transformer.transform(42.45233096182118,-9)
  ```
  - (v.>=3.0.0) Transformation grids: https://pyproj4.github.io/pyproj/dev/transformation_grids.html
 - Shapely
 - Geopandas: https://geopandas.org/getting_started/install.html
 - plpygis https://plpygis.readthedocs.io/en/latest/usage.html
 - 
#### Tutorials:
- Automating GIS processes: [2018 Lesson 4: Point in polygon](https://automating-gis-processes.github.io/CSC18/lessons/L4/point-in-polygon.html) [2019 Lesson 3: Spatial join](https://automating-gis-processes.github.io/site/notebooks/L3/spatial-join.html)
- IBM developer: [Working with geospatial vector data uging Geopandas in Python](https://developer.ibm.com/tutorials/working-with-geospatial-vector-data-in-python/)
- University of Colorado, Earth Lab. [Earth Data Analytics Online Certificate](https://www.earthdatascience.org/workshops/gis-open-source-python/)   
Lesson 4. [GIS in Python: Introduction to Vector Format Spatial Data - Points, Lines and Polygons Spatial data open source python Workshop](https://www.earthdatascience.org/workshops/gis-open-source-python/intro-vector-data-python/)
[Get Started With GIS in Open Source Python - Geopandas, Rasterio & Matplotlib](https://www.earthdatascience.org/workshops/gis-open-source-python/)
- Introduction to Geospatial Raster and Vector Data with Python: [carpentries-incubator.github.io/geospatial-python](https://carpentries-incubator.github.io/geospatial-python/)
- [10 Essential Operations for Spatial Data in Python](https://medium.com/nam-r/10-essential-operations-for-spatial-data-in-python-4603d933bdda)
- [15 Python Libraries for GIS and Mapping - GIS Geography](https://gisgeography.com/python-libraries-gis-mapping/)
- [Walkthrough: Mapping GIS Data in Python | by Nicole Janeway Bills](https://towardsdatascience.com/walkthrough-mapping-gis-data-in-python-92c77cd2b87a)
- Datacamp.com tutorial: [Introduction to Geospatial Data in Python](https://www.datacamp.com/community/tutorials/geospatial-data-python)
- [Python Foundation for Spatial Analysis (Full Course Material)](https://courses.spatialthoughts.com/python-foundation.html)
- [In-Database Geospatial Analytics using Python](https://www.researchgate.net/publication/337411276_In-Database_Geospatial_Analytics_using_Python)  ([doi:10.1145/3356395.3365598](https://doi.org/10.1145/3356395.3365598)) Conference: the 2nd ACM SIGSPATIAL International Workshop
- A tool for extracting data from PostGIS into GeoJSON and TopoJSON: https://gist.github.com/jczaplew/7680118
- Google: [python geojson to postgis](https://www.google.com/search?q=python+geojson+to+postgis)
- 
### PROJ4:
- Grid transformations: https://github.com/OSGeo/PROJ-data/tree/master/es_ign
- Spatial reference: [EPSG projection 25829 (etrs89 / UTM zone 29N)](https://spatialreference.org/ref/epsg/25829/), [EPSG projection 23029 (ED50 / UTM zone 29N)](https://spatialreference.org/ref/epsg/23029/), [EPSG projection 4326 (WGS 84)](https://spatialreference.org/ref/epsg/4326/)
----------
## Specific problems:
### Nearest neighbor / minimum distance
- https://gis.stackexchange.com/questions/14456/finding-the-closest-geometry-in-postgis and derived functions by [George MacKerron](http://blog.mackerron.com/2011/03/postgis-nearest-neighbour/) and [BostonGIS](http://www.bostongis.com/?content_name=postgis_nearest_neighbor_generic)
- https://gis.stackexchange.com/questions/159225/postgis-closest-polygon-to-point (concellos SANT-Algae?)
- https://postgis.net/workshops/postgis-intro/knn.html
### GIS layers transformation:
- http://mapshaper.org lets you upload and convert layers using -proj and precision parameters
- Convert and reproject with ogr2ogr (shp file to geojson file WGS84): 
```
SET GDAL_DATA=C:\soft\sql\postgresql\postgis-bundle-pg96-2.5.0x32\gdal-data
C:\...\bin>ogr2ogr -f GeoJSON -t_srs EPSG:4236 C:\...\Parroquias.wgs84.geo.json  C:\...\Parroquias.shp
```
