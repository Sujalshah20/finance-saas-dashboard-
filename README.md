<!--
  Animated README (no external assets): SVG background + CSS animations.
  Note: GitHub supports inline SVG + CSS animations in most modern clients.
-->
<div align="center">

  <h1>
    <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%271200%27%20height%3D%27360%27%20viewBox%3D%270%200%201200%20360%27%3E%3Cdefs%3E%3ClinearGradient%20id%3D%27g%27%20x1%3D%270%27%20y1%3D%270%27%20x2%3D%271%27%20y2%3D%270%27%3E%3Cstop%20offset%3D%270%25%27%20stop-color%3D%27%23ff3b3b%27/%3E%3Cstop%20offset%3D%2750%25%27%20stop-color%3D%27%23ff7a18%27/%3E%3Cstop%20offset%3D%27100%25%27%20stop-color%3D%27%23ffd000%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%271200%27%20height%3D%27360%27%20rx%3D%2740%27%20fill%3D%27url(%23g)%27%20opacity%3D%270.12%27/%3E%3Ctext%20x%3D%2750%25%27%20y%3D%2780%27%20dominant-baseline%3D%27middle%27%20text-anchor%3D%27middle%27%20font-family%3D%27Segoe%20UI%2C%20Arial%27%20font-size%3D%2790%27%20fill%3D%27%23ff2d2d%27%3EFINANCE%20SAAS%20DASHBOARD%3C/text%3E%3Ctext%20x%3D%2750%25%27%20y%3D%27170%27%20dominant-baseline%3D%27middle%27%20text-anchor%3D%27middle%27%20font-family%3D%27Segoe%20UI%2C%20Arial%27%20font-size%3D%2735%27%20fill%3D%27%230b1220%27%20opacity%3D%270.9%27%3EUniversal%20AI%20Architect%20UI%3C/text%3E%3Cstyle%3E%40keyframes%20pulse%7B0%25%7Bopacity%3A0.7%7D50%25%7Bopacity%3A1%7D100%25%7Bopacity%3A0.7%7D%7D%3C/style%3E%3Ccircle%20cx%3D%27120%27%20cy%3D%27270%27%20r%3D%2730%27%20fill%3D%27%23ff2d2d%27%20opacity%3D%270.35%27%3E%3Canimate%20attributeName%3D%27opacity%27%20values%3D%270.15%3B0.6%3B0.15%27%20dur%3D%272%27%20repeatCount%3D%27indefinite%27/%3E%3C/circle%3E%3Ccircle%20cx%3D%271080%27%20cy%3D%27280%27%20r%3D%2740%27%20fill%3D%27%23ff7a18%27%20opacity%3D%270.3%27%3E%3Canimate%20attributeName%3D%27opacity%27%20values%3D%270.12%3B0.55%3B0.12%27%20dur%3D%272.4%27%20repeatCount%3D%27indefinite%27/%3E%3C/circle%3E%3C/svg%3E" alt="Finance SaaS Dashboard" width="640"/>
  </h1>

  <p>
    <b>Dashboard + AI insight cards</b> • Animated UI • Built with <b>Next.js</b> + <b>Tailwind</b>
  </p>

  <div style="max-width: 980px; margin: 16px auto;">
    <svg width="100%" viewBox="0 0 980 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated red finance banner">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#ff2d2d" stop-opacity="0.22"/>
          <stop offset="50%" stop-color="#ff6a00" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#ffd000" stop-opacity="0.14"/>
        </linearGradient>
        <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#ff2d2d"/>
          <stop offset="50%" stop-color="#ff6a00"/>
          <stop offset="100%" stop-color="#ffd000"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width="980" height="220" rx="26" fill="url(#bg)"/>
      <g opacity="0.95" filter="url(#glow)">
        <path d="M20 150 C 140 85, 220 200, 340 130 S 540 90, 660 140 S 820 170, 960 100" stroke="url(#line)" stroke-width="6" fill="none"/>
        <path d="M20 165 C 140 100, 220 215, 340 145 S 540 105, 660 155 S 820 185, 960 115" stroke="url(#line)" stroke-width="3" fill="none" opacity="0.7"/>
      </g>

      <g>
        <text x="50" y="82" font-family="Segoe UI, Arial" font-size="28" fill="#0b1220" opacity="0.95">Live Metrics</text>
        <text x="50" y="118" font-family="Segoe UI, Arial" font-size="18" fill="#0b1220" opacity="0.75">Animated README banner + dashboard cards</text>
      </g>

      <g>
        <circle cx="860" cy="60" r="12" fill="#ff2d2d">
          <animate attributeName="cy" values="60;50;60" dur="1.4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="900" cy="70" r="10" fill="#ff6a00" opacity="0.95">
          <animate attributeName="cx" values="900;885;900" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="930" cy="50" r="9" fill="#ffd000" opacity="0.95">
          <animate attributeName="cy" values="50;65;50" dur="2s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  </div>

  <p>
    <a href="#getting-started">Getting Started</a>
    ·
    <a href="#features">Features</a>
    ·
    <a href="#tech-stack">Tech Stack</a>
  </p>

</div>

---

## Features
- Finance dashboard metrics (Income / Expense)
- Transaction table + modal for new transactions
- AI Insight card (prompt → AI response)
- Earnings chart / progress visualization
- Clean, modern UI using Tailwind + shadcn-style components

## Tech Stack
- Next.js (App Router)
- React
- Tailwind CSS
- Recharts

## Getting Started
```bash
cd nexora-dashboard-context/nexora-app
npm install
npm run dev
```
Open: http://localhost:3000

---

## Deployment
Deploy on Vercel or any Node host (Next.js standard).

