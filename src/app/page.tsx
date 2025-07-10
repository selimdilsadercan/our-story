"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Tone from 'tone';
import { ConversationDisplay } from '@/components/conversation-display';
import { conversations } from '@/lib/conversation-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Music, Volume2, VolumeX } from 'lucide-react';

type GameState = 'intro' | 'playing' | 'end';

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [audioReady, setAudioReady] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);

  const musicLoop = useRef<Tone.Loop | null>(null);

  useEffect(() => {
    setGameState('intro');
  }, []);

  const handleStart = useCallback(async () => {
    if (audioReady) {
      setGameState('playing');
      return;
    }
    
    await Tone.start();
    const synth = new Tone.FMSynth({
        harmonicity: 3,
        modulationIndex: 10,
        envelope: { attack: 0.01, decay: 0.2, release: 0.2 },
        modulation: { type: 'square' },
        modulationEnvelope: { attack: 0.01, decay: 0.1, release: 0.1 }
    }).toDestination();
    
    const notes = ["C4", "E4", "G4", "B4", "C5", "G4", "E4"];
    let noteIndex = 0;

    musicLoop.current = new Tone.Loop(time => {
      synth.triggerAttackRelease(notes[noteIndex % notes.length], '8n', time);
      noteIndex++;
    }, '4n').start(0);

    Tone.Transport.start();
    setAudioReady(true);
    setGameState('playing');
  }, [audioReady]);

  const handleNextScene = useCallback(() => {
    if (currentSceneIndex < conversations.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    } else {
      setGameState('end');
    }
  }, [currentSceneIndex]);
  
  const toggleMute = () => {
    if (Tone.getTransport().state === 'started') {
        Tone.getDestination().mute = !musicMuted;
        setMusicMuted(!musicMuted);
    }
  };

  const renderGameState = () => {
    switch (gameState) {
      case 'intro':
        return (
          <Card className="text-center p-8 flex flex-col items-center gap-6 animate-fade-in shadow-xl border-2 border-primary/20">
            <Heart className="w-20 h-20 text-primary" />
            <h1 className="text-4xl font-headline text-primary">Pixel Love Story</h1>
            <p className="text-muted-foreground">A Valentine's Day tale for my one and only.</p>
            <Button onClick={handleStart} size="lg" className="font-bold">
              <Music className="mr-2" />
              Start the Story
            </Button>
          </Card>
        );
      case 'playing':
        return <ConversationDisplay scene={conversations[currentSceneIndex]} onNextScene={handleNextScene} />;
      case 'end':
        return (
          <Card className="text-center p-8 flex flex-col items-center gap-6 animate-fade-in shadow-xl border-2 border-primary/20">
            <h1 className="text-4xl font-headline text-primary">Happy Valentine's Day!</h1>
            <p className="text-muted-foreground">Thank you for sharing this story with me.</p>
            <div className="flex gap-4">
              <Button onClick={() => { setCurrentSceneIndex(0); setGameState('playing'); }} size="lg">Replay Story</Button>
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
      <div className="fixed top-4 right-4 z-10 flex gap-2">
        {audioReady && (
            <Button variant="outline" size="icon" onClick={toggleMute}>
                {musicMuted ? <VolumeX /> : <Volume2 />}
            </Button>
        )}
      </div>
      <div className="w-full max-w-lg h-[640px] flex items-center justify-center">
        {renderGameState()}
      </div>
    </main>
  );
}
