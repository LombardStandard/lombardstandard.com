const copyright = document.getElementById('copyright');
if (copyright) {
  copyright.innerHTML = new Date().getFullYear();
}

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
      months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    },
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
    const imageHead = document.getElementById('header-image');
    const imageBody = document.getElementById('body-image');
    const lang = i18next.language.includes('en') ? 'en' : i18next.language;

    if (imageHead) {
      imageHead.src = `https://lombst.s3.amazonaws.com/website/VectorDB-${lang}.png`;
    }
    if (imageBody) {
      imageBody.src = `https://lombst.s3.amazonaws.com/website/Features-${lang}.png`;
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
    updateIframes();
    updateImages();

    i18next.on('languageChanged', () => {
      // setDate();
      updateChartData();
      updateContent();
      updateIframes();
      updateImages();
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
    const t = translations[getCurrentLang()];

    // for profile count chart
    // const { profile_count, upcoming_profile_count } = apiData;

    // profileCountSeries.data.setIndex(0, {
    //   category: t['Available profiles'] || 'Available profiles',
    //   value: profile_count,
    // });
    // profileCountSeries.data.setIndex(1, {
    //   category: t['Upcoming profiles'] || 'Upcoming profiles',
    //   value: upcoming_profile_count,
    // });
    // for profile count chart

    // for sectors chart
    const { profile_count_in_sectors } = apiData;

    profile_count_in_sectors.x.forEach((sector, i) => {
      sectorSeries.data.setIndex(i, {
        category: t[sector] || sector,
        value: profile_count_in_sectors.y[i],
      });
    });
    // for sectors chart

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
  };

  let map = null;
  let profileCountSeries = null;
  let sectorSeries = null;
  let apiData = {};
  let mapLang = null

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
      const {
        profile_count,
        upcoming_profile_count,
        profile_count_in_sectors,
        vector_dimensionality,
        total_vector_points,
        profile_count_in_countries,
      } = await fetch(API_URL).then((res) => res.json());

      apiData = {
        profile_count,
        upcoming_profile_count,
        profile_count_in_sectors,
      };

      const t = translations[getCurrentLang()];

      const profileData = [
        {
          category: t['Available profiles'] || 'Available profiles',
          value: profile_count,
        },
        {
          category: t['Upcoming profiles'] || 'Upcoming profiles',
          value: upcoming_profile_count,
        },
      ];
      const sectorsData = profile_count_in_sectors.x.map((sector, i) => ({
        category: t[sector] || sector,
        value: profile_count_in_sectors.y[i],
      }));

      //  createChart('profileCount', profileData);
      createChart('sectors', sectorsData);

      //  document.getElementById('vector-dimensionality').innerHTML =
      //     vector_dimensionality.toLocaleString();
      document.getElementById('vector-points').innerHTML =
        total_vector_points.toLocaleString();

      const { ref_country_codes } = await getCountriesLatLong();

      const features = [];

      profile_count_in_countries.x.forEach((country, i) => {
        let finalCountry = country;

        if (
          [
            'United States of America',
            "People's republic of China",
            'Vatican City',
          ].includes(finalCountry)
        ) {
          finalCountry = COUNTRY_MAP[country];
        }

        const data = ref_country_codes.find(
          (coord) => coord.country === finalCountry
        );

        if (data) {
          const count = profile_count_in_countries.y[i];

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
      });

      document.getElementById('count-1').innerHTML = profile_count;

      renderDealsMap('map-container', {
        type: 'FeatureCollection',
        features,
      });
    } catch (err) {
      console.log('Error occurred while fetching stats:', err.message);
    }
  };

  const createChart = (id = '', data = []) => {
    const root = am5.Root.new(id);
    root._logo.dispose();

    const responsive = am5themes_Responsive.new(root);

    responsive.addRule({
      relevant: am5themes_Responsive.widthL,
    });
    root.setThemes([am5themes_Animated.new(root), responsive]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(50),
        innerRadius: am5.percent(50),
        centerX: am5.percent(25),
        layout: am5.GridLayout.new(root, {
          maxColumns: 3,
          fixedWidthGrid: true,
        }),
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'value',
        categoryField: 'category',
        oversizedBehavior: 'wrap',
        legendLabelText:
          '[#111827; 300; fontSize: 16px; fontFamily: Roboto]{category}[/]',
        legendValueText:
          '[#111827; bold; fontSize: 16px; fontFamily: Roboto]{value}[/]',
      })
    );

    //  if (id === 'profileCount') {
    //     profileCountSeries = series;
    //   }
    if (id === 'sectors') {
      sectorSeries = series;
    }

    series.data.setAll(data);
    series.labels.template.set('forceHidden', true);
    series.ticks.template.set('forceHidden', true);

    series.slices.template.setAll({
      fillOpacity: 1,
      stroke: am5.color(0xffffff),
      strokeWidth: 2,
    });

    series.slices.template.set('tooltipText', '');
    series.slices.template.set('toggleKey', 'none');

    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        x: am5.percent(75),
        layout: root.verticalLayout,
        fill: am5.color(0xffffff),
      })
    );

    legend.data.setAll(series.dataItems);
  };

  const getCountriesLatLong = async () => {
    return fetch('/js/countries.json').then((res) => res.json());
  };

  const renderDealsMap = (containerId, data) => {
    if (map) map.remove();

    map = new mapboxgl.Map({
      container: containerId,
      accessToken: MAPBOX_ACCESS_KEY,
      style: 'mapbox://styles/amg22075/ckucg49w84hws18mq0qhdder7',
      center: [11, 38],
      renderWorldCopies: false,
      zoom: 0,
      maxZoom: 4,
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
  // api
});
