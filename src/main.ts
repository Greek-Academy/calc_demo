import { Application } from "./application";

const app = new Application();

window.addEventListener("load", () => {
    app.bind();
});

window.addEventListener("unload", () => {
    app.unbind();
});
