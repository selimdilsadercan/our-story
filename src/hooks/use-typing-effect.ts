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

  const start = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplayedText('');
    indexRef.current = 0;
    setIsTyping(true);
  }, []);

  useEffect(() => {
    if (!isTyping || indexRef.current >= textToType.length) {
      if (isTyping) {
        setIsTyping(false);
        onFinished?.();
      }
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayedText((prev) => prev + textToType[indexRef.current]);
      onCharacterTyped?.();
      indexRef.current++;
    }, speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayedText, isTyping, onCharacterTyped, onFinished, speed, textToType]);

  const complete = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsTyping(false);
    setDisplayedText(textToType);
    onFinished?.();
  }, [textToType, onFinished]);

  return { displayedText, start, isTyping, complete };
}
