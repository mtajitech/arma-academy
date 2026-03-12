# frontend-institutional

**Port:** 3102  
**Description:** Institutional Portal — B2B dashboard for corporate and FI clients

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
- Port: 3102 (hardcoded — never change)
- Output: standalone (optimized for Docker)
