"use client";
import { useForm, Controller } from "react-hook-form";
import { TextField, TextArea, Button } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, reset } = useForm<IssueForm>();

  async function saveToDb(data: IssueForm) {
    const res = await axios.post("/api/issues", data);
    reset();
    router.push("/issues");
  }

  return (
    <form className="max-w-lg space-y-3" onSubmit={handleSubmit(saveToDb)}>
      <TextField.Root placeholder="Title" {...register("title")}>
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Reply to comment…" {...field} />
        )}
      />

      <Button>Submit</Button>
    </form>
  );
};

export default NewIssuePage;
