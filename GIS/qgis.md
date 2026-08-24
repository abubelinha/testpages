## Carga geometrías Catastro:

https://chatgpt.com/c/6a70ea97-86e0-83eb-a1f0-8938b913dc88

script completo, pensado para ejecutarlo desde la consola Python de QGIS 3.44, que hace esto:

- Tú haces un clic en el mapa.
- Usa ese punto en EPSG:4326.
- Calcula un recuadro aproximado de 100×100 m.
- Consulta el WFS INSPIRE del Catastro.
- Descarga únicamente BU.BuildingPart de esa zona.
- Añade el resultado como una capa temporal en QGIS.
- Después puedes seleccionar polígonos y copiarlos a tu GeoPackage.

No necesitas instalar nada.

#### 1) Abre la consola Python de QGIS

En QGIS: `Complementos → Consola de Python`

Se abrirá una ventana abajo.

Pulsa el botón de Mostrar editor (icono de hoja/lápiz) para pegar un bloque grande.


#### 2) Copia TODO este script y ejecútalo 
(o guárdalo desde la consola mediante `mostrar editor → guardar como` p.ej. _catastro-wfs-qgis.py_)

```
from qgis.core import (
    QgsProject,
    QgsVectorLayer,
    QgsCoordinateReferenceSystem,
    QgsCoordinateTransform,
    QgsPointXY,
    QgsMapLayerStyle
)

from qgis.gui import QgsMapToolEmitPoint

import math
import tempfile
import requests


WFS_URL = "https://ovc.catastro.meh.es/INSPIRE/wfsBU.aspx"
CAPA = "BU.BuildingPart"
RADIO = 50
estilo_catastro = None

# ESTA FUNCIÓN VA AQUÍ, FUERA DE LA CLASE
def eliminar_capa_anterior(nombre):
    for capa in list(QgsProject.instance().mapLayers().values()):
        if capa.name() == nombre:
            QgsProject.instance().removeMapLayer(capa.id())

class CatastroTool(QgsMapToolEmitPoint):

    def __init__(self, canvas):
        super().__init__(canvas)
        self.canvas = canvas


    def canvasReleaseEvent(self, event):

        # punto donde haces click
        p = self.toMapCoordinates(event.pos())


        # pasar a UTM 29N
        tr = QgsCoordinateTransform(
            QgsProject.instance().crs(),
            QgsCoordinateReferenceSystem("EPSG:25829"),
            QgsProject.instance()
        )

        p = tr.transform(p)

        print("UTM:", p.x(), p.y())


        xmin = p.x() - RADIO
        xmax = p.x() + RADIO
        ymin = p.y() - RADIO
        ymax = p.y() + RADIO


        params = {
            "service": "WFS",
            "version": "2.0.0",
            "request": "GetFeature",
            "typeNames": CAPA,
            "srsName": "EPSG:25829",
            "bbox":
                f"{xmin},{ymin},{xmax},{ymax},EPSG:25829",
            "outputFormat": "GML3"
        }


        print("Consultando Catastro...")

        r = requests.get(
            WFS_URL,
            params=params,
            timeout=60
        )


        print("HTTP:", r.status_code)

        if b"ExceptionReport" in r.content:
            print(r.text[:1000])
            return


        # guardar GML temporal
        f = tempfile.NamedTemporaryFile(
            suffix=".gml",
            delete=False
        )

        f.write(r.content)
        f.close()


        # abrir como GML 3.2
        capa = QgsVectorLayer(
            f.name,
            "Catastro_BuildingPart",
            "ogr"
        )


        if not capa.isValid():
            print("No se pudo abrir el GML")
            print(f.name)
            return
            
        if False: # cargarse capa anterior y crear nueva
            eliminar_capa_anterior("Catastro_BuildingPart")
            QgsProject.instance().addMapLayer(capa)
        else: # conservar estilo de capa anterior
            global estilo_catastro
            # recuperar estilo anterior
            for lyr in QgsProject.instance().mapLayers().values():
                if lyr.name() == "Catastro_BuildingPart":

                    estilo_catastro = QgsMapLayerStyle()
                    estilo_catastro.readFromLayer(lyr)

                    QgsProject.instance().removeMapLayer(lyr.id())
                    break
            # aplicar estilo guardado a la nueva capa
            if estilo_catastro is not None:
                estilo_catastro.writeToLayer(capa)
            QgsProject.instance().addMapLayer(capa)

        print(
            "Cargados:",
            capa.featureCount(),
            "BuildingParts"
        )


herramienta = CatastroTool(
    iface.mapCanvas()
)

iface.mapCanvas().setMapTool(herramienta)

print("Haz clic en el mapa")
```


#### 3) Uso

Después de ejecutarlo:

1. Cierra la consola si quieres.
2. Haz clic sobre el edificio/zona que te interesa.
3. Espera unos segundos.
4. Aparecerá una capa nueva:
_Catastro_BuildingPart_

... con los polígonos.

Luego:

1. Seleccionas los edificios que quieras.
2. Ctrl+C.
3. Seleccionas tu capa GeoPackage edificios.
4. Activas edición 🖉.
5. Ctrl+V.

#### 4) Explicaciones:
click → EPSG:4326 → transformación automática a EPSG:25829 → WFS Catastro → BuildingPart → QGIS  

Así carga algunos polígonos: ¿cómo puedes hacer click en ellos para copiarlos sin que al hacer click te vuelva a hacer una consulta a la api?

Sigues teniendo activa la herramienta de consulta al WFS (CatastroTool). 
Por eso cada clic en el mapa no selecciona entidades: 
interpreta el clic como una nueva petición al Catastro.

Tienes que desactivar esa herramienta y volver a la herramienta normal de selección:

1. En la barra superior de QGIS, activa: `Seleccionar entidades por clic` 
(icono habitual: una flecha/cursor sobre una capa).

   o desde menú: `Edición → Seleccionar entidades`  
   (si no aparece, está en la barra de herramientas de selección).

2. Ahora haz clic sobre un polígono de la capa: _Catastro_BuildingPart_ 
(Debería quedar resaltado en amarillo).

3. Copiar: `Ctrl + C`
4. Selecciona tu capa GeoPackage: `edificios`
5. Activa edición: `🖉 lápiz amarillo`
6. Pega: `Ctrl + V`

