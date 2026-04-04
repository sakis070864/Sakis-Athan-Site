# Self-Hosting Guide — Sakis Portfolio

This guide explains how to run the portfolio on your own server after exporting the code from Manus.

---

## Required Environment Variables

Create a file named `.env` in the project root (never commit it to Git):

```env
# ── AI Chatbot ────────────────────────────────────────────────────────────────
# Your Google Gemini API key — server-side only, powers the AI chatbot.
# Model used: gemini-3-flash-preview
# Get yours free at: https://aistudio.google.com/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# ── Contact Form Email (Gmail SMTP via Nodemailer) ────────────────────────────
# 16-character Google App Password for mastorematas@gmail.com
# How to get one:
#   1. Go to https://myaccount.google.com/apppasswords
#   2. Select app: Mail → device: Other (Custom) → name it "Portfolio"
#   3. Click Generate and copy the 16-character password shown
# Email subject will be: "ATHANASIOS Site Contact form"
GMAIL_APP_PASSWORD=your_16_char_app_password_here

# ── Database ──────────────────────────────────────────────────────────────────
# MySQL connection string
DATABASE_URL=mysql://user:password@host:3306/sakis_portfolio

# ── Authentication ────────────────────────────────────────────────────────────
# Long random string for JWT session signing
# Generate: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_long_random_jwt_secret_here
```

---

## Running Locally

```bash
# 1. Install dependencies
pnpm install

# 2. Create your .env file and fill in the values above

# 3. Start the development server
pnpm dev

# 4. Open http://localhost:3000
```

---

## Production Deployment (PM2)

```bash
# Build the app
pnpm build

# Start with PM2 (auto-loads .env)
npm install -g pm2
pm2 start "node dist/index.js" --name sakis-portfolio
pm2 startup && pm2 save
```

---

## Docker Deployment

```bash
# Build image
docker build -t sakis-portfolio .

# Run — pass secrets via environment flags (never bake into image)
docker run -d \
  -e GEMINI_API_KEY=your_gemini_key \
  -e GMAIL_APP_PASSWORD=your_app_password \
  -e DATABASE_URL=your_db_url \
  -e JWT_SECRET=your_secret \
  -p 3000:3000 \
  sakis-portfolio
```

---

## Security Rules

| Rule | Why |
|---|---|
| Add `.env` to `.gitignore` | Prevents accidental commit of secrets |
| Never hardcode keys in source files | Keys in code = keys in Git history forever |
| Use `chmod 600 .env` | Only your server user can read it |
| Rotate `JWT_SECRET` if compromised | Invalidates all existing sessions |
| Rotate `GMAIL_APP_PASSWORD` if compromised | Revoke at myaccount.google.com/apppasswords |

---

## Contact Form Email

The contact form sends real emails via **Gmail SMTP** using Nodemailer:

- **From:** `mastorematas@gmail.com` (your own Gmail account)
- **To:** `mastorematas@gmail.com`
- **Subject:** `ATHANASIOS Site Contact form`
- **Reply-To:** The visitor's email address (so you can reply directly)
- **Format:** Beautiful HTML email with a plain-text fallback

The email is sent **server-side only** — your App Password is never exposed to the browser.

---

## AI Chatbot Model

The AI chatbot uses **`gemini-3-flash-preview`** — Google's latest frontier Flash model.

- Official docs: https://ai.google.dev/gemini-api/docs/models/gemini-3-flash-preview
- Input limit: 1,048,576 tokens
- Output limit: 65,536 tokens
- Supports: Text, Image, Video, Audio, PDF

The model is called **server-side only** via `server/routers.ts` — your API key is never exposed to the browser.
