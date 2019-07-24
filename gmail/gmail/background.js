var result = null;
var currentTabUrl = null;

function httpGet(url, tab)
{
  if(url.indexOf("github.com")>-1)
  {
    fetch(url).then(r => r.text()).then(result => {
        // Result now contains the response text, do what you want...
        this.result = result;
        sendResponse(tab.id);
    })
  }
}

function sendResponse(tabId){
  chrome.tabs.sendMessage(tabId, {"html": this.result});
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    if(this.currentTabUrl == tab.url){
      sendResponse(tab.id);
      return;
    }

    this.currentTabUrl = tab.url;
    // do your things
    if(tab.url.split('/').length>=4) {
      
      tabUrl = encodeURIComponent(tab.url);
      httpGet("http://localhost:3000/api?url="+tabUrl+"&format=dot", tab);
    }
  }
})