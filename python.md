### Pandas:

#### updating dataframe rows:
```Python
from pandas import pd
df = pd.read_csv("mydata.csv")
# updating dataframes:

def df_update(dictline={"canonical":"name string", "field1":"value","field2":15}):
	# actualiza unha única fila do dataframe, cun diccionario de valores (un deles, fai de clave para localizar a fila)
	global df
	nome = dictline["canonical"]
	if len(df[df.canonical==nome])==0: # non existe o nome todavía
		# https://stackoverflow.com/questions/53317739/adding-value-to-only-a-single-column-in-pandas-dataframe/58280566#58280566
		print("ENGADIR '{}' en df".format(nome))
		df = df.append(dictline,ignore_index=True) 
	elif len(df[df.canonical==nome])==1: # hai unha liña que cumple o criterio e podemos actualizar
		# https://stackoverflow.com/questions/37675869/how-can-i-conditionally-update-multiple-columns-in-a-panda-dataframe
		print("ACTUALIZAR '{}' en df".format(nome))
		df.loc[df.canonical==nome, list(dictline.keys())] = list(dictline.values())
		pass
	else:
		print("ERROR: MULTIPLE ROWS WHERE 'canonical'=={}".format(nome))
	return(df)
```
#### updating dataframe columns:


```Python
# localiza filas onde "rank"=="G" e actualiza o valor da columna "status" co valor "pending":
df.loc[df["rank"]=="G", "status"]="pending"

# localiza filas onde "rank"=="G" e "fam"=="Agavaceae":
df.loc[(df["rank"]=="G") & (df["fam"]=="Agavaceae")]

# localiza filas onde "rank"=="G" e "fam"=="Agavaceae", e actualiza o seu vaor da columna "status" co valor "OK":
df.loc[(df["rank"]=="G") & (df["fam"]=="Agavaceae"), "status"]="OK"

# update column with substring of own value: "BLA-01-02341" --> "2341" (from AHIM-gbif-check.py line 126)
df["catalogNumber"] = df["catalogNumber"].str.split('-').str[2].astype('int').astype('str')

```

