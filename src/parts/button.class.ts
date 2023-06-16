import { ActionType } from "./action.class";
import { Value } from "./value.class";

export interface IButton<T> {
    setOnClick: (listener: (value: T) => void) => void;

    unbind: () => void;
}

export class Button<T> implements IButton<T> {
    private _clickListener?: (value: T) => void;

    private _onClickListener: (event: MouseEvent) => void = (_) =>
        this._onClick();

    constructor(
        private readonly element: HTMLButtonElement,
        private readonly value: T
    ) {
        this.element.addEventListener("click", this._onClickListener);
    }

    private _onClick() {
        if (!this._clickListener) {
            return;
        }
        this._clickListener(this.value);
    }

    setOnClick(listener: (value: T) => void) {
        this._clickListener = listener;
    }

    unbind() {
        this.element.removeEventListener("click", this._onClickListener);
        this._clickListener = undefined;
    }
}

export class NumberButton extends Button<Value> {}

export class ActionButton extends Button<ActionType> {}
