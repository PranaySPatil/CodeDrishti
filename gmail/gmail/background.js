function httpGet(url, tab)
{
  if(url.indexOf("github.com")>-1)
  {
    fetch(url).then(r => r.text()).then(result => {
        // Result now contains the response text, do what you want...
        chrome.tabs.sendMessage(tab.id, {"html": result});
    })
  }
  // $.get(url, function(data, s){
  //   chrome.tabs.sendMessage(tab.id, {"html": data});
  // });
  //   var xmlHttp = new XMLHttpRequest();
  //   xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  //   xmlHttp.send( null );
  //   return xmlHttp.responseText;
}

// chrome.tabs.getSelected(null, function(tab) {
//   tabUrl = encodeURIComponent(tab.url);
//   httpGet("http://localhost:3000/api?url="+tabUrl, tab)
// });

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    
    // do your things
    if(tab.url.split('/').length>=4) {
      
      tabUrl = encodeURIComponent(tab.url);
      httpGet("http://localhost:3000/api?url="+tabUrl+"&format=dot", tab);
    }

  }
})