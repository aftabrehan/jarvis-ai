# Jarvis AI - A Modern SaaS AI Platform

![Jarvis AI - A Modern SaaS AI Platform](/.github/images/thumbnail.png 'Jarvis AI - A Modern SaaS AI Platform')

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
- Fetching data in server react components by directly accessing database (WITHOUT API! like Magic!)
- Handling relations between Server and Child components!
- Folder structure in Next 13 App Router
- Reusable layouts

## Getting Started

1. Ensure that **Git** and **NodeJS (18.x.x)** are installed on your system.
2. Clone this repository to your local machine.

```
git clone https://github.com/aftabrehan/jarvis-ai
```

3. Create a `.env` file in the **root** directory and add the following contents to your `.env` file:

```env
# Disable Next.js telemetry
NEXT_TELEMETRY_DISABLED=1

# Clerk redirect URIs
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Clerk redirect URIs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# OpenAI API key
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Replicate API token
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# PlanetScale/Aiven database URL
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database_name>?ssl-mode=REQUIRED"

# Stripe API/webhook secret keys
STRIPE_API_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# App base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Crisp website ID
NEXT_PUBLIC_CRISP_WEBSITE_ID=xxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx
```

#### 4. Clerk Authentication Keys

- Visit the Clerk dashboard: [https://clerk.com](https://clerk.com)
- Log in to your Clerk account or sign up if you don't have one.
- Navigate to the "Projects" section and select your project.
- Go to the "API Keys" tab.
- Copy the "Publishable Key" and replace `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in the `.env.local` file with the copied key.
- Copy the "Secret Key" and replace CLERK_SECRET_KEY in the `.env.local` file with the copied key.

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

#### 11. Setup Prisma

Add MySQL Database (PlanetScale/Aiven). Run `npm install` or `yarn install` and then run the following command to push the queries in the database.

```
npx prisma db push
```

12. Open terminal in root directory. Run `npm install --legacy-peer-deps` or `yarn install --legacy-peer-deps`.

13. Now, the app is fully configured 👍, and you can start using this app with either `npm run dev` or `yarn dev`.

> [!IMPORTANT]
> Keep your API keys and configuration values secure and do not expose them publicly.

## Tech Stack

[![React JS](https://skillicons.dev/icons?i=react 'React JS')](https://react.dev/ 'React JS') [![Next JS](https://skillicons.dev/icons?i=next 'Next JS')](https://nextjs.org/ 'Next JS') [![Typescript](https://skillicons.dev/icons?i=ts 'Typescript')](https://www.typescriptlang.org/ 'Typescript') [![Tailwind CSS](https://skillicons.dev/icons?i=tailwind 'Tailwind CSS')](https://tailwindcss.com/ 'Tailwind CSS') [![Vercel](https://skillicons.dev/icons?i=vercel 'Vercel')](https://vercel.com/ 'Vercel') [![Prisma](https://skillicons.dev/icons?i=prisma 'Prisma')](https://prisma.io/ 'Prisma') [![MySQL](https://skillicons.dev/icons?i=mysql 'MySQL')](https://mysql.com/ 'MySQL')

## Screenshots:

![Modern UI/UX](/.github/images/main-page.png 'Modern UI/UX')

![Conversation Generation](/.github/images/coversation-page.png 'Conversation Generation')

![Music Generation](/.github/images/music-page.png 'Music Generation')

![Image Generation](/.github/images/image-page.png 'Image Generation')

![Code Generation](/.github/images/image-page.png 'Image Generation')

![Video Generation](/.github/images/video-page.png 'Video Generation')

> [!NOTE]
> This project is designed exclusively for portfolio purposes, and you are welcome to utilize it as you deem fit.
