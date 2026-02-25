# 🚀 AI Ticket Triage System (Full Stack + Dockerized)

A full-stack AI-powered support ticket classification system that automatically analyzes customer issues and assigns **category, priority, urgency, and confidence score** using local NLP/heuristic-based logic.

This project is fully dockerized and production-ready.

---

# 🧠 Features

- AI-based ticket classification (local NLP logic — no external APIs)
- Priority detection (P0, P1, P2, P3)
- Category detection (Technical, Billing, Account, Feature Request)
- Confidence score calculation
- Urgency detection
- Delete ticket functionality
- Colored priority badges
- Full-stack dashboard UI
- MongoDB database integration
- Docker & Docker Compose setup

---

# 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Local NLP heuristic engine

### DevOps
- Docker
- Docker Compose

---

# ⚙️ How AI Classification Works (Local NLP Logic)

This project does NOT use OpenAI or external APIs.

Instead it uses:
- keyword matching
- heuristic scoring
- urgency detection logic
- category detection rules

Example:
- "refund", "payment failed" → Billing
- "hacked", "security breach" → P0
- "feature request" → P3

Priority Rules:
- P0 → Critical (system down, hacked, data loss)
- P1 → High (payments failed, login issues)
- P2 → Medium (slow, minor bugs)
- P3 → Low (feature requests)

---

# 🐳 Docker Setup (Full Project Runs in One Command)

## Step 1: Install Docker
Download from:
https://www.docker.com/products/docker-desktop/

Verify:docker --version

---

# 🚀 Run Full Project (Frontend + Backend)

From root folder:docker compose up --build

This will:
- build backend image
- build frontend image
- start containers
- connect everything

---

# 🌐 Access App

Frontend: http://localhost:5173
Backend API: http://localhost:5100

---


# 🧪 Test AI Ticket Classification

Enter example:Payment failed and refund not received


Output:
- Category: Billing
- Priority: P1
- Confidence: 0.9

---

# 🗑️ Delete Ticket Feature

Each ticket has delete button.

API used: DELETE /api/tickets/:id

Removes ticket from MongoDB instantly.

---

# 🐳 Docker Commands (Useful)

Stop containers: docker compose down
Rebuild:docker compose up --build
Check running containers:docker ps
Check images:docker images


---

# 🏆 Resume Project Title

**AI-Powered Support Ticket Triage System (Full Stack + Dockerized)**

---