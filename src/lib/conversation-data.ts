export interface Character {
  id: 'selim' | 'nurmelek' | 'isil';
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
  isil: {
    id: 'isil',
    name: 'Işıl',
    image: 'https://placehold.co/200x200.png',
    dataAiHint: 'pixel art friend'
  },
};

export const conversations: ConversationScene[] = [
  {
    situation: "Yemekhanede, ortak arkadaşları Işıl, Selim ve Nurmelek'i tanıştırır.",
    dialogue: [
      { speaker: 'isil', line: "Selim, bu Nurmelek. Nurmelek, bu da Selim." },
      { speaker: 'selim', line: "Memnun oldum." },
      { speaker: 'nurmelek', line: "Ben de memnun oldum." },
      { speaker: 'isil', line: "Hadi oturun, yemekler soğumasın!" },
    ],
  },
  {
    situation: "Bir süre sonra, Nurmelek Işıl'dan Selim'in numarasını almıştır. Bir akşam Selim'e mesaj atar.",
    dialogue: [
      { speaker: 'nurmelek', line: "Kanzi, seslide misin? Birlikte ders çalışalım." },
      { speaker: 'selim', line: "Olur usta, gel çalışalım." },
    ],
  },
  {
    situation: "Birlikte ders çalışırken Selim, uzmanlık alanı olan logaritma sorularında takılır.",
    dialogue: [
      { speaker: 'selim', line: "Kahretsin, halledemedim şu soruları..." },
      { speaker: 'nurmelek', line: "Dur, bir de ben bakayım. Hah, bak şöyle yapacaksın..." },
      { speaker: 'selim', line: "Vay, helal olsun! Çözdün valla." },
      { speaker: 'nurmelek', line: "Ne sandın? ;) " },
    ],
  },
];
