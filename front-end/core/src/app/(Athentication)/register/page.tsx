"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register/",
        { username, email, password }
      );

      if (response.status === 201) {
        router.push("/");
      }
    } catch {
      setError("Falha ao registrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex">
      {/* Left Side - Logo */}
      <div className="w-1/2 flex items-center justify-center bg-zinc-800">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            <span className="text-blue-500">&lt;</span>
            PH
            <span className="text-blue-500">/&gt;</span>
          </h1>
          <p className="text-gray-400 text-xl">Comece sua jornada conosco</p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-96 p-8 bg-zinc-800 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Cadastro
          </h2>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="text-gray-300 mb-2 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escolha seu username"
              />
            </div>
            <div>
              <label className="text-gray-300 mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu email"
              />
            </div>
            <div>
              <label className="text-gray-300 mb-2 block">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Crie sua senha"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 p-3 rounded-md text-white font-semibold hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Criar Conta"}
            </button>
            <p className="text-center text-gray-400 mt-4">
              Já tem uma conta?{" "}
              <Link href="/" className="text-blue-500 hover:text-blue-400">
                Faça login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
