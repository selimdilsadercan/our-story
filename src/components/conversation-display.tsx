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

type DisplayItem = {
    type: 'situation' | 'dialogue';
    text: string;
    speaker: Dialogue['speaker'] | null;
};

let dialogueSynth: Tone.Synth;

export function ConversationDisplay({ scene, onNextScene }: ConversationDisplayProps) {
  const [lineIndex, setLineIndex] = useState(0); 
  const [showNextButton, setShowNextButton] = useState(false);

  const displayItems = React.useMemo<DisplayItem[]>(() => {
    const items: DisplayItem[] = [];
    if (scene.situation) {
        items.push({ type: 'situation', text: scene.situation, speaker: null });
    }
    if (scene.dialogue) {
        items.push(...scene.dialogue.map(d => ({ type: 'dialogue', text: d.line, speaker: d.speaker })));
    }
    return items;
  }, [scene]);
  
  const currentItem = displayItems[lineIndex];
  const isLastLine = lineIndex >= displayItems.length - 1;
  const currentSpeaker = currentItem?.speaker || null;
  const textToDisplay = currentItem?.text || '';

  const handleNext = useCallback(() => {
    setShowNextButton(false);
    if (isLastLine) {
      onNextScene();
    } else {
      setLineIndex((prev) => prev + 1);
    }
  }, [isLastLine, onNextScene, lineIndex]);

  const onFinishedTyping = useCallback(() => {
    setShowNextButton(true);
  }, []);

  const playDialogueSound = useCallback(() => {
    if (dialogueSynth && Tone.context.state === 'running' && currentItem?.type === 'dialogue') {
      dialogueSynth.triggerAttackRelease('C#5', '32n');
    }
  }, [currentItem]);

  const { displayedText, start: startTyping, complete: completeTyping } = useTypingEffect({
    textToType: textToDisplay,
    speed: 35,
    onCharacterTyped: playDialogueSound,
    onFinished: onFinishedTyping,
  });

  // This effect runs when the scene changes. It resets the line index and handles empty scenes.
  useEffect(() => {
    setLineIndex(0);
    if (displayItems.length === 0) {
      onNextScene();
    }
  }, [scene, displayItems, onNextScene]);
  
  // This effect runs when the line index changes (or the scene changes, causing the line to change).
  // It starts the typing animation for the new line.
  useEffect(() => {
    if (!dialogueSynth) {
        dialogueSynth = new Tone.Synth({
            oscillator: { type: 'square' },
            envelope: { attack: 0.001, decay: 0.1, sustain: 0.1, release: 0.1 }
        }).toDestination();
    }
    
    setShowNextButton(false);

    if(currentItem) {
        startTyping();
    }
    
  }, [currentItem, startTyping]);


  const speakerInfo = currentItem?.speaker ? characters[currentItem.speaker] : null;

  if (!currentItem) {
    return null; // Don't render anything if there's no item to display
  }

  return (
    <div className="w-full h-full flex flex-col p-4 animate-fade-in">
      <div className="relative flex-1 flex items-center justify-around min-h-[200px]">
        {Object.values(characters).map((char) => {
            const isSpeaking = char.id === currentSpeaker;
            const isPresent = scene.dialogue.some(d => d.speaker === char.id);
            if(!isPresent && currentItem?.type === 'dialogue') return null;
            
            const showCharacter = currentItem?.type === 'dialogue';

            return (
              <div key={char.id} className={cn("transition-all duration-300", isSpeaking ? "transform scale-110" : "opacity-70 scale-90", showCharacter ? 'opacity-100' : 'opacity-0')}>
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
