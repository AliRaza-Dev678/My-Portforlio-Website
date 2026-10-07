// Single source of truth for the site and for RazaMind's knowledge base.
// Every fact here mirrors public/CV_Ali_Raza.pdf. Update the CV first, then this file.

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ali-raza-engineer.vercel.app",
  calendlyUrl: "https://calendly.com/aliraza-ai-dev3/30min",
  cvPath: "/CV_Ali_Raza.pdf",
  description:
    "Ali Raza is a Full-Stack AI Engineer who turns AI prototypes into complete, usable software: full-stack apps, voice agents, RAG systems, and automation pipelines with n8n, Make.com, and GoHighLevel.",
};

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "code" | "docs";
};

export type CaseStudy = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  problem: string;
  built: string[];
  stack: string[];
  result: string;
  figures?: { value: string; label: string }[];
  links: ProjectLink[];
  /** Ordered steps of the system, shown as "How it works" on the case study page. */
  flow?: { tool: string; text: string }[];
  videos?: { title: string; embedUrl: string; watchUrl: string }[];
};

const GH = "https://github.com/AliRaza-Dev678";

// The voice agent's booking flow. Used in the hero and on its case study page.
const voiceAgentFlow = [
  { tool: "LiveKit Agents + Silero VAD", text: "A caller speaks in Urdu, English, or Spanish" },
  { tool: "Groq Whisper + ElevenLabs", text: "The agent detects the language and replies in it" },
  { tool: "LLM function calling", text: "It collects guest name, room type, and phone number" },
  { tool: "n8n + Google Sheets", text: "The reservation is logged" },
  { tool: "Evolution API", text: "A WhatsApp confirmation goes out instantly" },
];

