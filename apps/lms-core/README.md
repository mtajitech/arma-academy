# lms-core

**Port:** 3002  
**Description:** Learning Management System Core — courses, enrollments, progress tracking, and assessments

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
GET http://localhost:3002/health
→ { "status": "ok", "service": "lms-core", "timestamp": "..." }
```

## Environment Variables

See `.env.example` for all required variables.

## Architecture

- Framework: NestJS 10
- Language: TypeScript 5 (strict mode)
- Port: 3002 (hardcoded — never change)
- Communication: via API Gateway only
