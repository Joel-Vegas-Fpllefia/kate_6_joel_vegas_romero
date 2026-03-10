import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema(
  {
    contenido: {
      type: String,
      required: [true, "El contenido del comentario es obligatorio"],
      trim: true,
      maxlength: [500, "El comentario no puede exceder los 500 caracteres"],
    },
    autor: {
      type: String, // O mongoose.Schema.Types.ObjectId si usas un modelo de Usuario
      required: [true, "El autor es obligatorio"],
      trim: true,
    },
    puntuacion: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    aprobado: {
      type: Boolean,
      default: false, // Útil para moderación previa
    },
    entidadId: {
      type: mongoose.Schema.Types.ObjectId, // ID del post, producto o alumno al que pertenece
      required: [true, "El ID de la entidad relacionada es obligatorio"],
      ref: "Alumno", // Ejemplo: si el comentario es sobre un alumno
    },
  },
  {
    timestamps: true, // Crea automáticamente createdAt y updatedAt
  },
);

// Índices para optimizar la carga de comentarios por entidad y búsquedas de texto
comentarioSchema.index({ entidadId: 1 });
comentarioSchema.index({ contenido: "text" });

const Comentario = mongoose.model("Comentario", comentarioSchema);

export default Comentario;
