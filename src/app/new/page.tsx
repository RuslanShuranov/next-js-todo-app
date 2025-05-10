"use client";

import React from 'react';
import Link from 'next/link';
import { createTodo } from '@/actions/todoActions';

const New = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    const result = await createTodo(formData);

    if (!result.success) {
      setError(result.error || "Failed to create todo");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className={'flex justify-between mb-4 items-center'}>
        <h1 className={'text-2xl'}>New</h1>
      </header>
      <form action={handleSubmit} className={'flex gap-2 flex-col'}>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type={'text'}
          name={'title'}
          className={
            'border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100'
          }
          disabled={isSubmitting}
        />
        <div className={'flex gap-1 justify-end'}>
          <Link
            className={
              'border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
            }
            href={'..'}
            tabIndex={isSubmitting ? -1 : undefined}
          >
            Cancel
          </Link>
          <button
            type={'submit'}
            className={
              'border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none' +
              (isSubmitting ? ' opacity-50 cursor-not-allowed' : '')
            }
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </>
  );
};

export default New;
