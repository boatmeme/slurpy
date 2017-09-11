/*
const tabsQuery = opts => new Promise((resolve, reject) => chrome.tabs.query(opts, resolve));

async function getCurrentTabUrl() {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  const [{ url }] = await tabsQuery(queryInfo);
  console.assert(typeof url == 'string', 'tab.url should be a string');
  return url;
}


function getImageUrl(searchTerm, callback, errorCallback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
    '?v=1.0&q=' + encodeURIComponent(searchTerm);
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = x.response;
    console.log(response);
    if (!response || !response.responseData || !response.responseData.results ||
        response.responseData.results.length === 0) {
      errorCallback('No response from Google Image search!');
      return;
    }
    var firstResult = response.responseData.results[0];
    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    var imageUrl = firstResult.tbUrl;
    var width = parseInt(firstResult.tbWidth);
    var height = parseInt(firstResult.tbHeight);
    console.assert(
        typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
        'Unexpected respose from the Google Image Search API!');
    callback(imageUrl, width, height);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

const injectScript = filename => chrome.tabs.executeScript(null, {file: `src/js/content/${filename}`});
const injectContentScript = () => injectScript('content.js');

const handleLinkEvent = msg => {
  renderStatus(JSON.stringify(msg));
}

const messageHandlers = {
  handleLinkEvent,
}

const initMessaging = () =>
  chrome.runtime.onConnect.addListener(({ onMessage, name }) => onMessage.addListener(messageHandlers[name]));

async function onDomContentLoaded() {
  const url = await getCurrentTabUrl();
  initMessaging();
  injectContentScript();
}

document.addEventListener('DOMContentLoaded', onDomContentLoaded);
*/

function hello() {
  chrome.tabs.executeScript({
    file: 'alert.js'
  });
}

const doCrawl = () => {
  
}

const onDomContentLoaded() {
  document.getElementById('doCrawl').addEventListener('click', hello);
}

document.addEventListener('DOMContentLoaded', onDomContentLoaded);
