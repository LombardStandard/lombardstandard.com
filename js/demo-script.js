var d = new Date();
var n = d.getFullYear();
document.getElementById('copyright').innerHTML = n;

_linkedin_partner_id = '3365265';
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
(function () {
  var s = document.getElementsByTagName('script')[0];
  var b = document.createElement('script');
  b.type = 'text/javascript';
  b.async = true;
  b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
  s.parentNode.insertBefore(b, s);
})();

// number formatter
function nFormatter(num) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(1).replace(rx, '$1') + item.symbol
    : '0';
}

// fetch and populate site(leads) data
(async function fetchAndPopulateData() {
  const regionMap = {
    Asia: 'APAC',
    Australia: 'APAC',
    Europe: 'EMEA',
    America: 'Americas',
    Africa: 'EMEA',
    Atlantic: 'EMEA',
    Indian: 'EMEA',
  };
  const totalIndividualsDiv = document.getElementById('total-individuals');
  const totalCompaniesDiv = document.getElementById('total-companies');
  const regionPercentageDiv = document.getElementById('region-percentage');
  const regionTextDiv = document.getElementById('region-text');
  const regionGlobeDiv = document.getElementById('region-globe');
  const region = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[0];

  try {
    const { totalIndividuals, totalCompanies, regionWisePercentage } =
      await fetch(
        'https://c5w166ug64.execute-api.us-east-1.amazonaws.com/default/siteData-API'
      ).then((res) => res.json());

    totalIndividualsDiv.innerHTML = nFormatter(totalIndividuals);
    totalCompaniesDiv.innerHTML = nFormatter(totalCompanies);

    if (region.includes('Asia') || region.includes('Australia')) {
      regionPercentageDiv.innerHTML =
        regionWisePercentage['Asia Pacific'] + '%';
      regionGlobeDiv.innerHTML = '🌏';
    }

    if (region.includes('Americas')) {
      regionPercentageDiv.innerHTML =
        regionWisePercentage['North America'] + '%';
      regionGlobeDiv.innerHTML = '🌎';
    }

    if (
      region.includes('Europe') ||
      region.includes('Africa') ||
      region.includes('Atlantic') ||
      region.includes('Indian')
    ) {
      regionPercentageDiv.innerHTML =
        String(
          parseFloat(regionWisePercentage['Europe']) +
            parseFloat(regionWisePercentage['Africa']) +
            parseFloat(regionWisePercentage['Middle East'])
        ) + '%';
      regionGlobeDiv.innerHTML = '🌍';
    }
  } catch (err) {
    console.log('error fetching site data:', err.message);
    totalIndividualsDiv.innerHTML = '3.6k';
    totalCompaniesDiv.innerHTML = '1.3k';
    regionPercentageDiv.innerHTML = '34%';
  }

  regionTextDiv.innerHTML = `(${regionMap[region] || 'APAC'})`;
})();

// i18n integration
function updateContent() {
  const i18nElements = document.getElementsByClassName('i18nelement');

  for (const i18nElement of i18nElements) {
    const key = i18nElement.getAttribute('data-i18n');
    i18nElement.innerHTML = i18next.t(key) || i18nElement.innerHTML;
  }
}

function updateIframes() {
  const iFrameSub = document.getElementById('iframe-sub');
  const iFrameLead = document.getElementById('iframe-lead');
  const lang = i18next.language.includes('en') ? 'en' : i18next.language;

  if (iFrameSub && iFrameLead) {
    iFrameSub.src = `https://alpha.lombardstandard.com/subscribeForm/?lang=${lang}`;
    iFrameLead.src = `https://alpha.lombardstandard.com/search_leads_widget/?lang=${lang}`;
  }
}

async function i18Loader() {
  const langs = ['en', 'ja', 'de'];
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
  });

  updateContent();
  updateIframes();

  i18next.on('languageChanged', () => {
    updateContent();
    updateIframes();
  });

  const langSelector = document.getElementById('langSelector');
  langSelector.removeAttribute('disabled');
  langSelector.addEventListener('change', (e) => {
    i18next.changeLanguage(e.target.value);
  });
  langSelector.value = i18next.language.includes('en')
    ? 'en'
    : i18next.language;

  let closeText = 'OK';
  let message = 'By viewing this website you agree to our';
  let link = 'Privacy Policy';

  switch (i18next.language) {
    case 'ja':
      closeText = 'OK';
      message = 'このウェブサイトを閲覧することにより、あなたは私たちの';
      link = 'プライバシーポリシー';
      break;
    case 'de':
      closeText = 'OK';
      message = 'Durch das Betrachten dieser Website stimmen Sie unseren zu';
      link = 'Datenschutz-Bestimmungen';
      break;
  }

  const cookieScript = document.createElement('script');
  cookieScript.src = 'https://cookieinfoscript.com/js/cookieinfo.min.js';
  cookieScript.id = 'cookieinfo';
  cookieScript.setAttribute('data-close-text', closeText);
  cookieScript.setAttribute('data-font-size', '14px');
  cookieScript.setAttribute('data-message', message);
  cookieScript.setAttribute('data-link', '#111827');
  cookieScript.setAttribute('data-linkmsg', `<b>${link}</b>.`);
  cookieScript.setAttribute(
    'data-moreinfo',
    'https://lombardstandard.com/privacy-policy'
  );
  cookieScript.setAttribute('data-text-align', 'left');
  cookieScript.setAttribute('data-bg', '#FDE68A');
  cookieScript.setAttribute('data-cookie', 'Lombard Standard Analytics');

  document.body.appendChild(cookieScript);
}

i18Loader();