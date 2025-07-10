import { prisma } from '@/prisma/client'
import { Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

const IssueDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  })

  if (!issue) notFound()

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="4">
        <IssueDetails issue={issue} />
      </Flex>
      <Flex direction="column" justify="between" align="start">
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
      </Flex>
    </Grid>
  )
}

export default IssueDetailsPage
