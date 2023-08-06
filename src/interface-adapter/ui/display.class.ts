import { IButtonValue } from "./pad-button";

export interface IDisplay {
    setValue(value: IButtonValue): void;
    blink(): void;
    bind(element: HTMLInputElement): void;
    unbind(): void;
}

export class Display implements IDisplay {

    private element?: HTMLInputElement;

    constructor() {}

    bind(element: HTMLInputElement): void {
        this.element = element;
    }

    unbind(): void {
        this.element = undefined;
    }

    setValue(value: IButtonValue) {
        if (!this.element) {
            return;
        }
        this.element!.value = value.toString();
    }

    async blink() {
        if (!this.element) {
            return;
        }
        const value = this.element?.value;

        this.element!.value = "";
        await new Promise((resolve) => {
            setTimeout(resolve, 100);
        });

        this.element.value = value;
    }
}
