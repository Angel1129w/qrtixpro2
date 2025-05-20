const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Función para formatear el contexto de ventas
const formatearContextoVentas = (historialVentas) => {
  return historialVentas.map(venta => {
    return `Venta: ${venta.nombre} | Zona: ${venta.zona} | Total: $${venta.total} | Fecha: ${venta.fecha}`;
  }).join('\n');
};

// Asistente de Ventas
router.post('/asistente-ventas', async (req, res) => {
  try {
    const { consulta, historialVentas } = req.body;
    
    if (!consulta) {
      return res.status(400).json({ error: 'La consulta es requerida' });
    }

    const contextoVentas = historialVentas ? formatearContextoVentas(historialVentas) : '';
    
    const prompt = `Como asistente de ventas de QRTIXPRO, analiza la siguiente información y responde la consulta.\n\nHistorial de Ventas:\n${contextoVentas}\n\nConsulta: ${consulta}\n\nPor favor, proporciona un análisis detallado y recomendaciones basadas en los datos disponibles.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const sanitizedText = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

    return res.status(200).json({
      success: true,
      response: sanitizedText
    });
  } catch (error) {
    console.error('Error en el asistente de ventas:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al procesar la consulta',
      details: error.message
    });
  }
});

// Recomendaciones personalizadas
router.post('/recomendaciones', async (req, res) => {
  try {
    const { usuario, historialVentas } = req.body;

    if (!usuario || !historialVentas) {
      return res.status(400).json({ error: 'Se requiere información del usuario e historial de ventas' });
    }

    const contexto = `\nUsuario: ${usuario.nombre}\nZona: ${usuario.zona}\n\nHistorial de Ventas:\n${formatearContextoVentas(historialVentas)}`;

    const prompt = `Como asistente de QRTIXPRO, genera recomendaciones personalizadas basadas en el siguiente contexto:${contexto}\n\nPor favor, proporciona recomendaciones específicas para mejorar las ventas en la zona del usuario y estrategias personalizadas basadas en su historial.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const sanitizedText = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

    return res.status(200).json({
      success: true,
      recommendations: sanitizedText
    });
  } catch (error) {
    console.error('Error al generar recomendaciones:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al generar recomendaciones',
      details: error.message
    });
  }
});

// Análisis de feedback
router.post('/analizar-feedback', async (req, res) => {
  try {
    const { feedback, contextoVentas } = req.body;

    if (!feedback) {
      return res.status(400).json({ error: 'Se requiere el feedback para análisis' });
    }

    const prompt = `Como analista de QRTIXPRO, analiza el siguiente feedback y proporciona insights accionables:\n\nFeedback:\n${feedback}\n\nContexto de Ventas:\n${contextoVentas || 'No hay contexto adicional'}\n\nPor favor, identifica patrones, áreas de mejora y recomendaciones específicas.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const sanitizedText = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

    return res.status(200).json({
      success: true,
      analysis: sanitizedText
    });
  } catch (error) {
    console.error('Error al analizar feedback:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al analizar feedback',
      details: error.message
    });
  }
});

module.exports = router;