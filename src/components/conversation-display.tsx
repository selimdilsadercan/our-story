
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import * as Tone from 'tone';
import { characters, type ConversationItem, type Character } from '@/lib/conversation-data';
import { useTypingEffect } from '@/hooks/use-typing-effect';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type ConversationDisplayProps = {
  item: ConversationItem;
  onNext: () => void;
};

let dialogueSynth: Tone.Synth;

export function ConversationDisplay({ item, onNext }: ConversationDisplayProps) {
  const [showNextButton, setShowNextButton] = useState(false);
  
  const textToDisplay = item.type === 'dialogue' ? item.line : item.text;
  const currentSpeakerId = item.type === 'dialogue' ? item.speaker : null;
  const speakerInfo = currentSpeakerId ? characters[currentSpeakerId] : null;

  const onFinishedTyping = useCallback(() => {
    setShowNextButton(true);
  }, []);

  const playDialogueSound = useCallback(() => {
    if (dialogueSynth && Tone.context.state === 'running' && item.type === 'dialogue') {
      dialogueSynth.triggerAttackRelease('C#5', '32n');
    }
  }, [item.type]);

  const { displayedText, start: startTyping, complete: completeTyping } = useTypingEffect({
    textToType: textToDisplay,
    speed: 35,
    onCharacterTyped: playDialogueSound,
    onFinished: onFinishedTyping,
  });

  useEffect(() => {
    if (!dialogueSynth) {
        dialogueSynth = new Tone.Synth({
            oscillator: { type: 'square' },
            envelope: { attack: 0.001, decay: 0.1, sustain: 0.1, release: 0.1 }
        }).toDestination();
    }
    
    setShowNextButton(false);
    startTyping();
    
  }, [item, startTyping]);

  const getPresentCharacters = (): Character['id'][] => {
    if (item.type === 'dialogue') {
      return [item.speaker]; // For now, let's assume only the current speaker is present
    }
    return ['selim', 'nurmelek']; // For situations, maybe default to both being present? Or can be empty.
  };

  const presentCharacters = getPresentCharacters();

  return (
    <div className="w-full h-full flex flex-col p-4 animate-fade-in">
      <div className="relative flex-1 flex items-center justify-around min-h-[200px]">
        {Object.values(characters).map((char) => {
            const isSpeaking = char.id === currentSpeakerId;
            // A simple logic to show both characters during situations, and speaking/non-speaking during dialogue
            const isPresentInScene = item.type === 'situation' || (item.type === 'dialogue' && presentCharacters.includes(char.id));

            return (
              <div key={char.id} className={cn("transition-all duration-300", 
                  isSpeaking ? "transform scale-110" : "opacity-70 scale-90",
                  isPresentInScene ? 'opacity-100' : 'opacity-0'
              )}>
                <Image
                  src={char.image}
                  alt={char.name}
                  width={200}
                  height={200}
                  className="object-contain"
                  data-ai-hint={char.dataAiHint}
                />
              </div>
            )
        })}
      </div>
      
      <div onClick={() => { if (!showNextButton) completeTyping(); }} className="cursor-pointer">
        <Card className="min-h-[180px] flex flex-col justify-between shadow-lg border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-4 space-y-2">
            {speakerInfo ? (
              <>
                <h3 className="font-bold text-primary font-headline text-lg">{speakerInfo.name}</h3>
                <p className="text-foreground text-lg leading-snug font-body h-16">{displayedText}</p>
              </>
            ) : (
                <p className="italic text-muted-foreground text-lg leading-snug font-body h-24 p-4">{displayedText}</p>
            )}
          </CardContent>
          {showNextButton && (
            <div className="flex justify-end p-2">
              <Button onClick={(e) => { e.stopPropagation(); onNext(); }} variant="ghost" size="sm" className="animate-bounce-sm">
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
