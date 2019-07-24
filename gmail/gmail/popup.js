// function httpGet(url, tab)
//     {
//     if(url.split("/").indexOf("github.com")>-1)
//     {
//         fetch(url).then(r => r.text()).then(result => {
//             // Result now contains the response text, do what you want...
//             chrome.tabs.sendMessage(tab.id, {"html": result});
//         })
//     }
//     // $.get(url, function(data, s){
//     //   chrome.tabs.sendMessage(tab.id, {"html": data});
//     // });
//     //   var xmlHttp = new XMLHttpRequest();
//     //   xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
//     //   xmlHttp.send( null );
//     //   return xmlHttp.responseText;
//     }
// document.addEventListener('DOMContentLoaded', function () {
//     chrome.tabs.getSelected(null, function(tab) {
//         tabUrl = encodeURIComponent(tab.url);
//         httpGet("http://localhost:3000/api?url="+tabUrl, tab)
//     });
// });

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
    }
);