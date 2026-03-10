import { useState } from "react";

function Login({ onLogin }) {
  // UseState
  const [name_logging, setName_log] = useState("");
  const [password_logging, setPasswd] = useState("");

  function updateName(event) {
    setName_log(event.target.value);
  }

  function updatePasswd(event) {
    setPasswd(event.target.value);
  }

  function callFunction(event) {
    event.preventDefault();
    onLogin(name_logging, password_logging);
  }
  return (
    <>
      <div className="flex min-h-screen items-center justify-center  p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Bienvenido
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Usuario
              </label>
              <input
                type="text"
                placeholder="Introduce Usuario"
                value={name_logging}
                onChange={updateName}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password_logging}
                onChange={updatePasswd}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <button
              onClick={callFunction}
              className="mt-6 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 active:transform active:scale-[0.98]"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
