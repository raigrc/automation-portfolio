# Mock Interview: Mid-Level AI Automation Engineer @ Core Mind Technology

---

## ROUND 1: INTRODUCTION & BACKGROUND (5-10 min)

### Q1: "Tell us about yourself and your experience with AI automation."

**What they want to hear:** Concise story arc — education → how you got into automation → what you've built → why you're excited about this role.

**Suggested Answer Framework:**
> "I'm Rai, a BS Information Technology graduate, Cum Laude, from PUP. I've spent the past year fully immersed in AI automation — first at Omelas AI where I built production systems like an AI voice chatbot for a hypnotherapy app and a full WhatsApp business automation platform using MCP architecture, then at Zinho Media where I developed n8n workflows for content marketing, stock analysis, and video generation pipelines. I've integrated over 10 different AI models and APIs into production-ready automation systems. I'm looking to bring that experience to a team where I can build at scale and grow into a senior engineering role."

---

### Q2: "How many months of hands-on AI automation experience do you have?"

**Why they ask:** The job requires minimum 18 months. Your timeline is ~15 months.

**How to handle:**
> "I have about 15 months of dedicated, full-time AI automation work — 12 months at Omelas AI and 3 months at Zinho Media. But I'd also note that my internship at Gleent involved process automation as well, and I've been continuously building personal automation projects alongside my main roles. My depth of experience — building production MCP systems, multi-AI integrations, and voice AI pipelines — reflects someone who's operated well beyond a typical 18-month timeline."

**Preparation Note:** Don't lie about the timeline. Reframe it as depth > duration.

---

### Q3: "Why Core Mind Technology? Why this role?"

**Suggested Answer Framework:**
> "Two things stand out. First, you're building production-ready automation systems across voice AI, payment processing, CRM, and web scraping — that's exactly the kind of full-stack automation work I've been doing and want to deepen. Second, the growth path you've outlined — from mid-level to Senior Engineer to Team Lead — tells me you're investing in people, not just filling seats. I want to grow with a company that sees automation engineering as a career, not just a task."

---

## ROUND 2: CORE TECHNICAL — n8n & WORKFLOWS (15-20 min)

### Q4: "Walk us through the most complex n8n workflow you've built."

**What they want:** Proof you can build real, production-grade workflows — not just simple 3-node chains.

**Use: WhatsApp MCP System or MaxTracks**

**Answer Structure:**
1. **Problem** — What business need triggered it
2. **Architecture** — How many nodes, what integrations, how data flows
3. **Challenges** — What broke, what was tricky
4. **Result** — Measurable impact

**Example (MaxTracks):**
> "At Omelas AI, I built MaxTracks — an automated package tracking system. The workflow started with a webhook trigger receiving tracking requests, then hit multiple carrier APIs to fetch real-time status. It processed bulk lookups using a SplitInBatches node, normalized the response data from different carriers into a unified format, then triggered customer notifications via WhatsApp. I also built an error branch that caught failed lookups and routed them to a manual review queue. The result was an 80% reduction in manual customer service work."

**Follow-up they might ask:** "How many nodes was that workflow?" / "How did you handle rate limits?"

---

### Q5: "How do you handle errors and retries in n8n?"

**What they want:** You understand workflow resilience — this is a HUGE part of the job.

**Key concepts you MUST know:**

| Concept | What to Say |
|---|---|
| **Error Workflow** | "I set up dedicated Error Workflows that trigger when any workflow fails — they log the error, send a Slack/email notification, and store the failed execution data for replay." |
| **Retry on Fail** | "Individual nodes can be configured with retry on fail — I typically set 2-3 retries with increasing wait times for API calls." |
| **Error Output Branch** | "In n8n, nodes have an error output you can connect to a fallback path — I use this for graceful degradation instead of hard failures." |
| **Try/Catch with IF nodes** | "For critical paths, I check HTTP response codes with an IF node before proceeding, so I can route errors before they cascade." |
| **Timeout Handling** | "For webhook-based flows, I set appropriate timeout values and have fallback responses so the calling system doesn't hang." |

