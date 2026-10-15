(function () {
  const S = window.SITE;

  window.U = {
    esc(s) {
      return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    },
    plural(n, f) {
      const a = Math.abs(n) % 100, b = a % 10;
      if (a > 10 && a < 20) return f[2];
      if (b > 1 && b < 5) return f[1];
      if (b === 1) return f[0];
      return f[2];
    },
    date(iso) {
      return new Date(iso + 'T00:00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    },
    days(season) {
      const a = new Date(season.start + 'T00:00:00');
      const b = season.end ? new Date(season.end + 'T00:00:00') : new Date();
      return Math.max(1, Math.round((b - a) / 86400000));
    },
    daysText(season) {
      const n = U.days(season);
      return n + ' ' + U.plural(n, ['день', 'дня', 'дней']);
    },
    status(season) { return season.end ? 'Завершён' : 'Идёт сейчас'; },
    // обложка: градиент-заглушка + фото сверху (если файл есть)
    cover(season, cls = '') {
      return `<div class="cover ${cls}" style="--a:${U.esc(season.accent)}">
        <span class="cover__num" aria-hidden="true">${season.id}</span>
        <img src="/images/madsun/${season.id}/cover.jpg" alt="" loading="lazy" onerror="this.remove()">
      </div>`;
    },
    totals() {
      const seasons = S.madsun.seasons;
      return {
        seasons: seasons.length,
        players: new Set(seasons.flatMap(s => s.players || [])).size,
        days: seasons.reduce((n, s) => n + U.days(s), 0)
      };
    },
    stats(list) {
      return `<ul class="stats">${list.map(s => {
        const v = typeof s.value === 'number' ? s.value.toLocaleString('ru-RU') : s.value;
        const l = s.forms ? U.plural(s.value, s.forms) : s.label;
        return `<li><b>${U.esc(v)}</b><span>${U.esc(l)}</span></li>`;
      }).join('')}</ul>`;
    }
  };

  // кольцо фокуса показываем только при навигации с клавиатуры
  document.addEventListener('keydown', e => { if (e.key === 'Tab') document.documentElement.classList.add('kbd'); });
  document.addEventListener('pointerdown', () => document.documentElement.classList.remove('kbd'));

  // шапка и подвал
  const page = document.body.dataset.page;
  const header = document.getElementById('site-header');
  if (header) {
    header.className = 'topbar';
    header.innerHTML = `<div class="wrap topbar__in">
      <a class="brand" href="/"><img src="/images/avatar.png" alt=""><span>${U.esc(S.name)}</span></a>
      <nav aria-label="Разделы">
        <a href="/" ${page === 'home' ? 'aria-current="page"' : ''}>Ссылки</a>
        <a href="/madsun/" ${page === 'madsun' ? 'aria-current="page"' : ''}>Медсан</a>
      </nav>
    </div>`;
  }
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'footer';
    footer.innerHTML = `<div class="wrap">
      <p>Почта для сотрудничества: <a href="mailto:${U.esc(S.email)}">${U.esc(S.email)}</a></p>
      <p><a href="${U.esc(S.donate)}" target="_blank" rel="noopener">Купить псыжа Бекфану</a></p>
      <p class="footer__made">Сделано Миской :3</p>
    </div>`;
  }
})();
