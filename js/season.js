(function () {
  const M = SITE.madsun;
  const id = Number(document.body.dataset.season);
  const i = M.seasons.findIndex(s => s.id === id);
  const root = document.getElementById('season');
  if (i < 0) { root.innerHTML = '<p class="lead">Такого сезона нет.</p>'; return; }
  const s = M.seasons[i], prev = M.seasons[i - 1], next = M.seasons[i + 1];
  root.style.setProperty('--a', s.accent);
  document.title = `${s.title} (сезон ${s.id}) — ${M.name} — ${SITE.name}`;

  const chev = d => `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const pending = 'Данные собираются…';
  const players = s.players || [];

  /* ---------- боковая карточка с фактами ---------- */
  const facts = [
    ['Начало', U.date(s.start)],
    ['Конец', s.end ? U.date(s.end) : 'ещё идёт'],
    ['Длительность', U.daysText(s)],
    ['Версия', 'Minecraft ' + s.version],
    ['Сервер', s.server]
  ];
  if (s.modloader) facts.push(['Сборка', s.modloader]);
  facts.push(['Онлайн', s.online || pending]);

  const playersBlock = players.length ? `
    <details class="players">
      <summary>Список игроков <span class="count">${players.length}</span>
        <svg class="players__chev" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </summary>
      <ul>${players.map(p => `<li><a href="https://namemc.com/profile/${encodeURIComponent(p)}" target="_blank" rel="noopener" title="Профиль ${U.esc(p)} на NameMC">
        <img src="https://minotar.net/avatar/${encodeURIComponent(p)}/64" alt="" width="26" height="26" loading="lazy" onerror="this.style.visibility='hidden'"><span>${U.esc(p)}</span></a></li>`).join('')}</ul>
    </details>` : '';

  /* ---------- вкладки ---------- */
  const tabs = [{ id: 'about', label: 'Описание' }];
  if (s.photos > 0) tabs.push({ id: 'photos', label: 'Фотографии' });
  if (s.video && (s.video.file || s.video.youtube)) tabs.push({ id: 'video', label: 'Видео' });
  tabs.push({ id: 'saves', label: 'Сейвы' });

  const downloads = (s.downloads || []).map(d => `
    <div class="dl">
      <div><h3>${U.esc(d.label)}</h3>${d.note ? `<p>${U.esc(d.note)}</p>` : ''}</div>
      ${d.url
        ? `<a class="btn btn--accent" href="${U.esc(d.url)}" target="_blank" rel="noopener">Скачать</a>`
        : `<span class="btn btn--disabled" aria-disabled="true">Ссылка появится позже</span>`}
    </div>`).join('');

  const panels = {
    about: s.description.map(p => `<p>${U.esc(p)}</p>`).join(''),
    photos: '<div class="gallery"></div><p class="empty" hidden>Фотографии скоро появятся.</p>',
    video: s.video && s.video.youtube ? `
      <div class="video">
        <iframe src="${U.esc(s.video.youtube)}" title="Видео финала ${U.esc(s.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <p class="video__link"><a href="${U.esc(s.video.link)}" target="_blank" rel="noopener">Смотреть на YouTube ↗</a></p>` : s.video && s.video.file ? `
      <div class="video">
        <video id="seasonVideo" src="${U.esc(s.video.file)}" poster="/images/madsun/${s.id}/cover.jpg" controls playsinline preload="metadata"${s.video.autoplay ? ' muted loop' : ''}></video>
      </div>` : '',
    saves: downloads
  };

  root.innerHTML = `
    <nav class="crumbs enter" style="--i:0" aria-label="Путь"><a href="/madsun/">${U.esc(M.name)}</a>${chev('M9 6l6 6-6 6')}<span>${U.esc(s.title)}</span></nav>

    <section class="banner enter" style="--i:1">
      ${U.cover(s, 'cover--banner')}
      <div class="banner__text">
        <span class="chip ${s.end ? '' : 'chip--live'}">${s.end ? '' : '<i></i>'}${U.status(s)}</span>
        <h1>${U.esc(s.title)}</h1>
        <p>${U.esc(s.subtitle)}</p>
      </div>
    </section>

    <div class="tabs enter" style="--i:2" role="tablist" aria-label="Разделы сезона">
      ${tabs.map(t => `<button type="button" class="tab" role="tab" id="tab-${t.id}" aria-controls="panel-${t.id}" data-tab="${t.id}">${t.label}</button>`).join('')}
    </div>

    <div class="season-layout">
      <aside class="side enter" style="--i:3">
        <dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${U.esc(v)}</dd></div>`).join('')}</dl>
        ${playersBlock}
      </aside>
      <div class="content enter" style="--i:3">
        ${tabs.map(t => `<section class="panel" role="tabpanel" id="panel-${t.id}" aria-labelledby="tab-${t.id}" hidden>${panels[t.id]}</section>`).join('')}
      </div>
    </div>

    <nav class="pager" aria-label="Другие сезоны">
      ${prev ? `<a href="/madsun/${prev.id}/"><span class="pager__icon">${chev('M15 6l-6 6 6 6')}</span><span class="pager__copy"><small>Раньше</small><strong>${U.esc(prev.title)}</strong></span></a>` : ''}
      ${next ? `<a class="pager__next" href="/madsun/${next.id}/"><span class="pager__copy"><small>Позже</small><strong>${U.esc(next.title)}</strong></span><span class="pager__icon">${chev('M9 6l6 6-6 6')}</span></a>` : ''}
    </nav>

    <dialog class="lightbox" id="lightbox">
      <button type="button" class="lightbox__close" aria-label="Закрыть">×</button>
      <img alt="">
      <div class="lightbox__bar">
        <button type="button" data-dir="-1" aria-label="Предыдущее фото">${chev('M15 6l-6 6 6 6')}</button>
        <span></span>
        <button type="button" data-dir="1" aria-label="Следующее фото">${chev('M9 6l6 6-6 6')}</button>
      </div>
    </dialog>`;

  /* ---------- переключение вкладок ---------- */
  const tabBtns = [...root.querySelectorAll('.tab')];
  const panelEls = [...root.querySelectorAll('.panel')];
  function select(name, updateHash) {
    if (!tabs.some(t => t.id === name)) name = 'about';
    tabBtns.forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === name)));
    panelEls.forEach(p => { p.hidden = p.id !== 'panel-' + name; });
    const vid = document.getElementById('seasonVideo');
    if (vid) { if (name === 'video') { if (s.video.autoplay) vid.play().catch(() => {}); } else vid.pause(); }
    const on = tabBtns.find(b => b.dataset.tab === name);
    if (on && on.parentElement.scrollWidth > on.parentElement.clientWidth) on.parentElement.scrollTo({ left: on.offsetLeft - 20, behavior: 'smooth' });
    if (updateHash) history.replaceState(null, '', name === 'about' ? location.pathname : '#' + name);
  }
  tabBtns.forEach(b => b.addEventListener('click', () => select(b.dataset.tab, true)));
  select(location.hash.slice(1), false);

  /* ---------- фотографии: images/madsun/<сезон>/1.jpg, 2.jpg ... ---------- */
  const gal = root.querySelector('.gallery');
  if (gal) {
    const empty = root.querySelector('.empty');
    for (let n = 1; n <= s.photos; n++) {
      const src = `/images/madsun/${s.id}/${n}.jpg`;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'shot'; b.dataset.src = src;
      b.setAttribute('aria-label', `Открыть фото ${n}`);
      const im = new Image();
      im.alt = `${s.title}, фото ${n}`;
      im.loading = 'lazy';
      im.onerror = () => { b.remove(); if (!gal.children.length) empty.hidden = false; };
      im.src = src;
      b.append(im); gal.append(b);
    }
  }

  const dlg = document.getElementById('lightbox');
  const dImg = dlg.querySelector('img'), dCount = dlg.querySelector('.lightbox__bar span');
  let cur = 0;
  const list = () => gal ? [...gal.children] : [];
  function show() { const l = list(); cur = (cur + l.length) % l.length; dImg.src = l[cur].dataset.src; dCount.textContent = `${cur + 1} / ${l.length}`; }
  if (gal) gal.addEventListener('click', e => {
    const b = e.target.closest('.shot'); if (!b) return;
    cur = list().indexOf(b); show(); dlg.showModal();
  });
  dlg.addEventListener('click', e => {
    if (e.target === dlg || e.target.classList.contains('lightbox__close')) dlg.close();
    const d = e.target.closest('[data-dir]'); if (d) { cur += Number(d.dataset.dir); show(); }
  });
  dlg.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { cur -= 1; show(); }
    if (e.key === 'ArrowRight') { cur += 1; show(); }
  });

})();
