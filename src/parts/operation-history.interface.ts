export enum OperationHistoryType {
    VALUE = "value",
    ACTION = "action",
}

export interface OperationHistory {
    get type(): OperationHistoryType;
}
