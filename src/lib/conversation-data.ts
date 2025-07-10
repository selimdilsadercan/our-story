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
    situation: "Ortak arkadaşları Işıl'la birlikte yemekhaneye gelen Selim ve Nurmelek tanışırlar. Arkadaş grubu içinde ilk muhabbetler yapılır.",
    dialogue: [],
  },
  {
    situation: "Nurmelek, Işıl'dan Selim'in telefon numarasını alır.",
    dialogue: [
      { speaker: 'nurmelek', line: "Kanzi seslide misin ders çalışalım birlikte," },
      { speaker: 'selim', line: "Olur usta gel çalışalım." },
    ],
  },
  {
    situation: "Birlikte ders çalışırlar, Selim kendi alanı olan logaritma sorularını çözemez.",
    dialogue: [
      { speaker: 'selim', line: "Halledemedim şu soruları." },
      { speaker: 'nurmelek', line: "Bak şöyle yapıcan." },
    ],
  },
  {
    situation: "Nurmelek, Selim'in soruları çözmesine yardımcı olur. Vize zamanı sürekli birlikte ders çalışırlar, aralarda sık sık zaman geçirirler, yemekhaneye ve çay içmeye hep birlikte giderler.",
    dialogue: [
        { speaker: 'nurmelek', line: "Senle güzel çalışabiliyoruz he, ekipte en iyi ders çalışan sen olabilirsin." }
    ]
  },
  {
      situation: "Final zamanı birlikte ders çalışmaya devam ederler.",
      dialogue: [
          { speaker: 'nurmelek', line: "Falcıya gitmiştim kaderimde birlikte olacağım kişide m ve s harfleri varmış." },
          { speaker: 'selim', line: "Kim acaba aklıma isim gelmedi." },
          { speaker: 'nurmelek', line: "Selim'de m ve s varmış bak ahaha." }
      ]
  },
  {
      situation: "Birlikte filmler izlemeye başlarlar. Film izlerken Selim elini Nurmelek'in omzuna atar. Başarım: İlk temaslar!",
      dialogue: []
  },
  {
      situation: "Ders molasında dışarıda bir market arabası görürler. Nurmelek ona biner, Selim sürer, dışarıda tatlı zaman geçirirler.",
      dialogue: []
  },
  {
      situation: "Birlikte diziler izlemeye başlarlar. Selim sınavı yokken Nurmelek'i beklemek için yanında kitap okur, kitabı bitince Nurmelek'in kucağına uzanıp reels izlemeye başlar. Nurmelek şaşırır, Selim'in saçını okşayarak ders çalışmaya devam eder, Selim şaşırır.",
      dialogue: []
  },
  {
      situation: "İkisinin de yurda döndüğü bir gün WhatsApp'tan birbirlerine en sevdikleri şarkıları atarlar, tüm gece konuşurlar.",
      dialogue: []
  },
  {
      situation: "Selim'in takım sunumu sonrası Nurmelek, Selim ve İlayda birlikte bira içmeye gider. Yolda Selim, İlayda'nın yanına oturunca Nurmelek kıskanır. Başarım: İlk kıskanma!",
      dialogue: []
  },
  {
      situation: "Selim, Nurmelek'i date için kahvaltıcıya götürür. Birbirlerini tanımaya yönelik sorular sorarlar, güzel zaman geçirirler. Başarım: İlk date!",
      dialogue: []
  },
  {
      situation: "Final zamanı birlikte ders çalışmaya devam ederler. Selim Nurmelek'le tekrar dışarı çıkmak ister.",
      dialogue: [
          { speaker: 'selim', line: "Bi dışarı çıkmayalım mı?" },
          { speaker: 'nurmelek', line: "2 sınavdan çıktım yorgunum, başka zaman yaparız." },
          { speaker: 'selim', line: "Bana date borcun var bak." },
          { speaker: 'nurmelek', line: "Yorgun hissediyorum çıkmak istemiyorum." }
      ]
  },
  {
      situation: "Nurmelek ilişki istemediği için bu teklifi reddetmiştir. Aynı gün arkadaşıyla birlikte falcıya gitmiş ve bu konuları falcıya sormuştur.",
      dialogue: []
  },
  {
      situation: "Nurmelek'in okula ilk geldiği gün arkadaş grubuyla birlikte bira içmek için Mezzo'da buluşurlar, Selim ve Nurmelek arasında ufak bakışmalar olur.",
      dialogue: []
  },
  {
      situation: "Mezzo sonrası okula geldiklerinde güzel karlı bir hava vardır, bu arkadaş grubu kendi arasında karla oynamaya başlar. Selim ve Nurmelek bir süre sonra ayrı takılmaya başlarlar ve flörtleşerek karlı havada birlikte zaman geçirirler.",
      dialogue: []
  },
  {
      situation: "Nurmelek'in kafası iyice karışmıştır. Arkadaşı Işıl'a eğer Selim bir şey sorarsa 'arkadaş olarak gördüğünü' söylemesini ister.",
      dialogue: []
  },
  {
      situation: "Ertesi gün Selim ve Işıl birlikte yürürlerken Selim, Işıl'a durumu sormaya karar verir.",
      dialogue: [
          { speaker: 'selim', line: "Nurmelek'le biraz garip gidiyor işler." },
          { speaker: 'isil', line: "(Ufak kıkırdamalar)" },
          { speaker: 'selim', line: "Ne diyosun nasıl sence durum?" },
          { speaker: 'isil', line: "Knk Nurmelek bana 'arkadaş olarak görüyor' dememi söyledi. Ben sadece elçiyim." }
      ]
  },
  {
      situation: "Durum iyice garip bir hal almıştır. Selim artık bırakacakken ertesi gün tekrar denk gelirler.",
      dialogue: [
          { speaker: 'nurmelek', line: "Ne oldu sessizsin, konuşmuyor muyuz?" },
          { speaker: 'selim', line: "Yo konuşuyoruz bir sıkıntı yok." }
      ]
  },
  {
      situation: "Garip şekilde devam ederler. Vize zamanı tekrardan birlikte çalışmaya başlarlar.",
      dialogue: []
  },
  {
      situation: "Ramazanda ilk sahur için Selim yurda yemek söylemiştir. Nurmelek okula gelmiş ve Selim'e birlikte sahur yapmayı teklif etmiştir. Nurmelek, Selim'in yurduna gelir, birlikte kovana gider ve sahur yaparlar.",
      dialogue: []
  },
  {
      situation: "Ramazanda her sahuru birlikte geçirirler, birlikte yer birlikte bir şeyler izler arada arkadaş grubuyla birlikte dışarı çıkarlar.",
      dialogue: []
  },
  {
      situation: "Birlikte Nurmelek'in eskiden oynadığı bir oyuna başlarlar, uzun süre oynadıktan sonra oyunu bitirirler.",
      dialogue: []
  },
  {
      situation: "Selim bu ramazan günlerinden birinde Nurmelek'e çeşitli sorular sormaya başlar.",
      dialogue: [
          { speaker: 'selim', line: "Hoşlandığın tip nedir?" },
          { speaker: 'nurmelek', line: "Benden uzun olsun, kumral olsun, baby face olsun." },
      ]
  },
  {
      situation: "Selim, Nurmelek'e genel, ilişkiler hakkında ve kişiyi tanımaya yönelik bir sürü soru sorar.",
      dialogue: [
          { speaker: 'selim', line: "Benle evlenir miydin?" },
          { speaker: 'nurmelek', line: "Evlenmezdim herhalde red flaglerin var." }
      ]
  },
  {
      situation: "Nurmelek, Selim'in çok kız arkadaşı olmasından rahatsızdır ve bunu dile getirmiştir. Bu sorular sonrası gölete inerler ve gün doğumunu izlemeye başlarlar.",
      dialogue: []
  },
  {
      situation: "Ufak temaslar ederek uzun süre otururlar. Selim durumdan rahatsız olmuştur.",
      dialogue: [
          { speaker: 'selim', line: "Hadi ben salağım böyle davranıyorum, sen de mi salaksın?" },
          { speaker: 'nurmelek', line: "(Şaşırır)" }
      ]
  },
  {
      situation: "Yer değiştirirler, bankta sarılarak oturmaya devam ederler. Gün doğduktan sonra yurtlara dağılmaya karar verirler. Dönüşte Selim, Nurmelek'e masa tenisi oynamayı teklif eder, biraz da orada zaman geçirirler.",
      dialogue: []
  },
  {
      situation: "Ramazan boyunca birlikte zaman geçirirler. Sahuru beklerken Selim'in kitap okuduğu, Nurmelek'in de gözlerini dinlendirdiği bir gün, Nurmelek yanlışlıkla gaz çıkartır. Başarım: İlk gaz çıkarma!",
      dialogue: []
  },
  {
      situation: "Tekrar gün doğumunu izlemeye gölete gittikleri bir gün gölet evine çıkarlar. Orada oturur, genel muhabbet ederler. Selim, Nurmelek'e yakınlaşmak için adım atar.",
      dialogue: [
          { speaker: 'nurmelek', line: "ARKADAŞIZ!" },
          { speaker: 'selim', line: "?₺!\"+#!?#!_#" }
      ]
  },
  {
      situation: "Garip bir durum oluşmuştur. Biraz daha otururlar, geri dönmeye karar verip inerlerken arı kovanlarının olduğu yerde de biraz oturmaya karar verirler.",
      dialogue: []
  },
  {
      situation: "Selim artık bu garip durumdan sıkılmıştır. Nurmelek'in tam olarak neler hissettiğini anlamak için direkt duygularını sormaya başlar.",
      dialogue: [
          { speaker: 'selim', line: "Garip değil mi sence de durumumuz?" },
          { speaker: 'nurmelek', line: "Evet garip gerçekten." }
      ]
  },
  {
      situation: "Hisleri konuşmaya başlarlar. Bir anda ikisi de aylardır birbirleriyle konuşamadığı hislerini anlatmaya başlar. İlerleyememelerinin sebebinin Nurmelek'in yakın zamanda Amerika'ya gidecek olması ve ilişki istememesi olduğunu konuşurlar.",
      dialogue: [
        { speaker: 'nurmelek', line: "Ben Amerika'ya gidim, sen sevgili yap. Dönünce ayrıl sonra okulu bitirip evlenelim." },
        { speaker: 'selim', line: "?₺?_/'?₺#" }
      ]
  },
  {
      situation: "İlişki hakkında biraz daha konuşmaya devam ederler, sarılarak otururlar. Nurmelek zaman geçirmekten hoşlandığından bahseder. Biraz daha oturduktan sonra bir şekilde birlikte dans etmeye başlarlar.",
      dialogue: [
        { speaker: 'selim', line: ")&!)##!;" }
      ]
  },
  {
      situation: "Bu günden sonra birlikte zaman geçirmeye, ders çalışmaya, film izlemeye devam ederler. Birlikte güzel iftarlar yaparlar, arada dışarı çıkarlar.",
      dialogue: []
  },
  {
      situation: "Saraçhane zamanlarında Nurmelek yürüyüşlere katılmıştır, Selim'i de çağırır ancak Selim oraya gitmek istemez. Bu konudaki tavrı da iyi olmadığından Nurmelek kırılır. Döndüğünde konuştuklarında Selim tekrardan Nurmelek'i kıracak şeyler yapar ve Nurmelek, Selim'e küser. Başarım: İlk büyük kavga!",
      dialogue: []
  },
  {
      situation: "Selim, Nurmelek'i görebilmek için onun gittiği kuru temizlemeye giderek yakalamaya çalışır, ama 20 dakikayla kaçırır.",
      dialogue: []
  },
  {
      situation: "Ertesi gün konuşarak durumu biraz olsun toparlarlar. Selim, Nurmelek'in saat 7'deki vize görüşmesine geleceğini söyler. Birlikte görüşmeye giderler, tatlı zaman geçirirler, Nurmelek Selim'le barışır.",
      dialogue: []
  },
  {
      situation: "Bayramda eve döndüklerinde Nurmelek köyüne gitmez, evde tek kalır. Bira içip sarhoş olur ve Selim'le konuşurken onu çok sevdiğini söyler ama Amerika'dan dolayı ilişki istemediğini ekler. İkisinin de kafası karışıktır.",
      dialogue: []
  },
  {
      situation: "Birlikte gece film izleyerek, Spotify'dan ortak jam açarak müzik dinleyerek ve gün içinde sık sık konuşarak zaman geçirirler.",
      dialogue: []
  },
  {
      situation: "Ertesi günlerde Nurmelek, Selim'e arkadaş olarak kalmayı istese hayatından çıkıp çıkmayacağını sorar. Selim bu teklifi çok saçma bulur ve reddeder. Nurmelek biraz üzülür ama konuyu değiştirip normal konuşmaya devam ederler.",
      dialogue: []
  },
  {
      situation: "Döndüklerinde ders çalışmaya ve takılmaya devam ederler. Ders çalıştıkları bir gün Selim, Nurmelek'in öylesine dediği bir fikri uğraşıp yapar. Nurmelek tekrardan etkilenir.",
      dialogue: []
  },
  {
      situation: "Nurmelek sınavları sonrası arkadaşlarıyla içmeye gider, normalde döneceğini söylediği saatte dönmemiştir.",
      dialogue: [
          { speaker: 'selim', line: "Hadi gelmicen mi?" },
          { speaker: 'nurmelek', line: "Ben bi bira daha içicem sanırım." },
          { speaker: 'selim', line: "Geç oldu gel hadi." },
          { speaker: 'nurmelek', line: "Bizimkiler kampüse dönmicek tek dönücem sanırım." },
          { speaker: 'selim', line: "Ben de geleyim benim de canım istedi 2 de ben içerim döneriz." }
      ]
  },
  {
      situation: "Selim yalnız dönmemesi için Nurmelek'in yanına gitmiştir. Nurmelek'in arkadaşları dönerler, Selim ve Nurmelek önce o mekanda sonra başka yerde biraz daha içerler. Bira içerler, sarılırlar.",
      dialogue: []
  },
  {
      situation: "Selim'in sürekli olarak yaptığı tatlı davranışlar, onu bırakmaması ve bir sorun olduğunda barışmak için çabaladığını gören Nurmelek, Selim'i sevdiğinden artık emin olmuştur ve sevgili olmaya karar vermiştir.",
      dialogue: [
          { speaker: 'nurmelek', line: "Öpsene beni." }
      ]
  },
  {
      situation: "İlk öpüşme ve artık sevgili olmayı başarmışlardır... To be continued...",
      dialogue: []
  }
];
