# Sakis Portfolio - TODO

## Core Setup
- [x] Initialize project scaffold
- [x] Upload profile photo to CDN
- [x] Set up dark theme with glassmorphism design tokens in index.css
- [x] Configure App.tsx with dark theme and routing

## Portfolio Sections
- [x] Hero section: profile photo, name, title, animated intro, CTA buttons
- [x] About Me section: professional background, stats, personal story
- [x] Skills section: AI, automation, full-stack tech stack with animated bars/badges
- [x] Projects/Portfolio section: AI apps and software solutions showcase
- [x] Contact section: form with email notifications to mastorematas@gmail.com

## Backend Features
- [x] tRPC contact form procedure with email notification (subject: "Form send from your Site")
- [x] tRPC AI chatbot procedure using invokeLLM with Gemini system prompt
- [x] Owner notification on contact form submission

## Frontend Features
- [x] Floating AI chatbot widget with open/close toggle
- [x] Smooth scroll navigation with active section highlighting
- [x] Mobile-responsive hamburger menu
- [x] Scroll-triggered animations (framer-motion)
- [x] Glassmorphism card effects
- [x] LinkedIn profile link integration

## Quality & Delivery
- [x] Vitest tests for contact form and chatbot procedures
- [x] Mobile responsiveness check
- [x] Final checkpoint and delivery

## Blog / Insights Section
- [x] Create BlogSection.tsx component with real LinkedIn post content
- [x] Add blog post cards with category tags, read time, and expand/modal functionality
- [x] Add Blog nav item to Navbar
- [x] Register Blog section in Home.tsx
- [x] Write vitest tests for blog data integrity
- [x] Save checkpoint and publish

## 3D Floating Chatbot Button
- [x] Replace flat cyan circle with 3D floating robot widget
- [x] Add floating/bobbing animation, pulsing glow rings, 3D depth layers
- [x] Add hover scale + shadow effects
- [x] Test and checkpoint

## Bot Protection for Contact Form
- [x] Create HumanVerifyChallenge component with random questions pool
- [x] Integrate challenge modal into ContactSection before form submission
- [x] Add server-side challenge answer validation in tRPC contact procedure
- [x] Write vitest tests for challenge logic
- [x] Checkpoint and publish

## Gemini 2.0 Flash Chatbot Integration
- [x] Validate GEMINI_API_KEY works with a real API call test
- [x] Update server/routers.ts chat procedure to call gemini-3-flash-preview directly
- [x] Add .env.example with GEMINI_API_KEY placeholder for self-hosting
- [x] Write vitest test to validate Gemini API key is set
- [x] Checkpoint and publish

## Gmail SMTP Email via Nodemailer
- [x] Store GMAIL_APP_PASSWORD securely as environment variable
- [x] Install nodemailer and @types/nodemailer
- [x] Update server/routers.ts contact procedure to send real email via Gmail SMTP
- [x] Subject line: "ATHANASIOS Site Contact form"
- [x] Update SELF_HOSTING.md with GMAIL_APP_PASSWORD instructions
- [x] Update vitest tests for new email procedure
- [x] Checkpoint and publish

## Hero Section Tagline Update
- [x] Replace "Athanasios / Athanasopoulos" heading with AI-focused tagline
- [x] Keep name visible as a smaller subtitle or badge
- [x] Checkpoint and publish

## Bug Fix: Mobile Navigation Scroll
- [x] Fix mobile menu items not scrolling to sections on tap
- [x] Close menu first, then scroll after short delay to avoid animation conflict
- [x] Test all nav items (Home, About, Skills, Projects, Blog, Contact) on mobile
- [x] Checkpoint and publish

## SEO Fixes
- [x] Shorten page title to 30-60 characters
- [x] Add meta description (50-160 characters)
- [x] Add meta keywords tag with relevant AI/software keywords
- [x] Add Open Graph and Twitter Card meta tags
- [x] Checkpoint and publish

## SEO Round-2 Fixes
- [x] Reduce keywords from 13 to 5 focused keywords
- [x] Fix title still showing 64 chars — set document.title in React App.tsx
- [x] Checkpoint and publish

## Google Search Console Verification
- [x] Add Google site verification meta tag to client/index.html after charset meta
- [x] Checkpoint and publish

## Email Update
- [x] Replace mastorematas@gmail.com display email with sakis@sakis-athan.com in HeroSection.tsx, ContactSection.tsx, Footer.tsx
- [x] Keep mastorematas@gmail.com as the contact form recipient in server/routers.ts (unchanged)
- [x] Checkpoint and publish

## Contact Form Email Update
- [x] Update contact form recipient in server/routers.ts to sakis@sakis-athan.com (sender stays mastorematas@gmail.com)
- [x] Update GMAIL_APP_PASSWORD secret with new 16-char app password
- [x] Checkpoint and publish

## Text Interview Bug Fix
- [ ] Analyze text interview router procedure and AI prompt
- [ ] Fix: AI must ask exactly 15 relevant questions based on Google Grounding search results
- [ ] Fix: AI must stop after question 15 (no infinite questions)
- [ ] Fix: Questions must be case-specific (not generic)
- [ ] Checkpoint and publish
