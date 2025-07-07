'use client'

import { createIssue, updateIssue } from '@/app/actions/issueActions'
import { IssueValidationSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type IssueFormData = z.infer<typeof IssueValidationSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueValidationSchema),
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = async (data: IssueFormData) => {
    try {
      if (issue) {
        await updateIssue(issue.id, data)
      }
      else {
        await createIssue(data)
      }

      router.push('/issues')
    }
    catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred',
      )
      console.error('Error submitting issue:', err)
    }
  }

  return (
    <div className="w-lg mt-12 mx-auto">
      {error && (
        <Callout.Root color="red">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 space-y-6">
          <div>
            <TextField.Root
              defaultValue={issue?.title}
              {...register('title')}
              placeholder="Title..."
            />
            {errors.title && (
              <Text as="p" color="red">
                {errors.title.message}
              </Text>
            )}
          </div>
          <div>
            <TextArea
              defaultValue={issue?.description}
              {...register('description')}
              placeholder="description"
            />
            {errors.description && (
              <Text as="p" color="red">
                {errors.description.message}
              </Text>
            )}
          </div>
          <div className="flex justify-center">
            <Button disabled={isSubmitting}>{issue ? 'Update Issue' : 'Submit New Issue'}</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default IssueForm
