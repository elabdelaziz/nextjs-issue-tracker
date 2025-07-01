'use client'

import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IssueValidationSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import { Issue } from '@prisma/client'

type IssueFormData = z.infer<typeof IssueValidationSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueValidationSchema),
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = async (data: IssueFormData) => {
    try {
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data)
      else await axios.post('/api/issues', data)

      router.push('/issues')
    }
    catch (err) {
      setError('An unexpected error occured.')
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
            <Button>{issue ? 'Update Issue' : 'Submit New Issue'}</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default IssueForm
