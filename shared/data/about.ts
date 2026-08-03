export interface QuickFact {
  label: string
  value: string
}

export const facts: QuickFact[] = [
  { label: 'location', value: 'Jakarta, Indonesia' },
  { label: 'education', value: 'B.C.S. (3.90 GPA)' },
  { label: 'focus', value: 'Backend / Microservices' },
  { label: 'stack', value: 'Go, PHP, TS, Docker' },
]

export const interests: string[] = [
  'Microservices Architecture',
  'Multi-tenant Systems',
  'Distributed Tracing & Observability',
  'OpenTelemetry & Grafana',
  'Redis Event Systems',
  'Go & Gin Framework',
  'Docker & Containerization',
  'API Design & OpenAPI',
]
