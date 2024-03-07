window.addEventListener('load', async () => {
  // Init
  const copyright = document.getElementById('copyright')
  if (copyright) {
    copyright.innerHTML = new Date().getFullYear();
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
    const langs = ['en', 'ja', 'de', 'zh-CN', 'zh-Hant', 'fr', 'it', 'es', 'pt'];
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
  const buyerURL = 'https://2fxya6iatfbzd2pzgvkhszeyqu0ukowa.lambda-url.ap-northeast-1.on.aws'
  const urlParams = new URLSearchParams(window.location.search);
  const domain = urlParams.get('domain');

  const getLogoURL = (domain) => `https://logo.clearbit.com/${domain}?size=100&format=png`

  if (domain) {
    try {
      const { success, message, buyer, similarBuyers } = await fetch(buyerURL + `?domain=${encodeURIComponent(domain)}`).then((res) => res.json())

      if (success) {
        if (!buyer) {
          document.getElementById('company-name').innerHTML = 'Not Found!'
          return
        }

        const logoImg = document.getElementById('logo-img')
        document.getElementById('logo-img-loader').classList.add('hidden')
        logoImg.setAttribute('src', getLogoURL(domain))
        logoImg.setAttribute('alt', buyer.name_en)
        logoImg.classList.remove('hidden')

        const verificationBadge = document.getElementById('verification-badge')
        if (buyer.verified) verificationBadge.setAttribute('fill', 'rgb(29 78 216)')
        verificationBadge.classList.remove('hidden')

        document.title = `${buyer.name_en} | Lombard Standard`
        document.getElementById('company-name').innerHTML = buyer.name_en
        document.getElementById('company-summary').innerHTML = buyer.summary
        document.getElementById('company-segments').innerHTML = buyer.segment
        document.getElementById('company-country-code').setAttribute('src', `/img/flags-svg/${COUNTRY_TO_FLAG[buyer.headquarters]}.svg`)
        document.getElementById('company-country-name').innerHTML = buyer.headquarters
        document.getElementById('company-contacts').innerHTML = 90
        document.getElementById('company-news').innerHTML = 10
        document.getElementById('company-website').setAttribute('href', 'http://' + buyer.website)

        if (similarBuyers?.length) {
          const similarBuyersList = document.getElementById('similar-buyers-list')
          
          similarBuyers.forEach(buyer => {
            const div = document.createElement('div')
            div.className = 'flex w-1/3 mb-8'

            const a = document.createElement('a')
            a.className = 'flex items-center gap-2'
            a.setAttribute('href', `/buyer?domain=${buyer.net_loc}`)
            a.setAttribute('rel', 'noopener noreferrer')

            const img = document.createElement('img')
            img.setAttribute('width', '46px')
            img.setAttribute('height', '46px')
            img.setAttribute('src', getLogoURL(buyer.net_loc))
            img.setAttribute('alt', buyer.name_en)

            const span = document.createElement('span')
            span.className = 'font-medium'
            span.innerHTML = buyer.name_en

            a.appendChild(img)
            a.appendChild(span)
            div.appendChild(a)
            similarBuyersList.appendChild(div)
          })

          document.getElementById('similar-buyers-container').classList.remove('hidden')
        }
      } else {
        document.getElementById('company-name').innerHTML = message
      }
    } catch (err) {
      document.getElementById('company-name').innerHTML = 'Error occurred. Please try again!'
    }
  } else {
    document.getElementById('company-name').innerHTML = 'Not Found!'
  }
})