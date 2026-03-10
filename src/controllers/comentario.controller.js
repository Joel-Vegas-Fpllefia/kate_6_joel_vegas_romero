import comentarioSchema from "../models/Comentario.js";

/**
 * Obtener todos los alumnos
 */
export const getAllComentarios = async (req, res) => {
  try {
    const comentario = await comentarioSchema.find().sort({ createdAt: -1 });
    res.json(comentario);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener de los comentarios",
      message: error.message,
    });
  }
};
