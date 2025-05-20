const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const geminiRoutes = require('./routes/gemini');
const ventasAssistantRoutes = require('./routes/ventasAssistant');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de Gemini AI
app.use('/api/gemini', geminiRoutes);

// Rutas del Asistente de Ventas
app.use('/api/ventas-assistant', ventasAssistantRoutes);

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
  .catch(err => console.error('❌ Error conectando a MongoDB Atlas:', err));

// Conexión a MongoDB Local
const localMongoose = new mongoose.Mongoose();
localMongoose.connect(process.env.MONGO_URI_LOCAL)
  .then(() => console.log('✅ Conexión exitosa a MongoDB Local'))
  .catch(err => console.log('⚠️ MongoDB Local no disponible:', err));

// Esquema de Venta
const ventaSchema = new mongoose.Schema({
  nombre: String,
  cedula: String,
  telefono: String,
  direccion: String,
  correo: String,
  zona: String,
  cantidad: Number,
  total: Number,
  fecha: Date,
  estado: String
});

const Venta = mongoose.model('Venta', ventaSchema);
const VentaLocal = localMongoose.model('Venta', ventaSchema);

// Endpoint para crear una venta
app.post('/ventas', async (req, res) => {
  try {
    // Crear venta en MongoDB Atlas
    const ventaAtlas = new Venta(req.body);
    await ventaAtlas.save();
    console.log('✅ Venta guardada en MongoDB Atlas');

    try {
      // Intentar guardar en MongoDB Local
      const ventaLocal = new VentaLocal(req.body);
      await ventaLocal.save();
      console.log('✅ Venta guardada en MongoDB Local');
    } catch (localErr) {
      console.log('⚠️ No se pudo guardar la venta en MongoDB Local:', localErr);
    }

    res.status(201).json({ message: 'Venta creada exitosamente', venta: ventaAtlas });
  } catch (err) {
    console.error('❌ Error al crear la venta:', err);
    res.status(500).json({ message: 'Error al procesar la venta' });
  }
});

// Puerto del servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});