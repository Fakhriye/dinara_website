import './style.css'

// 1. Словарь переводов для сайта
const translations = {
  ru: {
    title: "Dinara AI | Интеллектуальный помощник для 1С",
    nav_home: "Главная",
    nav_features: "Возможности",
    nav_about: "О компании",
    nav_contact: "Связаться",
    badge_text: "Уже заключены сделки с 8 компаниями на $24,000",
    hero_title_1: "Управление бизнесом",
    hero_title_2: "в один клик через ИИ.",
    hero_desc: "Интеллектуальный Telegram-бот, который нативно интегрируется с вашей 1С. Создавайте отчеты, управляйте счетами и анализируйте продажи прямо со смартфона.",
    btn_apply: "Оставить заявку",
    btn_features: "Узнать больше",
    stat_1: "Объем оцифрованных процессов",
    stat_2: "Крупных компаний доверяют нам",
    stat_3: "Экономии времени на рутине",
    footer_rights: "© 2026 Dinara AI. Все права защищены.",
    footer_location: "Алматы, Казахстан"
  },
  kz: {
    title: "Dinara AI | 1С үшін зияткерлік көмекші",
    nav_home: "Басты бет",
    nav_features: "Мүмкіндіктер",
    nav_about: "Компания туралы",
    nav_contact: "Байланысу",
    badge_text: "8 компаниямен $24,000 сомасына келісімшарт жасалды",
    hero_title_1: "Бизнесті басқару",
    hero_title_2: "ЖИ арқылы бір шертуде.",
    hero_desc: "Сіздің 1С базаңызбен тікелей біріктірілетін Telegram бот. Смартфон арқылы есептер жасаңыз, шоттарды басқарыңыз және сатылымдарды талдаңыз.",
    btn_apply: "Өтінім қалдыру",
    btn_features: "Толығырақ білу",
    stat_1: "Цифрландырылған процестер көлемі",
    stat_2: "Ірі компаниялар бізге сенім білдіреді",
    stat_3: "Рутиналық уақытты үнемдеу",
    footer_rights: "© 2026 Dinara AI. Барлық құқықтар қорғалған.",
    footer_location: "Алматы, Қазақстан"
  }
};

let currentLang = localStorage.getItem('dinara_lang') || 'ru';

function applyTranslations(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
  
  const langSwitch = document.getElementById('lang-switch');
  if (langSwitch) {
    langSwitch.innerText = lang === 'ru' ? 'KZ' : 'RU';
  }
  document.documentElement.setAttribute('lang', lang);
}

// Инициализация языка при загрузке
applyTranslations(currentLang);

const langSwitch = document.getElementById('lang-switch');
if (langSwitch) {
  langSwitch.addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'kz' : 'ru';
    localStorage.setItem('dinara_lang', currentLang);
    applyTranslations(currentLang);
  });
}

// 2. Анимация бегущих чисел (Счетчики)
const counters = document.querySelectorAll('.counter');
const speed = 200;

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
};

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