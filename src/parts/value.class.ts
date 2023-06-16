import {
    OperationHistory,
    OperationHistoryType,
} from "./operation-history.interface";

export class Value implements OperationHistory {
    static readonly ZERO: Value = new Value(0);

    constructor(public readonly value: number) {}

    public get type() {
        return OperationHistoryType.VALUE;
    }

    get length(): number {
        return this.toString().length;
    }

    isZero(): Boolean {
        return this.value === 0;
    }

    append(other: Value): Value {
        return new Value(this.value * Math.pow(10, other.length) + other.value);
    }

    add(other: Value): Value {
        return new Value(this.value + other.value);
    }

    subtract(other: Value): Value {
        return new Value(this.value - other.value);
    }

    multiple(other: Value): Value {
        return new Value(this.value * other.value);
    }

    divide(other: Value): Value {
        if (other.isZero()) {
            throw new Error("Can not divide by zero");
        }
        return new Value(this.value / other.value);
    }

    toString(): string {
        return this.value.toString();
    }

    clone(): Value {
        return new Value(this.value);
    }
}
