'use client';
import React from 'react';

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  toggleTodo: (id: string, completed: boolean) => void;
}

const TodoItem = ({ id, completed, title, toggleTodo }: TodoItemProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleTodo(id, event.target.checked);
  };

  return (
    <li className={'flex gap-1 items-center'}>
      <input
        id={id}
        type='checkbox'
        defaultChecked={completed}
        onChange={handleChange}
        className={'cursor-pointer peer'}
      />
      <label htmlFor={id} className={'peer-checked:line-through peer-checked:text-slate-500'}>
        {title}
      </label>
    </li>
  );
};

export default TodoItem;
