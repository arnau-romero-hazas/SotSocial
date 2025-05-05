# MÉTODOS HTML

## GET (Obtener datos): 
### Recuperar información del servidor.
#### EJEMPLO:
```sh 
api.get('/users', (req, res) => {
res.json({ message: 'Lista de usuarios' });
});
```


## POST (Crear datos):
###  Enviar datos al servidor y crear un nuevo recurso.
#### EJEMPLO:
```sh
api.post('/users', (req, res) => {
const { name, age } = req.body;
res.json({ message: 'Usuario creado', user: { name, age } });
});
```

## PUT (Actualizar datos): 
### Se usa para actualizar un recurso existente.
#### EJEMPLO:
```sh
api.put('/users/:id', (req, res) => {
const { id } = req.params;
const { name, age } = req.body;
res.json({ message: Usuario con ID ${id} actualizado, user: { name, age } });
});
```

## PATCH(Actualizar parcialmente):
### Se usa para actualizar solo algunos campos de un recurso.
#### EJEMPLO:
```sh
api.patch('/users/:id', (req, res) => {
const { id } = req.params;
const updates = req.body;
res.json({ message: Usuario con ID ${id} actualizado parcialmente, updates });
});
 ```

## DELETE (Eliminar datos): 
### Se usa para eliminar un recurso.
#### EJEMPLO:
```sh
api.delete('/users/:id', (req, res) => {
const { id } = req.params;
res.json({ message: Usuario con ID ${id} eliminado });
});
```