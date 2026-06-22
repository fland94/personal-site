# Federico Landozzi Personal Site

## Project overview

This is Federico Landozzi's portfolio and live CV. It positions him as a Project
Manager focused on digital transformation, process modernization, delivery
governance and AI-assisted ways of working.

The site is now a Next.js app deployed on Vercel. This is intentional: the
contact form needs a server-side endpoint for real email delivery.

## Architecture

- Framework: Next.js App Router
- Language: TypeScript
- Styling: global CSS tokens in `app/globals.css`
- Deployment: Vercel
- Contact email provider: Resend API through `app/api/contact/route.ts`
- Main content: `app/page.tsx`
- Project data: `src/data/projects.ts`
- Quote data: `src/data/quotes.ts`
- Static images and decks: `public/`

## Required environment variables

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=federicolandozzi94@gmail.com
CONTACT_FROM_EMAIL=Portfolio Contact <hello@your-verified-domain.com>
```

`CONTACT_FROM_EMAIL` must use a sender verified in Resend. During setup, Resend's
test sender may work only with limited recipients.

## Projects workflow

Projects are intentionally easy to update. Add or edit entries in
`src/data/projects.ts`.

Each project can point to a standalone HTML presentation stored in:

```txt
public/presentations/
```

For a new project, add:

- `slug`
- `title`
- `description`
- `summary`
- `category`
- `year`
- `tags`
- `role`
- `outcome`
- `highlights`
- `thumbnail`
- `presentationPath`
- `downloadName`

The card, detail page, iframe preview and download link are generated from that
data.

## Daily quote

The daily quote is deterministic, not random on refresh. The quote is selected
from `src/data/quotes.ts` using the Europe/Rome date key, so refreshing the page
on the same day keeps the same quote.

## Contact form anti-spam

The form includes:

- client and server validation
- hidden honeypot field
- minimum completion time check
- message length limits
- server-side sanitization before sending email

If spam volume grows, add Cloudflare Turnstile to the form and verify the token
inside `app/api/contact/route.ts`.
