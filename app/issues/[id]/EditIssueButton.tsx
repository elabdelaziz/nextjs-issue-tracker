import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <>
      <Link href={`/issues/${issueId}/edit`}>
        <Button>Edit</Button>
      </Link>
    </>
  );
};

export default EditIssueButton