export interface ProjectArchitecture {
  overview: string
  diagram?: string
  components?: { name: string; desc: string }[]
}

export interface ProjectFeature {
  title: string
  desc: string
}

export interface ProjectCodeSnippet {
  title: string
  language: string
  code: string
}

export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  details: string
  tags: string[]
  year: string
  to: string
  githubUrl?: string
  liveUrl?: string
  status?: 'live' | 'in-dev' | 'coming-soon'
  role?: string
  problemStatement?: string
  metrics?: ProjectMetric[]
  architecture?: ProjectArchitecture
  features?: ProjectFeature[]
  codeSnippet?: ProjectCodeSnippet
}
