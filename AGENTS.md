# Repository Guidelines

## Project Structure & Module Organization

This repository contains a small Next.js 14 application using the App Router. Application code lives in `app/`: `page.tsx` implements the interactive food checker, `layout.tsx` defines root metadata and layout, and `globals.css` contains global and Tailwind styles. Static assets belong in `public/` and are referenced from the site root, for example `/orange-background.png`. Root configuration files include `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, and `tsconfig.json`.

## Build, Test, and Development Commands

- `npm ci`: install the exact dependencies recorded in `package-lock.json`.
- `npm run dev`: start the local development server with hot reload.
- `npm run build`: create a production build and catch TypeScript or Next.js integration errors.
- `npm start`: serve the completed production build.
- `npm run lint`: run the repository's configured Next.js lint command.

Run `npm run build` before opening a pull request.

## Coding Style & Naming Conventions

Use TypeScript and React functional components. Follow the existing two-space indentation, single quotes, and semicolon conventions. Name components and types in `PascalCase`, functions and variables in `camelCase`, and constants descriptively (for example, `internationalKeywords`). Keep route files aligned with App Router conventions such as `page.tsx` and `layout.tsx`. Prefer Tailwind utility classes for component styling and reserve `globals.css` for shared rules, tokens, and reusable utilities. TypeScript strict mode is enabled; avoid `any` unless its use is documented and justified.

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. For every change, run `npm run build` and `npm run lint`, then manually verify the primary input, example buttons, recent-item behavior, responsive layout, and result variants. If adding tests, place them beside the feature as `*.test.ts` or `*.test.tsx`, add the corresponding npm script, and cover both expected and edge-case behavior.

## Commit & Pull Request Guidelines

Recent history favors short, imperative summaries such as `Add international food result group` and `Restore verdict panel wrapper`. Keep commits focused and avoid combining unrelated refactors with feature work. Pull requests should explain the user-visible change, list verification performed, and link the relevant issue. Include before/after screenshots for visual changes and note any new dependencies or configuration requirements.