import { Application } from "./domain/application/application";
import { DataBind } from "./interface-adapter/ui/data-bind.class";
import { CustomCollection } from "./infrastructure/custom-collection";
import { IButtonValue } from "./interface-adapter/ui/pad-button";
import { SimpleCalculator } from "./domain/calculator/simple-calculator";

const dataBind = new DataBind();
const equation = new CustomCollection<IButtonValue>();
const calculator = new SimpleCalculator();
const app = new Application(
    dataBind,
    equation,
    calculator,
);

window.addEventListener("load", () => {
    app.start();
});

window.addEventListener("unload", () => {
    app.destroy();
});
