"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        { username, password }
      );

      if (response.data && response.data.access) {
        localStorage.setItem("access_token", response.data.access);
        router.push("/todos");
      } else {
        setError("Erro no login. Tente novamente.");
      }
    } catch {
      setError("Falha no login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-zinc-900 flex">
        {/* Left Side - Logo */}
        <div className="w-1/2 flex items-center justify-center bg-zinc-800">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4">
              <span className="text-blue-500">&lt;</span>
              PH
              <span className="text-blue-500">/&gt;</span>
            </h1>
            <p className="text-gray-400 text-xl">
              Gerencie suas tarefas com estilo
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-96 p-8 bg-zinc-800 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-gray-300 mb-2 block">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite seu username"
                />
              </div>
              <div>
                <label className="text-gray-300 mb-2 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite sua senha"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 p-3 rounded-md text-white font-semibold hover:bg-blue-700 transition duration-300"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
              <p className="text-center text-gray-400 mt-4">
                Não tem uma conta?{" "}
                <Link
                  href="/register"
                  className="text-blue-500 hover:text-blue-400"
                >
                  Registre-se
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
