# notification-service

**Port:** 3011  
**Description:** Notification Service — multi-channel delivery: email, SMS, push, and in-app alerts

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
GET http://localhost:3011/health
→ { "status": "ok", "service": "notification-service", "timestamp": "..." }
```

## Environment Variables

See `.env.example` for all required variables.

## Architecture

- Framework: NestJS 10
- Language: TypeScript 5 (strict mode)
- Port: 3011 (hardcoded — never change)
- Communication: via API Gateway only
