# Next.js User CRUD App

A simple User CRUD application built with Next.js 14 (App Router) and TypeScript. Fetches users from the JSONPlaceholder API, supports viewing, updating, and deleting individual users, and implements optimistic UI updates for all mutations. Uses a shared Axios instance with request and response interceptors for centralized API handling.

---

## Live Demo

[View on Vercel]([https://your-app.vercel.app/user](https://nextjs-crud-app-mocha.vercel.app/users)s) <!-- replace with your actual URL -->

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Axios** with interceptors
- **JSONPlaceholder** (fake REST API)

## Features

- List all users fetched server-side at `/users`
- View a single user at `/users/[id]`
- Update a user's name and email with optimistic UI update
- Delete a user with immediate redirect (optimistic)
- Axios interceptor logs every request and error to the console

## Project Structure

```
├── lib/
│   └── axios.ts          # Shared Axios instance with interceptors
├── app/
│   └── users/
│       ├── page.tsx      # Server component — lists all users
│       └── [id]/
│           └── page.tsx  # Client component — view, update, delete
```

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000/users](http://localhost:3000/users) in your browser.

## Notes

- JSONPlaceholder is a fake API - updates and deletes do not persist on refresh. This is expected.
- All mutations are optimistic - the UI updates before the API responds.
- The Axios interceptor output is visible in the browser console (DevTools → Console).
