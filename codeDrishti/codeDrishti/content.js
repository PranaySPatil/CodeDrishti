chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    insertGraph(request.html);
  }
);

var buttonAdded = false;

function insertGraph(dotSrc) {

  // Add button to github
  if (buttonAdded == false) {
    var atagList = document.getElementsByTagName("a");
    var sibling;
    for (var i = 0; i < atagList.length; i++) {
      if (atagList[i].textContent.indexOf("Upload files") > -1) {
        sibling = atagList[i];
        break;
      }
    }

    sibling.insertAdjacentHTML("afterend", "<a class='btn btn-sm BtnGroup-item' id='visualize-button'>Envision</a>")
    buttonAdded = true;
  }
  //


  var template = `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <div id="graph" style="text-align: center;"></div>
      </div>
    </div>`;


  var tableElement = document.createElement('div');
  tableElement.id = "tableElementId";
  tableElement.innerHTML = template;
  document.body.appendChild(tableElement);

  function appendScript(name) {
    var script = document.createElement("script");
    script.src = name;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }

  appendScript(chrome.extension.getURL("index.js"));

  var modal = document.getElementById("myModal");

  var graph = document.getElementById("graph");
  graph.setAttribute('data-src', dotSrc);

  // Get the button that opens the modal
  var btn = document.getElementById("visualize-button");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  btn.onclick = function () {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function getBodyContent(str) {
  var bodyTags = /<body.*?>([\s\S]*)<\/body>/.exec(str)[1];
  return bodyTags; // use as innerHTML of <body> 
}