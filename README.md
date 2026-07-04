# CineType

**Find what your brain actually wants to watch.**

A personality-driven movie & TV recommendation platform. Take a 10-question quiz, get a Watch Personality archetype, and receive recommendations that explain *why* they fit you.

---

## Features

- 10-question Watch Personality Quiz — card-based, one question per screen
- 12 Watch Personality archetypes (The Chaos Romantic, The Villain Apologist, etc.)
- Recommendation cards with "Why it fits you" + "Skip if…" explanations
- Match score calculated from quiz answer tags
- Watchlist — save titles (localStorage, no account needed)
- Seen it / Not interested — hides processed cards
- Shareable result page
- TMDb-powered with automatic mock data fallback when no API key is set

---

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- TMDb API via backend API route (key never exposed to browser)
- localStorage for watchlist/profile (no database needed)
- Vercel deployment

---

## Setup

```bash
npm install
cp .env.example .env.local
# Add your TMDB_API_KEY to .env.local (optional — app works without it)
npm run dev
```

Get a free TMDb key at https://www.themoviedb.org/settings/api

**Without a key the app shows curated mock data automatically.**

---

## Deploy to Vercel

Connect repo to Vercel, add `TMDB_API_KEY` in Environment Variables, deploy. Zero config changes needed.

---

## TMDb Attribution

This product uses the TMDb API but is not endorsed or certified by TMDb.
See `/credits` page in the app.

For commercial use, contact TMDb about a commercial license before monetizing:
https://www.themoviedb.org/bible/api

---

## Structure

```
app/
  page.tsx                      Landing page
  quiz/page.tsx                 Quiz
  result/[id]/page.tsx          Result (12 static paths)
  recommendations/page.tsx      Personalized picks
  watchlist/page.tsx            Saved titles
  credits/page.tsx              TMDb attribution
  api/recommendations/route.ts  TMDb proxy (server-side only)

components/
  quiz/QuizClient.tsx
  result/ResultClient.tsx
  recommendations/RecommendationsClient.tsx
  recommendations/RecommendationCard.tsx
  WatchlistClient.tsx

lib/
  types.ts         All TypeScript types
  quiz-data.ts     Quiz questions + answer tags
  personalities.ts 12 Watch Personality archetypes
  scoring.ts       Tag weighting + archetype matching algorithm
  recommendations.ts Card building + explanation templates
  mock-data.ts     Fallback data (no API key needed)
  storage.ts       localStorage helpers
```
