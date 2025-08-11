"use client";

import { TodoItem } from "@/components/TodoItem";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  due_date: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");

  const fetchTodos = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
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

    const taskData = {
      title: newTodo,
      completed: false,
      due_date: dueDate?.toISOString().split("T")[0],
      priority: priority,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setNewTodo("");
        setDueDate(null);
        setPriority("MEDIUM");
        fetchTodos();
      }
    } catch (error) {
      console.log("Error creating task:", error);
    }
  };

  const toggleTodo = async (id: number) => {
    const token = localStorage.getItem("access_token");
    const todo = todos.find((t) => t.id === id);
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}/`,
      { completed: !todo?.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    const token = localStorage.getItem("access_token");
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}/`, {
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

      <form onSubmit={addTodo} className="mb-8 space-y-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="O que você precisa fazer?"
          className="w-full p-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />

        <div className="flex gap-4">
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Selecione o prazo"
            className="flex-1 p-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")
            }
            className="flex-1 p-3 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="LOW">Baixa Prioridade</option>
            <option value="MEDIUM">Média Prioridade</option>
            <option value="HIGH">Alta Prioridade</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
        >
          Adicionar
        </button>
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
