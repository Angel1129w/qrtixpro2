const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(`Asistente QRTIXPRO: ${message}`);
    const response = await result.response;
    const text = response.text();

    // Procesar y sanitizar la respuesta antes de enviarla
    const sanitizedText = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

    // Construir y validar el objeto de respuesta
    const responseObject = {
      success: true,
      response: sanitizedText
    };

    // Verificar que la respuesta sea JSON válido
    JSON.stringify(responseObject);

    return res.status(200).json(responseObject);
  } catch (error) {
    console.error('Error en el chat de Gemini:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al procesar la solicitud',
      details: error.message
    });
  }
});

module.exports = router;
