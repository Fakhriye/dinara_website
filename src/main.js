import './style.css'

// 1. Анимация бегущих чисел (Счетчики)
const counters = document.querySelectorAll('.counter');
const speed = 200; // Скорость анимации

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// Запускаем счетчики, когда пользователь доскроллил до них
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.getElementById('stats');
if (statsSection) {
  observer.observe(statsSection);
}

// 2. Логика для кнопки смены языка (пока переключает текст на кнопке)
const langSwitch = document.getElementById('lang-switch');
langSwitch.addEventListener('click', () => {
  const currentLang = langSwitch.innerText;
  langSwitch.innerText = currentLang === 'KZ' ? 'RU' : 'KZ';
});