# CardLedger MVP - Postgres

A small Next.js + Prisma + Postgres MVP for tracking credit-card billing cycles and quick expense entries.

## Run locally

```bash
cp .env.example .env
docker compose up -d
npm install
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Open http://localhost:3000

## Important

This project pins Prisma to v6.15.0. Prisma v7 moved datasource URLs out of `schema.prisma` into `prisma.config.ts`, so leaving Prisma as `latest` can break migrations with P1012.
