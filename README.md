# Nodo

Ejemplos de uso de Node.js

Para ejecutar un archivo ejecute el comando:
```
$ node archivo
```
Para mantener ejecutado un archivo y se vuelva a ejecutar cada que se modifique

```
$ sudo npm install -g nodemon
```

y simplemente corra el archivo con el comando nodemon en vez de node
```
$ nodemon archivo
```

si quieren que se tome en cuenta algunos archivos en particular cuando se modifiquen pongan el argumento `-e` y los formatos en los que se fije
```
$ nodemon archivo -e js,hbs,htm,css
```