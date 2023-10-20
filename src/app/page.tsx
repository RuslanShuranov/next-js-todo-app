import Link from 'next/link';
import { prisma } from '@/db';
import TodoItem from '@/components/TodoItem';

const getTodos = () => prisma.todo.findMany();

const toggleTodo = async (id: string, completed: boolean) => {
  'use server';
  await prisma.todo.update({
    where: { id },
    data: { completed },
  });
};

const Home = async () => {
  const todos = await getTodos();

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
        <ul className={'pl-4'}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;
