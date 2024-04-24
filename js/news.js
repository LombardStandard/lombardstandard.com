const copyright = document.getElementById('copyright');
if (copyright) {
  copyright.innerHTML = new Date().getFullYear();
}

window.addEventListener('load', async () => {
  // i18n
  const translations = {
    en: {
      'Source': 'Source',
      'Search news': 'Search news',
      "japan": "Japan",
      "america": "North America",
      "global": "Global",
      "emea": "EMEA",
      "apac": "APAC"
    },
    ja: {
      'Source': 'ソース',
      'Search news': 'ニュースを検索',
      "japan": "日本",
      "america": "北米",
      "global": "グローバル",
      "emea": "EMEA",
      "apac": "APAC"
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
    lookupQuerystring: 'lang',
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
      sameSite: 'strict',
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

  async function i18Loader() {
    const langs = ['en', 'ja'];
    const langJsons = await Promise.all(
      langs.map((lang) => fetch(`i18n/${lang}.json`).then((res) => res.json()))
    );

    const resources = langs.reduce((acc, lang, idx) => {
      acc[lang] = {
        translation: langJsons[idx],
      };
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
      updatePlaceholder();
      fetchNews();
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

  // news api
  const NEWS_URL = 'https://beta.lombardstandard.com/api/news';
  const NEWS_SEARCH_URL = 'https://beta.lombardstandard.com/api/news/search';
  const loader = `
  <div class="flex items-center justify-center space-x-1 text-gray-700">
    <svg
      fill="none"
      class="h-7 w-7 animate-spin"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  </div>
  `
  // const NEWS_URL = 'http://localhost:3000/api/news';
  // const NEWS_SEARCH_URL = 'http://localhost:3000/api/news/search';

  const newsData = {}
  const searchNewsData = {}
  const listingContainer = document.getElementById('listingContainer')
  const regions = ['japan', 'apac', 'emea', 'america', 'global']
  let region = 'japan'
  let search = ''

  function debounce(func, timeout = 1000) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  const updatePlaceholder = () => {
    document.getElementById('newsSearch').setAttribute('placeholder', translations[getCurrentLang()]['Search news'])
  }

  const logoURL = (domain) => `https://logo.clearbit.com/${domain}?size=100&format=png`

  const getSortedArrays = (searchData) => {
    if (!searchData) return
  
    searchData.japan.sort?.((a, b) => dayjs(b.ts).diff(dayjs(a.ts)))
    searchData.apac.sort?.((a, b) => dayjs(b.ts).diff(dayjs(a.ts)))
    searchData.emea.sort?.((a, b) => dayjs(b.ts).diff(dayjs(a.ts)))
    searchData.global.sort?.((a, b) => dayjs(b.ts).diff(dayjs(a.ts)))
    searchData.america.sort?.((a, b) => dayjs(b.ts).diff(dayjs(a.ts)))
  
    return searchData
  }

  const registerRegionBtnsAndSearch = () => {
    const regionBtns = document.getElementsByClassName('region-btn')

    for (let btn of regionBtns) {
      btn.addEventListener('click', () => {
        removeDisabledFromBtns()

        region = btn.getAttribute('data-region')
        btn.setAttribute('disabled', 'true')

        fetchNews()
      })
    }

    document.getElementById('newsSearch').addEventListener('input', debounce((e) => {
      search = e.target.value
      fetchNews()
    }))
  }

  const removeDisabledFromBtns = () => {
    const regionBtns = document.getElementsByClassName('region-btn')

    for (let btn of regionBtns) {
      btn.removeAttribute('disabled')
    }
  }

  const renderNews = (lang, region) => {
    const news = newsData?.[lang]?.[region] || []

    listingContainer.innerHTML = ''

    const containerDiv = document.createElement('div')
    containerDiv.className = 'flex flex-wrap w-full items-stretch justify-between text-gray-900'

    if (news.length) {
      news.forEach(article => {
        const parentDiv = document.createElement('div')
        parentDiv.className = 'flex w-[49%] items-center gap-2 rounded-md border border-gray-300 px-4 py-2 my-3'

        const dataDiv = document.createElement('div')
        dataDiv.className = 'flex w-full flex-col'

        const h2 = document.createElement('h2')
        h2.className = 'text-xl font-bold'
        h2.innerText = article.headline

        const desc = document.createElement('p')
        desc.className = 'text-sm text-gray-500'
        desc.innerText = article.text

        const time = document.createElement('p')
        time.className = 'text-sm'
        time.innerText = article.ts?.split(' ')?.[0] || ''

        const linkContainer = document.createElement('div')
        linkContainer.className = 'flex items-center gap-1'

        const source = document.createElement('p')
        source.className = 'text-sm'
        source.innerText = translations[lang]['Source'] + ':'

        const link = document.createElement('a')
        link.className = 'text-blue-700 text-sm'
        link.setAttribute('href', article.link)
        link.setAttribute('target', '_blank')
        link.innerText = article.source || article.link

        const logo = document.createElement('img')
        logo.className = 'rounded'
        logo.setAttribute('width', '60')
        logo.setAttribute('height', '60')
        logo.setAttribute('src', logoURL(article.source))
        logo.setAttribute('alt', article.source)

        linkContainer.appendChild(source)
        linkContainer.appendChild(link)

        dataDiv.appendChild(h2)
        dataDiv.appendChild(desc)
        dataDiv.appendChild(time)
        dataDiv.appendChild(linkContainer)

        parentDiv.appendChild(dataDiv)
        parentDiv.appendChild(logo)

        containerDiv.appendChild(parentDiv)
      })

      listingContainer.appendChild(containerDiv)
    } else {
      const p = document.createElement('p')
      p.className = 'text-sm text-gray-600'
      p.innerText = 'No news found!'

      containerDiv.appendChild(p)
      listingContainer.appendChild(containerDiv)
    }
  }

  const getRegionContainer = (news, region, lang) => {
    const regionNewsContainer = document.createElement('div')
    regionNewsContainer.className = 'flex w-full flex-col gap-2'

    const regionNewsHeader = document.createElement('p')
    regionNewsHeader.className = 'font-bold'
    regionNewsHeader.innerText = translations[lang][region]

    const containerDiv = document.createElement('div')
    containerDiv.className = 'flex flex-wrap w-full items-stretch justify-between text-gray-900'

    news[region].forEach(article => {
      const parentDiv = document.createElement('div')
      parentDiv.className = 'flex w-[49%] items-center gap-2 rounded-md border border-gray-300 px-4 py-2 my-3'

      const dataDiv = document.createElement('div')
      dataDiv.className = 'flex w-full flex-col'

      const h2 = document.createElement('h2')
      h2.className = 'text-xl font-bold'
      h2.innerText = article.headline

      const desc = document.createElement('p')
      desc.className = 'text-sm text-gray-500'
      desc.innerText = article.text

      const time = document.createElement('p')
      time.className = 'text-sm'
      time.innerText = article.ts?.split(' ')?.[0] || ''

      const linkContainer = document.createElement('div')
      linkContainer.className = 'flex items-center gap-1'

      const source = document.createElement('p')
      source.className = 'text-sm'
      source.innerText = translations[lang]['Source'] + ':'

      const link = document.createElement('a')
      link.className = 'text-blue-700 text-sm'
      link.setAttribute('href', article.link)
      link.setAttribute('target', '_blank')
      link.innerText = article.source || article.link

      const logo = document.createElement('img')
      logo.className = 'rounded'
      logo.setAttribute('width', '60')
      logo.setAttribute('height', '60')
      logo.setAttribute('src', logoURL(article.source))
      logo.setAttribute('alt', article.source)

      linkContainer.appendChild(source)
      linkContainer.appendChild(link)

      dataDiv.appendChild(h2)
      dataDiv.appendChild(desc)
      dataDiv.appendChild(time)
      dataDiv.appendChild(linkContainer)

      parentDiv.appendChild(dataDiv)
      parentDiv.appendChild(logo)

      containerDiv.appendChild(parentDiv)
    })

    regionNewsContainer.appendChild(regionNewsHeader)
    regionNewsContainer.appendChild(containerDiv)

    return regionNewsContainer
  }

  const renderSearchNews = (lang, search) => {
    const news = searchNewsData?.[lang]?.[search] || {}

    listingContainer.innerHTML = ''

    const containerDiv = document.createElement('div')
    containerDiv.className = 'flex w-full flex-col gap-6 text-gray-900'

    regions.forEach(region => {
      if (news[region]?.length) containerDiv.appendChild(getRegionContainer(news, region, lang))
    })

    listingContainer.appendChild(containerDiv)
  }

  const fetchNews = async () => {
    try {
      listingContainer.innerHTML = loader

      const lang = getCurrentLang()
      const currentRegion = region
      const currentSearch = search

      if (currentSearch) {
        if (searchNewsData?.[lang]?.[currentSearch]) renderSearchNews(lang, currentSearch)

        const { success, news, message } = await fetch(NEWS_SEARCH_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lang,
            query: currentSearch
          })
        }).then(res => res.json())

        if (success) {
          if (!searchNewsData[lang]) {
            searchNewsData[lang] = {}
          }
  
          searchNewsData[lang][currentSearch] = getSortedArrays(news)
          renderSearchNews(lang, currentSearch)
        } else {
          console.log('Error occurred while searching news:', message);
  
          listingContainer.innerHTML = ''
  
          const p = document.createElement('p')
          p.className = 'text-red-700'
          p.innerText = 'Error occurred while searching news. Please try again!'
  
          listingContainer.appendChild(p)
        }

        return
      }

      if (newsData?.[lang]?.[currentRegion]) renderNews(lang, currentRegion)

      const { success, news, message } = await fetch(NEWS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang,
          region: currentRegion
        })
      }).then(res => res.json())

      if (success) {
        if (!newsData[lang]) {
          newsData[lang] = {}
        }

        newsData[lang][currentRegion] = news.sort((a, b) => dayjs(b.ts).diff(dayjs(a.ts)))
        renderNews(lang, currentRegion)
      } else {
        console.log('Error occurred while fetching news:', message);

        listingContainer.innerHTML = ''

        const p = document.createElement('p')
        p.className = 'text-red-700'
        p.innerText = 'Error occurred while fetching news. Please try again!'

        listingContainer.appendChild(p)
      }
    } catch (err) {
      console.log('Error occurred while fetching news:', err.message);

      listingContainer.innerHTML = ''

      const p = document.createElement('p')
      p.className = 'text-red-700'
      p.innerText = 'Error occurred while fetching news. Please try again!'

      listingContainer.appendChild(p)
    }
  };

  updatePlaceholder();
  registerRegionBtnsAndSearch();
  fetchNews();
});
