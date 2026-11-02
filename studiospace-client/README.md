# StudioSpace

Live site: https://YOUR-APP.vercel.app
Server repo: https://github.com/YOUR_USERNAME/studiospace-server

StudioSpace is a peer-to-peer marketplace for renting photo studios, film stages, podcast lounges, music suites and workshops.

## Features

- Hero slider, featured studios (top 6 from MongoDB) and category browsing
- Search, category filter and sorting on Explore Studios
- Email/password and Google login with Better Auth; password validation
- Full CRUD for studio listings with imgbb image upload
- Booking system with double-booking prevention against confirmed bookings
- JWT stored in HTTPOnly cookies; protected routes return 401
- Light/dark theme toggle, toast notifications, custom modals, skeleton loaders
- Host dashboard to confirm or reject requests, PDF invoices, saved studios wishlist

## Tech Stack

Next.js (App Router), Tailwind CSS, DaisyUI, Better Auth (MongoDB adapter), Swiper, React Hot Toast, Express.js, MongoDB, JWT

## Local Setup

1. `git clone https://github.com/YOUR_USERNAME/studiospace-client.git && cd studiospace-client`
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill in the values
4. Run the server repo (`npm run dev`) on port 5000
5. `npm run dev` and open http://localhost:3000

## Examiner Test Credentials

- Email: examiner@studiospace.com
- Password: Examiner123
