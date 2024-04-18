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
      document.getElementById(`buyer-${buyer.location}`).textContent = getCompanyName(buyer, lang)
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
          const img = document.createElement('img')

          div.className = 'flex items-center font-light text-blue-700 gap-2'
          
          item.setAttribute('href', `/company?id=${encodeURIComponent(buyer.location)}`)
          item.setAttribute('id', `buyer-${buyer.location}`)
          item.textContent = getCompanyName(buyer, lang);

          span.className = 'w-2 h-2 rounded-full'
          span.style.backgroundColor = buyer.verified ? 'rgb(16,185,129)' : 'rgb(255, 255, 255)'

          img.setAttribute('width', '18px')
          img.setAttribute('height', '18px')
          img.setAttribute('src', `/img/flags-svg/${COUNTRY_TO_FLAG[buyer.headquarters]}.svg`)
          img.className = 'rounded-sm border border-gray-200'

          div.appendChild(span)
          div.appendChild(img)
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
