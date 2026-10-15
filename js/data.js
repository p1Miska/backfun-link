/* ================================================================
   ВСЁ СОДЕРЖИМОЕ САЙТА ЛЕЖИТ ЗДЕСЬ.
   Тексты, цифры, ссылки и данные сезонов меняются только в этом файле.
   Что ещё не заполнено:
     - ссылки на скачивание 1 и 3 сезонов (downloads[].url)
     - список игроков (players)
     - онлайн сезона (online)
     - видео финала 1 и 3 сезонов (video.file / video.youtube)
   ================================================================ */
window.SITE = {
  name: 'backfun',
  email: 'backfun@backfun.fun',
  donate: 'https://www.donationalerts.com/r/backfun',

  /* ---------- Twitch: большая карточка. Плеер появляется сам, когда идёт стрим ---------- */
  twitch: {
    channel: 'backfun',
    url: 'https://www.twitch.tv/backfun',
    handle: 'twitch.tv/backfun',
    description: 'Стримы по хоррорам, сюжетным играм и Пепеленду. Микростример.',
    // value — число, подпись склоняется сама (forms: 1 / 2-4 / 5+)
    stats: [{ value: 763, forms: ['фолловер', 'фолловера', 'фолловеров'] }],
    forceLive: null            // null = автоматически, true/false = вручную
  },

  /* ---------- Остальные соцсети ---------- */
  socials: [
    {
      id: 'telegram', name: 'Telegram', handle: '@backfun',
      url: 'https://telegram.me/backfun', brand: '#29a8e8', icon: 'telegram',
      description: 'Анонсы стримов, новости и мемы раньше всех.',
      stats: [{ value: 275, forms: ['подписчик', 'подписчика', 'подписчиков'] }],
      cta: 'Открыть канал'
    },
    {
      id: 'discord', name: 'Discord', handle: 'Филеофиш',
      url: 'https://discord.gg/baGGhTHg', brand: '#5865f2', icon: 'discord',
      description: 'Сообщество: общение, мемы, сбор на стримы и игры.',
      stats: [{ value: 118, forms: ['участник', 'участника', 'участников'] }],
      cta: 'Зайти на сервер'
    },
    {
      id: 'youtube', name: 'YouTube', handle: '@mrbackfun',
      url: 'https://youtube.com/@mrbackfun?si=z7VRpJxRGETtIh2Q', brand: '#ff2d2d', icon: 'youtube',
      description: 'Самостоятельные видео.',
      stats: [
        { value: 173, forms: ['подписчик', 'подписчика', 'подписчиков'] },
        { value: 4, forms: ['видео', 'видео', 'видео'] }
      ],
      cta: 'Смотреть канал'
    },
    {
      id: 'tiktok', name: 'TikTok', handle: '@backfun',
      url: 'https://www.tiktok.com/@backfun', brand: '#fe2c55', icon: 'tiktok',
      description: 'Нарезки стримов, самостоятельные видео и приколы.',
      stats: [{ value: 2330, forms: ['подписчик', 'подписчика', 'подписчиков'] }],
      cta: 'Открыть профиль'
    }
  ],

  /* ---------- Медсан ---------- */
  madsun: {
    name: 'Медсан',
    description: 'Майнкрафт-сервер сообщества. Здесь собрано, как проходил каждый сезон: кто играл, как всё было и где скачать мир.',
    telegram: 'https://t.me/madsun_server',
    seasons: [
      {
        id: 1, title: 'Madsun', subtitle: 'Сезон с очень горячим солнцем',
        accent: '#1fd5f4',
        start: '2025-09-29', end: '2025-10-27',      // end: null, если сезон ещё идёт
        version: '1.21.1', server: 'Пиратский', modloader: '',
        description: [
          'Первый сезон Медсана. Главной особенностью стала уникальная механика очень горячего солнца: днём нельзя было безопасно находиться на улице даже в шлеме, иначе огонь сжигал тебя дотла.'
        ],
        players: [],         // ники: ['Nick1', 'Nick2']. Ник по клику ведёт на профиль NameMC
        online: '',          // например '25 макс.'. Пусто = «данные собираются…»
        photos: 6,           // сколько фото лежит в images/madsun/1/ (1.jpg, 2.jpg ...)
        video: { file: '', autoplay: false },   // file: файл или прямая ссылка на mp4, например '/images/madsun/1/final.mp4'. Пусто = вкладки «Видео» нет.
                                                // autoplay: true = видео само запускается без звука и по кругу, когда открыта вкладка
        downloads: [
          { label: 'Мир сезона', note: 'Мир для Java Edition', url: '' }    // url: ссылка на Google Диск
        ]
      },
      {
        id: 2, title: 'Madsun Remnants', subtitle: 'Выживание на остатках уничтоженного мира',
        accent: '#4f9dff',
        start: '2026-02-15', end: '2026-03-15',
        version: '1.21.8', server: 'Пиратский', modloader: '',
        description: [
          'Прошлая вселенная была уничтожена солнцем… Солнце успокоилось, но мир был уничтожен.',
          'Выживание на остатках былого мира: уцелели лишь различные блоки на расстоянии друг от друга, подобно карте скайгрида. В этом уничтоженном мире игроки начали из ничего делать историю…'
        ],
        players: [], online: '', photos: 6,
        video: { file: '', youtube: 'https://www.youtube.com/embed/PDun6zHlBZo', link: 'https://youtu.be/PDun6zHlBZo', autoplay: false },
        downloads: [
          { label: 'Мир сезона', note: 'Мир для Java Edition, 665 МБ', url: 'https://drive.google.com/file/d/1QTiDuM7-ZVwUgiXctNlzQ_qYS7v32UAb/view?usp=sharing' }
        ]
      },
      {
        id: 3, title: 'Madsun 3', subtitle: 'Дивный новый мир с магией, кухней и животными',
        accent: '#7c7cff',
        start: '2026-07-01', end: '2026-09-23',
        version: '1.21.1', server: 'Лицензионный', modloader: 'NeoForge 21.1.233',
        description: [
          'О, дивный новый мир с магией, кухней, животными… концом света и другими измерениями?..',
          'Новый сезон встречает нас на новых условиях, с новыми модами и новыми проблемами, которые нам нужно будет решать совместными усилиями на огромном острове, с которого не всегда есть выход. Возможность полу-РП, проведения мероприятий, сюжет и хороший хост — всё для вас.',
          'Прошлый мир был полностью уничтожен… Но… Что это…? Какая-то сила создала дивный рай для наших игроков, где они могут заниматься земледелием, строить красивые дома и просто наслаждаться жизнью, пока за нами наблюдает… Кот. Просто ли он наблюдает и почему отсюда нет выхода?'
        ],
        players: [], online: '', photos: 6,
        video: { file: '', autoplay: false },
        downloads: [
          { label: 'Карта сезона', note: 'Мир для Java Edition', url: '' },
          { label: 'Сборка сервера', note: 'Minecraft 1.21.1, NeoForge 21.1.233', url: '' }
        ]
      }
    ]
  }
};
