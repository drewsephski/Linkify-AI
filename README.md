<!--  =======================================================  -->
<!--  Linkify AI – README.md                                   -->
<!--  Turn every recording into a polished, SEO-ready article  -->
<!--  =======================================================  -->

<p align="center">
  <img src="https://github.com/user-attachments/assets/04dccf47-316b-46b7-b69b-e07482a683ba" width="750" alt="Linkify AI banner">
</p>

<div align="center">

![Next.js](https://img.shields.io/badge/Built%20with-Next.js-000?logo=next.js)
![OpenAI](https://img.shields.io/badge/Powered%20by-OpenAI-ff69b4?logo=openai)
![Stripe](https://img.shields.io/badge/Payments-Stripe-635bff?logo=stripe)

</div>

---

# 🚀 What is Linkify AI?

**Linkify AI** turns any audio or video file into a ready-to-publish blog post in **less than a minute**.  
No copy-paste, no formatting nightmares, no writer’s block—just hit “Upload”, grab a coffee, come back to a fully formatted, SEO-optimised article in Markdown.

Use it to:
• Repurpose podcast episodes  
• Generate show-notes for YouTube videos  
• Turn webinars into evergreen content  
• … or simply draft your next blog post by talking to a mic!

---

## ✨ Why You’ll Love It

| ⚡ Feature | 💬 Description |
|-----------|---------------|
| 🎙 1-Click Audio/Video → Blog | Drop a file (≤25 MB) and receive a structured article with title, headings, and keywords. |
| 🔐 Clerk Auth | Passwordless magic-link sign-in & social logins out of the box. |
| 🌐 SEO-friendly Output | Automatic meta title & description generation. |
| 🖋 Built-in Markdown Editor | Polish text, insert images, and preview instantly. |
| 💳 Stripe Subscriptions | Usage-based pricing, customer portal, and webhooks ready. |
| ☁️ Infinite Storage | File uploads handled by UploadThing and metadata stored in Neon Postgres. |
| 🛠 Developer First | TypeScript everywhere, shadcn/ui components, TailwindCSS, and Biome formatting. |

---

## 🏗️ Tech Stack

• **Next.js 14** (App Router, RSC, Turbopack)  
• **Tailwind CSS + shadcn/ui** for styling & components  
• **OpenAI GPT-4o** for transcription & content generation  
• **Clerk** – auth & user management  
• **Stripe** – payments & metered billing  
• **Neon** – Postgres serverless database  
• **UploadThing** – resumable uploads  
• Tooling: **Biome**, **Husky**, **eslint**, **prettier**

---

## 🖼️ Architecture (30 sec overview)

```
┌───────────┐      file        ┌────────────┐
|  Browser  | ───────────────▶ | UploadThing|──┐
└───────────┘                 └────────────┘  │
     ▲                                          ▼
     │ RSC/React Server        Webhooks      ┌────────────┐
     │                  ┌───────────────────▶|   Stripe   |
     │                  │                    └────────────┘
     │                  │                       ▲
     │ SSR / API Route  │  auth/session         │
┌────┴─────┐            │                    ┌──┴─────────┐
| Next.js  |            │                    |   Clerk    |
|  Server  |──OpenAI──▶ |  Content Gen       └──┬─────────┘
└──────────┘            │                       │
     │                  │ tRPC (data)           │ JWT
     ▼                  ▼                       ▼
┌────────────┐      ┌─────────────┐        ┌────────────┐
|  Neon DB   │◀──── |  Prisma ORM |        |  Frontend  |
└────────────┘      └─────────────┘        └────────────┘
```

---

## 🗺️ Roadmap

- [ ] Multi-language transcription & translation  
- [ ] AI-generated images via DALL·E 3  
- [ ] Team workspaces and shared billing  
- [ ] WordPress / Ghost / Medium one-click publish plugins  

Vote or suggest new features by opening a [discussion](https://github.com/anayatkhan1/Linkify-AI/discussions) 🚀
