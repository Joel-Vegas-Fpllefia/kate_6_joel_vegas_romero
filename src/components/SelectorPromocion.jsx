function SelectorPromocion({ promciones, setPromocionesState } = props) {
  //Actualizamos el estado de las promociones
  function changeStatePromocion(event) {
    setPromocionesState(event.target.value);
  }

  return (
    <div className="relative w-full group">
      {/* Select Estilizado */}
      <select
        onChange={changeStatePromocion}
        className="block w-full cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-gray-700 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
      >
        <option value="" className="text-gray-400">
          Seleccione una promoción:
        </option>
        {promciones.map((promcion) => (
          <option key={promcion} value={promcion} className="text-gray-700">
            {promcion}
          </option>
        ))}
      </select>

      {/* Icono de flecha (decorativo) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}
export default SelectorPromocion;
