import { IValue, ValueKind } from './value-kind';

export interface INumberValue extends IValue<number> {
  get length(): number;
  isZero(): boolean;
  append(other: INumberValue): INumberValue;
  add(other: INumberValue): INumberValue;
  subtract(other: INumberValue): INumberValue;
  multiply(other: INumberValue): INumberValue;
  divide(other: INumberValue): INumberValue;
  clone(): INumberValue;
  toString(): string;
}

export class NumberValue implements INumberValue {
  static readonly ZERO = new NumberValue(0);

  get kind(): ValueKind {
    return ValueKind.NUMBER;
  }

  constructor(public readonly value: number) {
    Object.freeze(this);
  }
  get length(): number {
    return this.toString().length;
  }
  isZero(): boolean {
    return this.value === 0;
  }
  append(other: INumberValue): INumberValue {
    return new NumberValue(
      this.value * Math.pow(10, other.length) + other.value
    );
  }
  add(other: INumberValue): INumberValue {
    return new NumberValue(this.value + other.value);
  }
  subtract(other: INumberValue): INumberValue {
    return new NumberValue(this.value - other.value);
  }
  multiply(other: INumberValue): INumberValue {
    return new NumberValue(this.value * other.value);
  }
  divide(other: INumberValue): INumberValue {
    if (other.isZero()) {
      throw new Error('0除算エラー');
    }
    return new NumberValue(this.value / other.value);
  }
  clone(): INumberValue {
    return new NumberValue(this.value);
  }
  toString(): string {
    return this.value.toString();
  }
}
