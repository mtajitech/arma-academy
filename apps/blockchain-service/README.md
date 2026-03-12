# blockchain-service

**Port:** 3005  
**Description:** Blockchain Service — on-chain certificate issuance, verification, and credential wallet integration

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
GET http://localhost:3005/health
→ { "status": "ok", "service": "blockchain-service", "timestamp": "..." }
```

## Environment Variables

See `.env.example` for all required variables.

## Architecture

- Framework: NestJS 10
- Language: TypeScript 5 (strict mode)
- Port: 3005 (hardcoded — never change)
- Communication: via API Gateway only
