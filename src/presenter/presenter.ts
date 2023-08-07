import { EquationModel } from "../model/equation-model";
import { IDisplay } from "../view/display";

export interface IPresenter {
  onClick(buttonValue: string);

  updateDisplay(message: string);

}

export class Presenter implements IPresenter {

  private wrap: Record<string, (...args: any[])=> void> = {
    updateDisplay : (...args: any[]) => this.updateDisplay.apply(this, args),
  }
  
  constructor(
    private display: IDisplay,
    private equation: EquationModel,
  ) {

    // EquationModel から update イベントが発生したら、
    // updateDisplay() を呼び出す。
    this.equation.on('update', this.wrap.updateDisplay);

  }


  updateDisplay(message: string) {
    // Presenter から、IDisplay.update() を呼び出す。
    // ここで重要なのが、Displayクラスではない、ということ。
    this.display.update(message);
  }

  onClick(buttonValue: string) {

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