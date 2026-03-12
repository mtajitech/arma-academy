# robo-advisor-service

**Port:** 3007  
**Description:** Robo-Advisor Service — automated portfolio recommendation engine and rebalancing logic

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
GET http://localhost:3007/health
→ { "status": "ok", "service": "robo-advisor-service", "timestamp": "..." }
```

## Environment Variables

See `.env.example` for all required variables.

## Architecture

- Framework: NestJS 10
- Language: TypeScript 5 (strict mode)
- Port: 3007 (hardcoded — never change)
- Communication: via API Gateway only
