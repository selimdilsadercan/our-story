"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

type UseTypingEffectParams = {
  textToType: string;
  speed?: number;
  onCharacterTyped?: () => void;
  onFinished?: () => void;
};

export function useTypingEffect({
  textToType,
  speed = 50,
  onCharacterTyped,
  onFinished,
}: UseTypingEffectParams) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const onFinishedRef = useRef(onFinished);
  const onCharacterTypedRef = useRef(onCharacterTyped);

  // Keep refs updated with the latest callbacks
  useEffect(() => {
    onFinishedRef.current = onFinished;
    onCharacterTypedRef.current = onCharacterTyped;
  });

  const start = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplayedText('');
    indexRef.current = 0;
    setIsTyping(true);
  }, []);
  
  useEffect(() => {
    if (!isTyping || !textToType) {
      return;
    }

    const typeCharacter = () => {
      if (indexRef.current >= textToType.length) {
        setIsTyping(false);
        onFinishedRef.current?.();
        return;
      }

      setDisplayedText((prev) => prev + textToType[indexRef.current]);
      onCharacterTypedRef.current?.();
      indexRef.current++;
      
      timeoutRef.current = setTimeout(typeCharacter, speed);
    };

    timeoutRef.current = setTimeout(typeCharacter, speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isTyping, textToType, speed]);

  const complete = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (isTyping) {
      setIsTyping(false);
      setDisplayedText(textToType);
      onFinishedRef.current?.();
    }
  }, [textToType, isTyping]);

  return { displayedText, start, isTyping, complete };
}
