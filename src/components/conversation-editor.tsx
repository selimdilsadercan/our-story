"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { formatConversationAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Bot, Clipboard, ClipboardCheck } from 'lucide-react';
import React from 'react';

const initialState = {
  message: '',
  errors: {},
  formattedConversation: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Formatting...' : 'Format Conversation'}
      <Bot className="ml-2" />
    </Button>
  );
}

export function ConversationEditor() {
  const [state, formAction] = useFormState(formatConversationAction, initialState);
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (state.message !== 'success' && state.message !== '' && !state.errors?.rawConversation) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);
  
  const handleCopy = () => {
    if (state.formattedConversation) {
      navigator.clipboard.writeText(state.formattedConversation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Bot />
          Conversation Formatter AI
        </CardTitle>
        <CardDescription>
          Paste a raw conversation snippet below. The AI will format it into "speaker: dialogue" format.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              name="rawConversation"
              placeholder="e.g., hey how are you -i'm good thanks, you? -great!"
              rows={6}
              className="bg-background"
            />
            {state.errors?.rawConversation && (
              <p className="text-sm text-destructive">{state.errors.rawConversation.join(', ')}</p>
            )}
          </div>
          {state.formattedConversation && (
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Formatted Result:</h3>
              <div className="relative p-4 rounded-md bg-muted border">
                <pre className="whitespace-pre-wrap text-sm font-body">
                  {state.formattedConversation}
                </pre>
                 <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleCopy}>
                  {copied ? <ClipboardCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
