import { z } from "zod";

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
  };
};