**PREPARATION NEEDED:** If you haven't explicitly built error workflows, build one before the interview. Set up a simple n8n workflow with:
- A node that intentionally fails
- An Error Workflow that catches it
- Retry logic on an HTTP node
- Screenshot it for reference

---

### Q6: "How do you design a workflow that needs to run reliably 24/7?"

**What they want:** Uptime monitoring and workflow resilience knowledge (listed as preferred skill).

**Key points to cover:**
> "For production workflows, I focus on four things:
> 1. **Idempotency** — Making sure if a workflow runs twice on the same data, it doesn't create duplicates. I use unique IDs and check-before-write patterns.
> 2. **Error isolation** — Each major section of the workflow has its own error handling so one failure doesn't take down the whole chain.
> 3. **Monitoring** — I set up health check pings and error notifications. If a workflow hasn't executed in its expected interval, that triggers an alert.
> 4. **Data persistence** — For long workflows, I save intermediate results so I can resume from the last checkpoint instead of restarting from scratch."

**PREPARATION NEEDED:** Research these n8n-specific monitoring approaches:
- n8n execution history and how to monitor it
- External uptime monitoring tools (UptimeRobot, Better Stack) that can ping webhook endpoints
- n8n's built-in execution data and how to query it
- How to set up a "heartbeat" workflow that checks if other workflows are running

---

### Q7: "Have you used Ottokit or Make? How do they compare to n8n?"

**What they want:** Breadth of knowledge beyond just n8n.

**If you haven't used them:**
> "My primary platform is n8n, which I chose for its self-hosted flexibility, code-node capabilities, and open-source nature. I haven't used Ottokit directly, but I understand it's focused on AI-native workflow automation. Make (formerly Integromat) uses a similar visual workflow paradigm to n8n but is cloud-hosted with a different pricing model. The core concepts — triggers, actions, data transformation, error handling — transfer across all three. I'm confident I can pick up any of them quickly since the underlying patterns are the same."

