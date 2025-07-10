
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import * as Tone from 'tone';
import { characters, type ConversationItem, type Character } from '@/lib/conversation-data';
import { useTypingEffect } from '@/hooks/use-typing-effect';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Trophy, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useToast } from '@/hooks/use-toast';

type ConversationDisplayProps = {
  item: ConversationItem;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
};

let dialogueSynth: Tone.Synth;
let narrationSynth: Tone.Synth;
let achievementPlayer: Tone.Player;
let achievementSoundReady = false;

export function ConversationDisplay({ item, onNext, onBack, canGoBack }: ConversationDisplayProps) {
  const [showNextButton, setShowNextButton] = useState(false);
  const { toast } = useToast();

  const isDialogue = item.type === 'dialogue';
  const fullText = isDialogue ? item.line : item.text;
  
  const hasAchievement = fullText.includes('Başarım:');
  const [narrativeText, achievementText] = hasAchievement 
    ? fullText.split('Başarım:') 
    : [fullText, ''];

  const textToDisplay = narrativeText.trim();
  const currentSpeakerId = isDialogue ? item.speaker : null;
  const speakerInfo = currentSpeakerId ? characters[currentSpeakerId] : null;

  const playAchievementSound = useCallback(() => {
    if (achievementSoundReady && achievementPlayer?.loaded && Tone.context.state === 'running') {
      achievementPlayer.start();
    }
  }, []);

  const onFinishedTyping = useCallback(() => {
    setShowNextButton(true);
    if (hasAchievement) {
      playAchievementSound();
      toast({
        title: (
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-400" />
            <span className="font-bold">Achievement Unlocked!</span>
          </div>
        ),
        description: <p className="font-semibold">{achievementText.trim()}</p>,
        className: "border-yellow-400 bg-background",
        duration: 10000,
      });
    }
  }, [hasAchievement, achievementText, playAchievementSound, toast]);

  const playSound = useCallback(() => {
    if (Tone.context.state !== 'running') return;
    
    if (isDialogue && dialogueSynth) {
      dialogueSynth.triggerAttackRelease('C#5', '32n');
    } else if (!isDialogue && narrationSynth) {
      narrationSynth.triggerAttackRelease('C2', '32n');
    }
  }, [isDialogue]);

  const { displayedText, start: startTyping, complete: completeTyping } = useTypingEffect({
    textToType: textToDisplay,
    speed: 35,
    onCharacterTyped: playSound,
    onFinished: onFinishedTyping,
  });

  useEffect(() => {
    if (!dialogueSynth) {
        dialogueSynth = new Tone.Synth({
            oscillator: { type: 'square' },
            envelope: { attack: 0.001, decay: 0.1, sustain: 0.1, release: 0.1 }
        }).toDestination();
    }
    if (!narrationSynth) {
        narrationSynth = new Tone.Synth({
            oscillator: { type: 'sine' },
            envelope: { attack: 0.001, decay: 0.05, sustain: 0.05, release: 0.1 },
            volume: -12
        }).toDestination();
    }
    if (!achievementPlayer) {
      achievementPlayer = new Tone.Player({
        url: "https://cdn.pixabay.com/audio/2022/03/15/audio_2b2333414b.mp3",
        autostart: false,
        onload: () => {
          achievementSoundReady = true;
        },
        onerror: (err) => console.error("Audio player error:", err),
      }).toDestination();
    }
    
    setShowNextButton(false);
    startTyping();
    
  }, [item, startTyping]);

  const getPresentCharacters = useCallback((): Character['id'][] => {
    if (item.type === 'dialogue') {
      const present: Character['id'][] = [item.speaker];
       if (item.speaker === 'selim' && item.line.toLowerCase().includes('nurmelek')) {
        present.push('nurmelek');
      } else if (item.speaker === 'nurmelek' && item.line.toLowerCase().includes('selim')) {
        present.push('selim');
      } else if (item.speaker !== 'selim' && item.speaker !== 'nurmelek') {
        present.push('selim', 'nurmelek');
      } else if (item.speaker === 'selim') {
        present.push('nurmelek');
      } else if (item.speaker === 'nurmelek') {
        present.push('selim');
      }
      return Array.from(new Set(present));
    }
    return ['selim', 'nurmelek'];

  }, [item]);

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
                  !isPresentInScene && 'opacity-0 scale-50 -translate-y-10',
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
                <div>
                    <p className="italic text-muted-foreground text-lg leading-snug font-body min-h-[100px] p-4">{displayedText}</p>
                </div>
            )}
          </CardContent>
          {showNextButton && (
            <div className="flex justify-between p-2 border-t border-border/50">
              <Button onClick={(e) => { e.stopPropagation(); onBack(); }} variant="ghost" size="sm" className={cn(!canGoBack && 'invisible')}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
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
