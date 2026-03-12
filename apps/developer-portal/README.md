# developer-portal

**Port:** 3103  
**Description:** Developer Portal — API documentation, sandbox, and partner integration hub

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
- Port: 3103 (hardcoded — never change)
- Output: standalone (optimized for Docker)
