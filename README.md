# KeshAI — AI-Powered Intelligent Assistant

<p align="center">
  <strong>An AI-powered assistant built with the MERN stack and a microservices architecture.</strong>
</p>

<p align="center">
  Intelligent conversations, coding assistance, PDF analysis, web search, image generation, and more — in one platform.
</p>

<p align="center">
  <a href="https://github.com/keshviSolanki/KeshAI">GitHub Repository</a>
</p>

---

## Overview

**KeshAI** is an AI-powered assistant designed to provide multiple AI capabilities through a unified web application. It combines a React-based frontend with a Node.js and Express.js microservices backend to support AI-powered conversations, coding assistance, document analysis, web search, image generation, and subscription-based credit management.

The platform uses modern web technologies and AI integrations to provide a responsive user experience while keeping authentication, chat management, AI processing, and billing in separate backend services.

## Features

- **AI Chat Assistant** — Interact with AI models through a conversational interface.
- **Coding Assistant** — Get programming help, code explanations, and development assistance.
- **PDF Analysis with RAG** — Upload PDF documents and ask questions about their content using retrieval-augmented generation.
- **AI Web Search** — Retrieve information from the web through search integrations.
- **AI Image Generation** — Generate images from text prompts through an AI image-generation workflow.
- **Vision Capabilities** — Support image-related AI interactions.
- **Presentation Generation** — Generate presentation files through an AI-powered workflow.
- **Google Authentication** — Sign in using Firebase Authentication and Google login.
- **Chat History** — Manage conversations and retrieve previous messages.
- **Credit Management** — Track usage through a credit-based system.
- **Subscription Billing** — Integrate Razorpay for payment processing and plan upgrades.
- **File Uploads** — Support document and other file workflows.
- **Microservices Architecture** — Separate authentication, chat, AI processing, billing, and API gateway responsibilities.
- **Cloud Integration** — Designed with AWS services and cloud storage integrations.

## Tech Stack

### Frontend
- React.js
- Vite
- Redux Toolkit
- Axios
- Tailwind CSS
- Firebase Authentication
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB and Mongoose
- Redis
- JSON Web Tokens (JWT)
- Firebase Admin SDK
- REST APIs

### AI and Data Processing
- LangChain
- LangGraph
- Retrieval-Augmented Generation (RAG)
- Vector embeddings
- Qdrant vector database
- OpenRouter model integration
- Tavily web search integration
- Monaco Editor

### Payments and Cloud
- Razorpay
- AWS integration for cloud infrastructure and file storage
- Docker
- Docker Compose
- Amazon Elastic Container Registry (ECR)
- Application Load Balancer
- Amazon CloudFront

## System Architecture

KeshAI follows a microservices architecture in which the API gateway routes incoming requests to the appropriate backend service.

```text
                     ┌──────────────────────┐
                     │      React UI        │
                     │    Vite + Redux      │
                     └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │     API Gateway      │
                     │       Port 8000      │
                     └──────────┬───────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
      ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
      │ Auth Service │  │ Chat Service │  │ Agent Service│
      │ Port 8001    │  │ Port 8002    │  │ Port 8003    │
      └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
             │                 │                 │
             ▼                 ▼                 ▼
      ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
      │   MongoDB    │  │   MongoDB    │  │ AI / RAG /   │
      │ User Data    │  │ Chat Data    │  │ Integrations │
      └──────────────┘  └──────────────┘  └──────────────┘

                     ┌──────────────────────┐
                     │   Billing Service    │
                     │      Port 8004       │
                     └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │ Razorpay + Database  │
                     └──────────────────────┘

          Shared infrastructure: Redis, Qdrant, AWS
```

*The diagram represents the logical architecture. Actual request flows and integrations depend on the service implementation and configuration.*

### Backend Services

| Service | Port | Responsibility |
|---|---:|---|
| API Gateway | 8000 | Routes client requests to backend services |
| Authentication | 8001 | User authentication and account management |
| Chat | 8002 | Conversation and message management |
| Agent | 8003 | AI workflows, coding, PDF RAG, search, and generation |
| Billing | 8004 | Subscription plans, payments, and credits |

## How It Works

1. **Authentication:** Users sign in through Google Authentication using Firebase.
2. **Request Routing:** The frontend communicates with the backend through the API gateway.
3. **Conversation Management:** The chat service handles conversations and messages.
4. **AI Processing:** The agent service processes prompts and routes tasks to the relevant AI workflow.
5. **Document Retrieval:** For PDF questions, document content is extracted, embedded, and retrieved to provide relevant context to the language model.
6. **Data and Caching:** MongoDB stores application data, while Redis supports session and caching workflows.
7. **Billing:** The billing service manages payment and credit-related operations.
8. **Cloud Integration:** Supported file and infrastructure workflows can use configured AWS services.

## Project Structure

