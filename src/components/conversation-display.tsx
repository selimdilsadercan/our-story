
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
import { Avatar, AvatarFallback } from './ui/avatar';

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
    if (dialogueSynth && Tone.context.state === 'running') {
      dialogueSynth.triggerAttackRelease('C#5', '32n');
    }
  }, []);

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
        const otherCharacters = Object.keys(characters).filter(id => id !== item.speaker) as Character['id'][];
        return [item.speaker, ...otherCharacters.filter(id => item.line.includes(characters[id].name))];
    }
    return ['selim', 'nurmelek', 'isil'];
  };

  const presentCharacters = getPresentCharacters();

  return (
    <div className="w-full flex flex-col p-2 md:p-4 animate-fade-in space-y-4">
      <div className="relative flex-1 flex items-end justify-center h-48 md:h-64">
        {Object.values(characters).map((char) => {
            const isSpeaking = char.id === currentSpeakerId;
            const isPresentInScene = presentCharacters.includes(char.id);

            return (
              <div key={char.id} className={cn("transition-all duration-500 ease-in-out absolute bottom-0", 
                  isSpeaking ? "transform scale-110 z-10" : "transform scale-90 opacity-70",
                  !isPresentInScene && 'opacity-0 scale-50',
                  char.id === 'selim' && '-translate-x-1/3',
                  char.id === 'nurmelek' && 'translate-x-1/3',
                  char.id === 'isil' && 'translate-x-full'
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
        <Card className="min-h-[160px] flex flex-col justify-between shadow-lg border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-4 space-y-2 flex-1">
            {speakerInfo ? (
              <div className="flex items-start gap-3">
                 <Avatar className="w-10 h-10 border-2" style={{borderColor: speakerInfo.color}}>
                    <AvatarFallback style={{backgroundColor: speakerInfo.color, color: 'white'}}>{speakerInfo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="w-full">
                    <h3 className="font-bold font-headline text-lg" style={{color: speakerInfo.color}}>{speakerInfo.name}</h3>
                    <p className="text-foreground text-lg leading-snug font-body min-h-[72px]">{displayedText}</p>
                </div>
              </div>
            ) : (
                <p className="italic text-muted-foreground text-lg leading-snug font-body min-h-[100px] p-4">{displayedText}</p>
            )}
          </CardContent>
          {showNextButton && (
            <div className="flex justify-end p-2 border-t border-border/50">
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
