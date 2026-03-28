# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LifeMax is a full-stack life-tracking application covering finances, health, and productivity. Currently under active development is the finance module, which allows users to track spending, manage budgets by category, and record transactions.

- **Frontend:** React Router 7 (SSR) + TypeScript + Tailwind CSS v4
- **Backend:** Spring Boot 4 + Java 21 + PostgreSQL (Supabase)
- **Auth:** JWT (stateless, 1-hour expiration) via Spring Security

## Commands

### Frontend (`/frontend`)

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 5173)
npm run build        # Production build
npm run typecheck    # TypeScript check + React Router codegen
```

### Backend (`/backend/lifemax`)

```bash
./mvnw spring-boot:run          # Start dev server (port 8080)
./mvnw test                     # Run all tests
./mvnw test -Dtest=BudgetTests  # Run a single test class
./mvnw test -Dtest=BudgetTests#testCreateBudget_WithValidToken_ReturnsSuccess  # Single method
./mvnw clean package            # Build JAR
```

## Architecture

### Backend Structure

Follows standard Spring MVC layering:

- `controller/` — HTTP handlers; `UserController` for auth, `controller/Finance/` for budget/transaction endpoints
- `service/` — Business logic; `service/Finance/` mirrors the controller package structure
- `model/` — JPA entities (`Users`, `Budget`, `Transactions`, `Asset`)
- `repository/` — JPA repositories extending `JpaRepository`; `repository/Finance/` for finance repos
- `dto/` — Request/response objects; `dto/FinanceDTO/` for finance-specific DTOs
- `config/` — `SecurityConfig.java` (Spring Security + JWT filter registration) and `JwtFilter.java`

**Public endpoints:** `POST /api/users/createUser`, `POST /api/users/loginUser`
**Protected endpoints:** All `/api/finance/*` — require `Authorization: Bearer <token>` header

### Frontend Structure

- `app/routes/` — Page-level components (LandingPage, Dashboard, SignupPage)
- `app/components/ui/` — Reusable Radix UI-based components
- `app/components/landing/` and `app/components/dashboard/` — Feature-specific components
- `app/lib/utils.ts` — `cn()` helper for Tailwind class merging

### Testing

Backend tests use `@SpringBootTest` + `@AutoConfigureMockMvc`. `LifemaxApplicationTests` generates a JWT in `@BeforeEach` that all tests inherit via extension. The `test_uid` property in `application.properties` must be set to a valid UUID for tests to work.

### Configuration

Backend secrets (DB credentials, JWT key) are loaded from `application.properties` which references values that are excluded from git. The `secrets/` directory and sensitive properties are in `.gitignore`. SSR is enabled in the frontend (`react-router.config.ts`: `ssr: true`).
