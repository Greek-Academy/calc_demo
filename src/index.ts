import { EquationModel } from "./model/equation-model";
import { IPresenter, Presenter } from "./presenter/presenter";
import { Display, IDisplay } from "./view/display";
import { INumPad, NumPad } from "./view/num-pad";


class App {
  
  presenter: IPresenter;
  display: IDisplay;
  equation: EquationModel;
  numPad: INumPad;

  wrap: Record<string, (...args: any[]) => void> = {
    equationUpdate: (...args) => this.onEquationChanged.apply(this, args),
  };

  constructor() {
    this.display = new Display(
      document.getElementById('display') as HTMLInputElement
    );

    // Equationモデルが変更されたら、
    // onEquationChanged() を呼び出す
    this.equation = new EquationModel(
      this.wrap.equationUpdate,
    );

    this.presenter = new Presenter(
      this.display,
      this.equation,
    );

    // [NumPad]のボタンが押されたら
    // IPresenter.onClick() を呼び出す
    this.numPad = new NumPad(
      this.presenter,
      this.presenter.onClick,
    );

  }

  onEquationChanged(message: string) {
    // IDisplay.update() を呼び出す
    this.display.update(message);
  }
}

new App();
