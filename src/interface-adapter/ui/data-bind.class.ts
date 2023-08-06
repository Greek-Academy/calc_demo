import { ActionType, ActionValue } from "../../domain/model/action-value";
import { NumberValue } from "../../domain/model/number-value";
import { Display, IDisplay } from "./display.class";
import { IButton, PadButton, PadButtonName } from "./pad-button";

export type PadButtons = Record<PadButtonName, IButton>;

export interface IDataBind {
    buttons: PadButtons;
    display: IDisplay;
}

export class DataBind implements IDataBind {
    buttonNames = Object.values(PadButtonName);

    buttons: PadButtons = {
        zero: this.createNumberButton(0),
        one: this.createNumberButton(1),
        two: this.createNumberButton(2),
        three: this.createNumberButton(3),
        four: this.createNumberButton(4),
        five: this.createNumberButton(5),
        six: this.createNumberButton(6),
        seven: this.createNumberButton(7),
        eight: this.createNumberButton(8),
        nine: this.createNumberButton(9),
        add: this.createActionButton(ActionType.ADD),
        subtract: this.createActionButton(ActionType.SUBTRACT),
        multiply: this.createActionButton(ActionType.MULTIPLY),
        divide: this.createActionButton(ActionType.DIVIDE),
        equal: this.createActionButton(ActionType.EQUAL),
        clear: this.createActionButton(ActionType.CLEAR),
    };

    display = new Display();

    constructor() {
        this.bindButtons();
        this.bindDisplay();
    }

    /**
     * 全ての要素に設定されているイベントリスナーを解放する
     */
    unbindAll() {
        this.buttonNames.forEach((buttonName) => {
            this.buttons[buttonName].unbind();
        });
        this.display.unbind();
    }

    /**
     * @private
     * 表示領域の要素を割り当てる
     */
    private bindDisplay() {
        const element = document.getElementById("display");
        if (!element) {
            throw new Error("id='display'が見つかりません");
        }

        this.display.bind(element as HTMLInputElement);
    }

    private bindButtons() {
        this.buttonNames.forEach((buttonName) => {

            const element = document.getElementById(buttonName);
            if (!element) {
                throw new Error(`id="${buttonName}" が見つかりません`);
            }
            this.buttons[buttonName].bind(element);
        });
    }

    private createActionButton(
        value: ActionType,
    ): PadButton {
        return new PadButton(
            new ActionValue(
                value,
            ),
        );
    }

    private createNumberButton(
        value: number,
    ): PadButton {
        return new PadButton(
            new NumberValue(
                value,
            ),
        );
    }
}
