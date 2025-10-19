# Estate – AI-Powered Real Estate App

An AI-enhanced real estate web application built with React and Vite. It offers natural language property search, instant AI valuation, personalized recommendations, a floating chat assistant, and an admin dashboard for managing listings.

## Features

- **AI Dashboard**: Recommendations, natural-language search, and valuation in `src/Pages/AIDashboard.jsx`.
- **Natural Language Search**: Parses queries like “homes under $500k downtown, 3 beds” in `src/Components/AISearch.jsx`.
- **AI Valuation**: Instant estimates with confidence and market insights in `src/Components/AIPropertyValuation.jsx`.
- **AI Chat Assistant**: Floating assistant for FAQs and agent contact in `src/Components/AIChatAssistant.jsx`.
- **Admin Dashboard (CRUD)**: Role-guarded property management in `src/Pages/AdminDashboard.jsx`.
- **Theming & Auth**: Dark mode (`src/Context/ThemeContext.jsx`) and simple auth/role guard (`src/Context/AuthContext.jsx`).

## Tech Stack

- React 19, Vite 7, React Router 7
- Tailwind CSS 4, Framer Motion, Lucide Icons
- React Hot Toast

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create environment variables (`.env` in project root):
```bash
VITE_OPENAI_API_KEY=your_key_here
VITE_GOOGLE_AI_API_KEY=your_key_here
VITE_ADMIN_EMAIL=admin@estate.com
```

3. Run the dev server:
```bash
npm run dev
```

4. Build for production and preview:
```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev` – Start Vite dev server
- `npm run build` – Production build
- `npm run preview` – Preview production build
- `npm run lint` – Lint with ESLint

## Configuration & Notes

- AI provider config lives in `src/services/aiService.js` (uses `import.meta.env` for keys). Includes robust mock fallbacks when keys are missing.
- Tailwind is configured via `@tailwindcss/vite`. Avoid dynamic class strings that Tailwind cannot detect in production.
- Images are imported from `src/assets/assets.js` to ensure production-safe paths.

## Project Structure

```
src/
  Components/
    AIChatAssistant.jsx
    AIPropertyValuation.jsx
    AIRecommendations.jsx
    AISearch.jsx
    ...
  Pages/
    AIDashboard.jsx
    AdminDashboard.jsx
    PropertyDetails.jsx
    ...
  Context/
    AuthContext.jsx
    ThemeContext.jsx
  services/
    aiService.js
  assets/
    assets.js
main.jsx
App.jsx
```

## Deployment

Any static host that supports Vite builds (e.g., Netlify, Vercel, GitHub Pages). Use `npm run build` and deploy the `dist/` directory. Ensure environment variables are configured in the hosting platform.

## License

This project is provided as-is for educational and portfolio purposes.

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
