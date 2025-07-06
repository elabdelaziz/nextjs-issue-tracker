import { createIssue, updateIssue } from '@/app/actions/issueActions'
import { prismaMock } from '@/prisma/clientMock'
import { Status } from '@prisma/client'

describe('Issue Actions', () => {
  const mockFormData = {
    title: 'Test Issue',
    description: 'Test Description',
  }

  const mockCreatedIssue = {
    id: 1,
    ...mockFormData,
    status: 'OPEN' as Status,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  describe('createIssue', () => {
    it('should successfully create an issue', async () => {
      // "When prisma.issue.create() is called, return this fake data instead of hitting the database"
      // Must happen before execution so the mock is ready
      prismaMock.issue.create.mockResolvedValue(mockCreatedIssue)

      // now we can call the function that uses the mock
      const result = await createIssue(mockFormData)
      expect(result).toEqual(mockCreatedIssue)

      // Checks how the mock was called
      // Must happen after the function used the mock
      expect(prismaMock.issue.create).toHaveBeenCalledWith({
        data: mockFormData,
      })
    })

    it('should handle validation errors', async () => {
      const invalidData = {
        title: '', // Invalid - too short
        description: 'Test',
      }
      await expect(createIssue(invalidData)).rejects.toThrow()
      expect(prismaMock.issue.create).not.toHaveBeenCalled()
    })

    it('should handle Prisma errors', async () => {
      prismaMock.issue.create.mockRejectedValue(new Error('Database error'))

      await expect(createIssue(mockFormData)).rejects.toThrow('Database error')
    })
  })

  describe('updateIssue', () => {
    const updatedData = {
      title: 'Updated Title',
      description: 'Updated Description',
    }

    const mockUpdatedIssue = {
      ...mockCreatedIssue,
      ...updatedData,
      updatedAt: new Date(), // New timestamp
    }

    it('should successfully update an issue', async () => {
      prismaMock.issue.update.mockResolvedValue(mockUpdatedIssue)

      const result = await updateIssue(1, updatedData)

      expect(result).toEqual(mockUpdatedIssue)
      expect(prismaMock.issue.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updatedData,
      })
    })

    it('should throw if issue not found', async () => {
      prismaMock.issue.update.mockRejectedValue(
        new Error('Record to update not found'),
      )

      await expect(updateIssue(999, updatedData)).rejects.toThrow(
        'Record to update not found',
      )
    })
  })
})
