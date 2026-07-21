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
  },
  {
    id: 'speech-to-text',
    title: 'Local Speech-to-Text Studio',
    description:
      'Privacy-first audio & video transcription app powered by faster-whisper with real-time SSE streaming.',
    fullDescription:
      'A high-performance, local speech-to-text web application powered by OpenAI Whisper models via faster-whisper. Features real-time line-by-line SSE streaming, dynamic model selection, drag-and-drop media upload, and TXT/SRT export capabilities with zero data leaving the device.',
    details:
      'Built with Python and FastAPI on the backend for GPU/CPU accelerated CTranslate2 inference and SSE streaming endpoints. The frontend is built with React 18, TypeScript, Vite, and TailwindCSS for a responsive dark UI.',
    tags: ['Python', 'FastAPI', 'Whisper', 'React', 'TypeScript', 'TailwindCSS'],
    year: '2026',
    to: '/projects/speech-to-text',
    githubUrl: 'https://github.com/jshtengker/speech-to-text',
  },
  {
    id: 'alpha',
    title: 'Distributed Queue Service',
    description:
      'A RESTful API for managing distributed task queues with real-time status updates via WebSocket streams.',
    fullDescription:
      'A production-grade RESTful API service for managing distributed task queues with real-time status updates via WebSocket streams. Supports priority scheduling, retry with exponential backoff, dead-letter queues, and Prometheus metrics.',
    details:
      'Built with Go for high concurrency, PostgreSQL for durable storage, and Redis for fast in-memory queue operations. Deployed with Docker Compose, monitored via Prometheus and Grafana dashboards.',
    tags: ['Go', 'PostgreSQL', 'Redis', 'Docker'],
    year: '2026',
    to: '/projects/alpha',
  },
  {
    id: 'beta',
    title: 'Auth Microservice',
    description:
      'Modular authentication service supporting OAuth2, JWT, and session-based auth with rate limiting.',
    fullDescription:
      'A modular authentication microservice that provides multiple auth strategies including OAuth2 (Google, GitHub), JWT-based tokens, and traditional session-based authentication with refresh token rotation.',
    details:
      'Built with TypeScript and Express. Implements rate limiting, audit logging, and comprehensive test coverage. Integrates with PostgreSQL for session storage and Redis for rate-limit counters.',
    tags: ['TypeScript', 'Express', 'PostgreSQL', 'JWT'],
    year: '2025',
    to: '/projects/beta',
  },
  {
    id: 'gamma',
    title: 'Collaborative Editor Backend',
    description:
      'Real-time collaborative document editing using WebSockets and operational transform.',
    fullDescription:
      'A real-time collaborative editing backend that enables multiple users to edit documents simultaneously. Uses operational transform for conflict resolution with low-latency WebSocket communication.',
    details:
      'Built with Go for concurrent WebSocket handling, MongoDB for document storage, and a CRDT-inspired sync protocol for offline support and eventual consistency.',
    tags: ['Go', 'WebSocket', 'MongoDB'],
    year: '2025',
    to: '/projects/gamma',
  },
  {
    id: 'delta',
    title: 'Scaffold CLI',
    description:
      'Command-line tool for scaffolding production-ready backend projects with built-in CI/CD.',
    fullDescription:
      'A CLI tool that scaffolds production-ready backend project templates with pre-configured CI/CD pipelines, Docker Compose setups, and monitoring stacks pre-wired.',
    details:
      'Built with Python and Click. Generates projects for Go, TypeScript, and Python backends with optional PostgreSQL, Redis, and Prometheus integrations.',
    tags: ['Python', 'CLI', 'Docker', 'CI/CD'],
    year: '2024',
    to: '/projects/delta',
  },
]

export const featuredProjects: Project[] = projects.slice(0, 2)
