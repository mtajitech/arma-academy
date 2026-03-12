# frontend-robo

**Port:** 3101  
**Description:** Robo-Advisor Frontend — client-facing investment advisory interface

## Running Locally

```bash
cp .env.example .env
npm install
npm run dev
```

## Building for Production

```bash
npm run build
npm start
```

## Architecture

- Framework: Next.js 14 (App Router)
- Language: TypeScript 5 (strict mode)
- Port: 3101 (hardcoded — never change)
- Output: standalone (optimized for Docker)
