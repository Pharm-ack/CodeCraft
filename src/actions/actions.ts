"use server";
import { parseWithZod } from "@conform-to/zod";
import { tipsSchema } from "@/schema";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

type FormState = {
  status: "success" | "error" | undefined;
  message: string;
};

export async function createTips(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const submission = parseWithZod(formData, {
    schema: tipsSchema,
  });

  if (submission.status !== "success") {
    return {
      status: "error",
      message: "Validation failed. Please check your inputs.",
    };
  }

  const { title, description, language } = submission.value;

  try {
    await prisma.tip.create({
      data: {
        title,
        description,
        language,
      },
    });
    return {
      status: "success",
      message: "Tip created successfully!",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to create tip. Please try again.",
    };
  } finally {
    revalidatePath("/");
  }
}
