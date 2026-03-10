import { use, useEffect, useState } from "react";
import "./App.css";

// JSON
import alumnos from "./data/alumnos.json";
import promciones from "./data/promociones.json";
import fp from "./data/ciclos_formativos.json";
import admin_users from "./data/admin_users.json";
// Componentes
import SelectorCursos from "./components/SelectorCursos";
import SelectorPromocion from "./components/SelectorPromocion";
import FiltroNombre from "./components/FiltroNombre";
import Alumno from "./components/Alumno";
import Login from "./components/Login";
import FormularioAlumno from "./components/FormularioAlumno";

function App() {
  // UseStates
  const [fp_estado, setFpEstado] = useState("");
  const [promciones_estate, setPromocionesState] = useState("");
  const [search_user_estate, setSearchUserState] = useState("");
  const [esAdmin, setStateAdmin] = useState(() => {
    const guardado = localStorage.getItem("sesion_admin");
    return guardado === "true";
  });
  const [usuarioLogueado, setUsuarioLogueadoStatus] = useState(() => {
    const log_succes = localStorage.getItem("user_log");
    return log_succes === "true";
  });
  const [form_open, setFormOpen] = useState("");
  const [user_edit, setUserEdit] = useState("");

  // Estado para la lista de alumnos, inicializado vacío
  const [students_state, setStudentsState] = useState([]);

  // Función para cargar alumnos desde la API
  const loadAlumnos = async () => {
    try {
      const response = await fetch('/api/alumnos');
      if (!response.ok) {
        let errorMessage = `Error al cargar alumnos: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage += ` - ${errorData.error || errorData.message || 'Sin detalles'}`;
        } catch (e) {
          // Si no puede parsear JSON, usar el mensaje básico
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setStudentsState(data);
    } catch (error) {
      console.error("Error cargando alumnos:", error);
      alert("Error al cargar alumnos: " + error.message);
    }
  };

  // Carga inicial de alumnos
  useEffect(() => {
    loadAlumnos();
  }, []);

  // INVESTIGAR CODIGO (FILTRO DE CURSO Y NOMBRE)
  const alumnos_filtrados = students_state.filter((alumno) => {
    // Si no hay filtro, pasa (true). Si hay filtro, comprueba si coincide.
    const cumpleFp = fp_estado === "" || alumno.curso === fp_estado;
    const cumpleNombre =
      search_user_estate === "" ||
      (alumno.nombre + " " + alumno.apellidos)
        .toLowerCase()
        .includes(search_user_estate.toLowerCase());
    return cumpleFp && cumpleNombre;
  });

  // Validamos que el usuario sea admin
  function onLogin(name_user, passwd_user) {
    let user_log = false;

    if (name_user != "" && passwd_user != "") {
      admin_users.map((user_admin) => {
        if (
          name_user === user_admin.usuario &&
          passwd_user === user_admin.password
        ) {
          setStateAdmin(true);
          setUsuarioLogueadoStatus(true);
          user_log = true;
          localStorage.setItem("sesion_admin", "true");
          localStorage.setItem("user_log", "true");
        }
      });
      if (!user_log) {
        mensageError("Usuario o Contraseña Incorrectos");
      }
    } else {
      if (name_user === "" && passwd_user === "") {
        mensageError("Campos Vacios");
      } else {
        if (!passwd_user) {
          mensageError("Campo Password vacio");
        } else {
          mensageError("Campo Usuario vacio");
        }
      }
    }
  }
  function mensageError(mesage) {
    alert("Error: " + mesage);
  }

  // Eliminar Usuario
  async function delete_user(alumnoId) {
    try {
      const response = await fetch(
        `/api/alumnos/${alumnoId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error("Error al eliminar alumno");
      }
      // Recargar la lista después de eliminar
      await loadAlumnos();
    } catch (error) {
      console.error("Error eliminando alumno:", error);
      alert("Error al eliminar alumno: " + error.message);
    }
  }
  // Editar Usuario
  function onEdit(alumnoId) {
    const usuarioFiltrado = students_state.filter(
      (alumno_edit) => alumno_edit._id === alumnoId,
    );
    setUserEdit(usuarioFiltrado);
    setFormOpen("editar");
  }

  // Añadimos Usuario
  async function add_user(
    name_edit,
    cognom_edit,
    email_edit,
    curso_edit,
    url_img,
  ) {
    try {
      const newUser = {
        nombre: name_edit,
        apellidos: cognom_edit,
        email: email_edit,
        curso: curso_edit,
        urlImagen: url_img,
      };
      const response = await fetch('/api/alumnos', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Error al añadir alumno");
      }
      // Recargar la lista después de añadir
      await loadAlumnos();
      setFormOpen("");
      setFpEstado("");
    } catch (error) {
      console.error("Error añadiendo alumno:", error);
      alert("Error al añadir alumno: " + error.message);
    }
  }

  // Editamos Usuario
  async function editar_user(
    name_edit,
    cognom_edit,
    email_edit,
    curso_edit,
    url_img,
    user_id,
  ) {
    try {
      const updatedUser = {
        nombre: name_edit,
        apellidos: cognom_edit,
        email: email_edit,
        curso: curso_edit,
        urlImagen: url_img,
      };
      const response = await fetch(
        `/api/alumnos/${user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        },
      );
      if (!response.ok) {
        throw new Error("Error al editar alumno");
      }
      // Recargar la lista después de editar
      await loadAlumnos();
      setFormOpen("");
      setFpEstado("");
    } catch (error) {
      console.error("Error editando alumno:", error);
      alert("Error al editar alumno: " + error.message);
    }
  }

  // HABILITAR COMPONENTE CREAR ALUMNO
  function visble_form_create() {
    setFormOpen("crear");
  }
  return (
    <>
      {!usuarioLogueado && <Login onLogin={onLogin}></Login>}
      {/* Si el usuario ha sido logueado mostrara la pagina principal */}
      {usuarioLogueado && (
        <div>
          {!form_open && (
            <div>
              {/*Mostramos el Select con todas los ciclos formativos en contrados en el JSON/DB */}
              <SelectorCursos
                ciclos_formativos={fp}
                setFpEstado={setFpEstado}
              ></SelectorCursos>

              {/* Mostramos las promociones */}
              <SelectorPromocion
                promciones={promciones}
                setPromocionesState={setPromocionesState}
              ></SelectorPromocion>
            </div>
          )}

          <div>
            <div>
              {/* Permitimos al Usuario buscar al alumno mediante un browser */}
              {!form_open && (
                <FiltroNombre
                  setSearchUserState={setSearchUserState}
                ></FiltroNombre>
              )}

              {!form_open && (
                <div>
                  <button
                    onClick={visble_form_create}
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95 active:transform"
                  >
                    {/* Icono de "+" opcional para que se vea más profesional */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Añadir Usuario
                  </button>
                </div>
              )}

              {!form_open && (
                <Alumno
                  alumnos={alumnos_filtrados}
                  esAdmin={esAdmin}
                  delete_user={delete_user}
                  onEdit={onEdit}
                ></Alumno>
              )}

              {form_open && (
                <FormularioAlumno
                  mode={form_open}
                  alumno={user_edit}
                  ciclos_formativos={fp}
                  setFpEstado={setFpEstado}
                  promciones={promciones}
                  setPromocionesState={setPromocionesState}
                  add_user={add_user}
                  editar_user={editar_user}
                ></FormularioAlumno>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
