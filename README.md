# Next.js Todo Application

A modern, fully-featured task management application built with Next.js 15, TypeScript, Tailwind CSS, and Prisma with PostgreSQL.

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as completed
- ✅ Clean, responsive UI with Tailwind CSS
- ✅ Server-side rendering for optimal performance
- ✅ PostgreSQL database integration with Prisma ORM
- ✅ Type-safe data handling with TypeScript

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Database**: PostgreSQL with Prisma ORM
- **Development Tools**: ESLint, Prettier

## Project Structure

This project follows the modern Next.js app router architecture, with a clean separation of concerns:

- `src/components`: Reusable UI components
- `src/app`: Page layouts and routes
- `src/actions`: Server actions for data manipulation
- `prisma`: Database schema and migrations

## Live Demo

Check out the live application at: [https://next-js-todo-app-ecru-one.vercel.app/](https://next-js-todo-app-ecru-one.vercel.app/)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your PostgreSQL database and update the `.env` file with your `DATABASE_URL`
4. Run database migrations: `npx prisma migrate dev`
5. Start the development server: `npm run dev`
6. Visit http://localhost:3000 to see the application

## Deployment

This application is deployed on Vercel, the platform from the creators of Next.js. Follow the deployment documentation for more details.

## License

[MIT](LICENSE)
