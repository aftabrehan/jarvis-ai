# Jarvis AI - A Modern SaaS AI Platform

An AI SaaS platform with conversation, image, music, video, and code generation, built with Next.js 16, React 19, Clerk, Stripe, OpenAI, Replicate, and Prisma.

<a href="https://aftabrehan.com/portfolio/modern-saas-ai-platform"><img src="/.github/images/thumbnail.png" alt="project-thumbnail"/></a>

| [View Project 🔥](https://aftabrehan.com/portfolio/modern-saas-ai-platform) | [Live Preview 🚀](https://jarvis-wex.vercel.app) |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------- |

## Features

- Tailwind design
- Tailwind animations and effects
- Full responsiveness
- Clerk Authentication (Email, Google, 9+ Social Logins)
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Image Generation Tool (Open AI)
- Video Generation Tool (Replicate AI)
- Conversation Generation Tool (Open AI)
- Music Generation Tool (Replicate AI)
- Page loading state
- Stripe monthly subscription
- Free tier with API limiting
- Writing POST, DELETE, and GET routes in route handlers (app/api)
- Fetching data in server react components by directly accessing the database (WITHOUT API! like Magic!)
- Handling relations between Server and Child components!
- Folder structure in Next 13 App Router
- Reusable layouts

## Getting Started

1. Install **Git** and **Node.js 20.9 or newer**. Node.js 20 LTS is recommended.
2. Clone this repository to your local machine.

```
git clone https://github.com/aftabrehan/jarvis-ai.git
```

3. Install dependencies, copy the environment template, and fill in your credentials:

```bash
npm install
cp .env.example .env
```

The model variables in `.env.example` have working defaults. Replicate model IDs can be overridden without changing source code.

`ENABLE_DEMO_FALLBACK=true` keeps the portfolio usable when an AI key is missing, invalid, out of quota, or its provider is unavailable. Demo responses are clearly labeled in the UI. Set it to `false` when you want provider failures returned as API errors instead.

#### 4. Clerk Authentication Keys

- Visit the Clerk dashboard: [https://clerk.com](https://clerk.com)
- Log in to your Clerk account or sign up if you don't have one.
- Navigate to the "Projects" section and select your project.
- Go to the "API Keys" tab.
- Copy the "Publishable Key" into `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in `.env`.
- Copy the "Secret Key" into `CLERK_SECRET_KEY` in `.env`.

#### 5. OpenAI API Key

Visit [OpenAI](https://platform.openai.com/signup) and sign up for an account. Once registered, find your API key in the API section of your account settings. Copy the key and set it as the `OPENAI_API_KEY` in your project's environment.

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 6. Replicate API Token

Sign up or log in to [Replicate](https://replicate.ai/). Once logged in, navigate to your account settings, and find your API token. Copy the token and set it as the `REPLICATE_API_TOKEN` in your project's environment.

```env
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 7. Stripe API and Webhook Keys

For Stripe, sign up or log in to your [Stripe Dashboard](https://dashboard.stripe.com/register). Once logged in, create new project, get **secret key** by visiting [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys), and then get **webhook secret** by visiting [dashboard.stripe.com/webhook](https://dashboard.stripe.com/webhook). Then, set them as `STRIPE_API_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in your project's environment.

```env
STRIPE_API_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 8. App Base URL

Set the base URL of your application as `NEXT_PUBLIC_APP_URL` in your project's environment.

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 9. Crisp Website ID

Sign up on [Crisp](https://crisp.chat/en) and create a website. Once created, find your website ID in the Crisp dashboard and set it as `NEXT_PUBLIC_CRISP_WEBSITE_ID` in your project's environment.

```env
NEXT_PUBLIC_CRISP_WEBSITE_ID=xxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx
```

#### 10. PlanetScale/Aiven Database URL

Create [PlanetScale](https://planetscale.com) or [Aiven](https://aiven.io) account. After creating an account, set up a `MySQL` database. In the dashboard, find your database connection details and construct the `DATABASE_URL` in the following format:

```env
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database_name>?ssl-mode=REQUIRED"
```

11. Apply the Prisma schema to your MySQL database with `npx prisma db push`.
12. Start development with `npm run dev`.

Before deploying, run the full verification suite:

```bash
npm run check
```

This runs ESLint, TypeScript, and a production build. The production build uses Next.js's supported webpack builder for deterministic CI behavior.

> [!IMPORTANT]
> Keep your API keys and configuration values secure and do not expose them publicly.

## Screenshots:

![Modern UI/UX](/.github/images/main-image.png 'Modern UI/UX')

![Dashboard](/.github/images/dashboard-page.png 'Dashboard')

![Conversation Generation](/.github/images/coversation-page.png 'Conversation Generation')

![Music Generation](/.github/images/music-page.png 'Music Generation')

![Image Generation](/.github/images/image-page.png 'Image Generation')

![Video Generation](/.github/images/video-page.png 'Video Generation')

![Code Generation](/.github/images/code-page.png 'Code Generation')

> [!NOTE]
> This project is designed exclusively for portfolio purposes, and you are welcome to utilize it as you deem fit.
