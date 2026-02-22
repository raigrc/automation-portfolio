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
    title: "AI-Driven Programmer & n8n Automation Developer",
    subtitle:
      "Developer specializing in AI automation workflows, MCP integrations, and multi-platform business systems.",
    bio: "Most of what I do lives inside n8n — wiring up AI models, messaging platforms, and business APIs into workflows that run on their own. I've shipped a voice AI therapy assistant, a WhatsApp automation system, an automated package tracker, and video generation pipelines. I like building things that keep working while nobody's watching.",
    image:
      "https://pub-2dac9c19287347b4a58fd27871bed5d9.r2.dev/RDP%2051112%20GARCIA-low.png",
    email: "ravenjstn.grc@gmail.com",
    linkedin: "https://linkedin.com/in/raigrc/",
    location: "Laguna, Philippines",
    resumeUrl:
      "https://drive.google.com/file/d/1kM9dhIbwR8kF3sz4s9x-oVmuUR8ouNTR/view?usp=sharing",
  });
  console.log("Profile seeded");

  // Skills
  await Skill.deleteMany({});
  await Skill.insertMany([
    // Languages
    { name: "JavaScript", category: "Languages", level: 80, order: 1 },
    { name: "HTML", category: "Languages", level: 75, order: 2 },
    { name: "CSS", category: "Languages", level: 75, order: 3 },

    // Automation Tools
    { name: "n8n", category: "Automation Tools", level: 95, order: 1 },
    {
      name: "MCP (Model Context Protocol)",
      category: "Automation Tools",
      level: 92,
      order: 2,
    },
    { name: "REST APIs", category: "Automation Tools", level: 90, order: 3 },
    {
      name: "WhatsApp Business API (Z-API)",
      category: "Automation Tools",
      level: 88,
      order: 4,
    },
    {
      name: "Telegram Bot API",
      category: "Automation Tools",
      level: 82,
      order: 5,
    },
    { name: "Meta API", category: "Automation Tools", level: 80, order: 6 },
    { name: "Firecrawl", category: "Automation Tools", level: 78, order: 7 },
    { name: "fal.ai", category: "Automation Tools", level: 78, order: 8 },
    { name: "Replicate", category: "Automation Tools", level: 80, order: 9 },
    { name: "Google TTS", category: "Automation Tools", level: 76, order: 10 },
    {
      name: "Google Cloud Functions",
      category: "Automation Tools",
      level: 75,
      order: 11,
    },

    // Databases
    { name: "MongoDB", category: "Databases", level: 85, order: 1 },
    { name: "MySQL", category: "Databases", level: 75, order: 2 },

    // AI Models
    {
      name: "OpenAI (GPT-4.1 / TTS)",
      category: "AI Models",
      level: 90,
      order: 1,
    },
    { name: "Claude (Anthropic)", category: "AI Models", level: 88, order: 2 },
    { name: "Google Gemini", category: "AI Models", level: 85, order: 3 },
    { name: "Hume AI", category: "AI Models", level: 82, order: 4 },
    { name: "ElevenLabs", category: "AI Models", level: 82, order: 5 },
    { name: "Mistral / Qwen", category: "AI Models", level: 78, order: 6 },
    { name: "OpenRouter", category: "AI Models", level: 80, order: 7 },

    // Other
    { name: "Google Workspace", category: "Other", level: 85, order: 1 },
    { name: "Git", category: "Other", level: 80, order: 2 },
    { name: "Docker", category: "Other", level: 60, order: 3 },
  ]);
  console.log("Skills seeded");

  // Experience
  await Experience.deleteMany({});
  await Experience.insertMany([
    {
      company: "Omelas AI",
      role: "AI-Driven Programmer & n8n Automation Developer",
      type: "Full-time",
      location: "Remote",
      startDate: "February 2025",
      endDate: "February 2026",
      current: false,
      order: 1,
      bullets: [
        "Developed AI voice chatbot system for HypnoElp mobile hypnotherapy application using webhook-triggered architecture, providing real-time conversational support for users addressing sleep disorders, smoking cessation, anxiety, and stress management.",
        "Integrated Hume AI emotional intelligence and Eleven Labs voice synthesis APIs to create natural, empathetic voice interactions for personalized hypnotherapy guidance.",
        "Designed and implemented complex automation workflows using n8n, MCP (Model Context Protocol), and AI integrations to transform client business operations and streamline internal processes.",
        "Built comprehensive WhatsApp business automation system using MCP client/server architecture with Z-API integration, enabling automated messaging, contact management, and multi-modal communication.",
        "Developed automated package tracking system (MaxTracks) with real-time status lookup and bulk customer notification capabilities, reducing manual customer service workload by 80%.",
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
      order: 2,
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
      order: 3,
      bullets: [
        "Optimized administrative processes through automation, improving operational efficiency by 20% via systematic tracking and automated follow-up procedures.",
        "Created and maintained comprehensive databases using Excel with automated data validation and reporting features to track over 200 records, reducing manual data entry time by 30%.",
      ],
    },
  ]);
  console.log("Experience seeded");

  // Projects
  await Project.deleteMany({});
  await Project.insertMany([
    {
      title: "AI Hypnotherapy Voice Chat System",
      description:
        "Built a voice AI assistant for the Hypnoelp mobile hypnotherapy app. Users speak, the audio gets transcribed by Mistral Voxtral, an AI processes the context and therapeutic intent, then a spoken response is sent back via OpenAI TTS. Sessions are stored in Supabase so the AI carries context across conversations.",
      tech: [
        "n8n",
        "Mistral Voxtral",
        "OpenAI TTS",
        "Supabase",
        "Webhook API",
        "Real-time",
        "Therapy AI",
        "Voice-to-Voice",
        "Healthcare AI",
      ],
      featured: true,
      order: 1,
    },
    {
      title: "WhatsApp Business Automation System",
      description:
        "Built a WhatsApp automation system using MCP client/server architecture with Z-API integration. Handles automated messaging, contact management, and multi-modal communication. Routes and processes over 1000 messages daily with real-time response capabilities connected to Gmail, Calendar, and Google Sheets.",
      tech: [
        "n8n",
        "MCP",
        "Z-API",
        "MCP Architecture",
        "Gmail Integration",
        "Calendar Integration",
        "Google Sheet",
        "Multi-modal",
        "Real-time",
      ],
      featured: true,
      order: 2,
    },
    {
      title: "MaxTracks - Automated Package Tracking",
      description:
        "Developed an automated package tracking system with real-time status lookup and bulk customer notification capabilities. The system integrates with multiple courier APIs, processes tracking queries automatically, and sends proactive updates to customers, reducing manual customer service workload by 80%.",
      tech: [
        "n8n",
        "OpenAI",
        "MCP",
        "REST API",
        "Bulk Processing",
        "24/7 Availability",
        "Customer Service",
      ],
      featured: true,
      order: 3,
    },
    {
      title: "AI Faceless Video Content Pipeline",
      description:
        "An n8n pipeline with 7 AI agents that handles the full video production cycle — trend research, script writing, visual generation, and voiceover synthesis — without any manual steps in between. Each agent hands off to the next until a finished, platform-ready video comes out the other end.",
      tech: [
        "n8n",
        "Qwen Vision",
        "Mistral AI",
        "Google TTS",
        "Multi-AI Orchestration",
        "End-to-End Automation",
        "7 AI Agents",
        "Multi-Agent",
      ],
      featured: true,
      order: 4,
    },
    {
      title: "Telegram Voice Bot",
      description:
        "A Telegram bot that handles voice messages conversationally. Send it a voice note, it transcribes it with Google Gemini, runs it through an AI agent, and replies with a spoken voice message via OpenAI TTS. Feels more like talking to something than typing commands at it.",
      tech: [
        "n8n",
        "Google Gemini",
        "OpenAI TTS",
        "Telegram API",
        "TTS Enabled",
        "Voice Processing",
        "Natural Conversation",
        "Chatbot",
      ],
      featured: true,
      order: 5,
    },
    {
      title: "WhatsApp AI Chatbot for Any Business",
      description:
        "Built a plug-and-play WhatsApp AI chatbot that any business can deploy in minutes. Connects the WhatsApp Business API to an AI agent with persistent per-user conversation memory — so it actually remembers the context of each conversation. The system prompt is fully customizable, making this a reusable template for any industry or use case.",
      tech: [
        "n8n",
        "WhatsApp API",
        "OpenRouter",
        "GPT-4.1",
        "Window Memory",
        "Conversational AI",
        "Business Chatbot",
        "Think Tool",
        "Per-User Sessions",
      ],
      featured: false,
      order: 6,
    },
    {
      title: "Sora2 AI Video Generation & Auto-Publish Pipeline",
      description:
        "Automated an end-to-end video creation workflow using OpenAI's Sora2 model via the kie.ai API. GPT-4.1 generates a detailed cinematic prompt from a topic idea, Sora2 renders the video in HD, and the pipeline polls for completion before uploading and publishing directly to YouTube through Blotato — fully hands-off from concept to published content.",
      tech: [
        "n8n",
        "Sora2",
        "kie.ai API",
        "GPT-4.1",
        "Blotato",
        "YouTube API",
        "AI Video",
        "Auto-Publish",
        "Content Automation",
      ],
      featured: false,
      order: 7,
    },
    {
      title: "Facebook Marketplace Car Flipping Analyzer",
      description:
        "Built a full car flipping analysis pipeline that pulls live listings from Facebook Marketplace, normalizes the raw data, estimates fair market values using model-specific depreciation logic, and calculates realistic California flip costs. A GPT-powered analyst agent then evaluates each deal and outputs STRONG_BUY, BUY, CONSIDER, or PASS verdicts straight into a Google Sheet.",
      tech: [
        "n8n",
        "Facebook Marketplace API",
        "GPT-4o mini",
        "Google Sheets",
        "Gmail",
        "Market Analysis",
        "ROI Calculator",
        "Risk Assessment",
        "Data Normalization",
      ],
      featured: false,
      order: 8,
    },
    {
      title: "Telegram Stock Analysis AI Agent",
      description:
        "Built a Telegram stock analysis bot that acts like a seasoned Wall Street veteran. Users send any stock ticker and the bot fetches a live TradingView chart with MACD and Volume overlays, analyzes it using a multimodal AI model, and delivers a full technical breakdown — candlestick patterns, support/resistance levels, momentum shifts — topped with a definitive BUY, SELL, or HOLD verdict.",
      tech: [
        "n8n",
        "Telegram API",
        "GPT-4.1",
        "Gemini 2.5 Flash",
        "chart-img API",
        "Technical Analysis",
        "Multi-modal AI",
        "OpenRouter",
        "Conversational Memory",
      ],
      featured: false,
      order: 9,
    },
    {
      title: "AI Content Creation Team with VEO3 & NanoBanana",
      description:
        "Built a Telegram-triggered content pipeline that intelligently routes each input to the right AI model. Text prompts go to NanoBanana for image generation or VEO3 for video; uploaded images get AI-enhanced with SeedDream or converted into video. Everything runs async through fal.ai's queue and polls until complete before sending results back — one message, multiple creative outputs.",
      tech: [
        "n8n",
        "fal.ai",
        "VEO3",
        "NanoBanana",
        "SeedDream v4",
        "Telegram API",
        "Image Generation",
        "Image-to-Video",
        "Async Polling",
      ],
      featured: false,
      order: 10,
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
