import { FlatCompat } from '@eslint/eslintrc'
import stylistic from '@stylistic/eslint-plugin'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // Next.js base configurations
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Combined stylistic and custom rules configuration
  {
    // Spread the recommended config first
    ...stylistic.configs.recommended,

    // Then add/override rules
    rules: {
      // custom rules
      'no-console': ['error', { allow: ['error'] }],

      // Include all recommended stylistic rules
      ...stylistic.configs.recommended.rules,
    },

    plugins: {
      '@stylistic': stylistic,
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [{
            name: '@/prisma/client',
            importNames: ['prisma'],
            message: 'Use prismaMock from "@/prisma/clientMock" in tests',
          }],
          patterns: [{
            group: ['@prisma/client'],
            importNames: ['PrismaClient'],
            message: 'Use the mocked PrismaClient in test files',
          }],
        },
      ],
    },
  },
]

export default eslintConfig
