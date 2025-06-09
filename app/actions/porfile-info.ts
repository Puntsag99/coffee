"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  };
};
