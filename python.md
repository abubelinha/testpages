### Pandas:
```Python
from pandas import pd
df = pd.read_csv("mydata.csv")
# updating dataframes:

def df_update(dictline={"canonical":"name string", "field1":"value","field2":15}):
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
