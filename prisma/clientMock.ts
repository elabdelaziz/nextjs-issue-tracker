// clientMock.ts
import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset } from 'jest-mock-extended'

// Create the mock instance first
const prismaMock = mockDeep<PrismaClient>()

// Mock the client module
jest.mock('./client', () => ({
  __esModule: true,
  prisma: prismaMock,
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export { prismaMock }
