# Code the Dream Advanced Pre-Work Assignment

This project consists of:

* **Client:** React
* **Server:** Express.js
* **External API:** [SWAPI.tech](https://www.swapi.tech/)

## Running Locally

1. **Clone the repository**

2. **Install all dependencies**

   ```bash
   npm run install-all
   ```

3. **Start the application**

   ```bash
   npm run dev
   ```

## Routes

* Home page → `/`
* Films list → `/films`
* Film page → `/films/{id}`
* Characters list → `/characters`
* Character page → `/characters/{id}`

## Project Structure

```
project-root/
├── client/              # React application (frontend)
│   ├── public/          # Static assets (e.g., starwars-icon.png)
│   └── src/
│       ├── layouts/     # Layout components
│       ├── pages/       # Page components
│       ├── App.jsx      # Root React component
│       ├── App.css      # App styling
│       ├── index.css    # Global styles
│       ├── main.jsx     # Entry point for React
│
├── server/              # Express.js application (backend)
│   ├── routes/          # API routes
│   ├── constants/       # Constants and config values
│   └── index.js         # Server entry point
│
├── package.json         # Root scripts (install-all, dev, etc.)
└── README.md
```
