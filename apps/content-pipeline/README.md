# content-pipeline

**Port:** 3003  
**Description:** Content Pipeline — video ingestion, transcoding, SCORM packaging, and CDN publishing

## Overview

This service is part of the ARMA Academy monorepo. It communicates exclusively through the API Gateway — no direct cross-service database queries.

## Running Locally

```bash
cp .env.example .env
npm install
npm run start:dev
```

## Health Check

```
GET http://localhost:3003/health
→ { "status": "ok", "service": "content-pipeline", "timestamp": "..." }
```

## Environment Variables

See `.env.example` for all required variables.

## Architecture

- Framework: NestJS 10
- Language: TypeScript 5 (strict mode)
- Port: 3003 (hardcoded — never change)
- Communication: via API Gateway only
