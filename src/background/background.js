const sendMessage = (tabId, cmd, fn) => chrome.tabs.sendMessage(tabId, { cmd }, fn);

const Events = {
  GET_LINKS: 'getLinks',
  GET_IMAGES: 'getImages'
}

class Crawler {
  constructor() {
    this.links = [];
    this.images = [];
  }

  start(tabId) {
    sendMessage(tabId, Events.GET_LINKS, this.processLinks.bind(this) );
    sendMessage(tabId, Events.GET_IMAGES, this.processImages.bind(this) );
  }

  processImages(images = []) {
    this.images = [...this.images, ...images];
    console.log(this.images);
  }

  processLinks(links = []) {
    this.links = [...this.links, ...links];
    console.log(this.links);
  }
}

const crawler = new Crawler();
chrome.browserAction.onClicked.addListener(({id}) => crawler.start(id));
