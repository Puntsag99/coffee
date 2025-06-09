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
  social: z.string().url("Please enter a social link"),
});

export const saveProfile = async (formData: FormData, userId: string) => {
  const photo = formData.get("photo");

  if (!(photo instanceof File)) {
    return {
      success: false,
      errors: { photo: ["Photo is required and must be a file"] },
    };
  }

  const data = {
    photo,
    name: formData.get("name")?.toString() || "",
    about: formData.get("about")?.toString() || "",
    socialMediaURL: formData.get("social")?.toString() || "", // энд social-г socialMediaURL гэж өөрчиллөө
  };

  const schema = z.object({
    photo: z
      .instanceof(File)
      .refine((file) => file.size > 0, "Photo is required"),
    name: z.string().min(1, "Please enter name"),
    about: z.string().min(1, "Please enter about yourself"),
    socialMediaURL: z.string().url("Please enter a valid social media URL"),
  });

  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // TODO: photo-г хадгалах код (uploadPhoto гэх мэт)

  const savedProfile = await prisma.profile.create({
    data: {
      name: data.name,
      about: data.about,
      socialMediaURL: data.socialMediaURL,
      avatarImage: "", // upload хийсний дараа URL-г оруулах
      backroundImage: "",
      successMessage: "",
      userId: userId,
    },
  });

  return {
    success: true,
    message: "Profile saved!",
    profile: savedProfile,
  };
};
