export interface Character {
  id: 'selim' | 'nurmelek' | 'pixelcat';
  name: string;
  image: string;
  dataAiHint: string;
}

export interface Dialogue {
  speaker: Character['id'];
  line: string;
}

export interface ConversationScene {
  situation: string;
  dialogue: Dialogue[];
}

export const characters: Record<Character['id'], Character> = {
  selim: {
    id: 'selim',
    name: 'Selim',
    image: 'https://placehold.co/200x200.png',
    dataAiHint: 'pixel art boy'
  },
  nurmelek: {
    id: 'nurmelek',
    name: 'Nurmelek',
    image: 'https://placehold.co/200x200.png',
    dataAiHint: 'pixel art girl'
  },
  pixelcat: {
    id: 'pixelcat',
    name: 'Pixel Cat',
    image: 'https://placehold.co/150x150.png',
    dataAiHint: 'pixel art cat'
  },
};

export const conversations: ConversationScene[] = [
  {
    situation: "A cozy café, rain tapping on the window. Selim and Nurmelek sit across from each other, steaming mugs in hand.",
    dialogue: [
      { speaker: 'selim', line: "You know, this is nice. Just... quiet." },
      { speaker: 'nurmelek', line: "It is. I was so tired of studying." },
      { speaker: 'selim', line: "Me too. My brain feels like scrambled eggs." },
      { speaker: 'nurmelek', line: "Haha, same! Want to share this last cookie? It's chocolate chip." },
      { speaker: 'selim', line: "Only if I can have the bigger half." },
      { speaker: 'nurmelek', line: "In your dreams, pixel-head!" },
    ],
  },
  {
    situation: "Strolling through a park filled with cherry blossoms. A small, pixelated cat suddenly appears.",
    dialogue: [
      { speaker: 'pixelcat', line: "Mrow?" },
      { speaker: 'nurmelek', line: "Oh my gosh, look! It's so cute!" },
      { speaker: 'selim', line: "It looks like it's made of... pixels." },
      { speaker: 'pixelcat', line: "Meow! Purrrrr..." },
      { speaker: 'nurmelek', line: "I think it likes you, Selim. It's rubbing against your leg." },
      { speaker: 'selim', line: "Okay, okay, you're pretty cute for a blocky furball." },
    ],
  },
  {
    situation: "Under a sky full of stars, on Valentine's Day.",
    dialogue: [
      { speaker: 'selim', line: "Nurmelek..." },
      { speaker: 'nurmelek', line: "Selim?" },
      { speaker: 'selim', line: "I... I have something for you." },
      { speaker: 'nurmelek', line: "You do?" },
      { speaker: 'selim', line: "This whole adventure, every pixel of it, has been better with you. I love you." },
      { speaker: 'nurmelek', line: "Oh, Selim... I love you too. Happy Valentine's Day." },
    ],
  },
];
