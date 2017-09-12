const mapDomProps = (parent, el, prop) => Array.from(parent.getElementsByTagName(el)).map(obj => obj[prop]);
const getLinks = parent => mapDomProps(parent, 'a', 'href');
const getImages = parent => mapDomProps(parent, 'img', 'src');

const sanitizeRegex = new RegExp(`^chrome-extension://${chrome.runtime.id}`);

const uniq = (arr = []) => Object.keys(arr.reduce((accu, o) => Object.assign(accu, {[o]: true}), {}));
const filterFn = (filters = [/.*/]) => item => filters.reduce((accu, regex) => accu ? item.match(regex): false, true);

function scrapeUrl(urlStr, imageFilter = /.*/, linkFilter = /^http|https/) {
  return new Promise((resolve, reject) => {
    function reqListener() {
      const url = new URL(urlStr);
      const replaceUrl = `${url.protocol}//${url.host}`;
      const cleanUrlFn = u => u.replace(sanitizeRegex, replaceUrl)
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = this.responseText;
      const results = {
        images: uniq(getImages(tempDiv).map(cleanUrlFn).filter(filterFn(imageFilter)),
        links: uniq(getLinks(tempDiv).map(cleanUrlFn).filter(filterFn(linkFilter))
      };
      tempDiv.remove();
      resolve(results);
    }

    function reqError(err) {
      reject(`Fetch Error ${err}'`);
    }

    const xhr = new XMLHttpRequest();
    xhr.onload = reqListener;
    xhr.onerror = reqError;
    xhr.open("GET", urlStr, true);
    xhr.send();
  });
}

class Crawler {
  constructor() {
    this.links = [];
    this.images = [];
  }

  async start(url, level = 1) {
    let { images, links } = await scrapeUrl(url);
    if (level < 1) return { images, links: [] };
    let child, results;
    for (let i = 0; i < links.length; i++ ) {
      child = new Crawler();
      try {
        results = await child.start(links[i], level - 1);
        images = uniq([...images, ...results.images]);
        links = uniq([...links, ...results.links]);
      } catch (err) {
        console.error(err);
      }
    }
    return { images, links };
  }
}

const crawler = new Crawler();

async function onBrowserAction({ url, id }) {
  const crawler = new Crawler();
  const { images, links } = await crawler.start(url, 1);
  console.log(images, links)
}

chrome.browserAction.onClicked.addListener(onBrowserAction);
