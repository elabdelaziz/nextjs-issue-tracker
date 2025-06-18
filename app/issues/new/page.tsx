import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const newIssue = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-lg space-y-4 w-full mt-12 flex flex-col">
        <TextField.Root placeholder="Title..." />
        <TextArea placeholder="description" />
        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default newIssue