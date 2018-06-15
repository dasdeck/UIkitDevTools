
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


export default {
  getComponentTree() {

      return new Promise(resolve => {

          const code = buildUIkitTree.toString();
          const finalCode = `(${code})(document.body);`;
          chrome.devtools.inspectedWindow.eval(finalCode, resolve);

      });
  }
}
