'use server'

import { prisma } from '@/prisma/client'
import { z } from 'zod'
import { IssueValidationSchema } from '../validationSchemas'

type IssueFormData = z.infer<typeof IssueValidationSchema>

export async function createIssue(data: IssueFormData) {
  const validatedData = IssueValidationSchema.parse(data)
  return await prisma.issue.create({
    data: validatedData,
  })
}

export async function updateIssue(id: number, data: IssueFormData) {
  const validatedData = IssueValidationSchema.parse(data)
  return await prisma.issue.update({
    where: { id },
    data: validatedData,
  })
}
