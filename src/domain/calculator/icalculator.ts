import { CustomCollection } from './custom-collection';
import { INumberValue, IActionValue } from '../model';

export interface ICalculator {
  calculate(
    equation: CustomCollection<INumberValue | IActionValue>
  ): INumberValue;
}
