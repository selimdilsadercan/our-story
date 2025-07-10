// src/ai/flows/conversation-formatter.ts
'use server';

/**
 * @fileOverview AI-powered conversation formatter.
 *
 * This file defines a Genkit flow that automatically reformats raw conversation snippets
 * into a structured format (speaker: dialogue) suitable for the Pixel Love Story website.
 *
 * @fileOverview
 * - `formatConversation`: Formats raw conversation snippets into a structured format.
 * - `ConversationFormatterInput`: Input type for the `formatConversation` function.
 * - `ConversationFormatterOutput`: Output type for the `formatConversation` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const ConversationFormatterInputSchema = z.object({
  rawConversation: z
    .string()
    .describe('The raw conversation snippet to be formatted.'),
});
export type ConversationFormatterInput = z.infer<
  typeof ConversationFormatterInputSchema
>;

// Define the output schema
const ConversationFormatterOutputSchema = z.object({
  formattedConversation: z
    .string()
    .describe('The formatted conversation in speaker: dialogue format.'),
});
export type ConversationFormatterOutput = z.infer<
  typeof ConversationFormatterOutputSchema
>;

// Exported function to call the flow
export async function formatConversation(
  input: ConversationFormatterInput
): Promise<ConversationFormatterOutput> {
  return conversationFormatterFlow(input);
}

// Define the prompt
const conversationFormatterPrompt = ai.definePrompt({
  name: 'conversationFormatterPrompt',
  input: {schema: ConversationFormatterInputSchema},
  output: {schema: ConversationFormatterOutputSchema},
  prompt: `You are a conversation formatter. Your job is to take a raw conversation snippet and reformat it into a structured format with clear speaker labels and dialogue.

Here is the raw conversation:

{{rawConversation}}

Ensure each line of dialogue is formatted as "speaker: dialogue". Infer the speaker names and correctly format their dialogue.`,
});

// Define the flow
const conversationFormatterFlow = ai.defineFlow(
  {
    name: 'conversationFormatterFlow',
    inputSchema: ConversationFormatterInputSchema,
    outputSchema: ConversationFormatterOutputSchema,
  },
  async input => {
    const {output} = await conversationFormatterPrompt(input);
    return output!;
  }
);
