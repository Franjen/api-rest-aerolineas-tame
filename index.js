const express = require("express");
const cors = require("cors");

const app = express();

// Puerto local o asignado automáticamente por Render
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// ===============================
// BASE DE DATOS TEMPORAL
// ===============================

let aerolineas = [
  {
    id: 1,
    codigo: "TA",
    nombre: "TAME",
    pais: "Ecuador"
  },
  {
    id: 2,
    codigo: "AV",
    nombre: "Avianca",
    pais: "Colombia"
  },
  {
    id: 3,
    codigo: "LA",
    nombre: "LATAM",
    pais: "Chile"
  }
];

// ===============================
// RUTA PRINCIPAL
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    servicio: "API REST de Aerolíneas",
    estado: "Activo",
    mensaje: "API desplegada correctamente"
  });
});

// ===============================
// OBTENER TODAS LAS AEROLÍNEAS
// ===============================

app.get("/api/aerolineas", (req, res) => {
  res.status(200).json({
    cantidad: aerolineas.length,
    data: aerolineas
  });
});

// ===============================
// OBTENER AEROLÍNEA POR CÓDIGO
// ===============================

app.get("/api/aerolineas/codigo/:codigo", (req, res) => {
  const codigo = req.params.codigo.toUpperCase();

  const aerolinea = aerolineas.find(
    (a) => a.codigo.toUpperCase() === codigo
  );

  if (!aerolinea) {
    return res.status(404).json({
      mensaje: "Aerolínea no encontrada"
    });
  }

  res.status(200).json(aerolinea);
});

// ===============================
// OBTENER AEROLÍNEA POR ID
// ===============================

app.get("/api/aerolineas/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const aerolinea = aerolineas.find((a) => a.id === id);

  if (!aerolinea) {
    return res.status(404).json({
      mensaje: "Aerolínea no encontrada"
    });
  }

  res.status(200).json(aerolinea);
});

// ===============================
// REGISTRAR NUEVA AEROLÍNEA
// ===============================

app.post("/api/aerolineas", (req, res) => {
  const { codigo, nombre, pais } = req.body;

  if (!codigo || !nombre || !pais) {
    return res.status(400).json({
      mensaje: "Código, nombre y país son obligatorios"
    });
  }

  const codigoExiste = aerolineas.find(
    (a) => a.codigo.toUpperCase() === codigo.toUpperCase()
  );

  if (codigoExiste) {
    return res.status(400).json({
      mensaje: "El código de la aerolínea ya existe"
    });
  }

  const nuevaAerolinea = {
    id:
      aerolineas.length > 0
        ? Math.max(...aerolineas.map((a) => a.id)) + 1
        : 1,
    codigo: codigo.toUpperCase(),
    nombre,
    pais
  };

  aerolineas.push(nuevaAerolinea);

  res.status(201).json({
    mensaje: "Aerolínea registrada correctamente",
    data: nuevaAerolinea
  });
});

// ===============================
// ACTUALIZAR AEROLÍNEA
// ===============================

app.put("/api/aerolineas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { codigo, nombre, pais } = req.body;

  const indice = aerolineas.findIndex((a) => a.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Aerolínea no encontrada"
    });
  }

  aerolineas[indice] = {
    ...aerolineas[indice],
    codigo: codigo
      ? codigo.toUpperCase()
      : aerolineas[indice].codigo,
    nombre: nombre || aerolineas[indice].nombre,
    pais: pais || aerolineas[indice].pais
  };

  res.status(200).json({
    mensaje: "Aerolínea actualizada correctamente",
    data: aerolineas[indice]
  });
});

// ===============================
// ELIMINAR AEROLÍNEA
// ===============================

app.delete("/api/aerolineas/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const indice = aerolineas.findIndex((a) => a.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Aerolínea no encontrada"
    });
  }

  const aerolineaEliminada = aerolineas[indice];

  aerolineas.splice(indice, 1);

  res.status(200).json({
    mensaje: "Aerolínea eliminada correctamente",
    data: aerolineaEliminada
  });
});

// ===============================
// RUTA NO ENCONTRADA
// ===============================

app.use((req, res) => {
  res.status(404).json({
    mensaje: "Endpoint no encontrado"
  });
});

// ===============================
// INICIAR SERVIDOR
// ===============================

app.listen(PORT, () => {
  console.log("======================================");
  console.log("API REST de Aerolíneas iniciada");
  console.log(`Puerto: ${PORT}`);
  console.log(`URL local: http://localhost:${PORT}`);
  console.log("======================================");
});