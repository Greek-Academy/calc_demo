import { IActionValue } from '../../domain/model/action-value';
import { INumberValue } from '../../domain/model/number-value';

export type IButtonValue = INumberValue | IActionValue;
export type ButtonListener = (value: IButtonValue) => void;

export interface IButton {
  value: IButtonValue;

  set onclick(listener: ButtonListener);

  bind: (element: HTMLElement) => void;

  unbind: () => void;
}

export enum PadButtonName {
  ZERO = 'zero',
  ONE = 'one',
  TWO = 'two',
  THREE = 'three',
  FOUR = 'four',
  FIVE = 'five',
  SIX = 'six',
  SEVEN = 'seven',
  EIGHT = 'eight',
  NINE = 'nine',
  ADD = 'add',
  SUBTRACT = 'subtract',
  MULTIPLY = 'multiply',
  DIVIDE = 'divide',
  EQUAL = 'equal',
  CLEAR = 'clear',
}

export class PadButton implements IButton {
  private clickListener?: ButtonListener;
  private element?: HTMLElement;

  private wrapOnClickListener: () => void = () => this.onClick();

  constructor(public readonly value: IButtonValue) {}

  private onClick() {
    if (!this.clickListener) {
      return;
    }
    this.clickListener(this.value);
  }

  set onclick(listener: ButtonListener) {
    this.clickListener = listener;
  }

  bind(element: HTMLElement) {
    this.element = element;
    this.element.addEventListener('click', this.wrapOnClickListener);
  }

  unbind() {
    this.element?.removeEventListener('click', this.wrapOnClickListener);
    this.element = undefined;
    this.clickListener = undefined;
  }
}
