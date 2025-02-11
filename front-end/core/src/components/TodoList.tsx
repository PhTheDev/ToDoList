"use client";

import { TodoItem } from "@/components/TodoItem";
import axios from "axios";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get("http://localhost:8000/api/tasks/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    await axios.post(
      "http://localhost:8000/api/tasks/",
      { title: newTodo },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNewTodo("");
    fetchTodos();
  };

  const toggleTodo = async (id: number) => {
    const token = localStorage.getItem("access_token");
    const todo = todos.find((t) => t.id === id);
    await axios.patch(
      `http://localhost:8000/api/tasks/${id}/`,
      { completed: !todo?.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    const token = localStorage.getItem("access_token");
    await axios.delete(`http://localhost:8000/api/tasks/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Minha Lista de Tarefas
        </h1>
        <span className="text-zinc-400">
          {todos.length} {todos.length === 1 ? "tarefa" : "tarefas"}
        </span>
      </div>

      <form onSubmit={addTodo} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="O que você precisa fazer?"
            className="flex-1 p-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
          >
            Adicionar
          </button>
        </div>
      </form>

      {todos.length > 0 ? (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      ) : (
        <div className="text-center text-zinc-500 py-10">
          <p>Nenhuma tarefa ainda. Adicione uma!</p>
        </div>
      )}
    </div>
  );
}
