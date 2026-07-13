# AmesOmes — Master Project Reference

> Single source of truth for the AmesOmes website. Paste this into a new
> conversation to give full context. Last updated: 2026-07-13.

---

## 1. Overview

- **Project:** AmesOmes — a "digital lab for curious minds" (NOT a personal portfolio or corporate site).
- **Domain:** amesomes.com (registered at Namecheap).
- **Owners:** Amy and Omar. On the public site, refer to them only as **Amy** and **Omar**.
- **Live:** Yes — deployed and serving on https://amesomes.com with HTTPS.
- **Repo:** https://github.com/omarwsadek/amesomes (branch `main`).
- **Local folder:** `/Users/omarsadek/Documents/Personal Projects/AmesOmes`

### Sections
Journal (blog), Projects (portfolio), Podcast, About. Tone: intelligent, minimal, curious, editorial, reading-first, typography-driven.

---

## 2. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Astro 7 (static output, Jamstack) |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Content | Astro content collections (Markdown/MDX + zod schemas) |
| CMS | Sveltia CMS (git-based, served at `/admin`) |
| Hosting | Vercel (Hobby / free tier — non-commercial only) |
| Domain/DNS | Namecheap (registrar + DNS only; does not host) |
| Source control | Git + GitHub |
| Fonts | Inter (body) + Instrument Serif (editorial accents), via Google Fonts |
| Editor | VS Code |

**Deploy pipeline:** edit locally → `git push` → GitHub → Vercel auto-builds & deploys → live. No manual uploads.

---

## 3. Design System

- **Dark mode is the primary experience;** light mode supported. Toggle in the navbar, choice saved to `localStorage`, applied before paint (no flash).
- **Class-based dark mode** via Tailwind v4 `@custom-variant dark` on `<html class="dark">`.
- **Color tokens** (CSS variables, flip in dark mode): `--color-ink` (text), `--color-muted` (secondary), `--color-paper` (bg), `--color-surface` (cards), `--color-line` (borders). Used in classes like `text-[var(--color-ink)]`.
- **Typography = the logo:** the wordmark is just let-spaced text "AMESOMES". No icon logo.
- Minimal, spacious, editorial. Avoid: flashy gradients, heavy animation, clutter.

---

## 4. Folder / File Map

```
AmesOmes/
├── astro.config.mjs         # site: https://amesomes.com; mdx, sitemap, tailwind vite plugin
├── src/
│   ├── consts.ts            # SITE_TITLE = "AmesOmes", SITE_DESCRIPTION
│   ├── content.config.ts    # collections: blog, projects, podcast (schemas)
│   ├── styles/
│   │   └── global.css       # Tailwind import, @custom-variant dark, @theme tokens, .prose styles
│   ├── layouts/
│   │   ├── Layout.astro      # shared wrapper: fonts, theme init, SEO meta, Navbar, Footer, <slot/>
│   │   └── BlogPost.astro    # post wrapper (uses Layout)
│   ├── components/
│   │   ├── Navbar.astro       # sticky nav, wordmark, active links, mobile menu, ThemeToggle
│   │   ├── Footer.astro       # minimal footer
│   │   ├── ThemeToggle.astro  # light/dark button (localStorage)
│   │   ├── Hero.astro         # homepage hero
│   │   ├── FormattedDate.astro# date helper (in use)
│   │   ├── BaseHead.astro     # UNUSED (old template leftover)
│   │   ├── Header.astro       # UNUSED (old template leftover)
│   │   └── HeaderLink.astro   # UNUSED (old template leftover)
│   ├── pages/
│   │   ├── index.astro        # home: Hero + "Latest" (currently placeholder cards)
│   │   ├── about.astro        # Amy + Omar bios + "Why AmesOmes?"
│   │   ├── blog/index.astro    # Journal list (reading time + category)
│   │   ├── blog/[...slug].astro# journal post route
│   │   ├── portfolio.astro     # Projects gallery
│   │   ├── portfolio/[slug].astro # project detail (image/video + text)
│   │   ├── podcast.astro       # Podcast list (Spotify embeds)
│   │   ├── podcast/[slug].astro # episode detail
│   │   └── rss.xml.js          # RSS feed (from blog collection)
│   ├── utils/
│   │   ├── readingTime.ts      # ~200 wpm estimate
│   │   ├── spotify.ts          # Spotify share link -> embed URL
│   │   └── video.ts            # YouTube/Vimeo/.mp4 link -> embed
│   ├── content/
│   │   ├── blog/               # journal posts (.md/.mdx) — has samples to delete
│   │   ├── projects/           # example-project.md
│   │   └── podcast/            # example-episode.md
│   └── assets/                 # template images (mostly unused now)
├── public/
│   ├── admin/
│   │   ├── index.html          # loads Sveltia CMS
│   │   └── config.yml          # CMS config (collections, backend, media)
│   └── uploads/                # CMS-uploaded media lives here (served at /uploads/...)
├── api/
│   ├── auth.js                 # GitHub OAuth step 1 (Vercel serverless)
│   └── callback.js             # GitHub OAuth step 2
├── DEPLOY.md                   # deploy + CMS setup guide
├── PROJECT_REFERENCE.md        # this file
└── CLAUDE.md                   # dev notes for AI assistants
```

---

## 5. Content Model (schemas in `src/content.config.ts`)

All `heroImage` fields are **string URLs** (e.g. `/uploads/foo.jpg`), NOT Astro `image()` objects — this is required so the CMS can upload into `/public/uploads`.

