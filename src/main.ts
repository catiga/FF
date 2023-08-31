import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router/index";
import { setupAssets } from './plugins/index';
import { setupAxios } from './axios/index';
import { serupStore } from './store/index';
import AppLoading from './components/AppLoading.vue';

async function setupApp() {
    // app loading
    const appLoading = createApp(AppLoading);
    appLoading.mount('#appLoading');

    // import assets: js、css
    setupAssets();

    
    const app = createApp(App);

    // store
    serupStore(app);
    
    // axios
    setupAxios(app);

    // vue router
    await setupRouter(app);

    appLoading.unmount();

    // mount app
    app.mount('#app');
}

setupApp()
