var result = null;
var currentTabUrl = null;

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    this.currentTabUrl = tab.url;
    // do your things
    if(tab.url.split('/').length>=4) {
      
      tabUrl = encodeURIComponent(tab.url);
      if(tabUrl.indexOf("github.com")>-1)
      {
        chrome.tabs.sendMessage(tabId, {"loadButton": true, "tabUrl": tab.url});
      }
    }
  }
})

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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var tabId = sender.tab.id;
    if (request.loadDependency === true)
      if(this.currentTabUrl == sender.tab.url){
        sendResponse(sender.tab.id);
        return;
      }

      this.currentTabUrl = sender.tab.url;
      // do your things
      if(sender.tab.url.split('/').length>=4) {
        
        tabUrl = encodeURIComponent(sender.tab.url);
        httpGet("http://codedrishti.japaneast.cloudapp.azure.com/api?url="+tabUrl+"&format=dot", sender.tab);
      }
  });