export const portfolioData = {
  personal: {
    name: "Ali Raza",
    title: "Full-Stack AI Engineer",
    pitch: "I turn AI prototypes into complete, usable software.",
    pitchDetail:
      "Full-stack apps, voice agents, RAG systems, and automation pipelines on n8n, Make.com, and GoHighLevel.",
    location: "Multan, Pakistan",
    email: "aliraza.ai.dev3@gmail.com",
    phone: "+92 324 5892281",
    linkedin: "https://www.linkedin.com/in/ali-raza-597b013b0/",
    github: GH,
    summary:
      "Full-Stack AI Engineer and Software Engineering undergraduate building intelligent products across React/TypeScript and Next.js frontends, FastAPI services, PostgreSQL/Redis data layers, LLM and agentic workflows, real-time voice AI agents, and n8n / Make.com / GoHighLevel automation pipelines. Further experience spans document and video RAG (SelfRAG and CRAG patterns), LangGraph agents, LangSmith tracing, Flutter mobile development, NLP, and computer vision, with a focus on turning AI prototypes into complete, usable software systems.",
  },

  proof: [
    { value: "Under 1 hour", label: "to onboard a real estate client onto the GoHighLevel snapshot, down from a day of manual edits" },
    { value: "14 workflows", label: "plus 53 custom fields and 32 SMS/email templates in one reusable snapshot" },
    { value: "Under 60 seconds", label: "speed-to-lead response built into the CRM automation" },
    { value: "3 languages", label: "handled by the hotel voice agent: Urdu, English, and Spanish" },
    { value: "10+", label: "end-to-end ML/DL projects published" },
  ],

  // The hero walks through this real flow from the voice agent project.
  heroTrace: {
    caption: "How the hotel receptionist voice agent books a room",
    slug: "multilingual-hotel-receptionist-voice-agent",
    steps: voiceAgentFlow,
  },

  caseStudies: [
    {
      slug: "ghl-real-estate-crm-snapshot",
      title: "Reusable GoHighLevel Real Estate CRM & Automation Snapshot",
      shortTitle: "GoHighLevel real estate snapshot",
      summary:
        "A client-agnostic GoHighLevel snapshot that deploys a full lead-to-close system for real estate clients in under an hour.",
      problem:
        "Setting up GoHighLevel for each new real estate client meant a day of manual edits across workflows, pages, and message templates.",
      built: [
        "Architected a client-agnostic snapshot covering the full lead-to-close lifecycle: 14 workflows, 53 custom fields, 41 tags, 3 pipelines, 4 calendars, 6 landing pages, and 32 SMS/email templates.",
        "Built deployment around 30 Custom Values so every asset rebrands from a single configuration table.",
        "Configured a Conversation AI agent for inbound qualification and calendar booking with defined escalation rules, alongside sub-60-second speed-to-lead, lead scoring, no-show recovery, and 45-day buyer/seller nurture sequences.",
        "Engineered compliance into every workflow: A2P 10DLC-ready consent language, DND checks before every send, and exit conditions on all automated sequences.",
      ],
      stack: ["GoHighLevel", "Conversation AI", "HTML email", "A2P 10DLC"],
      result:
        "Per-client onboarding went from a day of manual edits to under an hour. Every asset rebrands from one table of 30 Custom Values.",
      figures: [
        { value: "14", label: "workflows" },
        { value: "53", label: "custom fields" },
        { value: "41", label: "tags" },
        { value: "3", label: "pipelines" },
        { value: "4", label: "calendars" },
        { value: "6", label: "landing pages" },
        { value: "32", label: "SMS/email templates" },
        { value: "30", label: "Custom Values" },
      ],
      links: [
        { label: "Docs", href: "/docs/ghl-real-estate-snapshot-build-report.pdf", kind: "docs" },
      ],
    },
    {
      slug: "multilingual-hotel-receptionist-voice-agent",
      title: "Multilingual AI Hotel Receptionist Voice Agent",
      shortTitle: "Hotel receptionist voice agent",
      summary:
        "A real-time voice receptionist that books rooms in Urdu, English, or Spanish and confirms them on WhatsApp.",
      problem:
        "A hotel has to answer booking calls in the caller's own language, then get each reservation recorded and confirmed.",
      built: [
        "Built a real-time voice receptionist on LiveKit Agents with Silero VAD, Groq Whisper-large-v3-turbo transcription, a Groq-hosted LLM, and ElevenLabs multilingual TTS, detecting the caller's language and replying in it (Urdu, English, Spanish).",
        "Implemented LLM function calling for room booking that collects guest name, room type, and phone number, then posts to an n8n webhook with timeout and error handling so the agent recovers gracefully on failure.",
        "Orchestrated n8n workflows that log every reservation to Google Sheets and send instant WhatsApp confirmations through a self-hosted Evolution API, plus a room-availability webhook returning status and pricing to the agent.",
      ],
      stack: ["Python", "LiveKit Agents", "Groq", "ElevenLabs", "Silero VAD", "n8n", "Google Sheets", "Evolution API"],
      result:
        "A caller speaks Urdu, English, or Spanish, books a room by voice, and gets an instant WhatsApp confirmation. Every reservation is logged to Google Sheets, and the agent recovers gracefully if the booking webhook fails.",
      links: [{ label: "Code", href: `${GH}/Hotel_Voice_Agent-Zara-`, kind: "code" }],
      flow: voiceAgentFlow,
    },
    {
      slug: "ai-workspace-management-platform",
      title: "AI-Powered Workspace Management Platform",
      shortTitle: "Workspace management platform",
      summary:
        "A full-stack collaboration platform for workspaces, teams, projects, tasks, files, and analytics, with Groq-powered insights.",
      problem:
        "Teams need one place for workspaces, projects, tasks, and files, where access depends on each person's role and updates arrive in real time.",
      built: [
        "Designed a full-stack collaboration platform for workspaces, teams, projects, tasks, files, and analytics.",
        "Developed secure JWT authentication, role-aware authorization, real-time WebSockets, and Groq-powered insights.",
        "Added Redis caching, Celery background reports, and CSV exports; containerized services with Docker Compose.",
      ],
      stack: ["Python", "FastAPI", "React", "PostgreSQL", "Redis", "Celery", "Docker"],
      result:
        "A containerized platform you can open as a live demo: secure sign-in, role-aware access, real-time updates, and Groq-powered insights, with background reports and CSV exports.",
      links: [
        { label: "Live", href: "https://ai-powered-workspace-management.vercel.app", kind: "live" },
        { label: "Code", href: `${GH}/Ai_Powered_Workspace_Management_Platform`, kind: "code" },
      ],
      videos: [
        {
          title: "Demo, part 1",
          embedUrl: "https://www.loom.com/embed/f6f790cd05814cea9e779a3027615a11",
          watchUrl: "https://www.loom.com/share/f6f790cd05814cea9e779a3027615a11",
        },
        {
          title: "Demo, part 2",
          embedUrl: "https://www.loom.com/embed/09ee3b0ec2c247439bbdcfae66c23988",
          watchUrl: "https://www.loom.com/share/09ee3b0ec2c247439bbdcfae66c23988",
        },
      ],
    },
    {
      slug: "ai-chat-assistant",
      title: "AI Chat Assistant (ChatGPT Clone)",
      shortTitle: "AI chat assistant",
      summary:
        "A production-style chat assistant with token-by-token streaming and persistent conversations.",
      problem:
        "A chat demo only feels like a product once replies stream, conversations persist, and the user can stop or regenerate a response.",
      built: [
        "Built a production-style assistant with React/TypeScript, FastAPI, and LangGraph serving Groq-hosted gpt-oss-120b.",
        "Implemented token-by-token streaming, persistent conversations, stop/regenerate controls, and Markdown rendering.",
      ],
      stack: ["React", "TypeScript", "FastAPI", "LangGraph", "PostgreSQL", "Docker"],
      result:
        "A live assistant on Groq-hosted gpt-oss-120b that streams token by token, keeps conversations, and supports stop/regenerate and Markdown.",
      links: [
        { label: "Live", href: "https://ali-raza-assistant-web.vercel.app", kind: "live" },
        { label: "Code", href: `${GH}/My-Assistant-Gpt-Clone-`, kind: "code" },
      ],
    },
    {
      slug: "ai-assistant-content-automation",
      title: "Intelligent AI Assistant & Content Automation Pipelines",
      shortTitle: "AI assistant and content automation",
      summary:
        "An n8n personal assistant agent and a content distribution engine that publishes to YouTube and Instagram Reels.",
      problem:
        "Scheduling, email, documents, expense tracking, and social publishing are repetitive tasks spread across separate tools.",
      built: [
        "Engineered a Personal Assistant Agent within n8n, using Groq and LangChain to automate Google Calendar scheduling, Gmail management, Google Docs generation, and Google Sheets expense tracking.",
        "Developed a modular content distribution engine polling Google Sheets for state management and auto-publishing media to YouTube and Instagram Reels via the Meta Graph API.",
        "Implemented asynchronous branching, parallel execution tracks, and web search integration for multi-step agents.",
      ],
      stack: ["n8n", "Make.com", "Groq", "LangChain", "Google Workspace APIs", "Meta API"],
      result:
        "One agent handles Google Calendar, Gmail, Google Docs, and Sheets expense tracking, and a Google Sheets-driven engine auto-publishes media to YouTube and Instagram Reels.",
      links: [{ label: "Code", href: `${GH}/n8n-Personal-Agent`, kind: "code" }],
    },
    {
      slug: "rag-chatbots",
      title: "IUB University & YouTube RAG Chatbots",
      shortTitle: "IUB and YouTube RAG chatbots",
      summary:
        "RAG assistants that answer from official IUB PDFs and YouTube transcripts.",
      problem:
        "Questions about official university documents and long YouTube videos need answers grounded in the source, not guesses.",
      built: [
        "Built RAG assistants to ingest official IUB PDFs and YouTube transcripts (via yt-dlp), storing vectors in PGVector.",
        "Orchestrated grounded answer generation with Llama 3.1 via Groq and MMR retrieval behind Streamlit interfaces.",
      ],
      stack: ["LangChain", "PGVector", "PostgreSQL", "Hugging Face", "Groq", "Streamlit"],
      result:
        "Two assistants that answer from official IUB PDFs and YouTube transcripts, using PGVector, MMR retrieval, and Llama 3.1 via Groq behind Streamlit interfaces.",
      links: [
        { label: "Code (IUB)", href: `${GH}/IUB-RAG-CHATBOT`, kind: "code" },
        { label: "Code (YouTube)", href: `${GH}/Youtube_RAG_APP`, kind: "code" },
      ],
    },
  ] as CaseStudy[],

  moreProjects: [
    {
      title: "RazaMind AI",
      description:
        "The assistant embedded in this portfolio. It answers visitor questions about these projects.",
      stack: ["Next.js", "Tailwind CSS"],
      href: "",
      action: "chat" as const,
    },
    {
      title: "Multi-tool ReAct agent",
      description:
        "A conversational agent that picks the right tool for each query: web search, live weather, currency conversion, or a Wikipedia summary.",
      stack: ["LangGraph", "Groq", "Streamlit"],
      href: `${GH}/Multi_Tools_Agent_App`,
      action: "link" as const,
    },
    {
      title: "Reusable FastAPI authentication service",
      description:
        "An async REST API boilerplate with JWT and OAuth2 authentication, bcrypt password hashing, and Aerich database migrations.",
      stack: ["FastAPI", "Tortoise ORM", "Aerich", "JWT/OAuth2", "SQLite"],
      href: `${GH}/FastApi_Tortoise_ORM_Aerich_Migration_Authentications`,
      action: "link" as const,
    },
  ],

  mlProjects: {
    intro: "10+ end-to-end ML/DL projects, published with code.",
    stack: ["Scikit-learn", "TensorFlow", "PyTorch"],
    items: [
      { title: "CIFAR-10 with ResNet50", href: `${GH}/CIFAR_10_Object_Recognition_Using_ResNet50_Deep-Learning_Project` },
      { title: "Face mask detection", href: `${GH}/Face_Mask_Detection_using_CNN_DeepLearning_Project` },
      { title: "Cat-vs-dog CNN", href: `${GH}/Cat_vs_Dog_Classification_with_NeuralNetwork_DeepLearning_Project` },
      { title: "Fashion-MNIST CNN", href: `${GH}/Fashion_MNIST_using_CNN_Model_DeepLearning_Project` },
      { title: "MNIST digits", href: `${GH}/MNIST_Digits_Classification_Using_Neural_Network_DeepLearning_Project` },
      { title: "Breast cancer prediction", href: `${GH}/Breast_Cancer_Classification_with_Neural_Network_DeepLearning_Project` },
      { title: "Heart disease prediction", href: `${GH}/Heart_Disease_Prediction_Model` },
      { title: "Fake news detection", href: `${GH}/Fake_News_Detector` },
      { title: "Sentiment analysis", href: `${GH}/Movie_Review_Sentiment_Analysis` },
      { title: "Credit card fraud detection", href: `${GH}/Credit_Card_Fraud_Detection_Model` },
      { title: "Titanic survival modelling", href: `${GH}/Titanic_Survival_Prediction_Model` },
    ],
  },

  // Groups and items exactly as on the CV.
  skills: [
    {
      group: "Full-Stack & Platform Engineering",
      items: ["Python", "FastAPI", "React", "Next.js", "TypeScript", "JavaScript", "Vite", "Tailwind CSS", "Flutter", "Dart", "REST APIs", "WebSockets", "JWT/OAuth2", "Role-aware authorization", "Pydantic"],
    },
    {
      group: "Generative AI & LLMs",
      items: ["RAG pipelines", "Self-RAG", "CRAG", "Agentic systems", "Prompt engineering", "Function calling", "Embeddings", "Semantic search", "MMR retrieval", "LangChain", "LangGraph", "LangSmith", "ReAct", "Groq API", "Anthropic and OpenAI models", "Hugging Face", "Llama models"],
    },
    {
      group: "Voice AI",
      items: ["LiveKit Agents", "Silero VAD", "Whisper speech-to-text (Groq)", "ElevenLabs multilingual TTS", "Real-time conversational agents", "Multilingual language mirroring"],
    },
    {
      group: "Data, Persistence & Background Processing",
      items: ["PostgreSQL", "PGVector", "Redis", "Celery", "Tortoise ORM", "Aerich", "SQLAlchemy", "SQLite"],
    },
    {
      group: "Machine Learning, NLP & Vision",
      items: ["Scikit-learn", "TensorFlow", "PyTorch", "Pandas", "NumPy", "TF-IDF", "Sentiment analysis", "Classification", "Clustering", "SVM", "Random Forest", "Decision Trees", "K-Means", "Naive Bayes", "Regression", "CNNs", "LSTMs", "Transfer learning", "ResNet50"],
    },
    {
      group: "Workflow Automation & Deployment",
      items: ["n8n", "Make.com", "GoHighLevel (CRM architecture, funnels, workflows, Conversation AI, A2P 10DLC compliance)", "Evolution API (WhatsApp)", "Docker Compose", "Vercel", "Streamlit", "Git", "GitHub", "Jupyter Notebook", "Google Colab", "Kaggle", "OpenAPI/Swagger"],
    },
  ],

  experience: [
    {
      role: "Machine Learning Engineer Intern",
      company: "Developers Hub Corporation (Remote)",
      period: "2025",
      description:
        "Built an end-to-end IMDB sentiment system using TF-IDF features, linear classifiers, and a Streamlit interface; developed ML workflows for NLP, classification, and clustering with reproducible prediction pipelines.",
    },
    {
      role: "Machine Learning Engineer Intern",
      company: "Code Alpha (Remote)",
      period: "2025",
      description:
        "Delivered projects in heart-disease prediction, agricultural image recognition, and speech-emotion recognition, training logistic-regression, CNN, and LSTM models with structured preprocessing and performance analysis.",
    },
  ],

  education: [
    { degree: "BS Software Engineering", institution: "The Islamia University of Bahawalpur", period: "2023–2027" },
    { degree: "FSc Pre-Engineering", institution: "KIPS College", period: "2021–2023" },
  ],

  certifications: [
    {
      title: "Automation & CRM",
      detail:
        "Delivered a production-ready GoHighLevel (GHL) snapshot system covering CRM structure, funnels, workflows, Conversation AI, and compliance; completed n8n and Make.com training for agentic AI and business automation pipelines.",
    },
    {
      title: "Generative AI & LLM Engineering",
      detail: "Completed CampusX coursework in LangChain, RAG pipelines, and ReAct agents.",
    },
    {
      title: "ML/DL & Backend Engineering",
      detail:
        "Completed Hope to Skill and Siddhardhan ML/DL tracks, plus FastAPI, Tortoise ORM, JWT, PostgreSQL, Redis, Celery, and Docker training.",
    },
    {
      title: "One Million Prompters",
      detail: "Dubai Future Foundation and Dubai Centre for Artificial Intelligence.",
    },
  ],
};

export function getCaseStudy(slug: string) {
  return portfolioData.caseStudies.find((c) => c.slug === slug);
}
