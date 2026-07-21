# ⚡ Support AI — Next-Gen Cognitive Support Agents

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Scalekit](https://img.shields.io/badge/Auth-Scalekit-blueviolet?style=for-the-badge)](https://www.scalekit.com/)

An enterprise-grade, plug-and-play AI Customer Support chatbot solution designed for modern web applications. Train your AI support agent instantly by updating your business knowledge base, and integrate it into any website with a single `<script>` tag.

🔗 **Live Demo**: [support-ai-smoky-ten.vercel.app](https://support-ai-smoky-ten.vercel.app/)

---

## 🌟 Key Features

*   **🔌 Zero-Code Embed**: Integrate the AI support chatbot widget into any website using a single `<script>` tag.
*   **🧠 Managed Knowledge Base**: Provide FAQs, business policies, return guidelines, shipping details, and support hours to customize the chatbot's intelligence.
*   **🔒 Enterprise SSO**: Fully integrated Single Sign-On (SSO) powered by Scalekit, offering robust security and seamless user authentication.
*   **✨ Premium UI/UX**: A state-of-the-art interface built with sleek glassmorphism, dynamic motion animations, custom loader feedback, and responsive layout designs.
*   **💬 Live Sandbox Preview**: A real-time preview panel in the dashboard to test the chatbot's responses before embedding.

---

## 🛠️ Technology Stack

*   **Frontend & Routing**: [Next.js 16](https://nextjs.org/) (App Router & Server Actions)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS for fluid keyframe animations
*   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/) for caching and storing business configurations
*   **Authentication**: [Scalekit SDK](https://www.scalekit.com/) (Enterprise Single Sign-On & OAuth 2.0 connection management)
*   **AI Engine**: [Google Gemini API](https://ai.google.dev/gemini-api) for powerful, contextual customer conversations
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) (`motion/react`) for premium page and component transitions

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

*   Node.js (v18 or higher)
*   MongoDB Instance (Local or MongoDB Atlas)
*   Scalekit Account (for Client ID and Secret key)
*   Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/PiyushVala2208/support-ai.git
    cd support-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env.local` file in the root directory and populate it with the following configuration:
    ```env
    # App config
    NEXT_PUBLIC_APP_URL=http://localhost:3000

    # Scalekit Authentication Credentials
    SCALEKIT_ENVIRONMENT_URL=https://<your-organization>.scalekit.dev
    SCALEKIT_CLIENT_ID=skc_...
    SCALEKIT_CLIENT_SECRET=test_...

    # Database Configuration
    MONGODB_URL=mongodb://localhost:27017/support-ai

    # AI Engine Credentials
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Your application will be live at `http://localhost:3000`.

5.  **Build for production:**
    ```bash
    npm run build
    npm run start
    ```

---

## 💻 How to Embed the AI Chatbot into Your Website

Once you configure your chatbot settings, you can render it on any webpage by injecting the widget client script.

### Step 1: Copy Your Embed Code
Navigate to the **Embed ChatBot** section inside your Dashboard, and copy the auto-generated HTML snippet:

```html
<script
  src="https://support-ai-smoky-ten.vercel.app/chatBot.js"
  data-owner-id="YOUR_USER_ID"
></script>
```

### Step 2: Paste the Script in Your Code
Open your website's HTML source code and paste the copied `<script>` tag directly before the closing `</body>` tag:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Awesome E-Commerce Store</title>
</head>
<body>
  
  <!-- Your website content here -->
  <h1>Welcome to our Store!</h1>

  <!-- Support AI Chatbot Widget -->
  <script
    src="https://support-ai-smoky-ten.vercel.app/chatBot.js"
    data-owner-id="usr_134431782308152071"
  ></script>
</body>
</html>
```

### Step 3: Publish and Test
Refresh or publish your webpage. A modern chat widget floating action button (💬) will appear in the bottom right corner, ready to address customer queries instantly using your configured knowledge base!

---


## 🔒 Security & Performance Optimizations

*   **🔒 Secure Session Isolation**: Session authentication uses cryptographically secure, HttpOnly, and SameSite cookies to protect against Cross-Site Scripting (XSS) and Session Hijacking.
*   **⚡ DB Connection Pooling**: MongoDB database connections use connection caching and pooling patterns inside Mongoose ODM, ensuring fast startup times and preventing database handle resource leakage in Serverless (Vercel) environments.
*   **🌀 Optimized Transition States**: Utilizes dual-mode state managers for inline and layout transitions, providing instant response feedback on interactions and preventing UI flashes.
*   **🛡️ Secure Environment Segregation**: Sensitive credentials like API keys and OAuth secrets are fully containerized in the environment variables, ensuring zero exposure to the client-side bundles.

---

<p align="center">
  Built with ❤️ for modern businesses.
</p>

---

