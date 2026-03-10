import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Por favor, define la variable MONGODB_URI en tu archivo .env",
  );
}

const migrate = async () => {
  try {
    await connectDB();
    console.log("Conectado a MongoDB");

    // Obtener todos los alumnos
    const alumnos = await mongoose.connection
      .collection("alumnos")
      .find({})
      .toArray();
    console.log(`Encontrados ${alumnos.length} alumnos`);

    for (const alumno of alumnos) {
      if (alumno.promocion && !alumno.email) {
        // Migrar promocion a email
        await mongoose.connection.collection("alumnos").updateOne(
          { _id: alumno._id },
          {
            $set: { email: alumno.promocion, curso: alumno.ciclo },
            $unset: { promocion: 1, ciclo: 1 },
          },
        );
        console.log(`Migrado alumno ${alumno._id}`);
      }
    }

    console.log("Migración completada");
    process.exit(0);
  } catch (error) {
    console.error("Error en migración:", error);
    process.exit(1);
  }
};

migrate();
