import { prisma } from '@/prisma/client'
import React from 'react'
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatus from "@/app/components/IssueStatus";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  return (
    <Flex direction="column" gap="4">
      <Heading as="h2">{issue.title}</Heading>
      <Flex gap="4">
        <IssueStatus status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{issue.description}</Card>
    </Flex>
  );
};

export default IssueDetailsPage