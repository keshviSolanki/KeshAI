# 🚀 KeshAI — AI-Powered Intelligent Assistant

<p align="center">
  <strong>Your AI-powered workspace for chatting, coding, researching, and creating.</strong>
</p>

<p align="center">
  A full-stack AI assistant built with the MERN stack, microservices architecture, and modern AI technologies.
</p>

<p align="center">
  <a href="https://kiss-levels-outreach-although.trycloudflare.com"><strong>🌐 Try KeshAI Live Demo</strong></a>
  &nbsp; • &nbsp;
  <a href="https://github.com/keshviSolanki/KeshAI"><strong>💻 GitHub Repository</strong></a>
</p>

---

## 🌟 About KeshAI

**KeshAI** is an AI-powered assistant designed to bring multiple AI capabilities into one platform. It combines a modern React frontend with a Node.js and Express backend organized into independent microservices.

The platform aims to make AI-powered conversations, coding assistance, document analysis, web research, and content generation accessible through a single interface.

Built as a full-stack development project, KeshAI integrates authentication, AI workflows, file handling, vector search, and subscription billing into one application.

> **Live Demo Notice:** The demo is shared through a temporary Cloudflare Quick Tunnel connected to the developer's local machine. It is not a permanently hosted production deployment. The link works only while the local computer, frontend preview server, required backend services, and Cloudflare tunnel are running. The URL may change when the tunnel restarts. If the demo is unavailable, please contact the project owner.

## ✨ Features

### 🤖 AI-Powered Assistance
- **AI Chat:** Interact with an AI assistant through a conversational interface.
- **Coding Assistance:** Get help with programming questions and code-related tasks.
- **PDF Analysis:** Upload and analyze PDF documents using Retrieval-Augmented Generation (RAG).
- **Web Research:** Support for web-search-powered information gathering.
- **Image Generation:** Generate images through supported AI integrations.
- **Vision Capabilities:** Support for AI workflows involving image inputs.
- **Content Creation:** AI-assisted document and presentation generation.

### 🔐 Authentication and User Management
- Google sign-in using Firebase Authentication.
- Backend authentication and user verification.
- User-specific conversations and application data.
- Session management using Redis.

### 📄 Document and File Workflows
- File upload and processing workflows.
- PDF question answering using RAG.
- Vector search integration using Qdrant.
- Support for generated documents and presentations.

### 💳 Subscription and Credits
- Credit-based AI usage.
- Free and paid subscription plan support.
- Razorpay integration for payment workflows.

### 🏗️ Scalable Backend Architecture
- Independent backend microservices.
- Centralized API gateway.
- MongoDB for application data.
- Redis for session and caching workflows.
- LangChain and LangGraph for AI application workflows.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript |
| Styling | Tailwind CSS |
| State Management | Redux Toolkit |
| API Communication | Axios |
| Backend | Node.js, Express.js |
| Architecture | Microservices |
| Database | MongoDB, MongoDB Atlas |
| Session and Caching | Redis |
| Authentication | Firebase Authentication, Firebase Admin SDK |
| AI Integration | OpenRouter and supported AI models |
| AI Workflows | LangChain, LangGraph |
| Retrieval-Augmented Generation | Qdrant, embeddings, vector search |
| Web Research | Tavily integration |
| Payments | Razorpay |
| Cloud and Storage Integrations | AWS S3 and related AWS services |
| Public Demo Access | Cloudflare Quick Tunnel |

*The availability of individual integrations depends on their configuration, API credentials, and service status.*

## 🏛️ Architecture

KeshAI uses a microservices architecture in which the frontend communicates with a central API gateway, which routes requests to the appropriate backend services.

```text
                 ┌─────────────────────┐
                 │      User / Browser │
                 └──────────┬──────────┘
                            │
                 ┌──────────▼──────────┐
                 │   React + Vite UI   │
                 │    Port: 4173       │
                 └──────────┬──────────┘
                            │
                 ┌──────────▼──────────┐
                 │     API Gateway     │
                 │     Port: 8000      │
                 └──────────┬──────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
   ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐
   │ Auth Service│   │ Chat Service│   │Agent Service│
   │ Port: 8001  │   │ Port: 8002  │   │ Port: 8003  │
   └─────────────┘   └─────────────┘   └─────────────┘
                            │
                     ┌──────▼──────┐
                     │Billing Svc. │
                     │ Port: 8004  │
                     └─────────────┘

             Supporting Infrastructure
       MongoDB • Redis • Qdrant • AI APIs
```

### Service Overview

