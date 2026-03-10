import SelectorPromocion from "./SelectorPromocion";
import SelectorCursos from "./SelectorCursos";
import { useState } from "react";

function FormularioAlumno({
  mode,
  alumno,
  ciclos_formativos,
  setFpEstado,
  promciones,
  setPromocionesState,
  add_user,
  editar_user,
}) {
  const [name_edit, setNameEdit] = useState(() => {
    if (mode === "editar") {
      return alumno[0].nombre;
    } else {
      return "";
    }
  });
  const [cognom_edit, setCognomEdit] = useState(() => {
    if (mode === "editar") {
      return alumno[0].apellidos;
    } else {
      return "";
    }
  });
  const [email_edit, setEmailEdit] = useState(() => {
    if (mode === "editar") {
      return alumno[0].email;
    } else {
      return "";
    }
  });
  const [curso_edit, setCursoEdit] = useState(() => {
    if (mode === "editar") {
      return alumno[0].curso;
    } else {
      return "";
    }
  });
  const [url_img, setImg] = useState(() => {
    if (mode === "editar") {
      return alumno[0].urlImagen;
    } else {
      return "";
    }
  });

  function crear(event) {
    event.preventDefault();
    add_user(name_edit, cognom_edit, email_edit, curso_edit, url_img);
  }

  function editar(event) {
    event.preventDefault();
    editar_user(name_edit, cognom_edit, email_edit, curso_edit, url_img, alumno[0]._id);
  }

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
          {mode === "editar" ? "Editar Alumno" : "Crear Nuevo Alumno"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Nombre */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600 ml-1">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Nom"
              value={name_edit}
              onChange={(event) => setNameEdit(event.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-black"
            />
          </div>

          {/* Apellidos */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600 ml-1">
              Apellidos
            </label>
            <input
              type="text"
              placeholder="Cognoms"
              value={cognom_edit}
              onChange={(event) => setCognomEdit(event.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-black"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600 ml-1">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email_edit}
              onChange={(event) => setEmailEdit(event.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-black"
            />
          </div>

          {/* Curso */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600 ml-1">
              Curso
            </label>
            <select
              value={curso_edit}
              onChange={(event) => setCursoEdit(event.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-black"
            >
              <option value="">Seleccionar Curso</option>
              <option value="DAW">DAW</option>
              <option value="SMX">SMX</option>
              <option value="ARI">ARI</option>
              <option value="IEA">IEA</option>
            </select>
          </div>

          {/* Imagen de Perfil */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-semibold text-gray-600 ml-1">
              URL Imagen de Perfil
            </label>
            <input
              type="text"
              placeholder="https://ejemplo.com/foto.jpg"
              value={url_img}
              onChange={(event) => setImg(event.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-black"
            />
          </div>

          {/* Botones de Acción */}
          <div className="md:col-span-2 mt-4">
            {mode === "editar" && (
              <button
                onClick={(event) => editar(event)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
              >
                Guardar Cambios
              </button>
            )}

            {mode !== "editar" && (
              <button
                onClick={(event) => crear(event)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
              >
                Añadir Usuario
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FormularioAlumno;
