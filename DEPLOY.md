# AmesOmes — Deploy & Content Guide

Everything below is a one-time setup, except "Writing a post," which is your
day-to-day workflow.

---

## 1. Put the code on GitHub

From the project folder:

```bash
git add .
git commit -m "Foundation, journal redesign, and CMS"
```

If you don't have a GitHub repo yet: create an empty one at
https://github.com/new (name it `amesomes`, keep it Private or Public —
your choice), then connect and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/amesomes.git
git branch -M main
git push -u origin main
```

---

## 2. Deploy on Vercel (free)

1. Go to https://vercel.com and sign in **with GitHub**.
2. **Add New → Project**, import the `amesomes` repo.
3. Vercel auto-detects Astro. Leave the defaults and click **Deploy**.
4. You'll get a live URL like `amesomes.vercel.app`.

From now on, **every `git push` to `main` auto-deploys.** No manual uploads.

---

## 3. Point amesomes.com at Vercel (Namecheap)

In Vercel: **Project → Settings → Domains → add `amesomes.com`**. Vercel then
shows you the exact DNS records. They'll look like this:

| Type  | Host | Value              |
| ----- | ---- | ------------------ |
| A     | `@`  | `76.76.21.21`      |
| CNAME | `www`| `cname.vercel-dns.com` |

In Namecheap: **Domain List → Manage → Advanced DNS**. Delete the default
"parking" records, then add the two records above (use the values Vercel
actually shows you — don't assume). DNS can take anywhere from minutes to a
few hours. Vercel handles HTTPS automatically once it verifies.

> Namecheap is **only** your registrar + DNS here. It does not host the site.

---

## 4. Writing a post — the day-to-day

You have a friendly editor at **`/admin`** (Sveltia CMS). Two ways to use it:

### A) Locally (works right now, no login)

In two terminals:

```bash
# terminal 1
npm run dev
# terminal 2
npx @sveltia/cms-proxy-server
```

Open http://localhost:4321/admin → write → **Save**. It writes a Markdown
file into `src/content/blog/`. Then commit + push to publish:

```bash
git add . && git commit -m "New journal entry" && git push
```

### B) From anywhere (after one-time GitHub login setup)

To let you and Amy edit from the live site without a code editor, Sveltia
needs a GitHub login. One-time setup:

1. Edit `public/admin/config.yml` → set `repo: YOUR_USERNAME/amesomes`.
2. Create a GitHub OAuth app + deploy the free auth worker:
   https://github.com/sveltia/sveltia-cms-auth (Cloudflare Workers, free).
   It gives you a `base_url` to add under `backend:` in `config.yml`.
3. Push. Now https://amesomes.com/admin lets either of you log in with
   GitHub and publish — the CMS commits for you and Vercel deploys.

Until step B is done, use option A. Nothing breaks in the meantime.

---

## What each post looks like

The editor produces files like `src/content/blog/my-post.md`:

```markdown
---
title: "My first real post"
description: "A short summary for cards and search."
pubDate: 2026-07-12
category: "Essay"        # optional
heroImage: ../../assets/blog/cover.jpg   # optional
---

Your writing here, in Markdown.
```

`category` and `heroImage` are optional. Reading time is calculated
automatically. Adding a post = new file → commit → push → it appears.
