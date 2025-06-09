"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

<<<<<<< HEAD
const schema = z.object({
  photo: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Photo is required"),
  name: z.string().min(1, "Please enter name"),
  about: z.string().min(1, "please enter into about yourself"),
  social: z.string().url("Plase enter a social link"),
});

export const saveProfile = async (formData: FormData) => {
  const data = {
    photo: formData.get("photo"),
    name: formData.get("name")?.toString() || "",
    about: formData.get("about")?.toString() || "",
    social: formData.get("social")?.toString() || "",
  };

  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const savedProfile = await prisma.profile.create({
    data: {
      name: data.name,
      about: data.about,
      social: data.social,
      // photo-г хэрхэн хадгалах нь өөр асуудал, ихэнхдээ file upload систем ашиглана
    },
  });

  return {
    success: true,
    message: "Profile saved!",
    profile: savedProfile,
=======
export const schemaStep = z.object({
  photo: z.string().min(1, "Photo is required"),
  name: z.string().min(1, "Name is required"),
  about: z.string().min(1, "Please enter info about yourself "),
  social: z.string().url("Please enter social link"),
});

export const submitProfile = async (prevState: any, formData: FormData) => {
  const photo = formData.get("photo")?.toString() || "";
  const name = formData.get("name")?.toString() || "";
  const about = formData.get("about")?.toString() || "";
  const social = formData.get("social")?.toString() || "";

  const result = schemaStep.safeParse({
    photo,
    name,
    about,
    social,
  });

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      fieldErrors[field] = err.message;
    });

    return {
      errors: fieldErrors,
    };
  }

  return {
    success: true,
    message: "Profile saved successfully!",
    data: result.data,
>>>>>>> 7d9b0606d3b7cd52c9d8ddbd09a15860188eb78d
  };
};
