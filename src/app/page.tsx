"use client";

import React from 'react';
import Link from 'next/link';
import TodoItem from '@/components/TodoItem';
import {Todo} from ".prisma/client";
import { getTodos, toggleTodo, deleteTodo } from '@/actions/todoActions';

const Home = () => {
    const [todos, setTodos] = React.useState<Todo[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const callGetTodos = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getTodos();
                setTodos(data);
            } catch (err) {
                console.error("Failed to fetch todos:", err);
                setError("Failed to load todos. Please try again later.");
                setTodos([]);
            } finally {
                setLoading(false);
            }
        };

        callGetTodos();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const result = await deleteTodo(id);
            if (result.success) {
                setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
            } else {
                console.error("Failed to delete todo:", result.error);
            }
        } catch (err) {
            console.error("Error deleting todo:", err);
        }
    };

    const handleToggle = async (id: string, completed: boolean) => {
        try {
            const result = await toggleTodo(id, completed);
            if (result.success) {
                setTodos(prevTodos => {
                    const updatedTodos = prevTodos.map(todo => 
                        todo.id === id ? { ...todo, completed } : todo
                    );
                    return updatedTodos.sort((a, b) => Number(a.completed) - Number(b.completed));
                });
            }
            return result;
        } catch (err) {
            console.error("Error toggling todo:", err);
            return { success: false, error: "Failed to update todo. Please try again." };
        }
    };

  return (
    <>
      <header className={'flex justify-between mb-4 items-center'}>
        <h1 className={'text-2xl'}>Todos</h1>
        <Link
          className={
            'border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          }
          href={'/new'}
        >
          New
        </Link>
      </header>
      <main>
        {loading && <p className="text-slate-300">Loading todos...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <ul className={'pl-4'}>
            {todos.length === 0 ? (
              <p className="text-slate-300">No todos found. Create a new one!</p>
            ) : (
              todos.map(({ id, completed, title }) => (
                <TodoItem 
                  key={id} 
                  id={id} 
                  completed={completed} 
                  title={title} 
                  toggleTodo={handleToggle}
                  deleteTodo={handleDelete} 
                />
              ))
            )}
          </ul>
        )}
      </main>
    </>
  );
};

export default Home;
