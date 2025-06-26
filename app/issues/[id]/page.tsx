import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async (props: Props) => {
  const { id } = props.params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="4">
        <IssueDetails issue={issue} />
      </Flex>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
