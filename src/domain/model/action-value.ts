import { IValue, ValueKind } from './value-kind';

export enum ActionType {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '×',
  DIVIDE = '÷',
  CLEAR = 'clear',
  EQUAL = 'equal',
}

export interface IActionValue extends IValue<ActionType> {
  get kind(): ValueKind;
  clone(): IActionValue;
  toString(): string;
}

export class ActionValue implements IActionValue {
  get kind(): ValueKind {
    return ValueKind.ACTION;
  }

  constructor(public readonly value: ActionType) {
    Object.freeze(this);
  }
  clone(): IActionValue {
    return new ActionValue(this.value);
  }
  toString(): string {
    return this.value.toString();
  }
}
