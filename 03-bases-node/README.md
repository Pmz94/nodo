## Generador de tablas de multiplicar

Listar en la consola o crear un archivo con las tablas de multiplicar especificadas

Primero instalar los paquetes de nodo con el comando:

```
npm install
```

Para mostrar la tabla del 2 en la consola:
```
/03-bases-node$ node app listar -b 2
```
Para mostrar la tabla del 2 pero hasta el 2 * 5:
```
/03-bases-node$ node app listar -b 2 -l 5
```
Para guardar en un archivo txt la tabla del 3 pero hasta el 3 * 7:
```
/03-bases-node$ node app crear -b 3 -l 7
```
Los archivos se guardaran en la carpeta tablas con el nombre "table-[numero base]_lim-[numero limite].txt"