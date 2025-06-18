"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface IssueForm {
  title: string;
  description: string;
}

const newIssue = () => {
  const { register, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  const onSubmit = async (data: IssueForm) => {
    const request = await axios.post("/api/issues", data);
    router.push("/issues");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex justify-center"
    >
      <div className="max-w-lg space-y-4 w-full mt-12 flex flex-col">
        <TextField.Root {...register("title")} placeholder="Title..." />
        <TextArea {...register("description")} placeholder="description" />
        <Button>Submit</Button>
      </div>
    </form>
  );
};

export default newIssue;
