  // Importamos Express y la función json para procesar cuerpos de solicitud en formato JSON
import  { json } from 'express';

  // Middleware para procesar cuerpos JSON en las solicitudes
  export const jsonBodyParser = json()