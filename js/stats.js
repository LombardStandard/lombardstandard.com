const copyright = document.getElementById('copyright');
if (copyright) {
  copyright.innerHTML = new Date().getFullYear();
}

window.addEventListener('load', async () => {
  // i18n
  const translations = {
    en: {
      'Available profiles': 'Available profiles',
      'Upcoming profiles': 'Upcoming profiles',
      'Last updated': 'Last updated',
      Property: 'Property',
      Hospitality: 'Hospitality',
      'Investment Management': 'Investment Management',
      'Real Estate': 'Real Estate',
      'Financial Services': 'Financial Services',
      'Real Estate Development': 'Real Estate Development',
      Others: 'Others',
      'Investment Banking': 'Investment Banking',
      'Leasing Real Estate': 'Leasing Real Estate',
      "Asset Manager": "Asset Manager",
      "Property Developer": "Property Developer",
      "Property Operator": "Property Operator",
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
    ja: {
      'Available profiles': 'データベース内の企業',
      'Upcoming profiles': '近日取込予定の企業',
      'Last updated': '最終更新',
      'Asset Management': 'アセットマネジメント',
      'Family Office': 'ファミリーオフィス',
      'Financial Services': '金融サービス',
      'Professional Services': 'プロフェッショナルサービス',
      'Property Development': '不動産開発',
      'Property Operations': '不動産オペレーター',
      "Asset Manager": "アセット・マネージャー",
      "Property Developer": "不動産開発業者",
      "Property Operator": "プロパティ演算子",
      months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    },
    de: {
      "Available profiles": "Verfügbare Profile",
      "Upcoming profiles": "Kommende Profile",
      "Last updated": "Letzte Aktualisierung",
      "Property": "Eigentum",
      "Hospitality": "Gastfreundschaft",
      "Investment Management": "Investitionsmanagement",
      "Real Estate": "Immobilie",
      "Financial Services": "Finanzdienstleistungen",
      "Real Estate Development": "Immobilien-Entwicklung",
      "Others": "Andere",
      "Investment Banking": "Investment Banking",
      "Leasing Real Estate": "Leasing von Immobilien",
      "Asset Manager": "Vermögensverwalter",
      "Property Developer": "Immobilienentwickler",
      "Property Operator": "Immobilienbetreiber",
      "Family Office": "Familienbüro",
      "months": [
        "Januar",
        "Februar",
        "Marsch",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
      ]
    },
    'zh-CN': {
      "Available profiles": "可用的配置文件",
      "Upcoming profiles": "即将推出的简介",
      "Last updated": "最近更新时间",
      "Property": "财产",
      "Hospitality": "款待",
      "Investment Management": "投资管理",
      "Real Estate": "房地产",
      "Financial Services": "金融服务",
      "Real Estate Development": "房地产开发",
      "Others": "其他的",
      "Investment Banking": "投资银行",
      "Leasing Real Estate": "租赁房地产",
      "Asset Manager": "资产管理人",
      "Property Developer": "房地产开发商",
      "Property Operator": "物业经营者",
      "Family Office": "家族办公室",
      "months": [
        "一月",
        "二月",
        "行进",
        "四月",
        "可能",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ]
    },
    'zh-Hant': {
      "Available profiles": "可用的設定檔",
      "Upcoming profiles": "即將推出的簡介",
      "Last updated": "最近更新時間",
      "Property": "財產",
      "Hospitality": "款待",
      "Investment Management": "投資管理",
      "Real Estate": "房地產",
      "Financial Services": "金融服務",
      "Real Estate Development": "房地產開發",
      "Others": "其他的",
      "Investment Banking": "投資銀行",
      "Leasing Real Estate": "租賃房地產",
      "Asset Manager": "資產管理人",
      "Property Developer": "房地產開發商",
      "Property Operator": "物業經營者",
      "Family Office": "家族辦公室",
      "months": [
        "一月",
        "二月",
        "行進",
        "四月",
        "可能",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ]
    },
    fr: {
      "Available profiles": "Profils disponibles",
      "Upcoming profiles": "Profils à venir",
      "Last updated": "Dernière mise à jour",
      "Property": "Propriété",
      "Hospitality": "Hospitalité",
      "Investment Management": "Gestion des investissements",
      "Real Estate": "Immobilier",
      "Financial Services": "Services financiers",
      "Real Estate Development": "Développement immobilier",
      "Others": "Autres",
      "Investment Banking": "Banque d'investissement",
      "Leasing Real Estate": "Location de biens immobiliers",
      "Asset Manager": "Gestionnaire d'actifs",
      "Property Developer": "Promoteur immobilier",
      "Property Operator": "Opérateur immobilier",
      "Family Office": "Bureau familial",
      "months": [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Peut",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
      ]
    },
    it: {
      "Available profiles": "Profili disponibili",
      "Upcoming profiles": "Prossimi profili",
      "Last updated": "Ultimo aggiornamento",
      "Property": "Proprietà",
      "Hospitality": "Ospitalità",
      "Investment Management": "Gestione degli investimenti",
      "Real Estate": "Immobiliare",
      "Financial Services": "Servizi finanziari",
      "Real Estate Development": "Sviluppo immobiliare",
      "Others": "Altri",
      "Investment Banking": "Investimento bancario",
      "Leasing Real Estate": "Locazione immobiliare",
      "Asset Manager": "Gestore patrimoniale",
      "Property Developer": "Sviluppatore immobiliare",
      "Property Operator": "Operatore immobiliare",
      "Family Office": "Ufficio familiare",
      "months": [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "agosto",
        "settembre",
        "ottobre",
        "novembre",
        "Dicembre"
      ]
    },
    es: {
      "Available profiles": "Perfiles disponibles",
      "Upcoming profiles": "Próximos perfiles",
      "Last updated": "Última actualización",
      "Property": "Propiedad",
      "Hospitality": "Hospitalidad",
      "Investment Management": "Gestión de inversiones",
      "Real Estate": "Bienes raíces",
      "Financial Services": "Servicios financieros",
      "Real Estate Development": "Desarrollo inmobiliario",
      "Others": "Otros",
      "Investment Banking": "Banca de inversión",
      "Leasing Real Estate": "Arrendamiento de Bienes Raíces",
      "Asset Manager": "Gestor de activos",
      "Property Developer": "Promotor inmobiliario",
      "Property Operator": "Operador de propiedad",
      "Family Office": "Oficina familiar",
      "months": [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Puede",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ]
    },
    pt: {
      "Available profiles": "Perfis disponíveis",
      "Upcoming profiles": "Próximos perfis",
      "Last updated": "Ultima atualização",
      "Property": "Propriedade",
      "Hospitality": "Hospitalidade",
      "Investment Management": "Gestão de Investimentos",
      "Real Estate": "Imobiliária",
      "Financial Services": "Serviços financeiros",
      "Real Estate Development": "Desenvolvimento Imobiliário",
      "Others": "Outros",
      "Investment Banking": "Investimento bancário",
      "Leasing Real Estate": "Locação de imóveis",
      "Asset Manager": "Gerente de ativos",
      "Property Developer": "Incorporador de imóveis",
      "Property Operator": "Operador de propriedade",
      "Family Office": "Escritório Familiar",
      "months": [
        "Janeiro",
        "Fevereiro",
        "Marchar",
        "abril",
        "Poderia",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "novembro",
        "dezembro"
      ]
    }
  };

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

  function updateIframes() {
    const iFrameSub = document.getElementById('iframe-sub');
    const iFrameLead = document.getElementById('iframe-lead');
    const lang = i18next.language.includes('en') ? 'en' : i18next.language;

    if (iFrameSub && iFrameLead) {
      iFrameSub.src = `https://app.lombardstandard.com/subscribeForm/?lang=${lang}`;
      iFrameLead.src = `https://app.lombardstandard.com/search_leads_widget/?lang=${lang}`;
    }
  }

  function updateImages() {
    const imageHead = document.getElementById('header-image')
    const imageBody = document.getElementById('body-image')
    const videoHead = document.getElementById('videoAd')
    const lang = i18next.language.includes('en') ? 'en' : i18next.language;
    const finalLang = ['de', 'zh-CN', 'zh-Hant', 'fr', 'it', 'es', 'pt'].includes(lang) ? 'en' : lang
  
    if (imageHead) {
      imageHead.src = `https://lombst.s3.amazonaws.com/website/VectorDB-${finalLang}-min.png`
    }
    if (imageBody) {
      imageBody.src = `https://lombst.s3.amazonaws.com/website/Features-${finalLang}.png`
    }
    if (videoHead) {
      videoHead.src = `https://lombst.s3.amazonaws.com/website/video-${finalLang}.mp4`
    }
  }

  function updateVideo() {
    const video = document.getElementById('video')
    const videoSrc = document.getElementById("videoSrc")
  
    if (video && videoSrc) {
      const lang = i18next.language.includes('en') ? 'en' : i18next.language;
      const videoURL = lang === 'ja' ? 'https://lombst.s3.amazonaws.com/website/AI+Matching+JA+(Captions).mp4' : 'https://lombst.s3.amazonaws.com/website/AI+Matching+(Captions).mp4'
      videoSrc.setAttribute('src', videoURL);
      video.load();
    }
  }

  async function i18Loader() {
    const langs = ['en', 'ja'];
  // 'de', 'zh-CN', 'zh-Hant', 'fr', 'it', 'es', 'pt'
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
    updateIframes();
    updateImages();
    updateVideo();

    i18next.on('languageChanged', () => {
      // setDate();
      updateChartData();
      updateContent();
      updateIframes();
      updateImages();
      updateVideo();
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

  const updateChartData = () => {
    // const t = translations[getCurrentLang()];

    // apiData.segments.forEach(([sector, value], i) => {
    //   sectorSeries.data.setIndex(i, {
    //     category: t[sector] || sector,
    //     value: ((value / apiData.totalSegments) * 100).toFixed(1),
    //   });
    // });

    if (mapLang) map?.setStyle(mapLang.setLanguage(map.getStyle(), getCurrentLang()));
  };

  // api
  const API_URL = 'https://api.beta.lombardgpt.com/stats';
  const MAPBOX_ACCESS_KEY =
    'pk.eyJ1IjoiYW1nMjIwNzUiLCJhIjoiY2swajRlMno5MDZjMjNvbTF2MnRpNmd1biJ9.ADtpGBcPTJhWfSn2vWk07w';
  const COUNTRY_MAP = {
    'United States of America': 'United States',
    "People's Republic of China": 'China',
    'Vatican City': 'Holy See (Vatican City State)',
    'Kingdom of Saudi Arabia': 'Saudi Arabia',
    'Hong Kong, China': 'Hong Kong',
    'Hong Kong SAR': 'Hong Kong',
    'Hong Kong S.A.R.': 'Hong Kong',
    'Taiwan': 'Taiwan, Province of China',
    'South Korea': 'Korea, Republic of',
    'North Korea': "Korea, Democratic People's Republic of"
  };

  let map = null;
  let sectorSeries = null;
  let apiData = {};
  let mapLang = null

  const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  // const setDate = () => {
  //    const currentLang = getCurrentLang();
  //    const t = translations[currentLang];
  //    const date = new Date();
  //    const day = date.getDate();
  //    const year = date.getFullYear();
  //    const localeDates = {
  //       en: `${t['Last updated']} ${t.months[date.getMonth()]} ${day}, ${year}`,
  //       ja: `${t['Last updated']} ${year}年 ${t.months[date.getMonth()]}月 ${day}日`,
  //    };

  //    document.getElementById('today').innerHTML = localeDates[currentLang];
  // };

  const fetchStats = async () => {
    try {
      const t = translations[getCurrentLang()];

      const { stats } = await fetch(API_URL).then((res) => res.json());

      // populating companies
      const companiesCount = document.getElementById('companies-count')
      if (companiesCount) {
        companiesCount.innerHTML = stats.companiesCount ? numberWithCommas(stats.companiesCount) : 0
      }

      // populating contacts
      const contactsCount = document.getElementById('contacts-count')
      if (contactsCount) {
        contactsCount.innerHTML = stats.peopleCount ? numberWithCommas(stats.peopleCount) : 0
      }

      // populating segments
      const segments = Object.entries(stats.segments || {})
      const totalSegments = segments.reduce((prev, [, value]) => prev + value, 0)
      apiData.segments = segments
      apiData.totalSegments = totalSegments

      const sectorsData = segments.map(([sector, value]) => ({
        category: t[sector] || sector,
        value: ((value / totalSegments) * 100).toFixed(1),
        sector
      }));

      createChart('sectors', sectorsData);

      // populating countries
      const { ref_country_codes } = await getCountriesLatLong();
      const features = [];

      const countriesCount = document.getElementById('countries-count')
      if (countriesCount) {
        countriesCount.innerHTML = Object.keys(stats.countries).length
      }

      for (let [country, count] of Object.entries(stats.countries)) {
        let finalCountry = COUNTRY_MAP[country] || country;

        const data = ref_country_codes.find(
          (coord) => coord.country === finalCountry
        );

        if (data) {
          const arrayOfFeatures = Array.from(
            {
              length: count,
            },
            (_, i) => ({
              id: `${country}-${i}`,
              type: 'feature',
              geometry: {
                coordinates: [data.longitude, data.latitude],
                type: 'Point',
              },
            })
          );

          features.push(...arrayOfFeatures);
        }
      }

      renderDealsMap('map-container', {
        type: 'FeatureCollection',
        features,
      });
    } catch (err) {
      console.log('Error occurred while fetching stats:', err.message);
    }
  };

  const createChart = (id = '', data = []) => {
    const sectors = document.getElementById('sectors')
    const fills = [
      '#67B7DC',
      '#6794DC',
      '#6771DC',
      '#8067DC',
      '#A367DC',
      '#C767DC'
    ]

    data.forEach((sector, i) => {
      const div = document.createElement('div')
      div.className = 'flex items-center gap-2'

      const box = document.createElement('div')
      box.className = 'w-4 h-4 rounded-sm'
      box.style.backgroundColor = fills[i] || '#67B7DC'

      const p = document.createElement('p')
      p.innerHTML = sector.category
      p.className = 'text-lg font-light i18nelement'
      p.setAttribute('data-i18n', sector.sector)

      const span = document.createElement('span')
      span.innerHTML = sector.value + '%'
      span.className = 'font-bold'

      div.appendChild(box)
      div.appendChild(p)
      div.appendChild(span)

      sectors.appendChild(div)
    })
    // const root = am5.Root.new(id);
    // root._logo.dispose();

    // const responsive = am5themes_Responsive.new(root);

    // responsive.addRule({
    //   relevant: am5themes_Responsive.widthL,
    // });
    // root.setThemes([am5themes_Animated.new(root), responsive]);

    // const chart = root.container.children.push(
    //   am5percent.PieChart.new(root, {
    //     radius: am5.percent(50),
    //     innerRadius: am5.percent(50),
    //     centerX: am5.percent(25),
    //     layout: am5.GridLayout.new(root, {
    //       maxColumns: 3,
    //       fixedWidthGrid: true,
    //     }),
    //   })
    // );

    // const series = chart.series.push(
    //   am5percent.PieSeries.new(root, {
    //     valueField: 'value',
    //     categoryField: 'category',
    //     oversizedBehavior: 'wrap',
    //     legendLabelText:
    //       '[#111827; 300; fontSize: 16px; fontFamily: Roboto]{category}[/]',
    //     legendValueText:
    //       '[#111827; bold; fontSize: 16px; fontFamily: Roboto]{value}%[/]',
    //   })
    // );

    // if (id === 'sectors') {
    //   sectorSeries = series;
    // }

    // series.data.setAll(data);
    // series.labels.template.set('forceHidden', true);
    // series.ticks.template.set('forceHidden', true);

    // series.slices.template.setAll({
    //   fillOpacity: 1,
    //   stroke: am5.color(0xffffff),
    //   strokeWidth: 2,
    // });

    // series.slices.template.set('tooltipText', '');
    // series.slices.template.set('toggleKey', 'none');

    // var legend = chart.children.push(
    //   am5.Legend.new(root, {
    //     centerY: am5.percent(50),
    //     y: am5.percent(50),
    //     x: am5.percent(75),
    //     layout: root.verticalLayout,
    //     fill: am5.color(0xffffff),
    //   })
    // );

    // legend.data.setAll(series.dataItems);
  };

  const getCountriesLatLong = () => fetch('/js/countries.json').then((res) => res.json())

  const renderDealsMap = (containerId, data) => {
    if (map) map.remove();

    map = new mapboxgl.Map({
      container: containerId,
      accessToken: MAPBOX_ACCESS_KEY,
      style: 'mapbox://styles/amg22075/ckucg49w84hws18mq0qhdder7',
      center: [11, 38],
      renderWorldCopies: false,
      zoom: 0,
      maxZoom: 6,
      minZoom: 0,
      pitch: 0,
      bearing: 0,
      tolerance: 0,
      interactive: true,
      attributionControl: false,
      localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif",
    });

    mapLang = new MapboxLanguage({ defaultLanguage: getCurrentLang() })
    map.addControl(mapLang)
    map.keyboard.disable();
    map.dragRotate.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disableRotation();

    map.on('load', () => {
      map.addSource('Source', {
        type: 'geojson',
        data,
        cluster: true,
        clusterRadius: 135,
      });

      map.addLayer({
        id: 'Cluster',
        type: 'circle',
        source: 'Source',
        filter: ['has', 'point_count'],
        layout: {
          visibility: 'visible',
        },
        paint: {
          'circle-pitch-alignment': 'map',
          'circle-pitch-scale': 'map',
          'circle-color': '#ffffff',
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            28,
            300,
            34,
            700,
            42,
          ],
          'circle-opacity': 0.8,
          'circle-stroke-width': 0,
          'circle-stroke-opacity': 1,
          'circle-stroke-color': '#111827',
        },
      });

      map.addLayer({
        id: 'Cluster_count',
        type: 'symbol',
        source: 'Source',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['Roboto Light'],
          'text-size': ['step', ['get', 'point_count'], 14, 300, 16, 700, 18],

          'text-offset': [0, 0],
        },
        paint: {
          'text-color': '#111827',
        },
      });
    });
  };

  // setDate();
  fetchStats();
});
