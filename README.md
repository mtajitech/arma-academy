# ARMA Academy

**Professional Financial Training Platform for Africa**  
Built by Africa Risk Management Advisors (ARMA) — africarisk.net

---

## Platform Overview

ARMA Academy is a multi-sided learning and advisory platform serving financial institutions, corporate clients, regulators, and individual learners across Africa. It combines structured financial training with AI-powered advisory capabilities and on-chain certificate issuance.

## Architecture

**Monorepo** containing 16 independent microservices. All inter-service communication routes exclusively through the API Gateway — no direct cross-service database queries under any circumstance.

| Layer | Technology |
|-------|-----------|
| Backend Services | NestJS 10 / TypeScript 5 / Node.js 20 |
| Frontend | Next.js 14 (App Router) / React 18 |
| Databases | PostgreSQL 16, MongoDB 7, Redis 7 |
| Hosting | Hetzner Cloud (CCX dedicated vCPU) |
| Deployment | Coolify (self-hosted) |
| Reverse Proxy | Traefik (inside Coolify) |
| SSL | Let's Encrypt (automatic) |
| Registry | GitHub Container Registry (GHCR) |
| AI | Anthropic Claude API |

---

## Service Directory & Port Reference

| Service | Port | Domain (Production) | Description |
|---------|------|---------------------|-------------|
| **api-gateway** | 3000 | api.training.africarisk.net | Central API Gateway |
| **auth-service** | 3001 | internal | Authentication & JWT |
| **lms-core** | 3002 | internal | LMS — courses, enrollments, progress |
| **content-pipeline** | 3003 | internal | Video ingestion, SCORM, CDN |
| **ukb-service** | 3004 | internal | Universal Knowledge Base (RAG) |
| **blockchain-service** | 3005 | internal | On-chain certificate issuance |
| **advisor-service** | 3006 | internal | AI Advisory (Claude-powered) |
| **robo-advisor-service** | 3007 | internal | Robo-Advisor engine |
| **commerce-service** | 3008 | internal | Subscriptions, payments |
| **marketing-service** | 3009 | internal | Campaigns, lead capture |
| **analytics-service** | 3010 | internal | Learner behaviour, BI pipelines |
| **notification-service** | 3011 | internal | Email, SMS, push, in-app |
| **frontend-academy** | 3100 | training.africarisk.net | Primary learner portal |
| **frontend-robo** | 3101 | robo.training.africarisk.net | Robo-advisor interface |
| **frontend-institutional** | 3102 | institutional.training.africarisk.net | B2B client dashboard |
| **developer-portal** | 3103 | developer.training.africarisk.net | API docs & sandbox |

> **Port assignments are hardcoded and must never be changed.**

---

## Quick Start (Local Development)

**Prerequisites:** Node.js 20+, Docker, Git

```bash
# Clone the repository
git clone https://github.com/YOUR_ORG/arma-academy.git
cd arma-academy

# Run the setup script (creates .env files, installs deps, starts databases)
bash infrastructure/scripts/setup.sh

# Start all 16 services + databases
docker-compose up -d

# View live logs
docker-compose logs -f

# Check health of a specific service
curl http://localhost:3000/health
```

---

## Development Workflow

```bash
# Run all builds in parallel (Turborepo)
npm run build

# Run all tests
npm run test

# Run linting across all services
npm run lint

# Type check all services
npm run type-check

# Start individual service in dev mode
cd apps/lms-core && npm run start:dev
```

---

## Shared Packages

| Package | Purpose |
|---------|---------|
| `@arma-academy/shared-types` | TypeScript interfaces: User, Course, Certificate, etc. |
| `@arma-academy/shared-utils` | Logger (Winston/JSON), AppError class, validators |
| `@arma-academy/shared-config` | Environment variable loader with validation |

---

## CI/CD

| Workflow | Trigger | Steps |
|----------|---------|-------|
| `ci.yml` | PR to `main` | Install → Type Check → Lint → Test → Build |
| `deploy.yml` | Push to `main` | Build Docker images → Push to GHCR → Trigger Coolify |

---

## Infrastructure

- **Hetzner Cloud** — CCX series dedicated vCPU server
- **Coolify** — Self-hosted deployment platform (manages containers, env secrets, domains)
- **Traefik** — Reverse proxy (runs inside Coolify, handles domain routing + SSL)
- **Let's Encrypt** — Automatic SSL via Traefik cert resolver

---

## Governance Rules

1. **No direct cross-service DB queries.** Services communicate only through the API Gateway.
2. **Each service owns its schema.** No shared database tables between services.
3. **Port assignments are permanent.** Never change the hardcoded port for any service.
4. **Strict TypeScript.** `strict: true` in every `tsconfig.json` — no exceptions.
5. **Health endpoint required.** Every service must expose `GET /health` returning `{ status: 'ok' }`.
6. **`.env.example` must stay current.** Any new environment variable must be documented here first.

---

## Build Phases

| Phase | Scope |
|-------|-------|
| **Phase 0** (current) | Monorepo scaffold — structure, Docker, CI/CD, shared packages |
| Phase 1 | Auth Service — JWT, OAuth2, RBAC |
| Phase 2 | LMS Core — courses, modules, enrollments |
| Phase 3 | Content Pipeline — video, SCORM, CDN |
| Phase 4 | Commerce Service — subscriptions, Stripe, Flutterwave |
| Phase 5 | Advisor Service — Claude API integration, RAG |
| Phase 6 | Robo-Advisor — portfolio engine, risk profiling |
| Phase 7 | Blockchain Service — on-chain certificates |
| Phase 8 | Analytics & Marketing |
| Phase 9 | Frontend completions, Developer Portal |

---

*ARMA Academy © Africa Risk Management Advisors. All rights reserved.*
