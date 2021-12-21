import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

// import {  } from "module";

const mount = (el) => {
    const app = createApp(Dashboard);

    app.mount(el)

    // const app = new Vue({
    //     el,
    // });
}

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_dashboard-dev-root');

    if (el) {
        mount(el);
    }
}


export { mount }