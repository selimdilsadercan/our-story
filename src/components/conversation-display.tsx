"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import * as Tone from 'tone';
import { characters, type ConversationScene, type Dialogue } from '@/lib/conversation-data';
import { useTypingEffect } from '@/hooks/use-typing-effect';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type ConversationDisplayProps = {
  scene: ConversationScene;
  onNextScene: () => void;
};

let dialogueSynth: Tone.Synth;

export function ConversationDisplay({ scene, onNextScene }: ConversationDisplayProps) {
  const [lineIndex, setLineIndex] = useState(0); 
  const [showNextButton, setShowNextButton] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<Dialogue['speaker'] | null>(null);

  const displayItems = [
      { type: 'situation', text: scene.situation, speaker: null },
      ...scene.dialogue.map(d => ({ type: 'dialogue', text: d.line, speaker: d.speaker }))
  ];
  
  const isLastLine = lineIndex >= displayItems.length - 1;

  const handleNext = useCallback(() => {
    setShowNextButton(false);
    if (isLastLine) {
      onNextScene();
    } else {
      setLineIndex((prev) => prev + 1);
    }
  }, [isLastLine, onNextScene]);

  const onFinishedTyping = useCallback(() => {
    setShowNextButton(true);
  }, []);

  const playDialogueSound = useCallback(() => {
    if (dialogueSynth && Tone.context.state === 'running') {
      dialogueSynth.triggerAttackRelease('C#5', '32n');
    }
  }, []);

  const currentItem = displayItems[lineIndex];
  const textToDisplay = currentItem?.text || '';

  const { displayedText, start: startTyping, complete: completeTyping } = useTypingEffect({
    textToType: textToDisplay,
    speed: 35,
    onCharacterTyped: playDialogueSound,
    onFinished: onFinishedTyping,
  });
  
  // Reset line index when scene changes
  useEffect(() => {
    setLineIndex(0);
  }, [scene]);

  useEffect(() => {
    if (!dialogueSynth) {
        dialogueSynth = new Tone.Synth({
            oscillator: { type: 'square' },
            envelope: { attack: 0.001, decay: 0.1, sustain: 0.1, release: 0.1 }
        }).toDestination();
    }
    
    startTyping();
    setCurrentSpeaker(currentItem?.speaker || null);
    
  }, [lineIndex, startTyping, currentItem]);


  const speakerInfo = currentItem?.speaker ? characters[currentItem.speaker] : null;

  return (
    <div className="w-full h-full flex flex-col p-4 animate-fade-in">
      <div className="relative flex-1 flex items-center justify-around min-h-[200px]">
        {Object.values(characters).map((char) => {
            const isSpeaking = char.id === currentSpeaker;
            const isPresent = scene.dialogue.some(d => d.speaker === char.id);
            if(!isPresent && lineIndex > 0) return null;
            
            const showCharacter = lineIndex > 0 ? isPresent : false;
            if(!showCharacter && currentItem.type !== 'dialogue') return null;

            return (
              <div key={char.id} className={cn("transition-all duration-300", isSpeaking ? "transform scale-110" : "opacity-70 scale-90")}>
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
      
      <div onClick={completeTyping} className="cursor-pointer">
        <Card className="min-h-[180px] flex flex-col justify-between shadow-lg border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-4 space-y-2">
            {speakerInfo ? (
              <>
                <h3 className="font-bold text-primary font-headline text-lg">{speakerInfo.name}</h3>
                <p className="text-foreground text-lg leading-snug font-body h-16">{displayedText}</p>
              </>
            ) : (
                <p className="italic text-muted-foreground text-lg leading-snug font-body h-24">{displayedText}</p>
            )}
          </CardContent>
          {showNextButton && (
            <div className="flex justify-end p-2">
              <Button onClick={(e) => { e.stopPropagation(); handleNext(); }} variant="ghost" size="sm" className="animate-bounce-sm">
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
