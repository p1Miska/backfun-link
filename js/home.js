(function () {
  const S = window.SITE, T = S.twitch, M = S.madsun;
  const out = [];

  /* ---------- Главные разделы ---------- */
  out.push(`<div class="features">
  <article class="twitch enter" id="twitchCard" style="--i:0">
    <div class="twitch__body">
      <div class="feature__top"><span class="card__kicker">Главная площадка</span><span class="platform-mark platform-mark--lg" aria-hidden="true"><img src="/images/icons/twitch.svg" alt=""></span></div>
      <div class="twitch__main">
        <h2>Twitch</h2>
        <p class="handle">${U.esc(T.handle)}</p>
        <p class="desc">${U.esc(T.description)}</p>
      </div>
      <div class="feature__footer">
        ${U.stats(T.stats)}
        <a class="btn btn--light" href="${U.esc(T.url)}" target="_blank" rel="noopener">Смотреть на Twitch</a>
      </div>
    </div>
  </article>`);

  const t = U.totals();
  const mstats = [
    { value: t.seasons, forms: ['сезон', 'сезона', 'сезонов'] },
    { value: t.days, forms: ['день игры', 'дня игры', 'дней игры'] }
  ];
  if (t.players > 0) mstats.push({ value: t.players, forms: ['игрок', 'игрока', 'игроков'] });
  out.push(`<a class="madsun-card enter" style="--i:1" href="/madsun/">
    <div class="feature__top"><span class="card__kicker">Майнкрафт-сервер</span><span class="madsun-card__sun" aria-hidden="true"></span></div>
    <div class="madsun-card__main">
      <h2>${U.esc(M.name)}</h2>
      <p class="desc">${U.esc(M.description)}</p>
    </div>
    <div class="feature__footer">
      ${U.stats(mstats)}
      <span class="pill pill--cyan">Смотреть сезоны</span>
    </div>
  </a></div>`);

  /* ---------- Остальные соцсети ---------- */
  out.push('<div class="grid">' + S.socials.map((s, i) => `
    <a class="card enter" style="--brand:${U.esc(s.brand)};--i:${i + 2}" href="${U.esc(s.url)}" target="_blank" rel="noopener" aria-label="${U.esc(s.name)}: ${U.esc(s.cta)}">
      <span class="card__index" aria-hidden="true">0${i + 1}</span>
      <div class="who">
        <span class="platform-mark" aria-hidden="true"><img src="/images/icons/${U.esc(s.icon)}.svg" alt=""></span>
        <div><h3>${U.esc(s.name)}</h3><p class="handle">${U.esc(s.handle)}</p></div>
      </div>
      <p class="desc">${U.esc(s.description)}</p>
      <div class="card__foot">${U.stats(s.stats)}<span class="pill">${U.esc(s.cta)}</span></div>
    </a>`).join('') + '</div>');

  document.getElementById('cards').innerHTML = out.join('');

  const cards = document.getElementById('cards');
  const features = cards.querySelector('.features');
  const madsunCard = cards.querySelector('.madsun-card');
  const narrowScreen = matchMedia('(max-width: 859px)');
  function placeMadsunCard() {
    if (narrowScreen.matches) {
      if (madsunCard.parentElement !== cards) cards.append(madsunCard);
      madsunCard.style.setProperty('--i', S.socials.length + 2);
    } else {
      if (madsunCard.parentElement !== features) features.append(madsunCard);
      madsunCard.style.setProperty('--i', 1);
    }
  }
  narrowScreen.addEventListener('change', placeMadsunCard);
  placeMadsunCard();

  /* ---------- Twitch: во время стрима появляется плеер ---------- */
  async function isLive() {
    const q = new URLSearchParams(location.search).get('live'); // ?live=1 / ?live=0 — проверить вид карточки
    if (q !== null) return q === '1';
    if (typeof T.forceLive === 'boolean') return T.forceLive;
    try {
      const r = await fetch(`https://decapi.me/twitch/uptime/${encodeURIComponent(T.channel)}`, { cache: 'no-store' });
      const text = (await r.text()).toLowerCase();
      return r.ok && !/offline|not found|error|does not exist/.test(text);
    } catch (e) { return false; }
  }

  isLive().then(live => {
    if (!live) return;
    const card = document.getElementById('twitchCard');
    const media = document.createElement('div');
    media.className = 'twitch__media';
    media.innerHTML = `<iframe src="https://player.twitch.tv/?channel=${encodeURIComponent(T.channel)}&parent=${encodeURIComponent(location.hostname)}&muted=true&autoplay=true" title="Стрим backfun на Twitch" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    card.classList.add('twitch--live');
    card.prepend(media);
  });
})();
