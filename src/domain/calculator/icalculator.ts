import { CustomCollection } from "../../infrastructure/custom-collection";
import { IButtonValue } from "../../interface-adapter/ui/pad-button";
import { INumberValue } from "../model/number-value";

export interface ICalculator {
    calculate(equation: CustomCollection<IButtonValue>): INumberValue;
}