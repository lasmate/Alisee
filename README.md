# Alisee Project

![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Version](https://img.shields.io/badge/version-v0.0.5-blue?style=for-the-badge)

This is a Svelte project bootstrapped with SvelteKit, using Tailwind CSS for styling and Drizzle ORM for database interactions.

## Getting Started

### Prerequisites

- Node.js (version recommended by SvelteKit, typically latest LTS)
- npm (or pnpm/yarn)

### Installation

1. **Clone the repository (if you haven't already):**

   ```bash
   # If you're starting from scratch or contributing
   # git clone <repository-url>
   # cd alisee
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add your database URL:

   ```env
   DATABASE_URL="file:./db.sqlite"
   ```

   Or for a remote Turso/libSQL database:

   ```env
   DATABASE_URL="libsql://your-database.turso.io"
   TURSO_AUTH_TOKEN="your-auth-token"
   ```

## Development

To start the development server:

```bash
npm run dev
```

This will start the SvelteKit development server, typically on `http://localhost:5173`. The server will automatically reload when you make changes to the code.

To open the app in a new browser tab when starting the server:

```bash
npm run dev -- --open
```

## Database Management (Drizzle ORM)

This project uses Drizzle ORM with a SQLite database by default (via `libsql`).

### Quick Reset

For convenience there's a mini-script `dbump.sh` in the project root that will remove the existing `db.sqlite` file and re-run the full seed process:

```bash
./dbump.sh
```

1. **Define your schema:**
   Modify the schema files in `src/lib/server/db/schema/`.

2. **Push schema changes to the database:**
   This command will compare your schema files with the database and apply the necessary changes. It's useful for development but use migrations for production.

   ```bash
   npm run db:push
   ```

3. **Create and apply migrations (Recommended for production):**
   Generate a migration file based on schema changes:

   ```bash
   # Replace <migration-name> with a descriptive name
   npx drizzle-kit generate --name <migration-name>
   ```

   Then apply the generated migration:

   ```bash
   npm run db:migrate
   ```

4. **Seed the database (idempotent):**
   We now maintain three separate seed scripts (`seedItem.ts`, `seedUser.ts`, `seedImg.ts`) orchestrated by `seed.ts` to populate items, users, and image entries. Each script uses `ON CONFLICT DO NOTHING` and enforced unique constraints to prevent duplicates, so you can safely re-run seeding as needed.

   ```bash
   npm run db:seed
   ```
    
   If you ever need to reset, delete or rename the `db.sqlite` file before reseeding.

5. **Drizzle Studio:**
   To open Drizzle Studio, a GUI for your database:

   ```bash
   npm run db:studio
   ```

## Building for Production

To create a production-ready version of your app:

```bash
npm run build
```

This will output the optimized build to the `build` directory (or as configured by your SvelteKit adapter).

You can preview the production build locally with:

```bash
npm run preview
```

> **Deployment:** To deploy your app, you may need to install and configure a SvelteKit [adapter](https://kit.svelte.dev/docs/adapters) specific to your target deployment environment (e.g., Vercel, Netlify, Node server). The current setup uses `@sveltejs/adapter-auto` which tries to detect the environment.

## Code Quality & Testing

1. **Formatting:**
   To automatically format your code using Prettier:

   ```bash
   npm run format
   ```

2. **Linting:**
   To check for code style issues and potential errors with ESLint and Prettier:

   ```bash
   npm run lint
   ```

3. **Type Checking:**
   To perform static type checking with TypeScript:

   ```bash
   npm run check
   ```

   Or to run in watch mode:

   ```bash
   npm run check:watch
   ```

4. **Unit Tests:**
   To run unit tests using Vitest:

   ```bash
   npm run test:unit
   ```

5. **End-to-End Tests:**
   To run end-to-end tests using Playwright:

   ```bash
   npm run test:e2e
   ```

   Make sure to install Playwright browsers if you haven't already: `npx playwright install`

6. **Run all tests:**

   ```bash
   npm run test
   ```

## Available Scripts

Here's a summary of the main scripts available in `package.json`:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run check`: Runs Svelte check and TypeScript type checking.
- `npm run format`: Formats code with Prettier.
- `npm run lint`: Lints code with ESLint and Prettier.
- `npm run test`: Runs all unit and e2e tests.
- `npm run test:unit`: Runs unit tests with Vitest.
- `npm run test:e2e`: Runs end-to-end tests with Playwright.
- `npm run db:push`: Pushes schema changes to the database (development).
- `npm run db:migrate`: Applies database migrations.
- `npm run db:studio`: Opens Drizzle Studio.
- `npm run db:seed`: Seeds the database with initial data.

Refer to `package.json` for the full list of scripts and their configurations.
