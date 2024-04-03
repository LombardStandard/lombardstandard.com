window.addEventListener('load', async () => {
  // Init
  const copyright = document.getElementById('copyright')
  if (copyright) {
    copyright.innerHTML = new Date().getFullYear();
  }

  const dynamicTranslation = {
    en: {
      "Companies by": (by) => `Companies by "${by}"`,
      "Featured": "Featured",
      "Numbers": "Numbers",
      "Other": "Other"
    },
    ja: {
      "Companies by": (by) => `「${by}」別の企業`,
      "Featured": "特徴",
      "Numbers": "数字",
      "Other": "他の"
    }
  }
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
  
  // i18n integration
  function updateContent() {
    const i18nElements = document.getElementsByClassName('i18nelement');
  
    for (const i18nElement of i18nElements) {
      const key = i18nElement.getAttribute('data-i18n');
      i18nElement.innerHTML = i18next.t(key) || i18nElement.innerHTML;
    }
  }

  function updateDynamicContent() {
    const currentTranslation = dynamicTranslation[getCurrentLang()]

    if (browseBy) {
      document.getElementById("category-header").innerHTML = currentTranslation["Companies by"](capitalize(browseBy))
    } else {
      document.getElementById("category-header").innerHTML = currentTranslation["Featured"]
    }
  }

  function updateBuyers() {
    const lang = getCurrentLang()
    
    buyers.forEach(buyer => {
      document.getElementById(`buyer-${buyer.net_loc}`).textContent = getCompanyName(buyer, lang)
    })
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
      updateDynamicContent();
      updateBuyers();
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

  const getCurrentLang = () =>
    (i18next.language.includes('en') ? 'en' : i18next.language) || 'en';

  // Buyers js
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
  const getCompanyName = (company, lang) => {
    return company[`name_${lang}`] || company.name_en
  }

  let buyers = []
  const browseByURL = 'https://egltn7djl4lxhe7nkkmbyoaghy0whrvp.lambda-url.ap-northeast-1.on.aws'
  const urlParams = new URLSearchParams(window.location.search);
  const browseBy = urlParams.get('by');

  try {
    const { success, message, buyers: fetchedBuyers } = await fetch(browseByURL + (browseBy ? `?by=${encodeURIComponent(browseBy)}` : '')).then(res => res.json())

    if (success) {
      buyers = fetchedBuyers
      const lang = getCurrentLang()
      const currentTranslation = dynamicTranslation[lang]

      if (browseBy) {
        const by = capitalize(browseBy)

        document.getElementById("category-header").innerHTML = currentTranslation["Companies by"](currentTranslation[by] || by)
      } else {
        document.getElementById("category-header").innerHTML = currentTranslation["Featured"]
      }

      const columns = 3;
      const dividedArrays = [];
      const itemsInFirstColumn = Math.ceil(buyers.length / columns);
      let startIndex = 0;

      for (let i = 0; i < columns; i++) {
        const endIndex = startIndex + itemsInFirstColumn + (i == columns - 1 ? buyers.length % columns : 0);
        
        dividedArrays.push(buyers.slice(startIndex, endIndex));
        startIndex = endIndex;
      }

      [1, 2, 3].forEach(column => {
        const columnDiv = document.getElementById(`column-${column}`);

        dividedArrays[column - 1].forEach((buyer) => {
          const div = document.createElement("div");
          const item = document.createElement("a");
          const span = document.createElement('span')

          div.className = 'flex items-center font-light text-blue-700 gap-2'
          item.setAttribute('href', `/company?domain=${encodeURIComponent(buyer.net_loc)}`)
          item.setAttribute('id', `buyer-${buyer.net_loc}`)
          item.textContent = getCompanyName(buyer, lang);
          span.className = 'w-2 h-2 rounded-full'
          span.style.backgroundColor = buyer.verified ? 'rgb(16,185,129)' : 'rgb(209, 213, 219)'

          div.appendChild(span)
          div.appendChild(item)
          columnDiv.appendChild(div);
        });
      })
    } else {
      document.getElementById("category-header").innerHTML = message
    }
  } catch (err) {
    document.getElementById("category-header").innerHTML = err.message
  }
})
