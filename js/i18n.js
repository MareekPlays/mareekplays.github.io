(() => {
  const polish = location.pathname.includes('/pl/');
  const labels = document.createElement('div'); labels.className = 'language-switch';
  labels.innerHTML = polish ? '<a href="../index.html">🇬🇧 EN</a><strong>🇵🇱 PL</strong>' : '<strong>🇬🇧 EN</strong><a href="pl/index.html">🇵🇱 PL</a>';
  document.querySelector('.site-header')?.append(labels);
  if (!polish && localStorage.getItem('mareek-language') === 'pl') location.href = 'pl/index.html';
  if (!polish && !localStorage.getItem('mareek-language') && navigator.language.toLowerCase().startsWith('pl')) { localStorage.setItem('mareek-language', 'pl'); location.href = 'pl/index.html'; }
  labels.addEventListener('click', () => localStorage.setItem('mareek-language', polish ? 'pl' : 'en'));
  if (!polish) return;
  const t = {'Focus':'Tematyka','Videos':'Filmy','Contact':'Kontakt','Back to home':'Powrót','Explore the channel':'Przejdź do kanału','Watch selected videos':'Oglądaj wybrane filmy','Ultrawide Gaming':'Gaming Ultrawide','Performance Tests':'Testy wydajności','Indie Game Dev':'Tworzenie gier indie','Enter the kitchen ↗':'Poznaj grę ↗','Selected videos.':'Wybrane filmy.','Selected shorts.':'Wybrane shorty.','Start a conversation ↗':'Napisz do mnie ↗'};
  document.querySelectorAll('h1,h2,h3,p,a,span,b').forEach((el) => { const key = el.innerHTML.trim(); if (t[key]) el.innerHTML = t[key]; });
  document.documentElement.lang = 'pl';
})();
