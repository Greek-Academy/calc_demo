import {
    OperationHistory,
    OperationHistoryType,
} from "./operation-history.interface";

export enum ActionType {
    ADD = "add",
    SUBTRACT = "subtract",
    MULTIPLE = "multiple",
    DIVIDE = "divide",
    CLEAR = "clear",
    EQUAL = "equal",
}

export class Action implements OperationHistory {
    constructor(public readonly value: ActionType) {}

    public get type() {
        return OperationHistoryType.ACTION;
    }
}
