


function buildUIkitTree(element, parent) {

  if (typeof parent === 'undefined') {
    parent = {name: 'root', children: []};
  }

  for (let i = 0; i < element.children.length; i++) {

    const el = element.children[i];

    if (el.__uikit__) {

      const descriptor = {
        name: Object.keys(el.__uikit__).join(','),
        // el: el,
        children: []
      };

      buildUIkitTree(el, descriptor);
      parent.children.push(descriptor);

    } else {
      buildUIkitTree(el, parent);
    }

  }

  return JSON.stringify(parent, null, 2);

}

chrome.devtools.panels.create("UIkit", "", "main.html", panel => {

    panel.onShown.addListener(window => {

      const checker = window.document.getElementById('uikit');
      const text = window.document.getElementById('text');
      // const code = 'function(){return "test";}';//buildUIkitTree.toString();
      const code = buildUIkitTree.toString();
      const finalCode = `(${code})(document.body);`;
       chrome.devtools.inspectedWindow.eval(finalCode, res => {
         text.value = res;
        });

    });
  }
);