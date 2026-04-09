# typeInk

> Your thoughts, beautifully written.

typeInk is a minimal, distraction-free writing application built with React and TypeScript. Start typing, track your word and character count, and download your work as a plain text file.

## Getting Started
  helo
```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run cf:dev` | Build and run with Cloudflare Wrangler |
| `npm run cf:preview` | Build and run local Cloudflare preview |
| `npm run cf:deploy` | Build and deploy to Cloudflare |
| `npm run lint` | Run ESLint |

## Cloudflare Deploy

1. Install dependencies:

```bash
npm install
```

2. Login to Cloudflare:

```bash
npx wrangler login
```

3. Build and deploy:

```bash
npm run cf:deploy
```

Current Cloudflare config is in `wrangler.jsonc`:
- Static assets directory: `dist`
- SPA fallback: `single-page-application`

## Tech Stack

- [React 19](https://react.dev/) – UI library
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [Vite](https://vite.dev/) – Build tool
