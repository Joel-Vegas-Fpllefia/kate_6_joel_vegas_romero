import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import alumnosRoutes from "./routes/alumnos.routes.js";
import comentarioRoutes from "./routes/comentario.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// --- Middleware ---
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Rutas ---

// Ruta de bienvenida única con todos los endpoints listados
app.get("/", (req, res) => {
  res.json({
    message: "API de Gestión Escolar",
    version: "1.0.0",
    endpoints: {
      alumnos: "/api/alumnos",
      comentarios: "/api/comentarios",
    },
  });
});

// Registro de routers
app.use("/api/alumnos", alumnosRoutes);
app.use("/api/comentarios", comentarioRoutes);

// --- Manejo de errores ---

// 404 - Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// 500 - Error interno del servidor
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Error interno del servidor",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// --- Iniciar servidor ---
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
