import { Value } from "./value.class";

export class Display {
    constructor(private readonly element: HTMLInputElement) {}

    setValue(value: Value) {
        this.element.value = value.toString();
    }

    async blink() {
        const value = this.element.value;

        this.element.value = "";
        await new Promise((resolve) => {
            setTimeout(resolve, 100);
        });

        this.element.value = value;
    }
}
