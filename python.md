### File read/write:

Problems with line feeds in text files:
```Python
df['scientificname'] = df['scientificname'].str.replace(r'(?<!\r)\n','', regex=True) 
df["scientificname"] = df["scientificname"].apply(lambda x: pulir_pre_gnparser(x))

# #### ELIMINATE posible lines (bs4 imported) where we have line breaks 
#   LF (Line Feeds, \n) without a previous CR (Carriage Return, \r )
# So, every line should be ended by CRLF, without LF inside the line:
# in Notepad++ we should make Regex replace of this (and replace by NOTHING): (?<!\r)\n
# where (?<!x)y means finding the text "y" not preceded by "x"
# https://stackoverflow.com/questions/37160929/how-to-remove-carriage-return-in-a-dataframe
df['scientificname'] = df['scientificname'].str.replace(r'(?<!\r)\n','', regex=True) 

# #### SAVE THE FILE AS TAB DELIMITED, TO AVOID DOUBLE QUOTES (WHICH WOULD RAISE LATER PROBLEMS AS INPUT FOR gnparser):
# https://stackoverflow.com/questions/21147058/pandas-to-csv-output-quoting-issue/21147228#21147228
# https://stackoverflow.com/questions/55897894/pandas-to-csv-unable-to-set-quotes
df['scientificname'] = df['scientificname'].str.replace('"','') 
import csv
df["scientificname"].to_csv("gnparser_input.txt", sep ='\t', quoting = csv.QUOTE_NONE,escapechar="\\", index=False, header=False, encoding="utf-8")

listOfNames = "gnparser_input.txt"
```

### Pandas:

#### problems with NA integers:
You can't have blanks in integer columns.
The [lack of NaN rep in integer columns](https://stackoverflow.com/questions/21287624/convert-pandas-column-containing-nans-to-dtype-int/21290084#21290084) is a [pandas "gotcha"](https://pandas.pydata.org/pandas-docs/stable/user_guide/gotchas.html#support-for-integer-na). The usual workaround is to simply use floats.
- https://stackoverflow.com/questions/42403907/how-to-round-remove-traling-0-zeros-in-pandas-column
- https://stackoverflow.com/questions/46774069/python-remove-decimal-and-zero-from-string/46774118#46774118

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
# find rows where "rank"=="G" and update column "status" value to "pending":
df.loc[df["rank"]=="G", "status"]="pending"

# find rows where "rank"=="G" and "fam"=="Agavaceae":
df.loc[(df["rank"]=="G") & (df["fam"]=="Agavaceae")]

# find rows where "rank"=="G" and "fam"=="Agavaceae", and update their column "status" value to "OK":
df.loc[(df["rank"]=="G") & (df["fam"]=="Agavaceae"), "status"]="OK"

# update column with substring of own value: "BLA-01-02341" --> "2341" (from AHIM-gbif-check.py line 125)
# https://stackoverflow.com/questions/33604139/how-to-split-pandas-column-by-a-delimiter-and-select-preferred-element-as-the-re/33606147#33606147
df["catalogNumber"] = df["catalogNumber"].str.split('-').str[2].astype('int').astype('str')

# update full column to lowercase: 
# https://stackoverflow.com/questions/22245171/how-to-lowercase-a-pandas-dataframe-string-column-if-it-has-missing-values/22247593#22247593
df["name"] = df["name"].str.lower()

# add multiple columns to a dataframe:
# https://stackoverflow.com/questions/30926670/add-multiple-empty-columns-to-pandas-dataframe
df = pd.DataFrame([['a1','b1'], ['a2','b2']], columns=['A','B'])
print(df)
    A   B
0  a1  b1
1  a2  b2
df = pd.concat([df,pd.DataFrame(columns=list('BCD'))]) # if a column does exist, it's not added
print(df)
    A   B    C    D
0  a1  b1  NaN  NaN
1  a2  b2  NaN  NaN

# apply function to dataframe rows, to update one or many columns at once:
# https://towardsdatascience.com/apply-function-to-pandas-dataframe-rows-76df74165ee4
# v.dvd_gbif_functions.py line 650
def mgrs2latlon(mgrs=""):
	import pandas as pd
	if mgrs.strip()=="":
		return pd.Series([None,None,None])
	else:
		# do calculations ...
		return pd.Series([round(ll.lat,6), round(ll.lon,6), myradius])	
df[["lat", "lon","radius"]] = df.apply(lambda row: mgrs2latlon(row["mgrs"]), axis=1)

```
#### Substring matching:
https://towardsdatascience.com/joining-dataframes-by-substring-match-with-python-pandas-8fcde5b03933

#### Cross joins:
solutions here: https://github.com/pandas-dev/pandas/issues/41150 (duplic. issue)
main issue here: https://github.com/pandas-dev/pandas/issues/8962
PR tests here: https://github.com/pandas-dev/pandas/pull/42964

Examples (not only python):
https://towardsdatascience.com/tagged/cross-join

## Google Colab python notebooks:

https://stackoverflow.com/questions/53085501/how-to-upgrade-pandas-on-google-colab
https://stackoverflow.com/questions/57831187/need-to-restart-runtime-before-import-an-installed-package-in-colab/57839010#57839010

https://stackoverflow.com/questions/53154369/google-colab-how-to-restart-runtime-using-python-code-or-command-line-interf/53165687#53165687

https://stackoverflow.com/questions/55036559/how-to-autosave-notebooks-in-google-colab/69570529#69570529

https://stackoverflow.com/questions/55005114/restart-kernel-in-google-colab#comment96775342_55005114
https://stackoverflow.com/questions/57831187/need-to-restart-runtime-before-import-an-installed-package-in-colab
#### my notebooks:
Cross joins before range matching:
https://colab.research.google.com/drive/11WBMCTWx7B1lL0CNDy1fO99eNrBirtPl?authuser=2

