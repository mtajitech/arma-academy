# ukb-service

**Port:** 3004  
**Description:** Universal Knowledge Base — retrieval-augmented knowledge store for AI advisory and search

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
GET http://localhost:3004/health
→ { "status": "ok", "service": "ukb-service", "timestamp": "..." }
```

## Environment Variables

See `.env.example` for all required variables.

## Architecture

- Framework: NestJS 10
- Language: TypeScript 5 (strict mode)
- Port: 3004 (hardcoded — never change)
- Communication: via API Gateway only
