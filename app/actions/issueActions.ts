'use server'

import { prisma } from '@/prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { IssueValidationSchema } from '../validationSchemas'

type IssueFormData = z.infer<typeof IssueValidationSchema>

export async function createIssue(data: IssueFormData) {
  try {
    const validatedData = IssueValidationSchema.parse(data)
    const result = await prisma.issue.create({
      data: validatedData,
    })
    revalidatePath('/issues')
    return result
  }
  catch (error) {
    console.error('Error creating issue:', error)
    throw new Error('Failed to create issue')
  }
}

export async function updateIssue(id: number, data: IssueFormData) {
  try {
    const validatedData = IssueValidationSchema.parse(data)
    const result = await prisma.issue.update({
      where: { id },
      data: validatedData,
    })
    revalidatePath('/issues')
    return result
  }
  catch (error) {
    console.error('Error updating issue:', error)
    throw new Error('Record to update not found')
  }
}

export async function deleteIssue(id: number) {
  try {
    const result = await prisma.issue.delete({
      where: { id },
    })
    revalidatePath('/issues')
    return result
  }
  catch (err) {
    console.error('Error deleting issue:', err)
    throw new Error('Failed to delete issue')
  }
}
