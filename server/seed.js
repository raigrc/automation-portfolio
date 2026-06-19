require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

const Profile = require("./models/Profile");
const Skill = require("./models/Skill");
const Experience = require("./models/Experience");
const Project = require("./models/Project");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  // Profile
  await Profile.deleteMany({});
  await Profile.create({
    name: "Raven Justin P. Garcia",
    title: "AI Engineer & Automation Developer",
    subtitle:
      "Developer specializing in AI automation workflows, MCP integrations, and multi-platform business systems.",
    bio: "Most of what I do lives inside n8n and Claude Code — wiring up AI models, scraping pipelines, and business APIs into workflows that run on their own. I've shipped a voice AI therapy assistant, a WhatsApp automation system, a multi-source lead acquisition pipeline, and cross-platform social automation across 5 platforms. Recently promoted to manage the AI/Dev department at Core Mind Technology — I still write the code, I just also make sure the team does too. I like building things that keep working while nobody's watching.",
    image:
      "https://pub-2dac9c19287347b4a58fd27871bed5d9.r2.dev/RDP%2051112%20GARCIA-low.png",
    stack: "Claude · n8n · React · Node.js · MongoDB · Supabase · OpenAI",
    email: "ravenjstn.grc@gmail.com",
    linkedin: "https://linkedin.com/in/raigrc/",
    location: "San Pedro, Laguna, Philippines",
    resumeUrl:
      "https://drive.google.com/file/d/1DXnfAzMIrcyIEg0tQNnu6qzuQHMg_K33/view?usp=sharing",
  });
  console.log("Profile seeded");

  // Skills
  await Skill.deleteMany({});
  await Skill.insertMany([
    // Languages
    { name: "JavaScript", category: "Languages", level: 85, order: 1 },
    { name: "TypeScript", category: "Languages", level: 78, order: 2 },
    { name: "Python", category: "Languages", level: 72, order: 3 },
    { name: "HTML", category: "Languages", level: 80, order: 4 },
    { name: "CSS", category: "Languages", level: 78, order: 5 },

    // Frameworks
    { name: "React", category: "Frameworks", level: 80, order: 1 },
    { name: "Next.js", category: "Frameworks", level: 78, order: 2 },
    { name: "Tailwind CSS", category: "Frameworks", level: 85, order: 3 },

    // Automation Tools
    { name: "n8n", category: "Automation Tools", level: 95, order: 1 },
    { name: "MCP", category: "Automation Tools", level: 92, order: 2 },
    { name: "VAPI", category: "Automation Tools", level: 85, order: 3 },
    { name: "REST APIs", category: "Automation Tools", level: 90, order: 4 },
    { name: "WhatsApp Business API (Z-API)", category: "Automation Tools", level: 88, order: 5 },
    { name: "Telegram Bot API", category: "Automation Tools", level: 82, order: 6 },
    { name: "Meta API", category: "Automation Tools", level: 80, order: 7 },
    { name: "LinkedIn API", category: "Automation Tools", level: 78, order: 8 },
    { name: "Twitter / X API", category: "Automation Tools", level: 76, order: 9 },
    { name: "YouTube Data API", category: "Automation Tools", level: 78, order: 10 },
    { name: "Slack API", category: "Automation Tools", level: 80, order: 11 },
    { name: "Google Cloud Functions", category: "Automation Tools", level: 75, order: 12 },
    { name: "Smartlead", category: "Automation Tools", level: 75, order: 13 },
    { name: "Close CRM", category: "Automation Tools", level: 72, order: 14 },
    { name: "GoHighLevel (GHL)", category: "Automation Tools", level: 60, order: 15 },

    // Scraping & Data
    { name: "Apify", category: "Scraping & Data", level: 80, order: 1 },
    { name: "Crawlee", category: "Scraping & Data", level: 75, order: 2 },
    { name: "Firecrawl", category: "Scraping & Data", level: 78, order: 3 },

    // AI Models
    { name: "OpenAI (GPT-4.1/TTS)", category: "AI Models", level: 92, order: 1 },
    { name: "Claude (Anthropic)", category: "AI Models", level: 90, order: 2 },
    { name: "Google Gemini", category: "AI Models", level: 85, order: 3 },
    { name: "xAI / Grok", category: "AI Models", level: 78, order: 4 },
    { name: "Hume AI", category: "AI Models", level: 82, order: 5 },
    { name: "ElevenLabs", category: "AI Models", level: 82, order: 6 },
    { name: "Mistral/Qwen", category: "AI Models", level: 78, order: 7 },
    { name: "OpenRouter", category: "AI Models", level: 82, order: 8 },
    { name: "fal.ai", category: "AI Models", level: 78, order: 9 },
    { name: "Replicate", category: "AI Models", level: 76, order: 10 },
    { name: "Google TTS", category: "AI Models", level: 76, order: 11 },

    // DevOps & CI/CD
    { name: "GitHub Actions", category: "DevOps & CI/CD", level: 78, order: 1 },
    { name: "Vercel", category: "DevOps & CI/CD", level: 82, order: 2 },
    { name: "Docker", category: "DevOps & CI/CD", level: 65, order: 3 },
    { name: "Git", category: "DevOps & CI/CD", level: 85, order: 4 },
    { name: "pnpm", category: "DevOps & CI/CD", level: 80, order: 5 },

    // Databases
    { name: "MongoDB", category: "Databases", level: 85, order: 1 },
    { name: "Supabase", category: "Databases", level: 78, order: 2 },
    { name: "PostgreSQL", category: "Databases", level: 72, order: 3 },
    { name: "MySQL", category: "Databases", level: 75, order: 4 },

    // Cloud Storage
    { name: "Amazon S3", category: "Cloud Storage", level: 72, order: 1 },
    { name: "Google Cloud Storage", category: "Cloud Storage", level: 70, order: 2 },
  ]);
  console.log("Skills seeded");

  // Experience
  await Experience.deleteMany({});
  await Experience.insertMany([
    {
      company: "Core Mind Technology",
      role: "Manager, AI/Dev Department",
      type: "Full-time",
      location: "Remote",
      startDate: "March 2026",
      endDate: "Present",
      current: true,
      order: 1,
      bullets: [
        "Promoted from Mid-Level AI Engineer to Manager within 2 months; lead a team of 3 engineers plus an intern cohort, conduct technical interviews, and maintain delivery across concurrent client builds.",
        "Engineered an end-to-end lead acquisition pipeline for client MightyWell's health enrollment campaign — Apify scraped Facebook Groups, Reddit, and Google Maps; n8n orchestrated the flow; OpenAI scored each lead 1–10 and routed Hot/Warm contacts into automated personalized outbound email, synced to Google Sheets with real-time Slack alerts.",
        "Built a company-wide EOD reporting system: employees submit a 13-field Formaloo form, n8n routes each entry to both direct managers and skip-level leadership via Slack DM, and every submission is logged to Google Sheets — replacing a fully manual process across all 22 FTEs.",
        "Automated content publishing across Facebook, Instagram, TikTok, X, and LinkedIn for CoreMind and subsidiaries — managed via Google Sheet with per-post platform targeting, paired with an AI pipeline that generates platform-specific captions and image prompts on demand.",
        "Shipped a real-time lead pipeline dashboard in Next.js deployed on Vercel, giving leadership live visibility into pipeline stages and conversion metrics without digging through spreadsheets.",
        "Collaborated on an inbound AI voice receptionist for MightyWell built on VAPI — answers prospect questions on first touch with no human required, then routes high-intent callers by transferring to the CEO, sending a Calendly booking link via n8n, or ending the call gracefully.",
      ],
    },
    {
      company: "Omelas AI",
      role: "AI Engineer & Automation Developer",
      type: "Full-time",
      location: "Remote",
      startDate: "February 2025",
      endDate: "February 2026",
      current: false,
      order: 2,
      bullets: [
        "Developed AI voice chatbot system for the HypnoElp mobile hypnotherapy application using a webhook-triggered architecture, providing real-time conversational support for users addressing sleep disorders, smoking cessation, anxiety, and stress management.",
        "Integrated Hume AI emotional intelligence and ElevenLabs voice synthesis APIs to create natural, empathetic voice interactions for personalized hypnotherapy guidance.",
        "Designed and implemented complex automation workflows using n8n, MCP (Model Context Protocol), and AI integrations to transform client business operations and streamline internal processes.",
        "Built a comprehensive WhatsApp business automation system using MCP client/server architecture with Z-API integration, enabling automated messaging, contact management, and multi-modal communication at 1000+ messages per day.",
        "Developed an automated package tracking system (MaxTracks) with real-time status lookup and bulk customer notification capabilities, reducing manual customer service workload by 80%.",
      ],
    },
    {
      company: "Zinho Media",
      role: "Technical Content Creator & Automation Specialist",
      type: "Part-time",
      location: "Remote",
      startDate: "September 2025",
      endDate: "November 2025",
      current: false,
      order: 3,
      bullets: [
        "Received project briefs and built n8n automation workflows from scratch based on client requirements, covering use cases such as content marketing systems, AI-powered stock analysis agents, WhatsApp business chatbots, video generation pipelines, and Facebook Marketplace automation.",
        "Wrote YouTube scripts and technical documentation for each boss-approved workflow, giving content creators clear guidelines on workflow logic, API integrations, and step-by-step setup.",
        "Produced screen recordings of live n8n workflows and integrated tools in action, following the approved script to deliver accurate and easy-to-follow visual walkthroughs.",
        "Integrated AI services including OpenAI GPT-4, Google Gemini, VEO3, Sora2, Firecrawl, and OpenRouter to build production-ready automation solutions.",
      ],
    },
    {
      company: "Gleent Incorporated",
      role: "Administrative Coordinator Intern",
      type: "Internship",
      location: "On-site",
      startDate: "April 2024",
      endDate: "July 2024",
      current: false,
      order: 4,
      bullets: [
        "Optimized administrative processes through automation, improving operational efficiency by 20% via systematic tracking and automated follow-up procedures.",
        "Created and maintained comprehensive databases using Excel with automated data validation and reporting features to track over 200 records, reducing manual data entry time by 30%.",
      ],
    },
  ]);
  console.log("Experience seeded");

  // Projects
  // Work projects carry a `company` (renders a navy/active title bar + company label);
  // personal/portfolio builds leave it empty (inactive title bar). Mirrors the
  // work-vs-personal split documented in the source profile.
  await Project.deleteMany({});
  await Project.insertMany([
    {
      title: "AI Hypnotherapy Voice Chat System",
      company: "Omelas AI",
      icon: "🧘",
      description:
        "Voice AI assistant for the HypnoElp mobile hypnotherapy app. The user speaks, Mistral Voxtral transcribes, an AI processes the context and therapeutic intent, then a spoken reply comes back via OpenAI TTS. Sessions are stored in Supabase so the AI carries context across conversations. Originally built with Hume AI emotional intelligence and ElevenLabs synthesis.",
      tech: ["n8n", "Mistral Voxtral", "OpenAI TTS", "Supabase", "Hume AI", "ElevenLabs", "Voice-to-Voice", "Healthcare AI", "Webhook API"],
      order: 1,
    },
    {
      title: "AI Voice Receptionist",
      company: "Core Mind Technology · MightyWell",
      icon: "📞",
      description:
        "Inbound-call agent that answers prospect questions about plans, subscriptions, and services with no human on first touch. Built on a VAPI voice agent trained on the client's offerings. On buying intent it has three tools: transfer the call to the CEO, send a Calendly booking link via n8n, or end the call gracefully — so high-intent leads always get a human or a calendar link.",
      tech: ["VAPI", "n8n", "Calendly", "OpenAI", "Voice AI", "Inbound Calls", "Call Routing"],
      order: 2,
    },
    {
      title: "WhatsApp Business Automation System",
      company: "Omelas AI",
      icon: "💬",
      description:
        "WhatsApp automation built on MCP client/server architecture with Z-API. Handles automated messaging, contact management, and multi-modal communication. Routes and processes over 1000 messages daily with real-time responses, connected to Gmail, Calendar, and Google Sheets.",
      tech: ["n8n", "MCP", "Z-API", "Gmail", "Google Calendar", "Google Sheets", "Multi-modal", "Real-time", "1000+/day"],
      order: 3,
    },
    {
      title: "Client Acquisition Pipeline",
      company: "Core Mind Technology · MightyWell",
      icon: "🎯",
      description:
        "End-to-end pipeline handling both sourcing and outbound. Apify actors scrape prospects from Facebook groups, Reddit, and Google Maps; data is normalized and deduplicated; OpenAI scores each lead 1–10 and routes into Hot/Warm/Cold; Hot and Warm leads get personalized outbound email automatically. Results sync to Google Sheets with real-time Slack alerts.",
      tech: ["Apify", "n8n", "OpenAI", "Google Sheets", "Slack API", "Lead Scoring", "Outbound Email", "Deduplication"],
      order: 4,
    },
    {
      title: "Real-Time Lead Pipeline Dashboard",
      company: "Core Mind Technology",
      icon: "📊",
      description:
        "Isolated Next.js dashboard giving the team real-time visibility into the lead pipeline — pipeline stages, conversion rates, and performance metrics from live data, so leadership can see where leads stand without digging through spreadsheets. Deployed independently on Vercel.",
      tech: ["Next.js", "Google Sheets", "Vercel", "Dashboard", "Real-time", "Analytics"],
      order: 5,
    },
    {
      title: "Automated EOD Reporting System",
      company: "Core Mind Technology",
      icon: "📋",
      description:
        "End-of-day reporting system that replaced manual status updates across the whole company (22 FTEs). Employees submit a 13-field Formaloo form; an n8n workflow routes each submission via Slack DM to both direct managers and skip-level leadership based on org structure. Every submission is logged to Google Sheets for historical tracking.",
      tech: ["n8n", "Formaloo", "Slack API", "Google Sheets", "Org Routing", "Internal Ops"],
      order: 6,
    },
    {
      title: "Cross-Platform Social Media Automation",
      company: "Core Mind Technology",
      icon: "📡",
      description:
        "Publishes content across five platforms — Facebook, Instagram, TikTok, X, and LinkedIn — from a single Google Sheet. A per-post platform selector controls exactly where each post goes (all five or just one). Supports multiple brands, handling each company's accounts and credentials independently.",
      tech: ["n8n", "Meta Graph API", "LinkedIn API", "Google Sheets", "Multi-platform", "Multi-brand"],
      order: 7,
    },
    {
      title: "AI Content Generation Workflow",
      company: "Core Mind Technology",
      icon: "✍️",
      description:
        "AI pipeline that drafts social captions and image prompts on demand. For each post idea it generates platform-tailored caption variants plus a matching image-generation prompt, producing brand-consistent content at scale across multiple brands and platforms. Feeds directly into the cross-platform posting system.",
      tech: ["n8n", "OpenAI", "Google Sheets", "Content Generation", "Multi-brand", "Image Prompts"],
      order: 8,
    },
    {
      title: "MaxTracks - Automated Package Tracking",
      company: "Omelas AI",
      icon: "📦",
      description:
        "Automated package tracking with real-time status lookup and bulk customer notifications. Integrates multiple courier APIs, processes tracking queries automatically, and sends proactive customer updates — reduced manual customer-service workload by 80%.",
      tech: ["n8n", "OpenAI", "MCP", "REST APIs", "Courier APIs", "Bulk Notifications", "80% CS Reduction"],
      order: 9,
    },
    {
      title: "AI Faceless Video Content Pipeline",
      icon: "🎬",
      description:
        "An n8n pipeline with 7 AI agents covering the full video production cycle — trend research, script writing, visual generation, and voiceover synthesis — with no manual steps in between. Each agent hands off to the next until a finished, platform-ready video comes out.",
      tech: ["n8n", "Qwen Vision", "Mistral AI", "Google TTS", "7 AI Agents", "Multi-Agent", "End-to-End"],
      order: 10,
    },
    {
      title: "Sora2 AI Video Generation & Auto-Publish Pipeline",
      icon: "🎥",
      description:
        "End-to-end video creation using OpenAI Sora2 via the kie.ai API. GPT-4.1 writes a cinematic prompt from a topic, Sora2 renders in HD, the pipeline polls for completion, then publishes to YouTube via Blotato — hands-off from concept to published content.",
      tech: ["n8n", "Sora2", "kie.ai API", "GPT-4.1", "Blotato", "YouTube API", "Auto-Publish"],
      order: 11,
    },
    {
      title: "AI Content Creation Team with VEO3 & NanoBanana",
      icon: "🍌",
      description:
        "Telegram-triggered content pipeline that routes each input to the right model: text → NanoBanana (image) or VEO3 (video); uploaded images → SeedDream enhancement or image-to-video. Runs async through fal.ai's queue and polls until complete.",
      tech: ["n8n", "fal.ai", "VEO3", "NanoBanana", "SeedDream", "Telegram API", "Image-to-Video", "Async Polling"],
      order: 12,
    },
    {
      title: "Telegram Stock Analysis AI Agent",
      icon: "📈",
      description:
        "Telegram bot that analyzes stocks like a Wall Street veteran. Send a ticker and it fetches a live TradingView chart with MACD and Volume overlays, analyzes it with a multimodal model, and returns a technical breakdown — candlestick patterns, support/resistance, momentum — topped with a BUY/SELL/HOLD verdict.",
      tech: ["n8n", "Telegram API", "GPT-4.1", "Gemini 2.5 Flash", "Technical Analysis", "Multi-modal AI"],
      order: 13,
    },
    {
      title: "Facebook Marketplace Car Flipping Analyzer",
      icon: "🚗",
      description:
        "Car-flipping analysis pipeline that pulls live Facebook Marketplace listings, normalizes the data, estimates fair market value using model-specific depreciation logic, and calculates realistic California flip costs. A GPT analyst agent then scores each deal STRONG_BUY / BUY / CONSIDER / PASS into a Google Sheet.",
      tech: ["n8n", "Facebook Marketplace API", "GPT-4o mini", "Google Sheets", "Market Analysis", "ROI Calculator"],
      order: 14,
    },
    {
      title: "Telegram Voice Bot",
      icon: "🎙️",
      description:
        "A Telegram bot that handles voice messages conversationally — transcribes with Google Gemini, runs it through an AI agent, and replies with a spoken voice message via OpenAI TTS.",
      tech: ["n8n", "Google Gemini", "OpenAI TTS", "Telegram API", "Voice Processing", "Conversational AI"],
      order: 15,
    },
    {
      title: "WhatsApp AI Chatbot for Any Business",
      icon: "🤖",
      description:
        "A plug-and-play WhatsApp AI chatbot any business can deploy in minutes. Connects the WhatsApp Business API to an AI agent with persistent per-user conversation memory and a fully customizable system prompt — a reusable template for any industry.",
      tech: ["n8n", "WhatsApp Business API", "OpenRouter", "GPT-4.1", "Per-User Memory", "Reusable Template"],
      order: 16,
    },
    {
      title: "Zinho Media — Client Automation Builds",
      company: "Zinho Media",
      icon: "🛠️",
      description:
        "Built n8n automation workflows from client briefs: content marketing systems, AI-powered stock analysis agents, WhatsApp business chatbots, video generation pipelines, and marketplace automation. Integrated OpenAI GPT-4, Google Gemini, VEO3, Sora2, Firecrawl, and OpenRouter.",
      tech: ["n8n", "OpenAI GPT-4", "Google Gemini", "VEO3", "Sora2", "Firecrawl", "OpenRouter", "Client Work"],
      order: 17,
    },
  ]);
  console.log("Projects seeded");

  console.log("All data seeded successfully!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
