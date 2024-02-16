// libraries
import { z } from "zod";
import dayjs, { type Dayjs } from "dayjs";

// types and constants
import { stripHtmlTagsAndEntities } from "utils/helpers";
import { regexData } from "./regexData";

export const validationSchemas = {
  auth: {
    loginPasswordSchema: z
      .string()
      .min(1, { message: "Password is required." })
      .max(32, { message: "The max length is reached." }),

    signUpPasswordSchema: z
      .string()
      .min(8, {
        message:
          "At least 8 characters, one number, one lowercase and uppercase letter and one special character.",
      })
      .max(32, { message: "The max length is reached." })
      .regex(new RegExp(regexData.containsCapitalLetter), {
        message: "Your password must contain at least one uppercase letter.",
      })
      .regex(new RegExp(regexData.containsLowerCaseLetter), {
        message: "Your password must contain at least one lowercase letter.",
      })
      .regex(new RegExp(regexData.containsNumber), {
        message: "Your password must contain at least one number.",
      })
      .regex(new RegExp(regexData.specialCharactersRegEx), {
        message: "Your password must contain at least one special character.",
      }),

    emailSchema: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .max(80, { message: "The max length is reached." })
      .refine(
        (data) => data.includes("it-labs.com"),
        "Email must contain it-labs.com domain."
      ),
    nameSchema: z
      .string()
      .min(2, { message: "You can't use less than 2 characters." })
      .max(80, { message: "You can't use more than 80 characters." })
      .regex(new RegExp(regexData.lettersOnlyRegEx), {
        message: "You can only use letters.",
      }),
  },

  eventForm: {
    titleSchema: z
      .string()
      .min(20, { message: "You can't use less than 20 characters." })
      .max(150, { message: "You can't use more than 150 characters." }),
    descriptionSchema: z
      .string()
      .transform((val) => stripHtmlTagsAndEntities(val))
      .pipe(
        z
          .string()
          .min(150, { message: "You can't use less than 150 characters." })
          .max(2000, { message: "You can't use more than 2000 characters." })
      ),
    locationSchema: z
      .string()
      .min(1, { message: "Location is required." })
      .max(150, { message: "You can't use more than 150 characters." }),
  },

  shared: {
    dateSchema: z
      .instanceof(dayjs as unknown as typeof Dayjs)
      .or(z.string())
      .or(z.date()),
  },
};