| Service | Port | Responsibility |
|---|---:|---|
| Frontend | 4173 | Production preview of the React application |
| API Gateway | 8000 | Routes API requests |
| Auth Service | 8001 | Authentication and user management |
| Chat Service | 8002 | Conversation and message operations |
| Agent Service | 8003 | AI workflows and assistant capabilities |
| Billing Service | 8004 | Credits, plans, and billing operations |

The frontend development server normally uses port `5173`. The production preview uses port `4173`.

## 🌐 Live Demo

**[Open KeshAI →](https://photography-buried-instrumental-animal.trycloudflare.com)**

### Important: Temporary Demo Availability

This demo uses **Cloudflare Quick Tunnel** to make a locally running application accessible through a public HTTPS URL.

- The application is not permanently hosted on a cloud server.
- The developer's computer must remain powered on and connected to the internet.
- The frontend preview, API gateway, required microservices, and supporting local services must be running.
- The public URL may change after the tunnel is restarted.
- If the demo is offline or the link no longer works, please contact the project owner.

For a more reliable, always-available experience, the application would need a persistent deployment and a stable domain.

## ⚙️ Run KeshAI Locally

### Prerequisites

Install or configure the following:

- [Node.js](https://nodejs.org/) and npm
- [Git](https://git-scm.com/)
- MongoDB or MongoDB Atlas
- Redis
- Firebase project with Google Authentication enabled
- Required AI provider API keys
- Additional credentials for any optional integrations you want to use

### 1. Clone the repository

```bash
git clone https://github.com/keshviSolanki/KeshAI.git
cd KeshAI
```

### 2. Install dependencies

Install the dependencies in the frontend, gateway, and each backend service directory.

```bash
cd frontend
npm install
cd ..
```

Repeat `npm install` in the following directories if they contain their own `package.json` files:

```text
backend/gateway
backend/services/auth
backend/services/chat
backend/services/agent
backend/services/billing
```

### 3. Configure environment variables

Create the required `.env` files based on the configuration expected by each service.

Typical configuration categories include:

- MongoDB connection strings
- Redis connection settings
- Firebase client configuration
- Firebase Admin SDK credentials
- AI provider API keys
- Gateway and service URLs
- AWS configuration, when required
- Razorpay test or live credentials, when required

**Security:** Never commit `.env` files, Firebase service-account private keys, payment secrets, or other sensitive credentials to GitHub. Use environment variables and follow each integration's setup documentation.

### 4. Start the backend services

Start Redis and ensure your configured databases and external services are reachable.

Run the API gateway and backend services from their respective directories using the start scripts defined in their `package.json` files.

Start these services:

1. Gateway — port `8000`
2. Authentication — port `8001`
3. Chat — port `8002`
4. Agent — port `8003`
5. Billing — port `8004`

Keep the services running while using the application.

### 5. Start the frontend in development mode

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite, normally:

```text
http://localhost:5173
```

### 6. Build and preview the production frontend

To generate an optimized frontend build:

```bash
cd frontend
npm run build
npm run preview -- --host 0.0.0.0
```

Vite normally serves the preview on port `4173`.

Make sure the API configuration routes requests to the backend gateway correctly in both development and production. The production preview does not automatically inherit Vite's development proxy configuration.

## 🔒 Security Notes

- Keep all private credentials outside version control.
- Never expose Firebase Admin SDK private keys in public repositories.
- Use test credentials when demonstrating payment functionality.
- Restrict administrative and internal service endpoints appropriately.
- Do not treat a temporary public tunnel as a production security boundary.
- Rotate any credentials that may have been exposed.
- Avoid sharing sensitive user information or production logs in public issues.

## 🚀 Future Improvements

- Persistent cloud deployment and a stable custom domain.
- Improved observability and centralized logging.
- More robust error handling and service health monitoring.
- Enhanced document processing and retrieval workflows.
- Expanded AI integrations and user-facing capabilities.
- Additional testing, performance optimization, and security hardening.

## 👩‍💻 Project Owner

**Keshvi Solanki**

B.E. Information Technology | GTU

- **GitHub:** [@keshviSolanki](https://github.com/keshviSolanki)
- **Project Repository:** [KeshAI](https://github.com/keshviSolanki/KeshAI)

For demo availability issues, questions, or suggestions, please contact the project owner through GitHub.

## 📄 License

No license has been specified yet. Unless a license is added to the repository, the project should not be assumed to be available for unrestricted reuse or redistribution.

---

<p align="center">
  <strong>Built with ❤️ using the MERN stack and modern AI technologies.</strong>
</p>

<p align="center">
  ⭐ If you find KeshAI interesting, consider starring the repository!
</p>
