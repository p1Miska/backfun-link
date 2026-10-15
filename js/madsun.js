(function () {
  const M = SITE.madsun, t = U.totals();

  const istats = [
    { value: t.seasons, forms: ['сезон', 'сезона', 'сезонов'] },
    { value: t.days, forms: ['день игры', 'дня игры', 'дней игры'] }
  ];
  if (t.players > 0) istats.push({ value: t.players, forms: ['игрок за всё время', 'игрока за всё время', 'игроков за всё время'] });

  document.getElementById('madsunIntro').innerHTML = `
    <h1>${U.esc(M.name)}</h1>
    <p class="lead">${U.esc(M.description)}</p>
    <div class="stats--row">${U.stats(istats)}</div>`;

  const cards = M.seasons.map((s, i) => `
    <a class="season-card enter" style="--a:${U.esc(s.accent)};--i:${i + 1}" href="/madsun/${s.id}/">
      ${U.cover(s)}
      <div class="season-card__body">
        <div class="season-card__top">
          <h2>${U.esc(s.title)}</h2>
          <span class="chip ${s.end ? '' : 'chip--live'}">${s.end ? '' : '<i></i>'}${U.status(s)}</span>
        </div>
        <p class="muted">${U.esc(s.subtitle)}</p>
        <p class="season-card__dates">${U.date(s.start)}${s.end ? ' – ' + U.date(s.end) : ' – сейчас'}</p>
        ${U.stats([
          { value: U.days(s), forms: ['день', 'дня', 'дней'] },
          { value: s.version, label: s.server.toLowerCase() }
        ])}
      </div>
    </a>`);

  // «Однажды…»: карточка про четвёртый сезон, ведёт в Telegram-канал Медсана
  const n = M.seasons.length + 1;
  cards.push(`
    <a class="season-card season-card--tg enter" style="--a:#29a8e8;--i:${n}" href="${U.esc(M.telegram)}" target="_blank" rel="noopener">
      <div class="cover">
        <span class="cover__num" aria-hidden="true">${n}</span>
        <span class="cover__tg"><img src="/images/icons/telegram.svg" alt=""></span>
      </div>
      <div class="season-card__body">
        <div class="season-card__top"><h2>Однажды...</h2></div>
        <p class="muted">${n} сезона в планах пока нет. Будет он или нет, можно узнать в Telegram-канале Медсана.</p>
        <span class="pill pill--tg">Открыть канал</span>
      </div>
    </a>`);

  document.getElementById('seasons').innerHTML = cards.join('');
})();
