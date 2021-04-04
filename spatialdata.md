# Spatial Data
### PostGIS
[Introduction to PostGIS](https://postgis.net/workshops/postgis-intro/) (workshop material by [Boundless](http://boundlessgeo.com/)): 
[Geometries](https://postgis.net/workshops/postgis-intro/geometries.html), [Projecting Data](https://postgis.net/workshops/postgis-intro/projection.html) and many more topics.
### R
- [Simple features for R](https://r-spatial.github.io/sf/index.html): [package](https://cloud.r-project.org/package=sf) + [github](https://github.com/r-spatial/sf/) + vignettes [1](https://r-spatial.github.io/sf/articles/sf1.html) [2](https://r-spatial.github.io/sf/articles/sf2.html) [3](https://r-spatial.github.io/sf/articles/sf3.html) [4](https://r-spatial.github.io/sf/articles/sf4.html) [5](https://r-spatial.github.io/sf/articles/sf5.html) [6](https://r-spatial.github.io/sf/articles/sf6.html) [7](https://r-spatial.github.io/sf/articles/sf7.html) + [article](https://journal.r-project.org/archive/2018/RJ-2018-009/index.html) & [PDF](https://journal.r-project.org/archive/2018/RJ-2018-009/RJ-2018-009.pdf)
- [Given a vector of coordinates, identify the polygon from a shapefile it falls into
](https://stackoverflow.com/questions/49290536/given-a-vector-of-coordinates-identify-the-polygon-from-a-shapefile-it-falls-in)
- [Intersecting Points and Polygons in R](https://stackoverflow.com/questions/3647744/intersecting-points-and-polygons-in-r)
- Disque funciona: [check if point is inside (multi)polygon/s](https://stackoverflow.com/questions/21971447/check-if-point-is-in-spatial-object-which-consists-of-multiple-polygons-holes/21987964#21987964) (also [plotting multipolygons](https://stackoverflow.com/questions/21962452/plot-spatial-area-defined-by-multiple-polygons/21963215#21963215) in R)
### Python

#### Packages:
- Pyproj:  
  - (v.>= 2.6.1) [create Transformer co convert from CRS to CRS](https://pyproj4.github.io/pyproj/v2.6.1rel/examples.html#step-2-create-transformer-to-convert-from-crs-to-crs)
  ```
    from pyproj import Transformer
    transformer = Transformer.from_crs("EPSG:4326", "EPSG:25829")
    transformer.transform(42.45233096182118,-9)
  ```
  - (v.>=3.0.0) Transformation grids: https://pyproj4.github.io/pyproj/dev/transformation_grids.html
#### Tutorials:
- Automating GIS processes: [2018 Lesson 4: Point in polygon](https://automating-gis-processes.github.io/CSC18/lessons/L4/point-in-polygon.html) [2019 Lesson 3: Spatial join](https://automating-gis-processes.github.io/site/notebooks/L3/spatial-join.html)
- IBM developer: [Working with geospatial vector data uging Geopandas in Python](https://developer.ibm.com/tutorials/working-with-geospatial-vector-data-in-python/)
- University of Colorado, Earth Lab. [Earth Data Analytics Online Certificate](https://www.earthdatascience.org/workshops/gis-open-source-python/)   
Lesson 4. [GIS in Python: Introduction to Vector Format Spatial Data - Points, Lines and Polygons Spatial data open source python Workshop](https://www.earthdatascience.org/workshops/gis-open-source-python/intro-vector-data-python/)
### PROJ4:
- Grid transformations: https://github.com/OSGeo/PROJ-data/tree/master/es_ign
- Spatial reference: [epsg projection 25829 - etrs89 / utm zone 29n](https://spatialreference.org/ref/epsg/25829/), [epsg projection 23029 - ed50 / utm zone 29n](https://spatialreference.org/ref/epsg/23029/), [epsg projection 4326 - wgs 84](https://spatialreference.org/ref/epsg/4326/)
