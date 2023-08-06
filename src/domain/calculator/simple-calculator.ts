import { CustomCollection } from "../../infrastructure/custom-collection";
import { IButtonValue } from "../../interface-adapter/ui/pad-button";
import { ActionType, ActionValue } from "../model/action-value";
import { INumberValue, NumberValue } from "../model/number-value";
import { ValueKind } from "../model/value-kind";
import { ICalculator } from "./icalculator";

export class SimpleCalculator implements ICalculator {

  
  private evaluate(
    leftHandSide: INumberValue,
    action: ActionType,
    rightHandSide: INumberValue,
  ): INumberValue {
    switch (action) {
        case ActionType.ADD:
            return leftHandSide.add(rightHandSide);

        case ActionType.SUBTRACT:
            return leftHandSide.subtract(rightHandSide);

        case ActionType.MULTIPLY:
            return leftHandSide.multiply(rightHandSide);

        case ActionType.DIVIDE:
            if (rightHandSide.isZero()) {
                return NumberValue.ZERO;
            } else {
                return leftHandSide.divide(rightHandSide);
            }

        default:
            throw new Error(`不正なActionが指定されました: ${action}`);
    }
  }

  calculate(equation: CustomCollection<IButtonValue>): INumberValue {
    if (equation.length === 0) {
        return NumberValue.ZERO;
    }

    // 計算の初期値を取得
    if (equation.getAt(0).kind !== ValueKind.NUMBER) {
      throw new Error('計算式の最初の値は INumberValue でなければなりません');
    }
    let leftHandSide: INumberValue = equation.getAt(0) as INumberValue;

    for (let i = 1; i < equation.length; i++) {
        const value = equation.getAt(i);
        switch (value.kind) {
          case ValueKind.ACTION:
            if (i + 1 === equation.length) {
              break;
            }
            if (equation.getAt(i + 1).kind !== ValueKind.NUMBER) {
              throw new Error('不正な書式です');
            }

            const rightHandSide = equation.getAt(i + 1);
            leftHandSide = this.evaluate(
                leftHandSide,
                (value as ActionValue).value,
                rightHandSide as INumberValue,
            );
            break;
          
          case ValueKind.NUMBER:
            // Do nothing here
            break;
          
          default:
            throw new Error(`未対応なkindが指定されました : ${value.kind}`);
        }
    }
    return leftHandSide;
  }

}