import { z } from "zod";

const schema = z.object({
  photo: z.string(),
  name: z.string(),
  about: z.string(),
  social: z.string(),
});
