import pandas as pd
import numpy as np
from openskill import Rating, rate
from openskill.models import BradleyTerryFull
import re

rating=np.ones(15000)*25
incerteza=np.ones(15000)*8.3333
names=np.chararray(15000, itemsize=100, unicode=True)
present=np.zeros(15000)
places = np.arange(1,15001)

tabela=pd.read_pickle('good.pkl')
tabela["Data"]=pd.to_datetime(tabela["Data"], utc=True, errors='coerce', infer_datetime_format=True)
tabela['Data'] = tabela['Data'].astype('datetime64[ns]')
tabela=tabela.sort_values(by="Data")
tabela=tabela[pd.notnull(tabela["Data"])]
tabela=tabela[tabela.Data < "2023-01-01"] #ano-mes-dia

for index, row in tabela.iterrows():
    playerA=int(row["Lic_1"])
    playerB=int(row["Lic_2"])
    score=row['Resultado']
    score = re.findall("\d+", score)
    pointsA=int(score[0])
    pointsB=int(score[1])
    [[[rating[playerA],incerteza[playerA]]],[[rating[playerB],incerteza[playerB]]]]=rate([[Rating(rating[playerA],incerteza[playerA])],[Rating(rating[playerB],incerteza[playerB])]],score=[pointsA,pointsB], model=BradleyTerryFull)
    names[int(row["Lic_1"])]=row["Visitado"]
    names[int(row["Lic_2"])]=row["Visitante"]
    present[int(row["Lic_1"])]=1
    present[int(row["Lic_2"])]=1

rating=np.multiply(rating, present)
rating=np.around(rating, decimals =1)
incerteza=np.around(incerteza, decimals =1)
df = pd.DataFrame({"Posição": places, "Nome": names, "Rating": rating, "Jogador 1":np.linspace(0,14999,len(rating), dtype=int), "Jogador 2":np.linspace(0,14999,len(rating), dtype=int), "Incerteza":incerteza, "Licença FPB":np.linspace(0,14999,len(rating), dtype=int)})
#df.to_csv("ranking.csv", index=False)
df2 = pd.DataFrame({"Licença FPB":np.linspace(0,14999,len(rating), dtype=int), "Nome": names})
df2.to_json("geral.json", orient="values")
df=df.sort_values(by='Rating', ascending=False)
df=df[df.Nome != '']
df.reset_index(drop=True, inplace=True)
df["Posição"]=np.arange(1,len(df["Posição"])+1)
df["Nome"] = '<a href="http://bilhar.top/jogador?fpb=' + df["Licença FPB"].astype(str) + '">' + df["Nome"].astype(str) + "</a>"
df["Licença FPB"]=df["Licença FPB"].apply(lambda x: '<a href="https://portalbilhar.pt/Publico/Publico_Atleta.aspx?Atl={0}">{0}</a>'.format(x))
#df.to_json("geral.json", orient="values")   
#with open("geral.json", "r+") as f:
#     old = f.read()
#     f.seek(0)
#     f.write('{"data":' + old + "}")
histograma, bins = np.histogram(rating[np.where(names!='')], bins=10)
a1 = bins[0:-1].astype("int").astype("str")
a2 = bins[1:].astype("int").astype("str")
lista = []
for i in range(len(a1)):
    lista.append(str(a1[i])+" a "+str(a2[i]))
lista = np.array(lista)
dff = pd.DataFrame({"bins":lista, "histo": histograma})
dff.to_json("ets/geral.json", orient="columns")
#for row in c.fetchall():
#    print (row)
#df.to_html("asd.html")
#tabela.to_csv("ada1324.csv")