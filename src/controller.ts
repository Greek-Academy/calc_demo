import { EquationModel } from "./model/equation-model";
export class Controller {
 
  constructor(
    private equation: EquationModel,
  ) {}
  
  // numPad (view) から onClick が呼び出されたら、
  // equation (model) にルーティングする
  onClick(...args: any[]) {
    const buttonValue: string = args[0];

    switch(buttonValue) {
      case 'clear':
        this.equation.clear();
        break;
      case 'add':
        this.equation.add();
        break;
      case 'subtract':
        this.equation.subtract();
        break;
        
      case 'multiply':
        this.equation.multiply();
        break;
      case 'divide':
        this.equation.divide();
        break;
      case 'equal':
        this.equation.equal();
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.equation.append(buttonValue);
        break;
      
      default:
        throw new Error(`${buttonValue} が未対応です`)
    }

  }
}