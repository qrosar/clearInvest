# Contributing to ClearInvest

Thank you for helping improve ClearInvest.

## What contributions are welcome

**Inaccuracies** — if something is factually wrong 
(wrong tax rate, outdated broker fee, incorrect 
calculation), please open an issue with a source.

**Translation improvements** — The website was translated
from French with the help of AI. 
Corrections and improvements are welcome 
via pull request to the messages/ folder.

**Data updates** — broker fees, savings account rates, 
and pension fund returns change over time. 
Pull requests updating lib/brokers/brokers.ts or 
lib/calculator/products.ts with sourced data are welcome.

## What contributions are NOT welcome

- New features or pages (this is a personal project 
  with a specific scope)
- Design changes
- Dependency upgrades

## How to report an inaccuracy

Open a GitHub issue with:
1. The page where the error appears
2. What is currently shown
3. What the correct information is
4. A source (FSMA, SPF Finances, broker website, etc.)

## Running locally
```bash
pnpm install
pnpm dev
```