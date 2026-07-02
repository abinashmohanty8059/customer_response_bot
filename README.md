# Customer Support AI Dashboard

A premium, modern customer support ticket analysis and automation dashboard inspired by SaaS products like Linear, Stripe, and Notion.

## Features
- **Intelligent Classification**: Leverages Google's latest Gemini 2.5 Flash API to categorize tickets, detect priority levels, assess sentiment, and draft responses.
- **Offline Keyword Fallback**: If the Gemini API key is missing or calls fail, a rule-based offline parser kicks in automatically to label the ticket and generate template replies.
- **Conversation Hub**: Load, edit, delete, and persist analyzed customer support interactions locally.
- **Sleek UX/UI**: Clean borders, Plus Jakarta Sans typography, Framer Motion transitions, and fully responsive layouts.

## Architecture

The project is structured logically into self-contained directories:

```
src/
├── components/          # Reusable UI layout blocks
│   ├── Navbar.jsx       # Global application topbar and status indicator
│   ├── Sidebar.jsx      # Conversation history, search, and delete triggers
│   ├── TicketEditor.jsx # Active ticket content editor, result cards, and reply box
│   └── SkeletonLoader.jsx # Animated pulse cards representing AI processing states
├── hooks/               # Custom React hooks
│   └── useLocalStorage.js # State synchronization hook with browser storage
├── pages/               # Page orchestrators
│   └── Dashboard.jsx    # Central application state and handlers
├── services/            # API connectors
│   └── gemini.js        # Google Gen AI integration with JSON Schema enforcement
├── utils/               # Logic utilities
│   ├── badgeStyles.js   # Color configurations & Lucide icons for badges
│   └── fallback.js      # Keyword classification engine & template responses
├── index.css            # Stylesheets using Tailwind CSS v4 and Google Fonts
└── main.jsx             # React entry point
```

---

## Setup & Running Instructions

### 1. Clone & Install Dependencies
First, ensure you are in the project folder, then run:
```bash
npm install
```

### 2. Configure the Gemini API Key
Create a `.env` file in the root directory (or open the existing one) and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```
> **Note**: If this key is omitted or invalid, the app runs gracefully in offline fallback mode using keyword classification.

### 3. Run Development Server
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## Design Choices & Tradeoffs

1. **Vite & Tailwind CSS v4**: We used Tailwind CSS v4 with the Vite-specific compiler plugin (`@tailwindcss/vite`), which speeds up compilation times significantly and removes the need for PostCSS or tailwind configuration scripts.
2. **Local Storage Persistence**: Avoids backend overhead while maintaining full state recovery across page reloads.
3. **Structured JSON Output**: Configured Gemini using `responseMimeType: "application/json"` to ensure response formats match the exact format expected by our parser.
4. **Offline Resilience**: When API requests fail or no internet is detected, keyword matching classifies the ticket instantly to ensure zero customer downtime.

---

## Future Improvements
- **Bulk Import/Export**: Export conversations to CSV or JSON formats for records.
- **Smart Learning**: Let support agents rate response drafts to fine-tune future model completions.
- **Analytics Overview**: Add a page graphing category distribution, average sentiment, and priority breakdowns over time.

---

## AI Tools Used
- Google Gemini 3.5 Flash / Developer Coding Assistant for building, refining, and pair-programming this project.
