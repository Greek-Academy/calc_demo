import { EquationModel } from "../model/equation-model";
import { DataBind } from "../view";

export class ViewModel {
  constructor(
    private equation: EquationModel,
    private binder: DataBind,
  ) {
    Object.freeze(this);
    
    this.setupView();
  }



  private setupView() {
    this.equation.onChange = (message: string) => {
      this.binder.display.value = message;
    }
    this.binder.add.onClick = this.equation.add.bind(this.equation);
    this.binder.subtract.onClick = this.equation.subtract.bind(this.equation);
    this.binder.multiply.onClick = this.equation.multiply.bind(this.equation);
    this.binder.divide.onClick = this.equation.divide.bind(this.equation);
    this.binder.clear.onClick = this.equation.clear.bind(this.equation);
    this.binder.equal.onClick = this.equation.equal.bind(this.equation);
    this.binder.one.onClick = this.equation.append.bind(this.equation);
    this.binder.two.onClick = this.equation.append.bind(this.equation);
    this.binder.three.onClick = this.equation.append.bind(this.equation);
    this.binder.four.onClick = this.equation.append.bind(this.equation);
    this.binder.five.onClick = this.equation.append.bind(this.equation);
    this.binder.six.onClick = this.equation.append.bind(this.equation);
    this.binder.seven.onClick = this.equation.append.bind(this.equation);
    this.binder.eight.onClick = this.equation.append.bind(this.equation);
    this.binder.nine.onClick = this.equation.append.bind(this.equation);
  }
}