# analytics-service

**Port:** 3010  
**Description:** Analytics Service — learner behaviour tracking, platform metrics, and BI data pipelines

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
GET http://localhost:3010/health
→ { "status": "ok", "service": "analytics-service", "timestamp": "..." }
```

## Environment Variables

See `.env.example` for all required variables.

## Architecture

- Framework: NestJS 10
- Language: TypeScript 5 (strict mode)
- Port: 3010 (hardcoded — never change)
- Communication: via API Gateway only
