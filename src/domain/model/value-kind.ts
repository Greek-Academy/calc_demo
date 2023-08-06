export enum ValueKind {
    NUMBER = "number",
    ACTION = "action",
}

export interface IValue<T> {
    get kind(): ValueKind;
    get value(): T;
}
