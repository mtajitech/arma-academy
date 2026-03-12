# api-gateway

**Port:** 3000  
**Description:** Central API Gateway — routes all external requests to internal microservices via reverse proxy logic

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
GET http://localhost:3000/health
→ { "status": "ok", "service": "api-gateway", "timestamp": "..." }
```

## Environment Variables

See `.env.example` for all required variables.

## Architecture

- Framework: NestJS 10
- Language: TypeScript 5 (strict mode)
- Port: 3000 (hardcoded — never change)
- Communication: via API Gateway only
