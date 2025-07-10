"use server";

import { formatConversation } from "@/ai/flows/conversation-formatter";
import { z } from "zod";

const FormSchema = z.object({
  rawConversation: z.string().min(10, {
    message: "Conversation must be at least 10 characters.",
  }),
});

export async function formatConversationAction(prevState: any, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    rawConversation: formData.get('rawConversation'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed',
      errors: validatedFields.error.flatten().fieldErrors,
      formattedConversation: null,
    };
  }

  try {
    const result = await formatConversation({ rawConversation: validatedFields.data.rawConversation });
    return {
      message: 'success',
      formattedConversation: result.formattedConversation,
      errors: {},
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while formatting the conversation.',
      formattedConversation: null,
      errors: {},
    };
  }
}
