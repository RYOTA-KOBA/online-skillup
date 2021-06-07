import { createApp } from "vue";
import App from "./typescripts/App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");
