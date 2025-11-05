"use client";
import { useForm, Controller } from "react-hook-form";
import { TextField, TextArea, Button, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  async function saveToDb(data: IssueForm) {
    setIsSubmit(true);
    const res = await axios.post("/api/issues", data);
    reset();
    router.push("/issues");
    // setIsSubmit(false);
  }

  return (
    <form className="max-w-lg space-y-3" onSubmit={handleSubmit(saveToDb)}>
      <TextField.Root placeholder="Title" {...register("title")}>
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      {errors.title && <Text color="red">{errors.title.message}</Text>}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Reply to comment…" {...field} />
        )}
      />
      {errors.description && (
        <Text color="red">{errors.description.message}</Text>
      )}

      <Button disabled={isSubmit}>Submit</Button>
    </form>
  );
};

export default NewIssuePage;
