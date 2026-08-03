import type { Certificate } from '#shared/types/certificate'

export const certificates: Certificate[] = [
  {
    id: 'aws-academy-cloud-foundation',
    title: 'AWS Academy Cloud Foundation',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: 'Dec 2024',
    pdfUrl: '/certificates/aws.pdf',
    skills: ['AWS', 'Cloud Computing', 'Cloud Architecture', 'Security'],
    attachments: [
      {
        name: 'AWS Academy Badge & Completion Record',
        pdfUrl: '/certificates/aws.pdf',
        type: 'badge',
      },
    ],
  },
  {
    id: 'hackerrank-basic-javascript',
    title: 'Basic Javascript Certificate',
    issuer: 'HackerRank',
    issueDate: 'Dec 2023',
    pdfUrl: '/certificates/basic-js.pdf',
    skills: ['JavaScript', 'Algorithms', 'Data Structures'],
    attachments: [
      {
        name: 'HackerRank Problem Solving Certificate',
        pdfUrl: '/certificates/basic-js.pdf',
        type: 'completion',
      },
    ],
  },
]


