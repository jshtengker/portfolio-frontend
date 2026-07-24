import type { Project } from '#shared/types/project'

export const projects: Project[] = [
  {
    id: 'zetryn',
    title: 'Zetryn — Incident Intelligence Platform',
    description:
      'Automated telemetry ingestion, cross-service event correlation, and incident detection platform.',
    fullDescription:
      'An Incident Intelligence Platform designed to ingest OpenTelemetry signals (logs, metrics, and traces), correlate cross-service telemetry events asynchronously, and automatically detect and alert on incidents to minimize MTTD and MTTR.',
    details:
      'Engineered with Go for high-throughput ingestion and background correlation workers, PostgreSQL for durable persistence, Redis for asynchronous task queues, and React for the operator console dashboard.',
    tags: ['Go', 'OpenTelemetry', 'PostgreSQL', 'Redis', 'React', 'Docker'],
    year: '2026',
    to: '/projects/zetryn',
    githubUrl: 'https://github.com/jshtengker/zetryn',
    status: 'coming-soon',
    role: 'Lead Backend Engineer & Systems Architect',
    problemStatement:
      'Modern microservices generate millions of un-correlated telemetry signals during outages. Engineers waste valuable time manually cross-referencing trace IDs across log aggregators and metric tools to isolate root causes.',
    architecture: {
      overview:
        'High-throughput telemetry ingestion pipeline built with Go worker pools, Redis stream buffers, and OpenTelemetry signal correlation engine.',
      components: [
        {
          name: 'Ingestion Engine',
          desc: 'Go-based HTTP/gRPC receiver handling high-concurrency OTEL signal batches with non-blocking worker pools.',
        },
        {
          name: 'Correlation Pipeline',
          desc: 'Asynchronous Redis stream consumer matching span IDs across distributed service boundaries.',
        },
        {
          name: 'Operator Dashboard',
          desc: 'PostgreSQL storage with optimized indexes & React console for live incident timelines.',
        },
      ],
    },
    features: [
      {
        title: 'Asynchronous Event Correlation',
        desc: 'Automatically links isolated logs and metric spikes to open trace spans across microservices.',
      },
      {
        title: 'Automated Root-Cause Alerts',
        desc: 'Evaluates anomaly thresholds and triggers instant webhooks before cascading failures occur.',
      },
    ],
  },
  {
    id: 'speech-to-text',
    title: 'Speech-to-Text Studio',
    description:
      'Hybrid speech transcription & translation app with browser Web Audio extraction, Groq Cloud API, and DeepL translation.',
    fullDescription:
      'A high-performance Speech-to-Text transcription and multi-language translation web application. Features client-side Web Audio API extraction (processes 1.4GB video to 16kHz WAV in <1s), an environment-aware hybrid engine (local faster-whisper CTranslate2 GPU execution locally, Groq Cloud API in production), real-time SSE line streaming, and DeepL / NLLB-200 transcript translation.',
    details:
      'Built with Python and FastAPI on the backend supporting local CTranslate2 inference or Groq Cloud API fallback. The frontend is built with React 18, TypeScript, Vite, Web Audio API, and TailwindCSS for a responsive dark UI.',
    tags: ['Python', 'FastAPI', 'Whisper', 'React', 'TypeScript', 'Web Audio API', 'Groq API', 'DeepL API'],
    year: '2026',
    to: '/projects/speech-to-text',
    githubUrl: 'https://github.com/jshtengker/speech-to-text',
    liveUrl: 'https://speech-to-text-one-pied.vercel.app/',
    status: 'live',
    role: 'Fullstack Systems Engineer',
    problemStatement:
      'Heavy video uploads choke network bandwidth and trigger storage limits, while cloud transcription services incur steep API fees. Traditional tools also lack client-side audio extraction, dynamic local/cloud engine switching, and automated multi-language translation.',
    architecture: {
      overview:
        'Hybrid speech transcription architecture combining browser-side Web Audio extraction with FastAPI SSE streaming and environment-aware inference (local CTranslate2 GPU execution vs Groq Cloud API in production, plus DeepL/NLLB translation).',
      components: [
        {
          name: 'Web Audio Extractor',
          desc: 'Browser-side Web Audio API (OfflineAudioContext) downsampling multi-gigabyte media to 16kHz mono WAV in <1s before upload.',
        },
        {
          name: 'FastAPI SSE Stream API',
          desc: 'FastAPI job queue manager streaming line-by-line transcription updates to React via Server-Sent Events.',
        },
        {
          name: 'Hybrid Inference Engine',
          desc: 'Runs local faster-whisper (CTranslate2) on GPU in local dev, automatically switching to Groq Cloud API (Whisper Large-v3) in production.',
        },
      ],
    },
    features: [
      {
        title: 'Browser-Side Web Audio Extraction',
        desc: 'Extracts and compresses speech audio from 1.4GB+ videos down to <45MB 16kHz WAV directly in browser memory in under 1 second.',
      },
      {
        title: 'Hybrid Engine (Local GPU / Groq Cloud)',
        desc: 'Leverages local faster-whisper (CTranslate2) for GPU inference locally, and seamlessly switches to Groq Cloud API for production deployment.',
      },
      {
        title: 'Multi-Engine Transcript Translation',
        desc: 'Translates completed transcriptions into multiple languages via DeepL API in production or Meta NLLB-200 locally, preserving subtitle timestamps.',
      },
    ],
  },
]

export const featuredProjects: Project[] = projects
