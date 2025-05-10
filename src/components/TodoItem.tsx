'use client';
import React from 'react';

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  toggleTodo: (id: string, completed: boolean) => Promise<{ success: boolean; error?: string }>;
}

const TodoItem = ({ id, completed, title, toggleTodo }: TodoItemProps) => {
  const [isUpdating, setIsUpdating] = React.useState(false);
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

  return (
    <li className={'flex gap-1 items-center'}>
      <input
        id={id}
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
        disabled={isUpdating}
        className={'cursor-pointer peer'}
      />
      <label htmlFor={id} className={'peer-checked:line-through peer-checked:text-slate-500'}>
        {title}
      </label>
      {isUpdating && <span className="ml-2 text-yellow-500 text-sm">Updating...</span>}
      {error && <span className="ml-2 text-red-500 text-sm">{error}</span>}
    </li>
  );
};

export default TodoItem;
