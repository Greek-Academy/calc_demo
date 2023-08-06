import { CustomCollection } from "../../infrastructure/custom-collection";
import { ActionType, IActionValue } from "../model/action-value";
import { INumberValue, NumberValue } from "../model/number-value";
import { ValueKind } from "../model/value-kind";
import { DataBind } from "../../interface-adapter/ui/data-bind.class";
import { IButtonValue } from "../../interface-adapter/ui/pad-button";
import { ICalculator } from "../calculator/icalculator";

enum AppStatus {
    ALIVE,
    DESTROYED,
}

export interface IApplication {

    // start() と destroy() メソッドを必ず実装する
    start(): void;
    destroy(): void;
}
  
export class Application implements IApplication {
    private appStatus: AppStatus = AppStatus.ALIVE;

    // JavaScript特有の理由で、this をキープするために関数をラップする必要がある
    private wrapOnButtonClick: (value: IButtonValue) => void =
        (value) => this.onButtonClick(value);

    constructor(
        // HTML側を抽象化したレイヤー
        private bind: DataBind,

        // どのボタンが押されたかを保持する
        private equation: CustomCollection<IButtonValue>,

        // 計算処理のロジックを担当する部分
        private calculator: ICalculator,
    ) {
        this.equation.clear();
        this.equation.push(NumberValue.ZERO);
    }

    // このアプリケーションのインスタンスが破棄されていないかをチェック
    private assertAppIsAlive() {
        if (this.appStatus === AppStatus.DESTROYED) {
            throw new Error('このアプリケーションインスタンスは既に破棄されています')
        }
    }

    // アプリケーションを開始
    start() {
        this.assertAppIsAlive();

        // 各ボタンと処理するロジックを関連付ける
        this.bind.buttonNames.forEach((buttonName) => {
            const padButton = this.bind.buttons[buttonName];
            padButton.onclick = this.wrapOnButtonClick;
        });
    }

    destroy() {
        this.assertAppIsAlive();

        // UI側と抽象化レイヤーの関連付けを解除する
        this.bind.unbindAll();

        // このインスタンスが終了したことを示すフラグを立てる
        this.appStatus = AppStatus.DESTROYED;
    }

    // 計算結果をクリアする
    private resetCalculation(
        initialValue: IButtonValue = NumberValue.ZERO,
    ) {
        this.equation.clear();
        this.equation.push(initialValue);

        this.updateOutput(initialValue);
    }

    private updateOutput(value: IButtonValue) {
        this.bind.display.setValue(value);
    }

    // ボタンが押されたときの処理
    private onButtonClick(buttonValue: IButtonValue) {
        // もしinputHistoryの最後に ActionValueが入っていたら排除する
        while (
            !this.equation.isEmpty() && 
            this.equation.peek()?.kind === ValueKind.ACTION
        ) {
            this.equation.pop();
        }
        if (this.equation.isEmpty()) {
            return;
        }

        // 数字ボタンなら、inputHistoryに追加
        if (buttonValue.kind === ValueKind.NUMBER) {
            const leftHandValue = this.equation.pop() as INumberValue;
            this.equation.push(leftHandValue.append(buttonValue as INumberValue));
            this.updateOutput(this.equation.peek() as INumberValue)
            return;
        }

        // アクションボタンの場合
        switch (buttonValue.value) {

            case ActionType.ADD:
            case ActionType.SUBTRACT:
            case ActionType.MULTIPLY:
            case ActionType.DIVIDE:
                this.equation.push(buttonValue);
                this.equation.push(NumberValue.ZERO);
                this.updateOutput(this.equation.peek() as IActionValue);
                break;

            case ActionType.EQUAL:
                const total = this.calculator.calculate(
                    this.equation,
                );
                this.resetCalculation(total);
                break;

            case ActionType.CLEAR:
                this.resetCalculation();
                break;

            default:
                throw new Error("不明なボタンが押されました");
        }
    }
}
