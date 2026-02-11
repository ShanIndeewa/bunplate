// // user.schema.ts
// import { user } from "../database/schema/user.schema";
// import { z } from "zod";

// // Keep overrides minimal and aligned with your DB column nullability
// const overrides = {
//   email: z.string().email(),
//   image: z.string().url().nullish(),
// };

// export const userSelectSchema = z.object(user, overrides);

// // Types
// export type User = z.infer<typeof userSelectSchema>;
