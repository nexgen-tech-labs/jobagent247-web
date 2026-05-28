# CLAUDE.md — jobagent007

AI reference file for Claude Code. Read this at the start of every session.

---

## Project Overview

**jobagent007** is an agentic job-getting platform. It helps job seekers use specialised AI agents to:
- Improve CVs for specific roles (ATS target: 90+)
- Scrape and match live job listings from 50+ job portals
- Generate tailored cover letters and recruiter messages
- Prepare for interviews with role-specific questions
- Track applications through the full pipeline

---

## Architecture

```
Vercel (Next.js 15)          ←→  Supabase (Postgres + Storage)
Vercel (Next.js 15)          ←→  Clerk (Auth)
Vercel (Next.js 15)          ←→  Anthropic API (Claude)
Vercel (Next.js 15)          ←→  GCP Cloud Tasks (enqueue scrape jobs)
GCP Cloud Run (Python)       ←→  Scrapling (job scraping)
GCP Cloud Run (Python)       →   Supabase (write scraped jobs)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| Auth | Clerk (`@clerk/nextjs`) |
| Database | Supabase (Postgres) |
| File Storage | Supabase Storage |
| AI | Anthropic Claude (`@anthropic-ai/sdk`) — claude-sonnet-4-6 |
| Scraping | Python + Scrapling on GCP Cloud Run |
| Job Queue | GCP Cloud Tasks |
| Rate Limiting | Upstash Redis (`@upstash/ratelimit`) |
| Error Tracking | Sentry (`@sentry/nextjs`) |
| Icons | lucide-react |

---

## Repository Structure

The Next.js frontend lives in `web/`. Run all frontend commands from `web/`.

```
/
├── web/                        Next.js frontend (run commands from here)
│   ├── app/                    Next.js App Router
│   ├── layout.tsx              Root layout (Clerk provider, Sentry)
│   ├── page.tsx                Landing page
│   ├── dashboard/page.tsx
│   ├── profile/page.tsx
│   ├── cv-agent/page.tsx
│   ├── job-matches/page.tsx
│   ├── applications/page.tsx
│   ├── interview-prep/page.tsx
│   ├── pricing/page.tsx
│   ├── settings/page.tsx
│   └── api/
│       ├── cv/analyse/route.ts
│       ├── cv/improve/route.ts
│       ├── match/score/route.ts
│       ├── apply/cover-letter/route.ts
│       ├── interview/questions/route.ts
│       ├── jobs/search/route.ts
│       └── jobs/scrape/route.ts
├── components/
│   ├── layout/                 Navbar, Sidebar, DashboardLayout
│   ├── landing/                All 15 landing page sections
│   ├── dashboard/              Widget components
│   ├── agents/                 Agent workspace UIs
│   └── ui/                     Shared primitives (GlassCard, GradientButton, etc.)
├── lib/
│   ├── supabase.ts             Supabase client (browser + server)
│   ├── claude.ts               Anthropic SDK wrapper + prompt caching
│   ├── rate-limit.ts           Upstash rate limiter
│   └── mock-data.ts            Mock data for Phase 1
│   ├── components/             All UI components
│   ├── lib/                    Utilities and clients
│   └── middleware.ts           Clerk auth middleware
├── Scrapling/                  Python Scrapling framework (existing)
│   └── scraper_service/        FastAPI service (Phase 4)
├── cv/                         Sample CVs (DOCX) — for testing
├── docs/                       Specs and design docs
├── jobagent007.md              Product spec (user flow + agent scope)
├── instructions.md             Full UI/UX design spec
├── Jobsites.txt                Job portal list (50+ sites)
├── phase2-questions.md         Open questions for Phase 2+
└── middleware.ts               Clerk auth middleware
```

---

## Design System

### Colour Palette

```css
--bg-primary:      #05070D
--bg-secondary:    #0B1020
--surface:         rgba(255, 255, 255, 0.045)
--border:          rgba(255, 255, 255, 0.10)
--accent-violet:   #8B5CF6
--accent-cyan:     #06B6D4
--accent-green:    #22C55E
--accent-amber:    #F59E0B
--text-primary:    #F8FAFC
--text-secondary:  #CBD5E1
--text-muted:      #64748B
```

### Background Gradient

```css
background:
  radial-gradient(circle at top left, rgba(139, 92, 246, 0.25), transparent 35%),
  radial-gradient(circle at top right, rgba(6, 182, 212, 0.18), transparent 35%),
  linear-gradient(180deg, #05070D 0%, #0B1020 100%);
```

### Card Style

```css
background: rgba(255, 255, 255, 0.045);
border: 1px solid rgba(255, 255, 255, 0.10);
border-radius: 24px;
box-shadow: 0 20px 60px rgba(0,0,0,0.25);
/* hover */
transform: translateY(-4px);
border-color: rgba(139, 92, 246, 0.45);
box-shadow: 0 24px 80px rgba(139, 92, 246, 0.18);
```

### Buttons

```css
/* Primary */
background: linear-gradient(135deg, #8B5CF6, #06B6D4);
border-radius: 999px;
padding: 12px 22px;
font-weight: 600;
box-shadow: 0 12px 40px rgba(139, 92, 246, 0.35);

/* Secondary */
background: rgba(255,255,255,0.06);
border: 1px solid rgba(255,255,255,0.12);
border-radius: 999px;
```

### Typography

- **Heading font:** Space Grotesk
- **Body font:** Inter
- **Scale:** 56–72px hero → 36–48px section → 18–24px card → 16–18px body → 12–14px label
- **Style:** Bold, tight headings; scannable body text

### Navbar

```css
position: sticky; top: 0;
backdrop-filter: blur(20px);
background: rgba(5, 7, 13, 0.72);
border-bottom: 1px solid rgba(255,255,255,0.08);
```

---

## Reusable UI Components

Always use these — do not reinvent them:

| Component | Location | Purpose |
|---|---|---|
| `GlassCard` | `components/ui/GlassCard.tsx` | Standard card with glass effect + hover |
| `GradientButton` | `components/ui/GradientButton.tsx` | Primary violet→cyan CTA |
| `SecondaryButton` | `components/ui/SecondaryButton.tsx` | Ghost/outline button |
| `StatusBadge` | `components/ui/StatusBadge.tsx` | Coloured pill status labels |
| `SectionHeader` | `components/ui/SectionHeader.tsx` | Section title + subtitle block |
| `FAQAccordion` | `components/ui/FAQAccordion.tsx` | Expandable FAQ items |
| `AgentWorkflowNode` | `components/ui/AgentWorkflowNode.tsx` | Numbered agent step with connector |

---

## Auth Pattern

- All `/dashboard/*`, `/profile`, `/cv-agent`, `/job-matches`, `/applications`, `/interview-prep`, `/settings` are **protected**
- `middleware.ts` uses Clerk to protect these routes
- Public routes: `/`, `/pricing`
- API routes: validate `auth()` from `@clerk/nextjs/server` before every DB or AI call
- Clerk JWT is mapped to Supabase JWT for RLS (use Clerk's Supabase JWT template)

---

## AI Agent Pattern (Claude API)

All agent calls go through `lib/claude.ts`. Key rules:

1. **Always use prompt caching** — the user's profile + CV text goes in a cached system prompt block. The job description goes in the human turn. This keeps costs low.
2. **Use tool_use for structured output** — ATS scoring, match scoring, gap analysis all return JSON via tool definitions, not free text.
3. **Stream long outputs** — CV rewrites and cover letters stream to the frontend.
4. **Model:** `claude-sonnet-4-6` for all agent calls.

```typescript
// Pattern for a Claude agent call
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 4096,
  system: [
    {
      type: 'text',
      text: userProfileAndCVContext,  // cache this
      cache_control: { type: 'ephemeral' }
    }
  ],
  messages: [{ role: 'user', content: jobDescriptionPrompt }],
  tools: [scoringToolDefinition]  // for structured output
})
```

---

## Rate Limiting

API routes enforce per-user limits via `lib/rate-limit.ts` (Upstash Redis):

| Plan | AI calls/day |
|---|---|
| Free | 5 |
| Pro | 100 |
| Career Accelerator | Unlimited |

Check `publicMetadata.plan` from Clerk to determine tier.

---

## Pricing Tiers

| Plan | Price | Key limits |
|---|---|---|
| Free | £0/mo | 1 CV, 3 job analyses, 5 AI gen/day |
| Pro | £9.99/mo | Unlimited CV, match, cover letters, tracker |
| Career Accelerator | £29.99/mo | Pro + multiple CV versions, mock interviews, export |

---

## Phase Status

| Phase | Status | Description |
|---|---|---|
| Phase 1 | **In progress** | Landing page + full app shell with mock data |
| Phase 2 | Pending | Supabase schema + Clerk wiring + CV upload to Storage |
| Phase 3 | Pending | Claude API wiring for all agent workspaces |
| Phase 4 | Pending | Scrapling on Cloud Run + Cloud Tasks job queue |
| Phase 5 | Pending | Payments (Stripe), export (DOCX/PDF), production hardening |

See `phase2-questions.md` for open decisions that must be resolved before Phase 2.

---

## Key Product Rules

- **Never promise guaranteed employment** — use "increase your chances", "improve quality", "save time"
- ATS target score is **90+** for every generated CV
- Each job gets its own tailored CV + cover letter — never reuse without role-specific customisation
- The platform is UK-first (£ pricing, UK job sites prioritised) until locale decision is made

---

## Environment Variables

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Anthropic
ANTHROPIC_API_KEY=

# GCP
GCP_PROJECT_ID=
GCP_CLOUD_TASKS_QUEUE=
GCP_SERVICE_ACCOUNT_KEY=   # base64-encoded JSON

# Upstash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Sentry
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
```

---

## Do Not

- Do not commit `.env.local` or any file containing real API keys
- Do not add comments explaining what code does — use self-describing names
- Do not add error handling for impossible scenarios — trust framework guarantees
- Do not create new UI primitives without checking the component list above first
- Do not use `any` type in TypeScript — always type properly
- Do not use `console.log` in production code — use Sentry or structured logging
