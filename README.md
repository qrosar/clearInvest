## ClearInvest

Educational website on ETF investing for Belgian retail investors.
Available at [clearinvest.be](https://clearinvest.be)

## About
ClearInvest is a free, independent, non-commercial educational 
resource helping Belgian investors understand ETF investing 
compared to traditional banking products.

No monetization. No affiliate links. No agenda.

## Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- next-intl (FR/NL/EN)
- Deployed on Vercel

## Belgian Tax Engine
The calculator in `lib/calculator/compute.ts` implements 
the full Belgian tax stack as of 2026:
- TOB (0.12% / 1.32%)
- Précompte mobilier (30% / 15%)
- Taxe Reynders (30% on bond allocation)
- CGT 10% above €10,000/yr
- Branche 21 premium tax (2%)
- Pension exit tax (8% on fictive 4.75% capital)
- Pension tax relief (30%)

## Contributing
Found an inaccuracy? Open an issue or submit a pull request.
Please see CONTRIBUTING.md for guidelines.

## License
[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — 
you are free to read, audit, and build upon this code for 
non-commercial purposes with attribution. 
Commercial use is not permitted.
© 2026 Quentin Rosar