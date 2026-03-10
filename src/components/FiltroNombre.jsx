function FiltroNombre({ setSearchUserState } = props) {
  function changeState(event) {
    setSearchUserState(event.target.value);
  }
  return (
    <div className="max-w-md mx-auto mb-8 px-4">
      <div className="relative group">
        {/* Icono de Lupa (Opcional, puramente visual) */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Buscar Alumno ..."
          onChange={changeState}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-white shadow-sm transition-all focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none placeholder:text-gray-400"
        />

        {/* Atajo visual (opcional) */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 rounded-lg">
            CTRL K
          </kbd>
        </div>
      </div>
    </div>
  );
}
export default FiltroNombre;
