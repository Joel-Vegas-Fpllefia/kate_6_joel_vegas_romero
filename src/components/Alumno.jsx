import Avatar from "./Avatar";

function Alumno({ alumnos, esAdmin, delete_user, onEdit }) {
  function transfer_user_to_delete(event, alumnoId) {
    event.preventDefault();
    delete_user(alumnoId);
  }

  function editar_user(event, alumnoId) {
    event.preventDefault();
    onEdit(alumnoId);
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Alumno */}
      {alumnos.map((alumno) => (
        <div
          key={alumno._id}
          className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl border border-gray-100"
        >
          {/* Contenedor del Avatar y Cabecera */}
          <div className="flex items-center gap-4 p-5">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-indigo-500 ring-offset-2">
              {/* Enviamos la imagen de perfil del alumno */}
              <Avatar profile_image={alumno.url}></Avatar>
            </div>

            <div className="overflow-hidden">
              {/* Nombre y apellidos */}
              <div className="flex flex-col">
                <p className="truncate text-lg font-bold text-gray-800 leading-tight">
                  {alumno.nombre}
                </p>
                <p className="truncate text-sm font-medium text-gray-500">
                  {alumno.apellidos}
                </p>
              </div>
            </div>
          </div>

          {/* Cuerpo de la tarjeta: Ciclo */}
          <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Ciclo
              </span>
              <p className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {alumno.curso}
              </p>
            </div>
          </div>

          {/* Acciones de Admin */}
          {esAdmin && (
            <div className="flex border-t border-gray-100">
              <button
                onClick={(event) => editar_user(event, alumno._id)}
                className="flex-1 bg-white px-4 py-3 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 border-r border-gray-100"
              >
                Editar
              </button>
              <button
                onClick={(event) => transfer_user_to_delete(event, alumno._id)}
                className="flex-1 bg-white px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Alumno;
