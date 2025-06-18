"use client";

import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IssueForm {
  title: string;
  description: string;
}

const newIssue = () => {
  const { register, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: IssueForm) => {
    try {
      const request = await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occured.");
    }
  };

  return (
    <div className="w-full mt-12 max-w-lg mx-auto">
      {error && (
        <Callout.Root color="red">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center"
      >
        <div className="space-y-4 w-full mt-2 flex flex-col">
          <TextField.Root {...register("title")} placeholder="Title..." />
          <TextArea {...register("description")} placeholder="description" />
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default newIssue;
