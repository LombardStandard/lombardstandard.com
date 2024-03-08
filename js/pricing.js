window.addEventListener('load', async () => {
  const copyright = document.getElementById('copyright')
  if (copyright) {
    copyright.innerHTML = new Date().getFullYear();
  }

  const API_URL = 'https://api.beta.lombardgpt.com/stats';
  const detectionOptions = {
    // order and from where user language should be detected
    order: [
       'querystring',
       'cookie',
       'localStorage',
       'navigator',
       'sessionStorage',
       'htmlTag',
       'path',
       'subdomain',
    ],
  
    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,
  
    // cache user language on
    caches: ['cookie', 'localStorage'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
  
    // domain for set cookie
    cookieDomain: 'lombardstandard.com',
  
    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement,
  
    // optional set cookie options
    cookieOptions: {
       path: '/',
       sameSite: 'strict'
    },
  };
  const prices = {
    monthly: {
      JPY: 35750,
      USD: 240
    },
    yearly: {
      JPY: 393250,
      USD: 2640
    }
  }
  
  // i18n integration
  function updateContent() {
    const i18nElements = document.getElementsByClassName('i18nelement');
  
    for (const i18nElement of i18nElements) {
      const key = i18nElement.getAttribute('data-i18n');
      i18nElement.innerHTML = i18next.t(key) || i18nElement.innerHTML;
    }
  }

  function updateCounts() {
    const companiesCountTag = document.getElementById('companies-count')
    const contactsCountTag = document.getElementById('contacts-count')
  
    if (companiesCountTag) {
      const t = translations[getCurrentLang()]
      companiesCountTag.innerHTML = t.companiesCount(companiesCount)
    }
    if (contactsCountTag) {
      const t = translations[getCurrentLang()]
      contactsCountTag.innerHTML = t.contactsCount(contactsCount)
    }
  }
  
  async function i18Loader() {
    const langs = ['en', 'ja'];
  // 'de', 'zh-CN', 'zh-Hant', 'fr', 'it', 'es', 'pt'
    const langJsons = await Promise.all(
      langs.map((lang) => fetch(`i18n/${lang}.json`).then((res) => res.json()))
    );
  
    const resources = langs.reduce((acc, lang, idx) => {
      acc[lang] = { translation: langJsons[idx] };
      return acc;
    }, {});
  
    await i18next.use(i18nextBrowserLanguageDetector).init({
      fallbackLng: 'en',
      debug: false,
      resources,
      detection: detectionOptions,
    });
  
    updateContent();
  
    i18next.on('languageChanged', () => {
      updateContent();
      updateCounts();
    });
  
    const langSelector = document.getElementById('langSelector');
    if (langSelector) {
      langSelector.removeAttribute('disabled');
      langSelector.addEventListener('change', (e) => {
        i18next.changeLanguage(e.target.value);
      });
      langSelector.value = i18next.language.includes('en')
        ? 'en'
        : i18next.language;
    }
  }
  
  await i18Loader();

  const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const getCurrentLang = () =>
    (i18next.language.includes('en') ? 'en' : i18next.language) || 'en';
  const translations = {
    en: {
      companiesCount: (count) => `Profiles of all ${count} buyers`,
      contactsCount: (count) => `Export all ${count} contacts`
    },
    ja: {
      companiesCount: (count) => `${count}社以上の投資家プロフィール`,
      contactsCount: (count) => `${count}生成したメールをエクスポートする`
    }
  }
  let companiesCount = '-'
  let contactsCount = ''

  const fetchPricingStats = async () => {
    try {
      const t = translations[getCurrentLang()]
      const { stats } = await fetch(API_URL).then((res) => res.json());
  
      const companiesCountTag = document.getElementById('companies-count')
      if (companiesCountTag) {
        companiesCount = stats.companiesCount ? numberWithCommas(stats.companiesCount) : '5,250'
        companiesCountTag.innerHTML = t.companiesCount(companiesCount)
      }

      const contactsCountTag = document.getElementById('contacts-count')
      if (contactsCountTag) {
        contactsCount = stats.peopleCount ? numberWithCommas(stats.peopleCount) : ''
        contactsCountTag.innerHTML = t.contactsCount(contactsCount)
      }
    } catch (err) {
      console.log('Error occurred while fetching pricing stats:', err.message);
    }
  }

  document.getElementById('currencySwitch')?.addEventListener('change', (e) => {
    const monthlyPrice = document.getElementById('monthlyPrice')
    const yearlyPrice = document.getElementById('yearlyPrice')
    const currency = e.target.checked ? 'JPY' : 'USD'
    const formatter = new Intl.NumberFormat('en-US', {
      currency,
      style: 'currency',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })

    if (monthlyPrice) {
      monthlyPrice.innerHTML = formatter.format(prices.monthly[currency])
    }
    if (yearlyPrice) {
      yearlyPrice.innerHTML = formatter.format(prices.yearly[currency])
    }
  })

  fetchPricingStats()
})