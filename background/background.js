chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "localStorage") {
      sendResponse({data: localStorage[request.key]});
    } else {
      sendResponse({});
    }
});

chrome.webRequest.onCompleted.addListener(
  function(details) {
    chrome.tabs.query({
      active: true,
      windowId: chrome.windows.WINDOW_ID_CURRENT
    }, function (result) {
      var currentTab = result.shift();
      chrome.tabs.sendMessage(currentTab.id, details, function() {});
    });
  },
  { urls: [ "<all_urls>" ] },
  [ "responseHeaders" ]
);
