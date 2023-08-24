import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router/index";
import { setupAssets } from './plugins/index';
import AppLoading from './components/AppLoading.vue';

async function setupApp() {
    // import assets: js、css
    setupAssets();

    // app loading
    const appLoading = createApp(AppLoading);

    appLoading.mount('#appLoading');

    const app = createApp(App);

    // vue router
    await setupRouter(app);

    appLoading.unmount();

    // mount app
    app.mount('#app');
}

setupApp()
