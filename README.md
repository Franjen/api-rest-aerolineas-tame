# API REST de Aerolíneas - TAME

API REST desarrollada como parte de la asignatura Aplicaciones Distribuidas.

## Descripción

El servicio permite gestionar información de aerolíneas mediante operaciones REST y puede ser consumido desde aplicaciones web, móviles u otros sistemas.

## Tecnologías utilizadas

- Node.js
- Express.js
- CORS
- Git
- GitHub
- Render

## Endpoints

### Ruta principal
GET /

### Consultar todas las aerolíneas
GET /api/aerolineas

### Consultar aerolínea por ID
GET /api/aerolineas/:id

### Consultar aerolínea por código
GET /api/aerolineas/codigo/:codigo

### Registrar aerolínea
POST /api/aerolineas

### Actualizar aerolínea
PUT /api/aerolineas/:id

### Eliminar aerolínea
DELETE /api/aerolineas/:id

## Ejecución local

Instalar dependencias:

npm install

Iniciar el servidor:

npm start

Servidor local:

http://localhost:3001