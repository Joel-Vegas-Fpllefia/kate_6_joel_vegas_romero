const mongoose = require("mongoose");

const alumnoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    apellidos: {
      type: String,
      required: [true, "Los apellidos son obligatorios"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    curso: {
      type: String,
      required: [true, "El curso es obligatorio"],
      enum: ["DAW", "SMX", "ARI", "IEA"],
    },
    urlImagen: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    strict: false, // Permite campos adicionales
  },
);

// Índices para mejorar las búsquedas
alumnoSchema.index({ curso: 1 });
alumnoSchema.index({ nombre: "text", apellidos: "text" });

const Alumno = mongoose.model("Alumno", alumnoSchema);

module.exports = Alumno;
