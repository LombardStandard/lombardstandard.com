var d = new Date();
var n = d.getFullYear();
document.getElementById('copyright').innerHTML = n;

window.onresize = closeMenuResize;

function closeMenuResize() {
  document.getElementById('mobileMenu').style.opacity = 0;
  document.getElementById('mobileMenu').style.pointerEvents = 'none';
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

  regionTextDiv.innerHTML = `In your region (${regionMap[region]})`;
})();