```text
keshAI/
├── backend/
│   ├── gateway/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── Dockerfile
│   │   └── index.js
│   │
│   ├── services/
│   │   ├── auth/
│   │   ├── chat/
│   │   ├── agent/
│   │   │   ├── agents/
│   │   │   ├── graph/
│   │   │   ├── routes/
│   │   │   └── utils/
│   │   └── billing/
│   │
│   ├── shared/
│   │   └── redis/
│   ├── docker-compose.yml
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── utils/
│   ├── firebase.js
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Getting Started

Follow these steps to run KeshAI locally.

### Prerequisites

Install the following tools:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for containerized services)
- A MongoDB database, such as [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)
- A Redis instance
- Required Firebase and AI provider credentials

### 1. Clone the Repository

```bash
git clone https://github.com/keshviSolanki/KeshAI.git
cd KeshAI
```

### 2. Configure Environment Variables

Create the required `.env` files for the frontend, API gateway, and individual backend services.

Typical locations include:

```text
frontend/.env
backend/gateway/.env
backend/services/auth/.env
backend/services/chat/.env
backend/services/agent/.env
backend/services/billing/.env
```

Configure the variables expected by each service's code. Depending on the enabled features, these may include:

- MongoDB connection strings
- Redis connection URL
- Firebase project configuration
- Firebase Admin credentials or supported application credentials
- JWT and session configuration
- AI provider API keys
- Qdrant connection details
- Tavily API key
- AWS credentials or IAM role configuration
- Cloud storage configuration
- Razorpay key ID and secret
- Frontend origin and gateway URL

For the frontend, configure the Vite variables expected by your code, such as:

```env
VITE_FIREBASE_API_KEY=your_firebase_web_api_key
VITE_SERVER_URL=http://localhost:8000
VITE_RAZORPAY_KEY=your_razorpay_key_id
```

Use the exact variable names expected by each service. The list above is a setup guide, not a substitute for checking each service's configuration.

**Security:** Never commit `.env` files, Firebase service-account JSON files, private keys, or API secrets. Use environment variables or a secure secret manager for credentials.

### 3. Install Dependencies

Install the frontend dependencies:

```bash
cd frontend
npm install
```

Install the backend root dependencies:

```bash
cd ../backend
npm install
```

Install dependencies for each service if they are not already installed through your project scripts:

```bash
cd services/auth
npm install

cd ../chat
npm install

cd ../agent
npm install

cd ../billing
npm install
```

### 4. Start Redis

If Redis is not already running, start it using Docker:

```bash
docker run -d --name redis -p 6379:6379 redis:latest
```

If you already have a Redis container, start that container instead of creating a duplicate.

### 5. Start the Backend Services

Open separate terminals from the project root and run each service using its configured start script.

Example:

```bash
cd backend/gateway
npm run dev
```

```bash
cd backend/services/auth
npm run dev
```

```bash
cd backend/services/chat
npm run dev
```

```bash
cd backend/services/agent
npm run dev
```

```bash
cd backend/services/billing
npm run dev
```

If a service does not define a `dev` script, use the script specified in its `package.json`.

### 6. Start the Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

**Note:** Local startup requires valid environment variables, reachable databases, and configured third-party integrations. Some AI or cloud features may remain unavailable until their provider credentials are configured.

## Environment and Deployment

KeshAI is organized for containerized backend deployment and cloud integration.

The project includes Dockerfiles for backend services and a Docker Compose configuration. The application has also been developed with AWS deployment components such as container images, load balancing, and CloudFront delivery.

Deployment requires environment-specific configuration, secure secret management, service networking, health checks, CORS settings, and database connectivity. Refer to the deployment configuration before deploying to a new environment.

## Security Considerations

- Never expose API keys or service-account private keys in source control.
- Keep `.env` files and Firebase service-account JSON files excluded through `.gitignore`.
- Rotate any credentials that have been exposed.
- Validate authentication and authorization at service boundaries.
- Restrict production CORS origins to trusted frontend domains.
- Use HTTPS for production traffic.
- Verify payment transactions on the backend rather than trusting frontend responses.
- Apply least-privilege permissions to cloud resources and service accounts.

## Future Improvements

- Improve AI response quality and document retrieval.
- Expand supported file formats and document workflows.
- Add stronger monitoring, logging, and service health checks.
- Improve automated testing and CI/CD pipelines.
- Enhance scalability, rate limiting, and production observability.
- Refine the user experience and subscription management.

## Learning Outcomes

This project provides practical experience with:

- Full-stack development using the MERN stack
- Designing and organizing a microservices architecture
- REST API development and service-to-service communication
- Authentication and session management
- AI agent workflows and retrieval-augmented generation
- Vector databases, embeddings, and document retrieval
- Docker-based development and deployment
- Cloud infrastructure and object storage integration
- Payment integration and credit-based billing
- Environment configuration and application security

## Author

**Keshvi Solanki**

- GitHub: [@keshviSolanki](https://github.com/keshviSolanki)
- Project: [KeshAI](https://github.com/keshviSolanki/KeshAI)

---

<p align="center">
  Built with the MERN stack and modern AI technologies.
</p>
