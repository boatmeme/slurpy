const mapDomProps = (el, prop) => Array.from(document.getElementsByTagName(el)).map(obj => obj[prop]);
const getLinks = (data, sendResponse) => sendResponse(mapDomProps('a', 'href'));
const getImages = (data, sendResponse) => sendResponse(mapDomProps('img', 'src'));

const Handlers = {
  getLinks,
  getImages,
};

const dispatch = ({ cmd, data }, sender, sendResponse) => {
  const fn = Handlers[cmd];
  return fn ? fn(data, sendResponse) : false;
};

chrome.runtime.onMessage.addListener(dispatch);
