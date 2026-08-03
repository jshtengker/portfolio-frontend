export interface CertificateAttachment {
  name: string
  pdfUrl: string
  type?: 'transcript' | 'badge' | 'completion' | 'other'
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  issueDate: string
  credentialId?: string
  pdfUrl: string
  verifyUrl?: string
  skills?: string[]
  attachments?: CertificateAttachment[]
}

