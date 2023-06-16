import { Value } from "./parts/value.class";
import { DataBind } from "./data-bind.class";
import { ActionButton, NumberButton } from "./parts/button.class";
import { CustomCollection } from "./parts/custom-collection";
import {
    OperationHistory,
    OperationHistoryType,
} from "./parts/operation-history.interface";
import { ActionType, Action } from "./parts/action.class";

export class Application {
    private binding?: DataBind;
    private stack: CustomCollection<OperationHistory> = new CustomCollection();

    private _onNumberButtonClick: (value: Value) => void = (value) =>
        this.onNumberButtonClick(value);

    private _onActionButtonClick: (action: ActionType) => void = (action) =>
        this.onActionButtonClick(action);

    bind() {
        if (this.binding) return;

        this.binding = new DataBind();

        // 各ボタンと処理するロジックを関連付ける
        this.binding.buttons.forEach((_, element) => {
            if (!element) {
                return;
            }
            switch (element.constructor) {
                case NumberButton:
                    (element as NumberButton).setOnClick(
                        this._onNumberButtonClick
                    );
                    break;
                case ActionButton:
                    (element as ActionButton).setOnClick(
                        this._onActionButtonClick
                    );
                    break;
            }
        });
    }

    unbind() {
        if (!this.binding) return;
        this.binding.unbindAll();
        this.binding = undefined;
    }

    reset(initialValue: Value = Value.ZERO) {
        this.stack.clear();
        this.stack.push(initialValue);

        this.updateOutput(this.calculateTotal());
    }

    private updateOutput(value: Value) {
        this.binding?.display?.setValue(value);
    }

    private calculate(valueA: Value, action: Action, valueB: Value): Value {
        switch (action.value) {
            case ActionType.ADD:
                return valueA.add(valueB);

            case ActionType.SUBTRACT:
                return valueA.subtract(valueB);

            case ActionType.MULTIPLE:
                return valueA.multiple(valueB);

            case ActionType.DIVIDE:
                if (valueB.isZero()) {
                    return new Value(0);
                } else {
                    return valueA.divide(valueB);
                }

            default:
                console.log(action);
                throw new Error(`不正なActionが指定されました: ${action}`);
        }
    }

    private calculateTotal(): Value {
        const history = this.stack.toArray();
        if (history.length === 0) {
            return Value.ZERO;
        }

        if (!(history[0] instanceof Value)) {
            throw new Error(
                `不正なOperationHistoryが、historyの最初に含まれています: ${history[0]}`
            );
        }

        let total: Value = history.shift() as Value;

        while (history.length > 0) {
            const oneStep = history.shift()!;

            switch (oneStep.type) {
                case OperationHistoryType.ACTION:
                    if (history.length === 0) {
                        break;
                    }

                    const otherValue = history.shift() as Value;
                    total = this.calculate(
                        total,
                        oneStep as Action,
                        otherValue
                    );
                    break;

                default:
                    // Do nothing
                    break;
            }
        }

        return total;
    }

    private onActionButtonClick(action: ActionType) {
        if (this.stack.isEmpty()) {
            return;
        }

        // Remove the last action operation.
        if (this.stack.peek()! instanceof Action) {
            this.stack.pop();
        }

        switch (action) {
            case ActionType.EQUAL:
                this.reset(this.calculateTotal());
                break;

            case ActionType.ADD:
                this.stack.push(new Action(ActionType.ADD));
                break;

            case ActionType.SUBTRACT:
                this.stack.push(new Action(ActionType.SUBTRACT));
                break;

            case ActionType.MULTIPLE:
                this.stack.push(new Action(ActionType.MULTIPLE));
                break;

            case ActionType.DIVIDE:
                this.stack.push(new Action(ActionType.DIVIDE));
                break;

            case ActionType.CLEAR:
                this.reset();
                break;

            default:
                // Do nothing
                return;
        }
    }

    private onNumberButtonClick(value: Value) {
        if (this.stack.isEmpty()) {
            this.reset(value);
            return;
        }

        switch (this.stack.peek()!.type) {
            case OperationHistoryType.ACTION:
                this.stack.push(value);
                this.updateOutput(this.stack.peek()! as Value);

                break;

            case OperationHistoryType.VALUE:
                this.stack.push((this.stack.pop()! as Value).append(value));
                this.updateOutput(this.stack.peek()! as Value);
                break;
        }
    }
}
