
export interface Character {
  id: 'selim' | 'nurmelek' | 'isil';
  name: string;
  image: string;
  dataAiHint: string;
  color: string;
}

export interface Dialogue {
  type: 'dialogue';
  speaker: Character['id'];
  line: string;
}

export interface Situation {
    type: 'situation';
    text: string;
}

export type ConversationItem = Dialogue | Situation;

export const characters: Record<Character['id'], Character> = {
  selim: {
    id: 'selim',
    name: 'Selim',
    image: '/selimnew.png',
    dataAiHint: 'man with glasses',
    color: '#3b82f6'
  },
  nurmelek: {
    id: 'nurmelek',
    name: 'Nurmelek',
    image: '/nurmeleknew.png',
    dataAiHint: 'girl with brown hair',
    color: '#e879f9'
  },
  isil: {
    id: 'isil',
    name: 'Işıl',
    image: 'https://placehold.co/200x200.png',
    dataAiHint: 'pixel art friend',
    color: '#f59e0b'
  },
};

export const conversationTimeline: ConversationItem[] = [
    { type: 'situation', text: "Ortak arkadaşları Işıl'la birlikte yemekhaneye gelen Selim ve Nurmelek tanışırlar, arkadaş grubu içinde ilk muhabbetler yapılır." },
    { type: 'situation', text: "Nurmelek, Işıl'dan Selim'in telefon numarasını alır." },
    { type: 'dialogue', speaker: 'nurmelek', line: "Kanzi seslide misin ders çalışalım birlikte?" },
    { type: 'dialogue', speaker: 'selim', line: "Olur usta gel çalışalım." },
    { type: 'situation', text: "Birlikte ders çalışırlar, Selim kendi alanı olan logaritma sorularını çözemez." },
    { type: 'dialogue', speaker: 'selim', line: "Halledemedim şu soruları." },
    { type: 'dialogue', speaker: 'nurmelek', line: "Bak şöyle yapıcan." },
    { type: 'situation', text: "Nurmelek, Selim'in soruları çözmesine yardımcı olur, birlikte ders çalışmaya devam ederler." },
    { type: 'situation', text: "Ara tatilde eve gitmeden önce Nurmelek ekip içinde boş olan varsa bi çay içmek istediğini söyler, Selim o sıra boştur ve ikisi birlikte Selfiş'te güzel bir zaman geçirirler. Başarım: İlk baş başa muhabbetler!" },
    { type: 'situation', text: "Tailden döndükten sonra vize zamanı birlikte ders çalışırlar sürekli." },
    { type: 'situation', text: "Ders aralarında ve diğer zamanlarda sık sık zaman geçirirler, yemekhaneye hep birlikte giderler, çayı hep birlikte içerler." },
    { type: 'dialogue', speaker: 'nurmelek', line: "Senle güzel çalışabiliyoruz he, ekipte en iyi ders çalışan sen olabilirsin." },
    { type: 'situation', text: "Final zamanı birlikte ders çalışmaya devam ederler." },
    { type: 'dialogue', speaker: 'nurmelek', line: "Falcıya gitmiştim kaderimde birlikte olacağım kişide m ve s harfleri varmış." },
    { type: 'dialogue', speaker: 'selim', line: "Kim acaba aklıma isim gelmedi." },
    { type: 'dialogue', speaker: 'nurmelek', line: "Selim'de m ve s varmış bak ahaha." },
    { type: 'situation', text: "Birlikte filmler izlemeye başlarlar." },
    { type: 'situation', text: "Film izlerken Selim elini Nurmelek'in omzuna atar. Başarım: İlk temaslar!" },
    { type: 'situation', text: "Ders molasında dışarıda bir market arabası görürler. Nurmelek ona biner, Selim sürer, dışarıda tatlı zaman geçirirler." },
    { type: 'situation', text: "Birlikte diziler izlemeye başlarlar." },
    { type: 'situation', text: "Selim sınavı yokken Nurmelek'i beklemek için yanında kitap okur, kitabı bitince Nurmelek'in kucağına uzanıp reels izlemeye başlar, Nurmelek şaşırır. Nurmelek Selim'in saçını okşayarak ders çalışmaya devam eder, Selim şaşırır." },
    { type: 'situation', text: "İkisinin de yurda döndüğü bir gün WhatsApp'tan birbirlerine en sevdikleri şarkıları atarlar, tüm gece birbirleriyle konuşurlar." },
    { type: 'situation', text: "Selim'in takım sunumu sonrası Nurmelek, Selim ve İlayda birlikte bira içmeye gider, yolda Selim İlayda'nın yanına oturunca Nurmelek kıskanır. Başarım: İlk kıskanma!" },
    { type: 'situation', text: "Selim, Nurmelek'i date için kahvaltıcıya götürür, birbirlerini tanımaya yönelik sorular sorarlar, güzel zaman geçirirler. Başarım: İlk date!" },
    { type: 'situation', text: "Bu date'den sonra Nurmelek Selim'den biraz uzaklaşmaya çalışmaktadır, araları biraz soğuk geçer." },
    { type: 'situation', text: "Bir gün Selim yemek yemeye selfişe gidecekken Nurmelek Selim'e yaptığı rus salatasının kaldığını söyler ve yemesi için ona ikram eder. Başarım: Yapılan ilk yemek!" },
    { type: 'situation', text: "Final zamanı birlikte ders çalışmaya devam ederler. Selim Nurmelek'le tekrar dışarı çıkmak ister." },
    { type: 'dialogue', speaker: 'selim', line: "Bi dışarı çıkmayalım mı?" },
    { type: 'dialogue', speaker: 'nurmelek', line: "2 sınavdan çıktım yorgunum, başka zaman yaparız." },
    { type: 'dialogue', speaker: 'selim', line: "Bana date borcun var bak." },
    { type: 'dialogue', speaker: 'nurmelek', line: "Yorgun hissediyorum çıkmak istemiyorum." },
    { type: 'situation', text: "Nurmelek ilişki istemediği için bu teklifi reddetmiştir, aynı gün arkadaşıyla birlikte falcıya gitmiş ve bu konuları falcıya sormuştur." },
    { type: 'situation', text: "Sınavlardan sonra eve döndüklerinde ufak ufak mesajlaşmalara ve reels göndermelere devam ederler." },
    { type: 'situation', text: "Nurmelek'in okula ilk geldiği gün arkadaş grubuyla birlikte bira içmek için Mezzo'da buluşurlar, Selim ve Nurmelek arasında ufak bakışmalar olur." },
    { type: 'situation', text: "Mezzo sonrası okula geldiklerinde güzel karlı bir hava vardır, bu arkadaş grubu kendi arasında karla oynamaya başlar. Selim ve Nurmelek bir süre sonra ayrı takılmaya başlarlar ve flörtleşerek karlı havada birlikte zaman geçirirler." },
    { type: 'situation', text: "Nurmelek'in kafası iyice karışmıştır. Arkadaşı Işıl'a eğer Selim bir şey sorarsa 'arkadaş olarak gördüğünü' söylemesini söyler." },
    { type: 'situation', text: "Ertesi gün Selim ve Işıl birlikte yürürlerken Selim, Işıl'a durumu sormaya karar verir." },
    { type: 'dialogue', speaker: 'selim', line: "Nurmelek'le biraz garip gidiyor işler." },
    { type: 'dialogue', speaker: 'isil', line: "(Ufak kıkırdamalar)" },
    { type: 'dialogue', speaker: 'selim', line: "Ne diyosun nasıl sence durum?" },
    { type: 'dialogue', speaker: 'isil', line: "Knk Nurmelek bana 'arkadaş olarak görüyor' dememi söyledi." },
    { type: 'situation', text: "Durum iyice garip bir hal almıştır. Selim artık bırakacakken ertesi gün tekrar denk gelirler." },
    { type: 'dialogue', speaker: 'nurmelek', line: "Ne oldu sessizsin, konuşmuyor muyuz?" },
    { type: 'dialogue', speaker: 'selim', line: "Yo konuşuyoruz bir sıkıntı yok." },
    { type: 'situation', text: "Garip şekilde devam ederler." },
    { type: 'situation', text: "Vize zamanı tekrardan birlikte çalışmaya başlarlar." },
    { type: 'situation', text: "Ramazanda ilk sahur için Selim yurda yemek söylemiştir. Nurmelek okula gelmiş ve Selim'e birlikte sahur yapmayı teklif etmiştir. Nurmelek, Selim'in yurduna gelir, birlikte kovana gider ve sahur yaparlar." },
    { type: 'situation', text: "Ramazanda her sahuru birlikte geçirirler, birlikte yer birlikte bir şeyler izler arada arkadaş grubuyla birlikte dışarı çıkarlar." },
    { type: 'situation', text: "Birlikte Nurmelek'in eskiden oynadığı bir oyuna başlarlar, uzun süre oynadıktan sonra oyunu bitirirler." },
    { type: 'situation', text: "Selim bu ramazan günlerinden birinde Nurmelek'e çeşitli sorular sormaya başlar." },
    { type: 'dialogue', speaker: 'selim', line: "Nasıl erkeklerden hoşlanırsın?" },
    { type: 'dialogue', speaker: 'nurmelek', line: "Benden uzun olsun, kumral olsun, baby face olsun." },
    { type: 'situation', text: "Selim Nurmelek'e genel, ilişkiler hakkında ve tanımaya yönelik bir sürü soru sorar." },
    { type: 'dialogue', speaker: 'selim', line: "Benle evlenir miydin?" },
    { type: 'dialogue', speaker: 'nurmelek', line: "Evlenmezdim herhalde red flaglerin var." },
    { type: 'situation', text: "Nurmelek, Selim'in çok kız arkadaşı olmasından rahatsızdır ve bunu dile getirmiştir." },
    { type: 'situation', text: "Bu sorular sonrası gölete inerler ve gün doğumunu izlemeye başlarlar. Ufak temaslar ederek uzun süre otururlar. Selim durumdan rahatsız olmuştur." },
    { type: 'dialogue', speaker: 'selim', line: "Hadi ben salağım böyle davranıyorum, sen de mi salaksın?" },
    { type: 'dialogue', speaker: 'nurmelek', line: "(Şaşırır)" },
    { type: 'situation', text: "Yer değiştirirler, bankta sarılarak oturmaya devam ederler. Gün doğduktan sonra yurtlara dağılmaya karar verirler. Dönüşte Selim, Nurmelek'e masa tenisi oynamayı teklif eder, biraz da orada zaman geçirirler." },
    { type: 'situation', text: "Ramazan boyunca birlikte zaman geçirirler her gece birlikte sahur yaparlar. Sahuru beklerken Selim'in kitap okuduğu, Nurmelek'in de gözlerini dinlendirdiği bir gün, Nurmelek yanlışlıkla gaz çıkartır. Başarım: İlk gaz çıkarma!" },
    { type: 'situation', text: "Tekrar gün doğumunu izlemeye gölete gittikleri bir gün gölet evine çıkarlar. Orada oturur, genel muhabbet ederler. Nurmelek daha fazla ileri gitmemeye çalışmak adına uyarmak ister." },
    { type: 'dialogue', speaker: 'nurmelek', line: "Arkadaşız.. 🫴" },
    { type: 'dialogue', speaker: 'selim', line: "?₺!\"+#!?#!_#" },
    { type: 'situation', text: "Garip bir durum oluşmuştur. Biraz daha otururlar, geri dönmeye karar verip inerlerken arı kovanlarının olduğu yerde de biraz oturmaya karar verirler." },
    { type: 'situation', text: "Selim artık bu garip durumdan sıkılmıştır. Nurmelek'in tam olarak neler hissettiğini anlamak için direkt duygularını sormaya başlar." },
    { type: 'dialogue', speaker: 'selim', line: "Garip değil mi sence de durumumuz?" },
    { type: 'dialogue', speaker: 'nurmelek', line: "Evet garip gerçekten." },
    { type: 'situation', text: "Hisleri konuşmaya başlarlar. Bir anda ikisi de aylardır birbirleriyle konuşamadığı hislerini anlatmaya başlar. İlerleyememelerinin sebebinin Nurmelek'in yakın zamanda Amerika'ya gidecek olması ve ilişki istememesi olduğunu konuşurlar." },
    { type: 'dialogue', speaker: 'nurmelek', line: "Ben Amerika'ya gidim, sen sevgili yap. Dönünce ayrıl sonra okulu bitirip evlenelim." },
    { type: 'dialogue', speaker: 'selim', line: "?₺?_/'?₺#!" },
    { type: 'situation', text: "İlişki hakkında biraz daha konuşmaya devam ederler, sarılarak otururlar. Nurmelek zaman geçirmekten hoşlandığından bahseder. Biraz daha oturduktan sonra bir şekilde birlikte dans etmeye başlarlar." },
    { type: 'dialogue', speaker: 'selim', line: "!?&!&#!;?" },
    { type: 'situation', text: "Bu günden sonra birlikte zaman geçirmeye, ders çalışmaya, film izlemeye devam ederler. Birlikte güzel iftarlar yaparlar, arada dışarı çıkarlar." },
    { type: 'situation', text: "Saraçhane zamanlarında Nurmelek yürüyüşlere katılmıştır, Selim'i de çağırır ancak Selim oraya gitmek istemez. Bu konudaki tavrı da iyi olmadığından Nurmelek kırılır. Döndüğünde konuştuklarında Selim tekrardan Nurmelek'i kıracak şeyler yapar ve Nurmelek, Selim'e küser. Başarım: İlk büyük kavga!" },
    { type: 'situation', text: "Selim, Nurmelek'i görebilmek için onun gittiği kuru temizlemeye giderek yakalamaya çalışır, ama 20 dakikayla kaçırır." },
    { type: 'situation', text: "Ertesi gün konuşarak durumu biraz olsun toparlarlar. Selim, Nurmelek'in saat 7'deki vize görüşmesine geleceğini söyler. Birlikte görüşmeye giderler, tatlı zaman geçirirler, Nurmelek Selim'le barışır." },
    { type: 'situation', text: "Ders çalışmaya ve birlikte zaman geçirmeye devam ederler." },
    { type: 'situation', text: "Bayramda eve döndüklerinde Nurmelek köyüne gitmez, evde tek kalır. Bira içip sarhoş olur ve Selim'le konuşurken onu çok sevdiğini söyler ama Amerika'dan dolayı ilişki istemediğini ekler. İkisinin de kafası karışıktır." },
    { type: 'situation', text: "Birlikte gece film izleyerek, Spotify'dan ortak jam açarak müzik dinleyerek ve gün içinde sık sık konuşarak zaman geçirirler." },
    { type: 'situation', text: "Ertesi günlerde Nurmelek, Selim'e arkadaş olarak kalmayı istese hayatından çıkıp çıkmayacağını sorar. Selim bu teklifi çok saçma bulur ve reddeder. Nurmelek biraz üzülür ama konuyu değiştirip normal konuşmaya devam ederler." },
    { type: 'situation', text: "Döndüklerinde ders çalışmaya ve takılmaya devam ederler. Ders çalıştıkları bir gün Selim, Nurmelek'in öylesine dediği bir fikri uğraşıp yapar. Nurmelek tekrardan etkilenir." },
    { type: 'situation', text: "Nurmelek sınavları sonrası arkadaşlarıyla içmeye gider, normalde döneceğini söylediği saatte dönmemiştir." },
    { type: 'dialogue', speaker: 'selim', line: "Hadi gelmicen mi?" },
    { type: 'dialogue', speaker: 'nurmelek', line: "Ben bi bira daha içicem sanırım." },
    { type: 'dialogue', speaker: 'selim', line: "Geç oldu gel hadi." },
    { type: 'dialogue', speaker: 'nurmelek', line: "Bizimkiler kampüse dönmicek tek dönücem sanırım." },
    { type: 'dialogue', speaker: 'selim', line: "Ben de geleyim benim de canım istedi 2 de ben içerim döneriz." },
    { type: 'situation', text: "Selim yalnız dönmemesi için Nurmelek'in yanına gitmiştir. Nurmelek'in arkadaşları dönerler, Selim ve Nurmelek önce o mekanda sonra başka yerde biraz daha içerler. Bira içerler, sarılırlar." },
    { type: 'situation', text: "Selim'in sürekli olarak yaptığı tatlı davranışlar, onu bırakmaması ve bir sorun olduğunda barışmak için çabaladığını gören Nurmelek, Selim'i sevdiğinden artık emin olmuştur ve sevgili olmaya karar vermiştir." },
    { type: 'dialogue', speaker: 'nurmelek', line: "Öpsene beni." },
    { type: 'situation', text: "İlk öpüşme ve artık sevgili olmayı başarmışlardır... To be continued... Başarım: Sevgili olmayı başarma!" }
];
