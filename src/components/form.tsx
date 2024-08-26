"use client";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { tipsSchema } from "@/schema";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PlusCircle } from "lucide-react";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { createTips } from "@/actions/actions";
import PendingButton from "./pending-button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FormState = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function Form() {
  const [formState, action] = useFormState<FormState, FormData>(createTips, {
    status: undefined,
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const [form, fields] = useForm({
    lastResult: formState,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: tipsSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    if (formState.status === "success") {
      toast.success(formState.message);
      setIsOpen(false);
    } else if (formState.status === "error") {
      toast.error(formState.message);
    }
  }, [formState]);
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="h-9 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Tips
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new tips</DialogTitle>
            <DialogDescription>
              Add your tips here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title">Title</Label>
                <Input
                  key={fields.title.key}
                  name={fields.title.name}
                  defaultValue={fields.title.initialValue}
                  className="col-span-3"
                />
                <div className="text-red-500 ">{fields.title.errors}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  rows={4}
                  key={fields.description.key}
                  name={fields.description.name}
                  defaultValue={fields.description.initialValue}
                  className="col-span-3"
                />
                <div className="text-red-500 col-span-3">
                  {fields.description.errors}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="language" className="col-span-1">
                  Language
                </Label>
                <div className="col-span-3">
                  <Select
                    key={fields.language.key}
                    name={fields.language.name}
                    defaultValue={fields.language.initialValue}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="Javascript">Javascript</SelectItem>
                      <SelectItem value="Go">Go</SelectItem>
                      <SelectItem value="Rust">Rust</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-red-500">{fields.language.errors}</div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <PendingButton>Save changes</PendingButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
