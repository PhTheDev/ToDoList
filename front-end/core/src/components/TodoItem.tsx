interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    due_date: string | null;
    priority: "LOW" | "MEDIUM" | "HIGH";
  };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    LOW: "bg-green-900",
    MEDIUM: "bg-yellow-900",
    HIGH: "bg-red-900",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <li
      className={`group flex flex-col ${
        priorityColors[todo.priority]
      } p-4 rounded-lg shadow-lg hover:brightness-110 transition-all duration-200`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="h-5 w-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500"
          />
          <span
            className={`text-lg ${
              todo.completed ? "line-through text-gray-400" : "text-white"
            }`}
          >
            {todo.title}
          </span>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {todo.due_date && (
        <div className="mt-2 text-sm text-gray-300">
          Prazo: {formatDate(todo.due_date)}
        </div>
      )}
      <div className="mt-1 text-sm text-gray-300">
        Prioridade: {todo.priority}
      </div>
    </li>
  );
}
