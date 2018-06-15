import { Z_DEFAULT_COMPRESSION } from "zlib";



function buildUIkitTree(element, parent) {

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  if (typeof parent === 'undefined') {
    parent = {name: 'root', children: []};
  }

  for (let i = 0; i < element.children.length; i++) {

    const el = element.children[i];

    if (el.__uikit__) {

      const id = el.attributes['uk-devtools-id'] = el.attributes['uk-devtools-id'] || guid();
      const descriptor = {
        name: Object.keys(el.__uikit__).join(','),
        id,
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

function dump() {

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
