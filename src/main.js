import translations from './translations.js'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- Язык (RU / KZ / EN) ---------- */
const LANGS = ['ru', 'kz', 'en']
const HTML_LANG = { ru: 'ru', kz: 'kk', en: 'en' }

function getSavedLang() {
  try {
    const saved = localStorage.getItem('dinara_lang')
    return LANGS.includes(saved) ? saved : 'ru'
  } catch { return 'ru' }
}
let currentLang = getSavedLang()

// 24000 → "24 000" (RU/KZ) или "24,000" (EN)
const formatNumber = (n) =>
  currentLang === 'en' ? n.toLocaleString('en-US') : n.toLocaleString('ru-RU').replace(/\u00a0/g, ' ')

function applyTranslations(lang) {
  const dict = translations[lang] || translations.ru
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = dict[el.dataset.i18n]
    if (value) el.textContent = value
  })
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang))
  })
  document.querySelectorAll('.counter').forEach((el) => {
    el.textContent = formatNumber(Number(el.dataset.target))
  })
  document.documentElement.lang = HTML_LANG[lang]
}

applyTranslations(currentLang)

document.querySelectorAll('[data-lang]').forEach((btn) => {
  btn.addEventListener('click', () => {
    currentLang = btn.dataset.lang
    try { localStorage.setItem('dinara_lang', currentLang) } catch { /* private mode */ }
    applyTranslations(currentLang)
  })
})

/* ---------- Мобильное меню ---------- */
const menuBtn = document.querySelector('[data-menu-toggle]')
const menu = document.getElementById('mobile-menu')
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true'
    menuBtn.setAttribute('aria-expanded', String(!open))
    menu.classList.toggle('hidden', open)
  })
}

/* ---------- Счётчики ---------- */

function animateCounter(el) {
  const target = Number(el.dataset.target)
  const duration = 1200
  const start = performance.now()
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = formatNumber(Math.round(target * eased))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

const stats = document.getElementById('stats')
if (stats && !reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.querySelectorAll('.counter').forEach(animateCounter)
      io.unobserve(entry.target)
    })
  }, { threshold: 0.4 })
  io.observe(stats)
}

/* ---------- Демо-диалог в hero ---------- */
const chat = document.querySelector('[data-chat]')
if (chat && !reduceMotion) {
  const steps = [...chat.querySelectorAll('[data-step]')]
  const typing = chat.querySelector('.typing-row')
  const wait = (ms) => new Promise((r) => setTimeout(r, ms))

  chat.classList.add('is-playing')

  const play = async () => {
    await wait(500)
    for (const step of steps) {
      const fromBot = !step.classList.contains('bubble-out')
      if (fromBot && typing) {
        chat.appendChild(typing)
        typing.classList.add('is-shown')
        await wait(1100)
        typing.classList.remove('is-shown')
      }
      step.classList.add('is-shown')
      await wait(fromBot ? 1300 : 700)
    }
  }
  play()
}
