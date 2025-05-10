'use server';

import { prisma } from '@/db';
import { redirect } from 'next/navigation';

export const getTodos = async () => {
  return prisma.todo.findMany();
};

export const toggleTodo = async (id: string, completed: boolean) => {
  try {
    await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    return { success: true };
  } catch (err) {
    console.error("Failed to update todo:", err);
    return { success: false, error: "Failed to update todo. Please try again." };
  }
};

export const createTodo = async (data: FormData) => {
  try {
    const title = data.get('title')?.valueOf();
    if (typeof title !== 'string' || title.length === 0) {
      return { success: false, error: 'Title is required' };
    }

    await prisma.todo.create({
      data: {
        title,
        completed: false,
      },
    });
    redirect('/');
    return { success: true };
  } catch (err) {
    console.error("Failed to create todo:", err);
    return { success: false, error: 'Failed to create todo. Please try again.' };
  }
};
