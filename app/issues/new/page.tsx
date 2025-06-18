"use client";

import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueResolveSchema } from "@/app/validationSchemas";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueResolveSchema>;

const newIssue = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueResolveSchema),
  });
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
    <div className="flex w-lg mt-12 mx-auto">
      {error && (
        <Callout.Root color="red">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-grow">
        <div className="h-full mt-2 flex flex-col">
          <TextField.Root {...register("title")} placeholder="Title..." />
          {errors.title && (
            <Text as="p" color="red">
              {errors.title.message}
            </Text>
          )}
          <TextArea
            className="mt-8"
            {...register("description")}
            placeholder="description"
          />
          {errors.description && (
            <Text as="p" color="red">
              {errors.description.message}
            </Text>
          )}
          <Button className="mt-8!">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default newIssue;
