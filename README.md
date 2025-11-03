StackUp AI
AI-Powered Job Tracker & Resume Builder

StackUp AI is a modern web application that helps users manage job applications and automatically generate tailored resumes and cover letters using AI. Built with TypeScript, React, Next.js, Tailwind CSS, and powered by Supabase (for authentication & data) and Vercel (for deployment).

---

Features

- AI-Generated Resumes & Cover Letters — instantly create customized application materials.
- Job Tracker Dashboard — track applied, interviewing, and offer stages easily.
- Secure Auth — Supabase-based authentication and database integration.
- Next.js + Vercel — lightning-fast SSR and scalable deployment.
- Modern UI — Tailwind-styled responsive design.

---

Tech Stack

Category | Technology
Frontend | React, Next.js, TypeScript
Styling | Tailwind CSS
Backend / DB | Supabase
Deployment | Vercel
AI Integration | OpenAI API (if applicable)

---

Installation, Environment & Scripts

Before starting, make sure you have the latest version of Node.js and npm installed. You can follow this guide to update both: https://www.freecodecamp.org/news/how-to-update-node-and-npm-to-the-latest-version/

To set up StackUp AI locally, first clone the repository using: git clone https://github.com/yourusername/stackup-ai.git
Then navigate into the directory with: cd stackup-ai

Next, install all dependencies using: npm install

Once the installation is complete, start the development server by running: npm run dev

After that, open your browser and go to: http://localhost:3000/dashboard to view the app locally.

If your project requires environment variables, create a file named .env.local in the root directory and add the following lines:
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-api-key

You can use these scripts for common tasks:
- npm run dev → Start the app in development mode
- npm run build → Build the production bundle
- npm start → Start the production server
- npm run lint → Run lint checks for code quality

---

Deployment

The project is optimized for deployment on Vercel. Connect your GitHub repository to Vercel, add your environment variables under “Project Settings → Environment Variables,” and deploy. Vercel will automatically detect and build the Next.js configuration.

