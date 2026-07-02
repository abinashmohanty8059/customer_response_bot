# Customer Support AI

> An AI-powered customer support dashboard that helps merchants efficiently analyze customer queries, classify tickets, generate professional responses, and maintain a searchable conversation history.

---

# Project Overview

Customer Support AI is a modern single-page web application built using **React 19** and **Vite**. The application assists merchants and small businesses in managing incoming customer support requests by automatically analyzing customer messages using **Google Gemini AI**.

The system classifies each customer message into:

- Category
- Priority
- Sentiment

It also generates a professional AI-assisted reply that can be edited before being saved.

To ensure reliability, the application includes an offline rule-based fallback engine that continues functioning even if the AI service is unavailable.

Unlike traditional ticketing systems, the entire application runs completely on the client side without requiring a backend server or database. All conversations are stored securely inside the browser using Local Storage.

---

# Features

## AI Ticket Analysis

- Analyze customer messages using Google Gemini AI
- Automatic ticket categorization
- Priority prediction
- Sentiment analysis
- Professional AI-generated response

---

## Offline Fallback

If Gemini AI is unavailable due to:

- Missing API key
- Network issues
- API errors

The application automatically switches to a local rule-based analyzer to ensure uninterrupted functionality.

---

## Conversation Management

- Save conversations locally
- Search previous conversations
- View conversation details
- Load conversations back into the workspace
- Delete individual conversations
- Delete all conversations
- Persistent history after browser refresh

---

## Modern UI

- Premium SaaS-inspired interface
- Responsive layout
- Soft blue accent gradients
- Smooth Framer Motion animations
- Light & Dark mode
- Color-coded ticket priorities
- Color-coded ticket sentiments
- Category badges
- Interactive conversation history

---

# Tech Stack

| Technology | Purpose |
|------------|----------|
| React 19 | Frontend Framework |
| Vite | Build Tool |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| Google Gemini API | AI Analysis |
| Local Storage | Client-side Persistence |
| Lucide React | Icons |

---

# Application Workflow

```
Customer Message
        │
        ▼
Analyze with AI
        │
        ▼
Gemini API
        │
        ▼
Category
Priority
Sentiment
AI Reply
        │
        ▼
User Reviews / Edits
        │
        ▼
Save Conversation
        │
        ▼
Local Storage
        │
        ▼
Conversation History
```

---

# Project Structure

```
src/
│
├── assets/
│
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── TicketEditor.jsx
│   ├── DetailsModal.jsx
│   └── SkeletonLoader.jsx
│
├── hooks/
│   └── useLocalStorage.js
│
├── pages/
│   └── Dashboard.jsx
│
├── services/
│   └── gemini.js
│
├── utils/
│   ├── fallback.js
│   ├── badgeStyles.js
│   └── time.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Local Setup Instructions

## 1. Clone Repository

```bash
git clone <repository-url>
```

---

## 2. Navigate

```bash
cd customer-support-ai
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Create Environment File

Create a file named:

```
.env
```

Add:

```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

## 5. Run Development Server

```bash
npm run dev
```

---

## 6. Build Production Version

```bash
npm run build
```

---

# Environment Variables

| Variable | Description |
|-----------|-------------|
| VITE_GEMINI_API_KEY | Google Gemini API Key |

---

# Assumptions Made

Several assumptions were made while developing the application:

- The application is intended for a single local user.
- Conversation history only needs to persist within the user's browser.
- Authentication and authorization are outside the scope of the assignment.
- A backend service is not required.
- Gemini API is available during normal usage, with an offline fallback when unavailable.
- AI-generated responses are intended as drafts and may be edited before saving.
- Browser Local Storage provides sufficient persistence for the assignment.

---

# Design Decisions and Tradeoffs

## Why React?

React provides a component-based architecture that promotes modularity, reusability, and maintainability.

---

## Why Local Storage?

Instead of introducing backend complexity, Local Storage was chosen because it satisfies the assignment requirements while keeping deployment simple.

Tradeoff:

- Data is browser-specific.
- No synchronization across devices.

---

## Why Client-Side Only?

The assignment did not require authentication or multi-user support.

A frontend-only architecture:

- reduces setup complexity
- enables quick local execution
- removes database dependencies

---

## Why Gemini AI?

Gemini provides structured JSON outputs suitable for predictable parsing and ticket classification.

---

## Why Rule-Based Fallback?

AI services can occasionally fail due to:

- Network issues
- Missing API keys
- Rate limits

The fallback ensures uninterrupted functionality and a consistent user experience.

---

## Why Modular Components?

Separating the application into reusable components improves:

- readability
- maintainability
- scalability
- testing

---

# AI Tools Used During Development

The following AI tool was used during development:

- **ChatGPT**

ChatGPT was used to:

- brainstorm UI improvements
- refine application architecture
- improve component organization
- assist with prompt engineering for Gemini
- review edge cases
- generate documentation ideas
- improve overall code readability

All generated code and suggestions were reviewed, tested, modified, and integrated manually before being included in the final application.

---

# What I Would Improve Given More Time

If additional development time were available, I would implement:

## Backend Integration

- User authentication
- Cloud database
- Multi-user support
- Conversation synchronization

---

## Analytics Dashboard

Including:

- Tickets by category
- Priority distribution
- Sentiment trends
- Daily ticket volume
- Average response time

---

## Ticket Management

- Status tracking
- Assign agents
- Ticket labels
- Notes
- Internal comments

---

## AI Improvements

- Suggested follow-up questions
- Tone selection
- Multi-language support
- Confidence scores
- Ticket summarization

---

## Testing

Increase automated testing coverage including:

- Unit tests
- Component tests
- Integration tests
- End-to-end tests

---

## Accessibility

Further improve accessibility by adding:

- keyboard navigation
- enhanced screen reader support
- WCAG compliance improvements

---

# Blockers Encountered

## Blocker

Conversation history was initially overwriting previous saved conversations instead of creating new entries.

### What I Tried

- Reviewed Local Storage implementation.
- Refactored the storage logic to maintain an array of conversations instead of a single object.
- Added unique identifiers for each conversation.
- Updated state management to perform immutable array updates.

### Asked for Help?

Yes.

I consulted **ChatGPT** to discuss possible approaches for improving the persistence logic and identifying why conversations were being replaced.

### Resolution

The issue was resolved by:

- storing conversations as an array
- generating unique IDs
- appending new conversations instead of replacing existing ones
- synchronizing Local Storage with React state

---

## Blocker

Ensuring the application remained functional when the Gemini API was unavailable.

### What I Tried

- Investigated API integration and error handling.
- Implemented graceful exception handling around AI requests.
- Designed a lightweight keyword-based fallback engine.

### Asked for Help?

Yes.

I discussed implementation approaches with **ChatGPT**.

### Resolution

Implemented a local fallback analyzer that classifies customer messages based on predefined keyword rules and generates a template response, allowing the application to remain fully functional even without AI connectivity.

---

# Future Scalability

The current architecture can be extended with:

- Spring Boot backend
- PostgreSQL
- JWT Authentication
- Role-based access
- WebSockets
- Real-time notifications
- Cloud deployment
- Audit logs
- File attachments
- Customer profiles

without requiring significant frontend restructuring.

---

# Conclusion

Customer Support AI demonstrates a clean, modular, and resilient frontend architecture capable of delivering AI-assisted customer support without relying on backend infrastructure. The project emphasizes maintainability, graceful error handling, and a polished user experience while satisfying all functional requirements outlined in the assignment.
