import express from "express";
import { getAllComentarios } from "../controllers/comentario.controller.js";

const router = express.Router();

// Rutas CRUD
router.get("/", getAllComentarios);

export default router;
