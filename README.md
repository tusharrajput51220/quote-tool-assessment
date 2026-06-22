# Monetizely Quoting Tool

A lightweight SaaS quoting application built as part of the Monetizely take-home assessment.

The application allows analysts to:

- Configure SaaS product catalogs
- Define pricing tiers and feature availability
- Configure add-on pricing models
- Generate customer quotes
- View detailed pricing breakdowns
- Share quotes via public URLs

---

## Features

### Catalog Management

- Create products
- Create pricing tiers
- Configure base seat pricing
- Create product features
- Configure feature availability per tier:
  - Included
  - Paid Add-on
  - Not Available

### Add-on Pricing Models

Supported pricing models:

1. Fixed Monthly Price
2. Per-Seat Price
3. Percentage of Product Price

### Quote Builder

- Create customer quotes
- Select product and tier
- Configure seat counts
- Select contract term:
  - Monthly
  - Annual
  - Two-Year

- Select available add-ons
- Configure add-on seat quantities independently
- Apply optional quote-level discounts

### Quote View

- Public shareable URL
- Detailed pricing breakdown
- Line-item calculations
- Final totals
- Customer and quote information

---

## Tech Stack

### Frontend

- Next.js 15
- TypeScript
- Tailwind CSS

### Backend

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL

### Validation

- Zod

### Testing

- Vitest
- Playwright

---

## Pricing Rules

### Term Discounts

| Term     | Discount |
| -------- | -------- |
| Monthly  | 0%       |
| Annual   | 15%      |
| Two-Year | 25%      |

### Add-on Pricing Models

#### Fixed Monthly

Example:

$200/month × 12 months

#### Per-Seat

Example:

5 seats × $50/month × 12 months

#### Percentage of Product

Example:

10% × Product Cost

---

## Local Development

### 1. Clone Repository

```bash
git clone <repository-url>
cd monetizely-quote-tool
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your_postgres_connection_string"
```

### 4. Run Database Migrations

```bash
npx prisma migrate dev
```

### 5. Seed Database

```bash
npx prisma db seed
```

### 6. Start Development Server

```bash
npm run dev
```

Application:

```txt
http://localhost:3000
```

---

## Running Tests

### Unit Tests

```bash
npm run test
```

### End-to-End Tests

```bash
npx playwright test
```

---

## Sample Seed Data

The seed script creates:

### Product

Analytics Suite

### Tiers

- Starter ($25/seat/month)
- Growth ($50/seat/month)
- Enterprise ($100/seat/month)

### Features

- Single Sign-On (SSO)
- API Access
- Advanced Reporting
- Custom Branding

---

## Architectural Decisions

### Quote Snapshot Storage

Quotes are stored as snapshots at the time of creation.

This means:

- Existing quotes never change
- Catalog updates do not affect previously generated quotes
- Pricing remains historically accurate

### Server-Side Data Access

Read operations use server-side Prisma queries where possible.

Benefits:

- Reduced network overhead
- Better performance
- Simpler architecture

### Public Quote URLs

Quotes are accessed through a generated public identifier.

Benefits:

- No authentication required
- Easy sharing with customers
- Read-only quote experience

---

## Assumptions

The following assumptions were made during implementation:

1. Quote validity defaults to 30 days from creation.
2. Taxes are excluded from all calculations.
3. USD is the only supported currency.
4. Quote discounts are applied after all pricing calculations are completed.
5. Add-on seat quantities are independent from product seat quantities.
6. Quotes cannot be edited after creation.
7. Catalog deletion is not supported.

---

## Future Improvements

Given additional time, the following enhancements would be implemented:

- Authentication and user management
- Quote editing and versioning
- PDF export
- Multi-currency support
- Tax calculation support
- Quote approval workflows
- Audit logs
- Advanced search and filtering
- Dashboard analytics
- Customer management

---

## Deployment

The application is designed to be deployed on:

- Vercel
- PostgreSQL (Neon/Supabase)

---

## Author Notes

The focus of this implementation was:

1. Correct pricing calculations
2. Clear pricing visibility
3. Maintainable data modeling
4. End-to-end quote generation workflow
5. Testability

The goal was to deliver a functional quoting system that accurately models SaaS pricing structures and produces transparent customer-facing quotes.
