import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const newIssue = () => {
  return (
    <div className='max-w-lg space-y-4'>
      <TextField.Root placeholder="Title..." />
      <TextArea placeholder='description' />
      <Button>Submit</Button>
    </div>
  );
}

export default newIssue