**blog:** `title`, `description`, `pubDate`, `updatedDate?`, `category?`, `heroImage?`
**projects:** `title`, `description`, `pubDate`, `tags?[]`, `url?`, `video?`, `heroImage?`
**podcast:** `title`, `description`, `pubDate`, `spotify?`, `heroImage?`

- `category` (blog): free text / select — Journal, Essay, Note, Experiment, Conversation.
- `video` (projects): paste a YouTube, Vimeo, or `.mp4` link → auto-embeds.
- `spotify` (podcast): paste a Spotify episode share link → auto-embeds player.

---

## 6. The CMS (Sveltia) — how content gets added

- **URL:** https://amesomes.com/admin
- **Config:** `public/admin/config.yml`. Backend = GitHub, repo `omarwsadek/amesomes`, media in `public/uploads` (public_folder `/uploads`).
- **Collections:** Journal, Projects, Podcast — each maps to `src/content/<name>`.
- **Publishing:** fill the form → Save/Publish → CMS commits to GitHub → Vercel redeploys → live in ~1 min.

### Login
- **Access Token method (what works in Safari — use this):** GitHub → Settings → Developer settings → Fine-grained tokens → new token, repo = `amesomes`, permission Contents = Read/Write. In CMS click **Sign In Using Access Token**, paste. Token is remembered locally.
- **"Sign In with GitHub" (OAuth) button:** built (via `/api/auth` + `/api/callback` + Vercel env vars) but **Safari blocks the popup handoff** for privacy, so it fails in Safari. It works in Chrome. Access token is the reliable cross-browser path.

### Local editing (no login)
Run in two terminals: `npm run dev` and `npx @sveltia/cms-proxy-server`, then open http://localhost:4321/admin. (Enabled by `local_backend: true`.)

### Giving Amy access
GitHub → repo → Settings → Collaborators → add Amy → **Write** role. She signs in at `/admin` with her own access token.

---

## 7. Deployment & Infrastructure

### Vercel
- Project: `amesomes`, plan: Hobby (free; non-commercial only — if it ever monetizes, needs Pro).
- Auto-deploys on every push to `main`.
- **Environment variables** (Settings → Environment Variables): `OAUTH_GITHUB_CLIENT_ID`, `OAUTH_GITHUB_CLIENT_SECRET` (used by the OAuth login functions; the secret was rotated after initial setup).

### Namecheap DNS (Advanced DNS tab)
Current records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 216.198.79.1 | Automatic |
| CNAME | www | cname.vercel-dns.com | Automatic |

- Both domains show Valid Configuration in Vercel.
- Vercel shows an optional "DNS Change Recommended" for `www` suggesting the newer value `27de46fce5b4616f.vercel-dns-017.com` — cosmetic; current setup works.
- `amesomes.com` (apex) 308-redirects to `www.amesomes.com` (Vercel default).

---

## 8. Everyday Commands

```bash
# from the project folder:
cd "/Users/omarsadek/Documents/Personal Projects/AmesOmes"

npm run dev            # local dev server -> http://localhost:4321
npm run build          # production build (test locally)
npm run preview        # preview the build

# publish changes:
git add -A
git commit -m "Describe the change"
git push               # triggers Vercel auto-deploy
```

---

## 9. Development Philosophy (for future AI assistants)

- Owner is NOT a frontend engineer. Goal: beautiful site, ship fast, learn only what's needed to maintain it.
- **Paste-first workflow:** prefer replacing complete files over tiny snippets; keep explanations short.
- Stay on **Astro** — do NOT pivot to React without a compelling reason.
- Prioritize shipping visible features.

---

## 10. Known Quirks & Notes

- **Building in a Linux sandbox fails** with a `rolldown` native binary error (macOS arm64 node_modules vs Linux). The site builds fine on the Mac — this is environment-only, not a code bug.
- **Git and `.git` writes must happen on the Mac** (a connected sandbox can't write to `.git` or delete Mac-created files).
- **Hero images use plain `<img>`** (not Astro's optimized `<Image>`) so CMS uploads with `/uploads/...` paths work.
- Old Astro-template components (`BaseHead`, `Header`, `HeaderLink`) remain in the repo but are unused.
- The `fonts` block (Atkinson) in `astro.config.mjs` is a template leftover and unused.

---

## 11. Current State / Backlog

**Done:** foundation (Layout, Navbar, Footer, theme toggle, typography), homepage, Journal (list + posts + reading time + category), Projects (gallery + detail with image/video + text), Podcast (list + episode + Spotify embeds), About (real bios), CMS at /admin with all three collections, GitHub deploy + Vercel + custom domain + HTTPS, RSS feed.

**Sample content to delete via CMS:** blog has a "Welcome" post plus a couple of samples and the template's markdown-style-guide / using-mdx; projects and podcast each have one example entry.

**Not done yet / ideas:**
- Homepage "Latest" section still shows **placeholder cards** — wire it to pull the 3 most recent real posts.
- Tags, search, and richer RSS.
- Make the "Sign In with GitHub" button Safari-friendly (optional; access token works fine).
- Favicon / wordmark polish, design refinements.
- Delete leftover unused template components.

---

## 12. Quick Facts (copy/paste)

- Site: https://amesomes.com
- Repo: https://github.com/omarwsadek/amesomes (branch main)
- CMS: https://amesomes.com/admin (Sign In Using Access Token)
- Local: `/Users/omarsadek/Documents/Personal Projects/AmesOmes`
- Stack: Astro + Tailwind v4 + Sveltia CMS + Vercel + Namecheap DNS
- Owners: Amy (graphic designer & personal trainer), Omar (brain doctor & healthcare AI)
