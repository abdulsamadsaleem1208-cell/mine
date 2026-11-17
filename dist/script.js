const button = document.querySelector('#open-letter');
const message = document.querySelector('#letter-message');
const welcome = document.querySelector('#welcome-screen');
const openSurprise = document.querySelector('#open-surprise');
const sendLove = document.querySelector('#send-love');

document.body.classList.add('motion-ready');

openSurprise.addEventListener('click', () => {
  welcome.classList.add('is-opening');
  welcome.setAttribute('aria-hidden', 'true');
  document.body.classList.add('surprise-open', 'site-open');
  window.setTimeout(() => {
    welcome.hidden = true;
    document.querySelector('.hero h1')?.focus({ preventScroll: true });
  }, 900);
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

sendLove.addEventListener('click', () => {
  const symbols = ['♥', '♡', '✦', '♥', '♡', '✧', '♥', '♡'];
  const burst = sendLove.parentElement;
  symbols.forEach((symbol, index) => {
    const particle = document.createElement('span');
    particle.className = 'love-particle';
    particle.setAttribute('aria-hidden', 'true');
    particle.textContent = symbol;
    particle.style.setProperty('--dx', `${Math.cos((index / symbols.length) * Math.PI * 2) * 64}px`);
    particle.style.setProperty('--dy', `${-45 - (index % 3) * 17}px`);
    particle.style.setProperty('--spin', `${(index % 2 ? 1 : -1) * 28}deg`);
    burst.append(particle);
    particle.addEventListener('animationend', () => particle.remove(), { once: true });
  });
});

button.addEventListener('click', () => {
  const opening = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(opening));
  message.hidden = !opening;
  button.innerHTML = opening ? 'Fold my note <span>↙</span>' : 'Open my note <span>↗</span>';
});
