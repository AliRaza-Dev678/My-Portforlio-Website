export const portfolioData = {
  personal: {
    name: "Ali Raza",
    title: "Full-Stack AI Engineer",
    tagline: "Turning AI prototypes into complete, usable software systems.",
    location: "Multan, Pakistan",
    email: "aliraza.ai.dev3@gmail.com",
    phone: "+92 324 5892281",
    linkedin: "https://linkedin.com/in/ali-raza-597b01360",
    github: "https://github.com/AliRaza-Dev678",
    about:
      "I am a Full-Stack AI Engineer and Software Engineering undergraduate passionate about building intelligent products. My expertise spans React/TypeScript frontends, FastAPI services, PostgreSQL/Redis data layers, LLM workflows, and n8n automation pipelines. I've designed containerized AI-powered workspace platforms with secure authentication, real-time WebSocket communication, and Groq-powered insights. Beyond web development, I have hands-on experience with document and video RAG, LangGraph agents, NLP, and computer vision, always focusing on turning AI prototypes into complete, usable software systems.",
  },
  education: [
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "The Islamia University of Bahawalpur",
      period: "2023–2027",
    },
    {
      degree: "FSc Pre-Engineering",
      institution: "KIPS College",
      period: "2021–2023",
    },
  ],
  experience: [
    {
      role: "Machine Learning Engineer Intern",
      company: "Developers Hub Corporation (Remote)",
      period: "2025",
      description:
        "Built an end-to-end IMDB sentiment system using TF-IDF features, linear classifiers, and a Streamlit UI. Developed ML workflows for NLP, classification, and clustering tasks with reproducible prediction pipelines.",
    },
    {
      role: "Machine Learning Engineer Intern",
      company: "Code Alpha (Remote)",
      period: "2025",
      description:
        "Completed projects in heart-disease prediction, agricultural image recognition, and speech-emotion recognition. Trained logistic regression, CNN, and LSTM models with structured preprocessing and performance analysis.",
    },
  ],
  skills: {
    fullstack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "JavaScript",
      "Vite",
      "REST APIs",
      "WebSockets",
      "JWT/OAuth2",
      "Pydantic",
    ],
    ai: [
      "RAG pipelines",
      "Agentic systems",
      "Prompt engineering",
      "Embeddings",
      "Semantic search",
      "MMR retrieval",
      "LangChain",
      "LangGraph",
      "ReAct",
      "Groq API",
      "Hugging Face",
      "Llama models",
      "Anthropic",
      "OpenAI models",
    ],
    data: [
      "PostgreSQL",
      "PGVector",
      "Redis",
      "Celery",
      "Tortoise ORM",
      "Aerich",
      "SQLAlchemy",
      "SQLite",
    ],
    ml: [
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Pandas",
      "NumPy",
      "TF-IDF",
      "CNNs",
      "LSTMs",
      "Transfer learning",
      "ResNet50",
    ],
    devops: [
      "n8n",
      "Docker Compose",
      "Streamlit",
      "Git/GitHub",
      "Jupyter",
      "Colab",
      "OpenAPI/Swagger",
      "Kaggle",
      "GHL",
    ],
  },
  projects: [
    {
      title: "Intelligent AI Assistant & Content Automation Pipelines",
      stack: ["n8n", "Groq", "LangChain", "Google Workspace APIs", "Meta API"],
      highlights: [
        "Built a Personal Assistant Agent in n8n using Groq + LangChain to automate Google Calendar scheduling, Gmail, Docs generation, and Sheets expense tracking.",
        "Developed a modular content distribution engine polling Google Sheets, auto-publishing to YouTube and Instagram Reels via Meta Graph API.",
        "Implemented async branching, parallel execution, and web search integration for multi-step agentic workflows.",
      ],
      github: "https://github.com/AliRaza-Dev678/ai-assistant-pipelines", // Placeholder
      demo: "",
    },
    {
      title: "AI-Powered Workspace Management Platform",
      stack: ["Python", "FastAPI", "React", "PostgreSQL", "Redis", "Celery", "Docker"],
      highlights: [
        "Full-stack collaboration platform for workspaces, teams, projects, tasks, files, analytics.",
        "Secure JWT auth, role-aware authorization, real-time WebSockets, Groq-powered insights.",
        "Redis caching, Celery background reports, CSV exports, containerized with Docker Compose.",
      ],
      github: "https://github.com/AliRaza-Dev678/workspace-platform", // Placeholder
      demo: "",
    },
    {
      title: "AI Chat Assistant (ChatGPT Clone)",
      stack: ["React", "TypeScript", "FastAPI", "LangGraph", "PostgreSQL", "Docker"],
      highlights: [
        "Production-style assistant serving Groq-hosted gpt-oss-120b via LangGraph.",
        "Token-by-token streaming, persistent conversations, stop/regenerate controls, Markdown rendering.",
      ],
      github: "https://github.com/AliRaza-Dev678/chatgpt-clone", // Placeholder
      demo: "",
    },
    {
      title: "IUB University & YouTube RAG Chatbots",
      stack: ["LangChain", "PGVector", "PostgreSQL", "Hugging Face", "Groq", "Streamlit"],
      highlights: [
        "RAG assistants ingesting university PDFs and YouTube transcripts (via yt-dlp) into PGVector.",
        "Grounded answer generation with Llama 3.1 via Groq and MMR retrieval, Streamlit UI.",
      ],
      github: "https://github.com/AliRaza-Dev678/rag-chatbots", // Placeholder
      demo: "",
    },
  ],
  experiments: [
    {
      title: "Cat vs Dog Classification",
      github: "https://github.com/AliRaza-Dev678/Cat-vs-Dog-Classification",
    },
    {
      title: "CIFAR-10 Object Recognition",
      github: "https://github.com/AliRaza-Dev678/CIFAR-10-Object-Recognition",
    },
    {
      title: "Face Mask Detection",
      github: "https://github.com/AliRaza-Dev678/Face-Mask-Detection",
    },
    {
      title: "Fake News Detector",
      github: "https://github.com/AliRaza-Dev678/Fake-News-Detector",
    },
    {
      title: "Fashion MNIST",
      github: "https://github.com/AliRaza-Dev678/Fashion-MNIST",
    },
    {
      title: "MNIST Digits Classification",
      github: "https://github.com/AliRaza-Dev678/MNIST-Digits-Classification",
    },
  ],
};
