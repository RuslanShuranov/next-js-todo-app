'use client';
import React from 'react';

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  toggleTodo: (id: string, completed: boolean) => Promise<{ success: boolean; error?: string }>;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoItem = ({ id, completed, title, toggleTodo, deleteTodo }: TodoItemProps) => {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isChecked, setIsChecked] = React.useState(completed);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = event.target.checked;
    setIsUpdating(true);
    setError(null);

    try {
      const result = await toggleTodo(id, newCheckedState);
      if (result.success) {
        setIsChecked(newCheckedState);
      } else {
        setError(result.error || "Failed to update todo");
        setIsChecked(isChecked);
      }
    } catch (err) {
      console.error("Error toggling todo:", err);
      setError("An unexpected error occurred");
      setIsChecked(isChecked);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteTodo(id);
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("Failed to delete todo");
      setIsDeleting(false);
    }
  };

  return (
    <li className={'flex gap-1 items-center'}>
      <input
        id={id}
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
        disabled={isUpdating || isDeleting}
        className={'cursor-pointer peer'}
      />
      <label htmlFor={id} className={'peer-checked:line-through peer-checked:text-slate-500'}>
        {title}
      </label>
      <button
        onClick={handleDelete}
        disabled={isDeleting || isUpdating}
        className="ml-2 text-red-500 hover:text-red-700 disabled:text-gray-400"
        aria-label="Delete todo"
      >
        ×
      </button>
      {isUpdating && <span className="ml-2 text-yellow-500 text-sm">Updating...</span>}
      {isDeleting && <span className="ml-2 text-yellow-500 text-sm">Deleting...</span>}
      {error && <span className="ml-2 text-red-500 text-sm">{error}</span>}
    </li>
  );
};

export default TodoItem;
