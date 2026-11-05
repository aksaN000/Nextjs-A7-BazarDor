# বাজার দর (BazarDor)

BazarDor is a Bangla web app for checking today's prices of daily essentials in Bangladesh. It shows the prices of rice, lentils, oil, vegetables, fish, meat, eggs, milk and spices, how much they changed since yesterday, and a market by market comparison across all divisions. Detailed prices are available after signing in.

Live site: https://nextjs-a7-bazardor.vercel.app

## Technologies Used

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- HeroUI v3
- BetterAuth (email/password, Google, GitHub)
- MongoDB (BetterAuth MongoDB adapter)
- react-hot-toast
- react-icons
- Vercel for deployment

## Features

1. Home page with a price ticker, top 6 products whose prices went up today, top 6 whose prices went down, and all 33 products in a responsive grid. All numbers are shown in Bengali digits.
2. Category pages for each product group with a sort option (default, price low to high, price high to low). Sorting uses the numeric price, not the Bengali text.
3. Protected product details page with minimum, maximum and average price, the cheapest and the most expensive market, and a table of today's price in 12 markets.
4. Sign up and sign in with email and password, or continue with Google or GitHub, using BetterAuth. Toast messages are shown for every success and error.
5. Routes are protected with Next.js proxy. Visitors who open a product or profile page without signing in are sent to the sign in page with a message.
6. My Profile page with the user's information, and a separate update page to change the name using BetterAuth `updateUser`.
7. Skeleton loaders while data is loading, a custom 404 page, and a layout that works on mobile, tablet and desktop.

## Running Locally

1. Install packages:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in the values:

```
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

3. Start the dev server:

```bash
npm run dev
```

Then open http://localhost:3000 in the browser.

## Pages

- `/` home page
- `/category/[slug]` products of one category
- `/product/[slug]` product details (sign in required)
- `/signin` and `/signup`
- `/profile` and `/profile/update` (sign in required)

## API

Product data comes from the BazarDor API: https://openapi.programming-hero.com/api/bazardor