**PREPARATION NEEDED:**
- Watch a 15-min YouTube overview of **Ottokit** (formerly known as SureTriggers) — understand its AI agent features
- Watch a 15-min YouTube overview of **Make** — understand scenarios, modules, and how it differs from n8n
- Be able to name 2-3 specific differences (e.g., Make's visual data mapping, n8n's code nodes, Ottokit's AI-first approach)

---

## ROUND 3: API & INTEGRATION DEEP DIVE (15-20 min)

### Q8: "Explain how you'd integrate Stripe for automated payment processing in n8n."

**What they want:** Stripe is specifically mentioned in the job. They want to know you can handle payment APIs.

**PREPARATION NEEDED — THIS IS A GAP. Learn these before the interview:**

**Stripe Core Concepts:**
- **API Keys** — Publishable key (frontend) vs Secret key (backend). Never expose secret keys.
- **Webhooks** — Stripe sends events (payment_intent.succeeded, invoice.paid, customer.subscription.created) to your webhook endpoint.
- **Payment Intents** — The modern way Stripe handles payments. A PaymentIntent tracks a payment from creation to completion.
- **Customers** — Stripe Customer objects store payment methods, billing info.
- **Subscriptions** — Recurring billing with plans/prices.

**How to answer:**
> "I'd set up a webhook receiver in n8n listening for Stripe events like `payment_intent.succeeded` or `invoice.payment_failed`. The workflow would:
> 1. Verify the webhook signature to ensure it's actually from Stripe
> 2. Parse the event type and route to different branches — successful payment triggers a CRM update and confirmation email, failed payment triggers a retry notification
> 3. Use the Stripe API to fetch additional details if needed (customer info, subscription status)
> 4. Log everything to a database for reconciliation
>
> For security, I'd store the Stripe secret key as an n8n credential, validate webhook signatures, and never log full card details."

**Hands-on prep:**
- Create a free Stripe test account (no credit card needed)
- Get your test API keys
- Build a simple n8n workflow: Stripe webhook → IF node (check event type) → Google Sheet log
- Test with Stripe's webhook testing tool

---

### Q9: "How do you handle authentication flows — OAuth2, API keys, bearer tokens?"

**What they want:** You understand auth deeply, not just "paste the API key."

**Key concepts:**

| Auth Type | When Used | How It Works |
|---|---|---|
| **API Key** | Simple integrations (OpenAI, Firecrawl) | Key in header or query param. Simple but less secure. |
| **Bearer Token** | Most REST APIs | Token in Authorization header. Often from OAuth2 flow. |
| **OAuth2** | Google, Meta, Slack, etc. | Redirect-based flow: get auth code → exchange for access token → use refresh token to renew. |
| **Webhook Signatures** | Stripe, GitHub, etc. | Verify HMAC signature to prove the webhook is legitimate. |

> "In n8n, I use the built-in credential system for most auth types — it handles OAuth2 redirect flows for Google and Meta APIs, stores API keys securely, and manages token refresh automatically. For custom integrations where n8n doesn't have a built-in credential type, I use the HTTP Request node with manual header configuration. I always store secrets in n8n credentials, never hardcoded in workflow JSON."

---

### Q10: "Tell us about your web scraping experience."

**What they want:** Web scraping is a required skill. This is a gap on your resume.

**Bridge with Firecrawl:**
> "I've used Firecrawl for web scraping and data extraction in my automation workflows at Zinho Media. Firecrawl handles JavaScript-rendered pages, which is critical for modern websites. I used it to extract structured data from web pages, feed it into AI models for analysis, and output the results into automated pipelines — for example, scraping stock data for the AI-powered stock analysis agent I built."

**PREPARATION NEEDED — Build scraping knowledge:**

| Tool | What to Know |
|---|---|
| **Firecrawl** | You've used this — be ready to explain crawl vs scrape mode, how you handled pagination |
| **Puppeteer/Playwright** | Headless browser automation. Know the concept even if you haven't used it in n8n |
| **Cheerio** | HTML parsing library. Can be used in n8n Code nodes |
| **n8n HTTP Request + HTML Extract** | n8n has a built-in HTML Extract node for simple scraping |
| **Anti-bot measures** | Rate limiting, rotating proxies, user-agent headers, handling CAPTCHAs |

**Hands-on prep:**
- Build an n8n workflow that scrapes a simple website (e.g., extract product names/prices from a public page)
- Use the HTTP Request node → HTML Extract node pattern
- Also build one with Firecrawl for JS-heavy sites
- Be ready to discuss: rate limiting, respecting robots.txt, handling pagination

---

### Q11: "How do you integrate Google APIs? Which ones have you worked with?"

**What they want:** Google integrations are specifically mentioned in the job.

**Your strength — lean into Google Workspace experience:**
> "I've extensively used Google Sheets API for data storage and reporting in my automation workflows, Google Drive API for file management, and Gmail API for automated email notifications. In n8n, I use the built-in Google nodes with OAuth2 credentials. I've also worked with Google Cloud Functions for serverless webhook processing."

**Be ready to discuss:**
- Google Sheets as a lightweight database for automations
- Google Drive file upload/download automation
- Gmail send/read automation
- Google Calendar event creation
- Google Cloud Functions for custom webhook endpoints

---

## ROUND 4: VOICE AI & VAPI (10-15 min)

### Q12: "Have you worked with VAPI? Tell us about your voice AI experience."

**What they want:** VAPI experience is required. This is your biggest gap.

**Bridge with Hume AI + Eleven Labs:**
> "I built a complete voice AI chatbot system for the HypnoElp hypnotherapy app. The architecture used webhook triggers to initiate conversations, Hume AI for emotional intelligence and sentiment analysis, and Eleven Labs for natural voice synthesis. The system handled real-time conversational flows for therapeutic use cases.
>
> I haven't used VAPI specifically, but I've studied its architecture and it follows the same pattern — webhook-triggered voice conversations with configurable AI assistants, tool calling, and voice synthesis. The concepts are identical: you define an assistant with a system prompt, connect a phone number or web widget, handle function calls for custom logic, and manage conversation state. I'm confident I can be productive with VAPI within the first week."

**PREPARATION NEEDED — THIS IS CRITICAL. Study VAPI before the interview:**

### VAPI Crash Course (What You Must Know)

**What VAPI is:**
- Platform for building AI voice agents (phone calls, web calls)
- Handles speech-to-text → LLM → text-to-speech pipeline automatically
- You configure assistants, not build the voice pipeline from scratch

**Core Concepts:**

| Concept | What It Does |
|---|---|
| **Assistant** | The voice agent config — system prompt, model, voice, tools |
| **Phone Number** | Twilio/Vonage number connected to an assistant |
| **Tool Calling** | The assistant can call external APIs mid-conversation (like n8n webhooks) |
| **Server URL** | Your webhook endpoint that VAPI sends events to (conversation updates, function calls, end-of-call reports) |
| **Squads** | Multiple assistants working together, transferring calls between them |
| **Transcriber** | STT engine (Deepgram, Google, etc.) |
| **Voice** | TTS engine (ElevenLabs, PlayHT, Azure, etc.) |
| **Model** | LLM powering the conversation (GPT-4, Claude, etc.) |

**VAPI + n8n Integration Pattern:**
1. VAPI receives a phone call
2. During conversation, VAPI calls a tool (your n8n webhook)
3. n8n processes the request (lookup data, update CRM, etc.)
4. n8n responds with data
5. VAPI uses that data to continue the conversation

**Hands-on prep (DO THIS):**
- Create a free VAPI account at vapi.ai
- Build a simple assistant with a system prompt
- Connect it to an n8n webhook as a tool
- Test it with VAPI's web call feature
- Understand the dashboard: call logs, assistant config, phone numbers
- Watch VAPI's official YouTube tutorials (2-3 videos)

---

### Q13: "How would you build a voice AI system that books appointments?"

**What they want:** Practical voice AI architecture thinking.

> "I'd set this up with VAPI handling the voice conversation and n8n handling the business logic:
>
> 1. **VAPI Assistant** configured with a system prompt that guides the conversation: greet the caller, ask what service they need, ask for preferred date/time
> 2. **Tool: Check Availability** — VAPI calls an n8n webhook with the requested date/time → n8n queries Google Calendar API → returns available slots
> 3. **Tool: Book Appointment** — Once the caller confirms a slot, VAPI calls another n8n webhook → n8n creates the Google Calendar event, sends a confirmation SMS via Twilio, and updates the CRM
> 4. **Tool: Lookup Customer** — If the caller gives their name/number, VAPI calls n8n to look up their history in the CRM
> 5. **End-of-call webhook** — VAPI sends the full transcript and recording to n8n → n8n stores it and creates a follow-up task if needed
>
> For error handling, I'd configure VAPI's fallback responses for when tools fail, and set up n8n error workflows for each webhook."

---

## ROUND 5: MULTI-AGENT WORKFLOWS (10 min)

### Q14: "What's your experience with multi-agent workflows? How do you design them?"

**What they want:** This is listed as "multi-agent workflow mastery."

**Bridge with your MCP experience:**
> "At Omelas AI, I built a WhatsApp business automation system using MCP client/server architecture — which is fundamentally a multi-agent pattern. The MCP server exposed tools for messaging, contact management, and media processing. The MCP client (the AI agent) could autonomously decide which tools to call based on the conversation context.
>
> For multi-agent specifically, I design them with clear separation of concerns:
> 1. **Router Agent** — Classifies the incoming request and routes to the right specialist
> 2. **Specialist Agents** — Each handles one domain (e.g., billing, support, scheduling)
> 3. **Shared Memory** — A common data store (database or Google Sheet) so agents can access each other's context
> 4. **Handoff Protocol** — Clear rules for when one agent should transfer to another, including passing conversation history
>
> In n8n, I implement this with a main workflow that acts as the router, using an AI node to classify intent, then calling sub-workflows for each specialist agent via the Execute Workflow node."

**PREPARATION NEEDED:**
- Build a simple multi-agent workflow in n8n:
  - Workflow 1: Router (webhook → AI classify intent → call sub-workflow)
  - Workflow 2: FAQ Agent (handles common questions)
  - Workflow 3: Escalation Agent (creates ticket and notifies human)
- Understand these multi-agent patterns: sequential, parallel, router, hierarchical

---

### Q15: "How do you handle context passing between agents?"

> "There are a few approaches I use depending on the complexity:
> 1. **Direct parameter passing** — For simple chains, pass the conversation history and relevant data as input to the Execute Workflow node
> 2. **Shared database** — For complex systems, each agent reads/writes to a shared store (Supabase, Google Sheets, or a JSON file) keyed by session ID
> 3. **n8n's built-in memory nodes** — For AI agents in n8n, I use the Window Buffer Memory or Postgres Chat Memory to maintain conversation context
> 4. **MCP context** — In MCP architectures, the protocol handles context passing natively between client and server"

---

## ROUND 6: PRODUCTION & DEPLOYMENT (10 min)

### Q16: "How do you deploy and maintain n8n in production?"

**PREPARATION NEEDED:**

**Key deployment concepts:**
| Topic | What to Know |
|---|---|
| **Self-hosted n8n** | Docker deployment, environment variables, PostgreSQL as database (not default SQLite) |
| **n8n Cloud** | Managed hosting, when to use it vs self-hosted |
| **Environment Variables** | N8N_HOST, N8N_PORT, DB_TYPE, EXECUTIONS_PROCESS (main vs own — own for production) |
| **Scaling** | Queue mode with Redis + workers for high-volume workflows |
| **Backups** | Export workflows as JSON, database backups, credential backup strategy |
| **Version Control** | Export workflows to Git, use n8n CLI for import/export |

> "I deploy n8n using Docker with PostgreSQL as the backend database — SQLite isn't suitable for production. For credentials, I use environment variables and n8n's built-in encryption. I export workflow JSON files to Git for version control. For monitoring, I set up health check endpoints and error notification workflows. If the volume requires it, I'd use n8n's queue mode with Redis and separate worker instances."

---

### Q17: "How do you create SOPs (Standard Operating Procedures) for your automations?"

**What they want:** Documentation skills — "SOP automation design expertise" is listed as preferred.

> "For every production workflow I build, I document:
> 1. **Purpose & Trigger** — What the workflow does and what triggers it
> 2. **Input/Output Spec** — Expected data format in, expected result out
> 3. **Dependencies** — External APIs, credentials, services required
> 4. **Error Scenarios** — What can go wrong and how the workflow handles it
> 5. **Manual Intervention Guide** — When and how a human should step in
> 6. **Testing Procedure** — How to test the workflow after changes
>
> At Zinho Media, I created detailed technical documentation for every automation project, including setup procedures for end-user implementation. This documentation allowed non-technical team members to understand, maintain, and troubleshoot the workflows independently."

---

## ROUND 7: SCENARIO-BASED QUESTIONS (15 min)

### Q18: "A client's n8n workflow that sends invoices via Stripe stopped working at 2 AM. How do you troubleshoot it?"

> "My troubleshooting sequence:
> 1. **Check n8n execution log** — Find the failed execution, see which node failed and the error message
> 2. **Check the error type:**
>    - **HTTP 401/403** → Credentials expired. Check if API key or OAuth token needs refresh
>    - **HTTP 429** → Rate limit hit. Check if volume spiked unexpectedly
>    - **HTTP 500** → Stripe is down. Check status.stripe.com
>    - **Timeout** → Network issue or payload too large
> 3. **Check Stripe Dashboard** — Look at the webhook delivery logs for failed deliveries
> 4. **Check if anything changed** — Was there a workflow update? Did Stripe update their API?
> 5. **Test in isolation** — Run just the failing node with sample data
> 6. **Fix and add resilience** — Fix the root cause, then add retry logic and better error alerts so we catch it faster next time"

---

### Q19: "You need to build an automation that scrapes competitor pricing daily, analyzes it with AI, and updates a client's pricing in their CRM. Walk us through your approach."

> "I'd break this into three connected workflows:
>
> **Workflow 1: Scrape (Scheduled, daily at 6 AM)**
> - Cron trigger → HTTP Request nodes to competitor sites (or Firecrawl for JS-heavy sites)
> - HTML Extract to parse pricing data
> - Data transformation to normalize different formats
> - Store raw data in Google Sheets or database
> - Error branch: if any scrape fails, log it and continue with available data
>
> **Workflow 2: Analyze (Triggered by Workflow 1 completion)**
> - Read the scraped data
> - AI node (GPT-4/Claude) with a prompt: compare competitor prices, identify trends, recommend adjustments
> - Parse the AI output into structured pricing recommendations
> - Store analysis results
>
> **Workflow 3: Update CRM (Triggered by Workflow 2, with approval gate)**
> - Read the pricing recommendations
> - IF node: if changes are above a threshold, send for human approval (Slack/email notification and pause)
> - If approved or below threshold, update CRM via API
> - Send summary report to the client
>
> I'd separate them into three workflows for reliability — if the AI analysis fails, the scraped data is still preserved and can be reprocessed."

---

### Q20: "We have a client who wants to automate their entire customer onboarding. Phone call → collect info → create accounts → send welcome materials. How would you architect this?"

> "This is a perfect VAPI + n8n + CRM integration:
>
> **Phase 1: Voice Collection (VAPI)**
> - VAPI assistant greets the new customer
> - Collects: name, email, company, plan selection, billing info
> - Tool calls to n8n webhooks to validate email, check for existing accounts
>
> **Phase 2: Account Creation (n8n, triggered by end-of-call webhook)**
> - Parse the call transcript/collected data
> - Create customer in CRM (HubSpot/Salesforce) via API
> - Create Stripe customer and subscription
> - Provision any software accounts they need
> - Generate welcome documents (via Google Docs template + Drive API)
>
> **Phase 3: Welcome Sequence (n8n, triggered after account creation)**
> - Send welcome email with credentials and docs
> - Schedule onboarding call in Google Calendar
> - Add to drip email sequence
> - Notify the client's account manager via Slack
> - Set up 7-day follow-up reminder workflow
>
> **Error handling throughout:**
> - If VAPI call drops, save partial data and trigger re-call or email fallback
> - If Stripe fails, queue for manual processing and notify team
> - Each phase is a separate workflow so failures are isolated"

---

## ROUND 8: CULTURE & WORK STYLE (5-10 min)

### Q21: "This role requires US hours. What's your experience working in a different timezone?"

> "I've worked remotely with international clients throughout my career — at Omelas AI and Zinho Media, both involved async collaboration across timezones. I'm comfortable with US hours and have my workspace set up for productive remote work. I use structured communication — daily updates, documented workflows, and clear handoff notes — so there's never ambiguity about what's been done and what's in progress."

---

### Q22: "How do you prioritize when you have multiple client projects with competing deadlines?"

> "I triage by impact and urgency:
> 1. **Production-down issues** — Anything breaking a live system gets handled immediately
> 2. **Client-facing deadlines** — Deliverables with hard dates come next
> 3. **Improvements and optimizations** — Scheduled into available time blocks
>
> I communicate proactively — if I see a conflict, I flag it early rather than missing a deadline silently. I also build automations to be modular specifically so I can context-switch efficiently between projects."

---

### Q23: "Where do you see yourself in 2 years?"

**Tie to their growth path:**
> "The growth path you've outlined — from mid-level to Senior AI Engineer to Team Lead — aligns exactly with where I want to go. In 2 years, I'd want to be leading automation architecture decisions, mentoring junior engineers, and helping shape the technical direction for client solutions. I'm not just looking for a job — I want to grow with a team that's building something significant in the AI automation space."

---

## QUESTIONS YOU SHOULD ASK THEM

Always have 3-5 questions ready. These show genuine interest:

1. "What does a typical week look like for this role? How many client projects would I handle simultaneously?"
2. "What's your current n8n setup — self-hosted or cloud? What's the scale of workflows running?"
3. "How does the team collaborate on workflow development? Do you use version control for n8n workflows?"
4. "What's the most challenging automation project the team has tackled recently?"
5. "You mentioned growth to Senior Engineer and Team Lead — what does that evaluation process look like? What milestones would I need to hit?"
6. "What AI models and tools is the team currently using most, and where do you see that evolving?"

---

## PREPARATION CHECKLIST

### Must-Do Before Interview (Critical Gaps)

- [ ] **VAPI** — Create free account, build a simple voice assistant, connect to n8n webhook, test web call
- [ ] **Stripe** — Create test account, understand webhooks, build n8n workflow that receives Stripe events
- [ ] **Web Scraping in n8n** — Build workflow: HTTP Request → HTML Extract node. Also refresh Firecrawl knowledge
- [ ] **n8n Error Workflows** — Build one from scratch, understand retry logic and error output branches
- [ ] **Multi-agent workflow** — Build a router + 2 specialist agents in n8n using Execute Workflow node
- [ ] **Ottokit overview** — Watch 15-min YouTube overview, note 3 key differences from n8n
- [ ] **Make overview** — Watch 15-min YouTube overview, note 3 key differences from n8n

### Should-Do (Strengthens Your Position)

- [ ] **n8n Queue Mode** — Read docs on Redis-based queue mode for production scaling
- [ ] **VAPI Squads** — Understand multi-assistant transfer/handoff feature
- [ ] **Google Calendar API** — Build an n8n workflow that creates/reads calendar events
- [ ] **Uptime Monitoring** — Set up UptimeRobot or Better Stack to monitor a webhook endpoint
- [ ] **n8n Docker Deployment** — Understand docker-compose setup with PostgreSQL

### Nice-to-Have (Bonus Points)

- [ ] **Supabase integration** — Popular n8n backend database, know the basics
- [ ] **HubSpot/CRM API** — Understand basic CRM operations (create contact, update deal)
- [ ] **Twilio** — Know how VAPI uses Twilio for phone numbers
- [ ] **Prompt Engineering** — Be ready to write a system prompt for an AI agent on the spot

---

## QUICK REFERENCE: YOUR STRONGEST STORIES

Use these projects as go-to examples throughout the interview:

| Story | Best Used For |
|---|---|
| **HypnoElp Voice Chatbot** | Voice AI experience, real-time systems, AI integration |
| **WhatsApp MCP System** | Multi-agent architecture, MCP knowledge, complex integrations |
| **MaxTracks** | Production impact (80% reduction), error handling, bulk processing |
| **Zinho Media Workflows** | Breadth of n8n experience, working from requirements, documentation |
| **Stock Analysis Agent** | AI-powered analysis, web scraping (Firecrawl), data pipelines |
| **Video Generation Pipeline** | Multi-AI model integration, complex workflow orchestration |

---

*Good luck, Rai! Prepare the Must-Do items and you'll be in a very strong position.*
