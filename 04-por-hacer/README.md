## CRUD de tareas por hacer

Crear, listar, actualizar y borrar tareas por hacer.

Primero instalar los paquetes de nodo con el comando:

```
npm install
```

Luego crear el archivo data.json en la carpeta db

Para crear una tarea:
```
/04-por-hacer$ node app crear -d "Tarea 1"
```
Para ver todas las tareas:
```
/04-por-hacer$ node app listar
```
Para actualizar una tarea a completada:
```
/04-por-hacer$ node app actualizar -d "Tarea 1"
```
o para cambiar la tarea a incompleta:
```
/04-por-hacer$ node app actualizar -d "Tarea 1" -c false
```
Para borrar una tarea:
```
/04-por-hacer$ node app borrar -d "Tarea 1"
```