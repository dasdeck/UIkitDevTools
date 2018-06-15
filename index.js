

import Vue from 'vue';
import App from './src/App';

chrome.devtools.panels.create("UIkit", "", "app.html", panel => {

    panel.onShown.addListener(window => {

        /* eslint-disable no-new */
        const app = new Vue(App);
        app.$mount(window.document.body.firstElementChild);

    });
});
