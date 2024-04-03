window.addEventListener('load', async () => {
  // Init
  const copyright = document.getElementById('copyright')
  if (copyright) {
    copyright.innerHTML = new Date().getFullYear();
  }

  const dynamicTranslation = {
    en: {
      'Not Found!': 'Not Found!',
      'Explore more companies': 'Explore more companies',
      'Verified': 'Verified',
      'Sign up for more info': 'Sign up for more info'
    },
    ja: {
      'Not Found!': '見つかりません！',
      'Explore more companies': 'さらに多くの企業を探索する',
      'Verified': '確認済み',
      'Sign up for more info': 'サインアップして詳細情報を入手'
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
      updateBuyerContent();
      updateSimilarBuyers();
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

  // Buyer js
  const COUNTRY_TO_FLAG = {
    Afghanistan: 'AF',
    Albania: 'AL',
    Algeria: 'DZ',
    Andorra: 'AD',
    Angola: 'AO',
    Antigua: 'AG',
    Barbuda: 'AG',
    Argentina: 'AR',
    Armenia: 'AM',
    Australia: 'AU',
    Austria: 'AT',
    Azerbaijan: 'AZ',
    Bahamas: 'BS',
    Bahrain: 'BH',
    Bangladesh: 'BD',
    Barbados: 'BB',
    Belarus: 'BY',
    Belgium: 'BE',
    Belize: 'BZ',
    Benin: 'BJ',
    Bhutan: 'BT',
    Bolivia: 'BO',
    Bosnia: 'BA',
    Herzegovina: 'BA',
    Botswana: 'BW',
    Brazil: 'BR',
    Brunei: 'BN',
    Bulgaria: 'BG',
    'Burkina Faso': 'BF',
    Burundi: 'BI',
    'Cabo Verde': 'CV',
    Cambodia: 'KH',
    Cameroon: 'CM',
    Canada: 'CA',
    'Central African Republic': 'CF',
    Chad: 'TD',
    Chile: 'CL',
    China: 'CN',
    Colombia: 'CO',
    Comoros: 'KM',
    Congo: 'CG',
    'Costa Rica': 'CR',
    Croatia: 'HR',
    Cuba: 'CU',
    Cyprus: 'CY',
    Czechia: 'CZ',
    'Czech Republic': 'CZ',
    Denmark: 'DK',
    Djibouti: 'DJ',
    Dominica: 'DM',
    'Dominican Republic': 'DO',
    'East Timor (Timor-Leste)': 'TL',
    Ecuador: 'EC',
    Egypt: 'EG',
    'El Salvador': 'SV',
    'Equatorial Guinea': 'GQ',
    Eritrea: 'ER',
    Estonia: 'EE',
    Eswatini: 'SZ',
    Ethiopia: 'ET',
    Fiji: 'FJ',
    Finland: 'FI',
    France: 'FR',
    Gabon: 'GA',
    Gambia: 'GM',
    Georgia: 'GE',
    Germany: 'DE',
    Ghana: 'GH',
    Greece: 'GR',
    Grenada: 'GD',
    Guatemala: 'GT',
    Guinea: 'GN',
    'Guinea-Bissau': 'GW',
    Guyana: 'GY',
    'Hong Kong': 'HK',
    Haiti: 'HT',
    Honduras: 'HN',
    Hungary: 'HU',
    Iceland: 'IS',
    India: 'IN',
    Indonesia: 'ID',
    Iran: 'IR',
    Iraq: 'IQ',
    Ireland: 'IE',
    Israel: 'IL',
    Italy: 'IT',
    Jamaica: 'JM',
    Japan: 'JP',
    Jordan: 'JO',
    Kazakhstan: 'KZ',
    Kenya: 'KE',
    Kiribati: 'KI',
    'Korea, North': 'KP',
    'North Korea': 'KP',
    'Korea, South': 'KR',
    'South Korea': 'KR',
    Kosovo: 'XK',
    Kuwait: 'KW',
    Kyrgyzstan: 'KG',
    Laos: 'LA',
    Latvia: 'LV',
    Lebanon: 'LB',
    Lesotho: 'LS',
    Liberia: 'LR',
    Libya: 'LY',
    Liechtenstein: 'LI',
    Lithuania: 'LT',
    Luxembourg: 'LU',
    Madagascar: 'MG',
    Malawi: 'MW',
    Malaysia: 'MY',
    Maldives: 'MV',
    Mali: 'ML',
    Malta: 'MT',
    'Marshall Islands': 'MH',
    Mauritania: 'MR',
    Mauritius: 'MU',
    Mexico: 'MX',
    Micronesia: 'FM',
    Moldova: 'MD',
    Monaco: 'MC',
    Mongolia: 'MN',
    Montenegro: 'ME',
    Morocco: 'MA',
    Mozambique: 'MZ',
    'Myanmar (Burma)': 'MM',
    Namibia: 'NA',
    Nauru: 'NR',
    Nepal: 'NP',
    Netherlands: 'NL',
    'New Zealand': 'NZ',
    Nicaragua: 'NI',
    Niger: 'NE',
    Nigeria: 'NG',
    'North Macedonia': 'MK',
    Norway: 'NO',
    Oman: 'OM',
    Pakistan: 'PK',
    Palau: 'PW',
    Panama: 'PA',
    'Papua New Guinea': 'PG',
    Paraguay: 'PY',
    Peru: 'PE',
    Philippines: 'PH',
    Poland: 'PL',
    Portugal: 'PT',
    Qatar: 'QA',
    Romania: 'RO',
    Russia: 'RU',
    Rwanda: 'RW',
    'Saint Kitts and Nevis': 'KN',
    'Saint Lucia': 'LC',
    'Saint Vincent and the Grenadines': 'VC',
    Samoa: 'WS',
    'San Marino': 'SM',
    'Sao Tome and Principe': 'ST',
    'Saudi Arabia': 'SA',
    Senegal: 'SN',
    Serbia: 'RS',
    Seychelles: 'SC',
    'Sierra Leone': 'SL',
    Singapore: 'SG',
    Slovakia: 'SK',
    Slovenia: 'SI',
    'Solomon Islands': 'SB',
    Somalia: 'SO',
    'South Africa': 'ZA',
    'South Sudan': 'SS',
    Spain: 'ES',
    'Sri Lanka': 'LK',
    Sudan: 'SD',
    Suriname: 'SR',
    Sweden: 'SE',
    Switzerland: 'CH',
    Syria: 'SY',
    Taiwan: 'TW',
    Tajikistan: 'TJ',
    Tanzania: 'TZ',
    Thailand: 'TH',
    Togo: 'TG',
    Tonga: 'TO',
    Trinidad: 'TT',
    Tobago: 'TT',
    Tunisia: 'TN',
    Turkey: 'TR',
    Turkmenistan: 'TM',
    Tuvalu: 'TV',
    Uganda: 'UG',
    Ukraine: 'UA',
    'United Arab Emirates': 'AE',
    'United Kingdom': 'GB',
    'United States': 'US',
    Uruguay: 'UY',
    Uzbekistan: 'UZ',
    Vanuatu: 'VU',
    'Vatican City': 'VA',
    Venezuela: 'VE',
    Vietnam: 'VN',
    Yemen: 'YE',
    Zambia: 'ZM',
    Zimbabwe: 'ZW',
  }
  let buyer = {}
  let similarBuyers = []
  const buyerURL = 'https://2fxya6iatfbzd2pzgvkhszeyqu0ukowa.lambda-url.ap-northeast-1.on.aws'
  const urlParams = new URLSearchParams(window.location.search);
  const domain = urlParams.get('domain');

  const getCompanyName = (company, lang) => {
    return company[`name_${lang}`] || company.name_en
  }
  const getLogoURL = (domain) => `https://logo.clearbit.com/${domain}?size=100&format=png`
  const updateBuyerContent = () => {
    const lang = getCurrentLang()
    const name = getCompanyName(buyer, lang)
    const summary = lang === 'en' ? buyer.summary : buyer.summary_ja || buyer.summary
    const segment = lang === 'en' ? buyer.segment : buyer.segment_ja || buyer.segment

    document.title = `${name} | Lombard Standard`
    document.getElementById('company-name').innerHTML = name
    document.getElementById('company-summary').innerHTML = `${summary} <a href="https://beta.lombardstandard.com/api/auth/login?screen_hint=signup" class="font-bold text-blue-700">${dynamicTranslation[lang]['Sign up for more info']}</a>`
    document.getElementById('company-segments').innerHTML = segment
  }
  const updateSimilarBuyers = () => {
    const lang = getCurrentLang()

    similarBuyers?.forEach(buyer => {
      document.getElementById(`similar-buyer-${buyer.net_loc}`).innerHTML = getCompanyName(buyer, lang)
    })
  }

  if (domain) {
    try {
      const { success, message, buyer: fetchedBuyer, similarBuyers: fetchedSimilarBuyers } = await fetch(buyerURL + `?domain=${encodeURIComponent(domain)}`).then((res) => res.json())

      if (success) {
        const lang = getCurrentLang()
        const translation = dynamicTranslation[lang]

        if (!fetchedBuyer) {
          document.getElementById('company-name').innerHTML = translation['Not Found!']
          return
        }
        
        buyer = fetchedBuyer
        similarBuyers = fetchedSimilarBuyers
        const logoImg = document.getElementById('logo-img')
        document.getElementById('logo-img-loader').classList.add('hidden')
        logoImg.setAttribute('src', getLogoURL(domain))
        logoImg.setAttribute('alt', buyer.name_en)
        logoImg.onerror = () => {
          const container = document.createElement('div');
          container.className = 'rounded bg-white border border-gray-300 flex items-center justify-center';
          container.setAttribute('style', 'width: 46px; height: 46px;');

          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
          svg.setAttribute('fill', 'none');
          svg.setAttribute('viewBox', '0 0 24 24');
          svg.setAttribute('stroke-width', '1.5');
          svg.setAttribute('stroke', 'currentColor');
          svg.setAttribute('class', 'w-6 h-6');

          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute('stroke-linecap', 'round');
          path.setAttribute('stroke-linejoin', 'round');
          path.setAttribute('d', 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21');

          svg.appendChild(path);
          container.appendChild(svg);

          const parent = logoImg.parentNode;
          parent.replaceChild(container, logoImg);
        }
        logoImg.classList.remove('hidden')

        const verificationBadge = document.getElementById('verification-badge')
        if (buyer.verified) {
          verificationBadge.setAttribute('data-i18n', 'verified')
          verificationBadge.innerHTML = translation['Verified']
          verificationBadge.className = 'text-emerald-500 bg-emerald-100 py-1 px-2 rounded-md text-xs uppercase font-medium i18nelement'
        } else {
          verificationBadge.innerHTML = ''
        }

        updateBuyerContent()
        document.getElementById('company-country-code').setAttribute('src', `/img/flags-svg/${COUNTRY_TO_FLAG[buyer.headquarters]}.svg`)
        document.getElementById('company-country-name').innerHTML = buyer.headquarters
        document.getElementById('company-contacts').innerHTML = buyer.contacts || '-'
        document.getElementById('company-website').setAttribute('href', 'http://' + buyer.website)

        for (let el of document.getElementsByClassName('investment-skeleton')) {
          el.classList.add('hidden')
        }
        for (let el of document.getElementsByClassName('investment-data')) {
          el.classList.remove('hidden')
        }

        if (similarBuyers?.length) {
          const similarBuyersList = document.getElementById('similar-buyers-list')
          
          similarBuyers.forEach(buyer => {
            const div = document.createElement('div')
            div.className = 'flex w-full md:w-1/2 lg:w-1/3 mb-8'

            const a = document.createElement('a')
            a.className = 'flex items-center gap-2'
            a.setAttribute('href', `/company?domain=${buyer.net_loc}`)
            a.setAttribute('rel', 'noopener noreferrer')

            const img = document.createElement('img')
            img.className = 'rounded'
            img.setAttribute('width', '46px')
            img.setAttribute('height', '46px')
            img.setAttribute('src', getLogoURL(buyer.net_loc))
            img.setAttribute('alt', buyer.name_en)
            img.onerror = () => {
              const container = document.createElement('div');
              container.className = 'rounded bg-white flex items-center justify-center';
              container.setAttribute('style', 'width: 46px; height: 46px; min-width: 46px;');

              const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
              svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
              svg.setAttribute('fill', 'none');
              svg.setAttribute('viewBox', '0 0 24 24');
              svg.setAttribute('stroke-width', '1.5');
              svg.setAttribute('stroke', 'currentColor');
              svg.setAttribute('class', 'w-6 h-6 flex-shrink-0');

              const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
              path.setAttribute('stroke-linecap', 'round');
              path.setAttribute('stroke-linejoin', 'round');
              path.setAttribute('d', 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21');

              svg.appendChild(path);
              container.appendChild(svg);

              const parent = img.parentNode;
              parent.replaceChild(container, img);
            }

            const span = document.createElement('span')
            span.className = 'font-light ml-2'
            span.id = `similar-buyer-${buyer.net_loc}`
            span.innerHTML = getCompanyName(buyer, lang)

            a.appendChild(img)
            a.appendChild(span)
            div.appendChild(a)
            similarBuyersList.appendChild(div)
          })

          const div = document.createElement('div')
          div.className = 'flex w-full md:w-1/2 lg:w-1/3 mb-8'

          const a = document.createElement('a')
          a.className = 'i18nelement lg:inline-block px-4 py-2 text-center bg-gray-200 rounded-lg font-medium text-gray-900 text-center hover:bg-gray-300 transition'
          a.setAttribute('href', '/companies')
          a.setAttribute('rel', 'noopener noreferrer')
          a.setAttribute('data-i18n', 'exploreMoreCompanies')
          a.innerHTML = translation['Explore more companies']

          div.appendChild(a)
          similarBuyersList.appendChild(div)

          document.getElementById('similar-buyers-container').classList.remove('hidden')
        }
      } else {
        document.getElementById('company-name').innerHTML = message
      }
    } catch (err) {
      console.log("Error", err)
      document.getElementById('company-name').innerHTML = 'Error occurred. Please try again!'
    }
  } else {
    document.getElementById('company-name').innerHTML = 'Not Found!'
  }
})
