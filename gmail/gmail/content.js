chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //console.log(request.html);
        //toggleSidebar(request.html);
        // var scripts = `<script src="./d3.v4.min.js"></script>
        // <script src="./viz.js"></script>
        // <script src="./d3-graphviz.js"></script>
        // <script src="./graphlib-dot.min.js"></script>
        // <script src="./graphlib.min.js"></script>`;

        // var screlement = document.createElement('div');
        // screlement.innerText = scripts;
        // document.head.appendChild(screlement);
        insertGraph(request.html);
    }
  );

  function insertGraph(dotSrc){
    var graph_template = `<script src="./d3.v4.min.js"></script>
<script src="./viz.js"></script>
<script src="./d3-graphviz.js"></script>
<script src="./graphlib-dot.min.js"></script>
<script src="./graphlib.min.js"></script>

<script id="somescript">



var digraph = graphlibDot.read('`+dotSrc;
graph_template = graph_template + `');
var graphviz = d3.select("#graph").graphviz();
var papa_nodes = digraph.children();
var digraph2 = new graphlib.Graph({ compound: true });

function render_graph(papa_nodes, clicked_node, isExpanded) {
  papa_nodes.map((value, index)=> {
    digraph2.setNode(value, digraph.node(value));

    if (isExpanded === 'false' && value === clicked_node) {
      var children = digraph.children(clicked_node);
      children.map((child, index) => {
        digraph2.setParent(child, clicked_node);
      });
    }
    else if (value === clicked_node){
      var children = digraph.children(clicked_node);
      children.map((child, index) => {
        digraph2.removeNode(child);
      });
    }
  })  

  remove_edges(digraph2);
  var edges = digraph.edges();
  edges.map((edge, index) => {
    var v = getParent(edge.v);
    var w = getParent(edge.w);

    if (v != w) {
      digraph2.setEdge(v, w);
    }
  });

  var dotSrc2 = graphlibDot.write(digraph2);

  render(dotSrc2);
}

function remove_edges(graph) {
  var edges = graph.edges();
  edges.map((value, index) => {
    graph.removeEdge(value.v, value.w);
  });
}

function getParent(name) {
  if (papa_nodes.indexOf(name) != -1) {
    return name;
  }

  var arr = name.split('/');
  arr.splice(-1, 1);
  
  var parent = (arr[0].startsWith('cluster_') ? '' : 'cluster_') + arr.join('/')

  return getParent(parent);
}

alert("sss");
render_graph(papa_nodes);

function render(dotSrc) {
    console.log('DOT source =', dotSrc);
    var dotSrcLines = dotSrc.split('\n');

    transition1 = d3.transition()
        .delay(1)
        .duration(1);
    
    graphviz
        .transition(transition1)
        .renderDot(dotSrc);

    nodes = d3.selectAll('.node,.edge');
    nodes
        .on("click", function () {
            var title = d3.select(this).selectAll('title').text().trim();
            var text = d3.select(this).selectAll('text').text();
            var id = d3.select(this).attr('id');
            var class1 = d3.select(this).attr('class');
            var isExpanded = d3.select(this).attr('expanded');
            if (!isExpanded){
              isExpanded = 'false';
            }
            
            var children = digraph.children(title);
            if (isExpanded === 'false') {
              papa_nodes = papa_nodes.concat(children);
            }
            else {
              papa_nodes = papa_nodes.filter(function(node) {
                return children.indexOf(node) < 0;
              });
            }
            
            render_graph(papa_nodes, title, isExpanded);
            isExpanded === 'true' ? d3.select(this).attr('expanded', 'false') : d3.select(this).attr('expanded', 'true');
        });
}

</script>`;


// var buttonHolder = document.getElementsByClassName("new-pull-request-btn")[0];
// buttonHolder.insertAdjacentHTML("afterend", "<a class='btn btn-sm' id='visualize-button'>Visualize</a>")
    var atagList = document.getElementsByTagName("a");
    var sibling;
    // var newButton = document.createElement("a");
    // newButton.textContent = "Visualize";
    // newButton.classList = "btn btn-sm BtnGroup-item";
    for(var i=0;i<atagList.length;i++){
        if(atagList[i].textContent.indexOf("Upload files")>-1){
            sibling = atagList[i];
        }
    }
    sibling.insertAdjacentHTML("afterend", "<a class='btn btn-sm BtnGroup-item' id='visualize-button'>Visualize</a>")
    // var table = getBodyContent(graphHtml);


var template = 
`
<div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <div id="graph" style="text-align: center;"></div>
  </div>
</div>`
//dotSrc = '`'+dotSrc;
//dotSrc = dotSrc+'`';
var scriptText = `
var blah = self
console.log(blah.graphlibDot)
var digraph = graphlibDot.read(`+dotSrc+`);
var graphviz = d3.select("#graph").graphviz();
var papa_nodes = digraph.children();
var digraph2 = new graphlib.Graph({ compound: true });

function render_graph(papa_nodes, clicked_node, isExpanded) {
  papa_nodes.map((value, index)=> {
    digraph2.setNode(value, digraph.node(value));

    if (isExpanded === 'false' && value === clicked_node) {
      var children = digraph.children(clicked_node);
      children.map((child, index) => {
        digraph2.setParent(child, clicked_node);
      });
    }
    else if (value === clicked_node){
      var children = digraph.children(clicked_node);
      children.map((child, index) => {
        digraph2.removeNode(child);
      });
    }
  })  

  remove_edges(digraph2);
  var edges = digraph.edges();
  edges.map((edge, index) => {
    var v = getParent(edge.v);
    var w = getParent(edge.w);

    if (v != w) {
      digraph2.setEdge(v, w);
    }
  });

  var dotSrc2 = graphlibDot.write(digraph2);

  render(dotSrc2);
}

function remove_edges(graph) {
  var edges = graph.edges();
  edges.map((value, index) => {
    graph.removeEdge(value.v, value.w);
  });
}

function getParent(name) {
  if (papa_nodes.indexOf(name) != -1) {
    return name;
  }

  var arr = name.split('/');
  arr.splice(-1, 1);
  
  var parent = (arr[0].startsWith('cluster_') ? '' : 'cluster_') + arr.join('/')

  return getParent(parent);
}

alert("sss");
render_graph(papa_nodes);

function render(dotSrc) {
    console.log('DOT source =', dotSrc);
    transition1 = d3.transition()
        .delay(1)
        .duration(1);
    
    graphviz
        .transition(transition1)
        .renderDot(dotSrc);

    nodes = d3.selectAll('.node,.edge');
    nodes
        .on("click", function () {
            var title = d3.select(this).selectAll('title').text().trim();
            var text = d3.select(this).selectAll('text').text();
            var id = d3.select(this).attr('id');
            var class1 = d3.select(this).attr('class');
            var isExpanded = d3.select(this).attr('expanded');
            if (!isExpanded){
              isExpanded = 'false';
            }
            
            var children = digraph.children(title);
            if (isExpanded === 'false') {
              papa_nodes = papa_nodes.concat(children);
            }
            else {
              papa_nodes = papa_nodes.filter(function(node) {
                return children.indexOf(node) < 0;
              });
            }
            
            render_graph(papa_nodes, title, isExpanded);
            isExpanded === 'true' ? d3.select(this).attr('expanded', 'false') : d3.select(this).attr('expanded', 'true');
        });
}`

        var tableElement = document.createElement('div');
        tableElement.id = "tableElementId";
        tableElement.innerHTML = template;
        document.body.appendChild(tableElement);

        function appendScript(name) {
                var script = document.createElement("script");
                script.src =  name;
                script.type = "text/javascript";
                document.body.appendChild(script);
        }

        // appendScript("https://d3js.org/d3.v4.min.js");
        // appendScript("https://unpkg.com/viz.js@1.8.0/viz.js");
        // appendScript("https://unpkg.com/d3-graphviz@2.6.1/build/d3-graphviz.min.js");
        // appendScript("https://dagrejs.github.io/project/graphlib-dot/v0.6.3/graphlib-dot.min.js");
        // appendScript("https://dagrejs.github.io/project/graphlib/latest/graphlib.min.js");

        // appendScript(chrome.extension.getURL("d3.v4.min.js"));
        // appendScript(chrome.extension.getURL("viz.js"));
        // appendScript(chrome.extension.getURL("d3-graphviz.js"));
        // appendScript(chrome.extension.getURL("graphlib-dot.min.js"));
        // appendScript(chrome.extension.getURL("graphlib.min.js"));
        appendScript(chrome.extension.getURL("index.js"));

        // var script = document.createElement("script");
        // script.innerHTML =  scriptText;
        // document.body.appendChild(script);
        var modal = document.getElementById("myModal");

        var graph = document.getElementById("graph");
        graph.setAttribute('data-src', dotSrc);

        // Get the button that opens the modal
        var btn = document.getElementById("visualize-button");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        btn.onclick = function() {
            modal.style.display = "block";
            //render(dotSrc);
            //tableElement.innerHTML = template;
            //document.getElementById("#somescript")[0].render(dotSrc);
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        }
  }

  function getBodyContent(str) {
    var bodyTags = /<body.*?>([\s\S]*)<\/body>/.exec(str)[1];
    return bodyTags; // use as innerHTML of <body> 
  }