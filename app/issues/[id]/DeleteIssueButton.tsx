'use client'
import { deleteIssue } from '@/app/actions/issueActions'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()
  const handleDelete = async () => {
    await deleteIssue(issueId)
    router.push('/issues')
  }
  return (
    <>
      <Button onClick={handleDelete} color="red">
        DELETE
      </Button>
    </>
  )
}

export default DeleteIssueButton
