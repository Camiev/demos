import pandas as pd
readed = pd.read_csv('table.csv', sep=';', index_col=0)
print(readed)