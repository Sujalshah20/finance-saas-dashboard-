"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckSquare, Square, Plus, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { useLocalStorageState } from "@/lib/use-local-storage";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const initialTodos: Todo[] = [
  { id: 1, text: "Review Q2 financial reports", completed: true },
  { id: 2, text: "Send invoice to Erempe Studio", completed: false },
];

export default function TodoPage() {
  const [todos, setTodos] = useLocalStorageState<Todo[]>("nexora-todos", initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: newTodo.trim(), completed: false }]);
    setNewTodo("");
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const pending = todos.filter((t) => !t.completed).length;
  const completed = todos.filter((t) => t.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Todo List</h1>
          <p className="text-sm text-slate-500 mt-1">Your tasks are stored locally and persist after refresh.</p>
        </div>
        {todos.length > 0 && (
          <div className="flex gap-3 text-sm font-medium">
            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">{pending} Pending</span>
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">{completed} Done</span>
          </div>
        )}
      </div>

      <Card className="rounded-2xl shadow-sm border-slate-100 bg-white p-6">
        <form onSubmit={(e) => { e.preventDefault(); addTodo(); }} className="flex gap-3 mb-6">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1"
          />
          <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </form>

        {todos.length === 0 ? (
          <div className="py-8">
            <EmptyState
              icon={<CheckSquare className="w-8 h-8 text-slate-400" />}
              title="No tasks yet"
              description="Create your first task to get started with your todo list."
            />
          </div>
        ) : (
          <div className="space-y-2">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                <button onClick={() => toggleTodo(todo.id)} className="flex items-center gap-3 flex-1 text-left">
                  {todo.completed ? (
                    <CheckSquare className="w-5 h-5 text-green-500 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 shrink-0" />
                  )}
                  <span className={`text-sm font-medium ${todo.completed ? "line-through text-slate-400" : "text-slate-800"}`}>
                    {todo.text}
                  </span>
                </button>
                <button onClick={() => deleteTodo(todo.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
