
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Tone from 'tone';
import { ConversationDisplay } from '@/components/conversation-display';
import { conversationTimeline } from '@/lib/conversation-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Play } from 'lucide-react';

type GameState = 'intro' | 'playing' | 'end';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [audioReady, setAudioReady] = useState(false);

  const handleStart = useCallback(async () => {
    if (!audioReady) {
      await Tone.start();
      setAudioReady(true);
    }
    setGameState('playing');
  }, [audioReady]);

  const handleNextItem = useCallback(() => {
    if (currentItemIndex < conversationTimeline.length - 1) {
      setCurrentItemIndex(prev => prev + 1);
    } else {
      setGameState('end');
    }
  }, [currentItemIndex]);

  const handlePreviousItem = useCallback(() => {
    if (gameState === 'end') {
      setGameState('playing');
      // The index is already at the last item, so no need to change it.
    } else if (currentItemIndex > 0) {
      setCurrentItemIndex(prev => prev - 1);
    }
  }, [currentItemIndex, gameState]);

  const renderGameState = () => {
    switch (gameState) {
      case 'intro':
        return (
          <Card className="text-center p-8 flex flex-col items-center gap-6 animate-fade-in shadow-xl border-2 border-primary/20">
            <Heart className="w-20 h-20 text-primary" />
            <h1 className="text-4xl font-headline text-primary">Pixel Love Story</h1>
            <p className="text-muted-foreground">A Valentine's Day tale for my one and only.</p>
            <Button onClick={handleStart} size="lg" className="font-bold">
              <Play className="mr-2" />
              Start the Story
            </Button>
          </Card>
        );
      case 'playing':
        return <ConversationDisplay item={conversationTimeline[currentItemIndex]} onNext={handleNextItem} onBack={handlePreviousItem} canGoBack={currentItemIndex > 0} />;
      case 'end':
        return (
          <Card className="text-center p-8 flex flex-col items-center gap-6 animate-fade-in shadow-xl border-2 border-primary/20">
            <h1 className="text-4xl font-headline text-primary">Happy Valentine's Day!</h1>
            <p className="text-muted-foreground">Thank you for sharing this story with me.</p>
            <div className="flex gap-4">
               <Button onClick={handlePreviousItem} size="lg" variant="outline">Go Back</Button>
               <Button onClick={() => { setCurrentItemIndex(0); setGameState('playing'); }} size="lg">Replay Story</Button>
            </div>
             <p className="text-sm text-muted-foreground mt-4">I love you, Nurmelek ❤️</p>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-secondary font-body">
      <div className="w-full max-w-lg flex items-center justify-center">
        {renderGameState()}
      </div>
    </main>
  );
}
