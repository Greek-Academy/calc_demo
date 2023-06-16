import { ActionType } from "./parts/action.class";
import { ActionButton, NumberButton } from "./parts/button.class";
import { Display } from "./parts/display.class";
import { Value } from "./parts/value.class";

export class Buttons {
    num0?: NumberButton;

    num1?: NumberButton;

    num2?: NumberButton;

    num3?: NumberButton;

    num4?: NumberButton;

    num5?: NumberButton;

    num6?: NumberButton;

    num7?: NumberButton;

    num8?: NumberButton;

    num9?: NumberButton;

    add?: ActionButton;

    subtract?: ActionButton;

    multiple?: ActionButton;

    divide?: ActionButton;

    equal?: ActionButton;

    clear?: ActionButton;

    forEach(
        listener: (name: string, element?: NumberButton | ActionButton) => void
    ): void {
        for (const [name, value] of Object.entries(this)) {
            listener(name, value);
        }
    }
}

export class DataBind {
    buttons = new Buttons();

    display?: Display;

    constructor() {
        this.bindNumberButtons();
        this.bindOperationButtons();
        this.bindDisplay();
        this.verify();
    }

    /**
     * 全ての要素に設定されているイベントリスナーを解放する
     */
    unbindAll() {
        this.buttons.forEach((_, element) => {
            element?.unbind();
        });
    }

    /**
     * @private
     * 全ての必要な要素が取得できているかチェック
     */
    private verify() {
        this.buttons.forEach((name, element) => {
            if (element) {
                return;
            }
            throw new Error(`buttons.${name} が見つかりません`);
        });

        if (!this.display) {
            throw new Error("displayが見つかりません");
        }
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

        this.display = new Display(element as HTMLInputElement);
    }

    /**
     * @private
     * <button class="actionBtn"> を割り当てる
     */
    private bindOperationButtons() {
        const elements = Array.from(
            document.querySelectorAll("button.actionBtn")
        ) as HTMLButtonElement[];

        elements.forEach((element) => {
            const value = element.value;

            switch (value) {
                case "add":
                    this.buttons.add = new ActionButton(
                        element,
                        ActionType.ADD
                    );
                    break;

                case "subtract":
                    this.buttons.subtract = new ActionButton(
                        element,
                        ActionType.SUBTRACT
                    );
                    break;

                case "multiple":
                    this.buttons.multiple = new ActionButton(
                        element,
                        ActionType.MULTIPLE
                    );
                    break;

                case "divide":
                    this.buttons.divide = new ActionButton(
                        element,
                        ActionType.DIVIDE
                    );
                    break;

                case "equal":
                    this.buttons.equal = new ActionButton(
                        element,
                        ActionType.EQUAL
                    );
                    break;

                case "clear":
                    this.buttons.clear = new ActionButton(
                        element,
                        ActionType.CLEAR
                    );
                    break;

                default:
                    throw new Error(
                        `未実装なボタンが検出されました : .actionButton(${value})`
                    );
            }
        });
    }

    /**
     * @private
     * <button class="numberBtn"> を割り当てる
     */
    private bindNumberButtons() {
        const elements = Array.from(
            document.querySelectorAll("button.numberBtn")
        ) as HTMLButtonElement[];

        elements.forEach((element) => {
            const value = element.value;

            switch (value) {
                case "0":
                    this.buttons.num0 = new NumberButton(element, new Value(0));
                    break;

                case "1":
                    this.buttons.num1 = new NumberButton(element, new Value(1));
                    break;

                case "2":
                    this.buttons.num2 = new NumberButton(element, new Value(2));
                    break;

                case "3":
                    this.buttons.num3 = new NumberButton(element, new Value(3));
                    break;

                case "4":
                    this.buttons.num4 = new NumberButton(element, new Value(4));
                    break;

                case "5":
                    this.buttons.num5 = new NumberButton(element, new Value(5));
                    break;

                case "6":
                    this.buttons.num6 = new NumberButton(element, new Value(6));
                    break;

                case "7":
                    this.buttons.num7 = new NumberButton(element, new Value(7));
                    break;

                case "8":
                    this.buttons.num8 = new NumberButton(element, new Value(8));
                    break;

                case "9":
                    this.buttons.num9 = new NumberButton(element, new Value(9));
                    break;

                default:
                    throw new Error(
                        `未実装なボタンが検出されました : .actionButton(${value})`
                    );
            }
        });
    }
}
