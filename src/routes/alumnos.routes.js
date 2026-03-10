const express = require('express');
const {
  getAllAlumnos,
  getAlumnoById,
  createAlumno,
  updateAlumno,
  deleteAlumno,
  getAlumnosByPromocion,
  searchAlumnos,
} = require('../controllers/alumnos.controller.js');

const router = express.Router();

// Ruta de búsqueda (debe ir antes de /:id para evitar conflictos)
router.get('/buscar', searchAlumnos);

// Ruta de promoción (debe ir antes de /:id)
router.get('/promocion/:promocion', getAlumnosByPromocion);

// Rutas CRUD
router.get('/', getAllAlumnos);
router.get('/:id', getAlumnoById);
router.post('/', createAlumno);
router.put('/:id', updateAlumno);
router.delete('/:id', deleteAlumno);

module.exports = router;

