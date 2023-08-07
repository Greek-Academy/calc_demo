import { EquationModel } from "./model/equation-model";
import { Presenter } from "./presenter/presenter";
import { Display } from "./view/display";
import { NumPad } from "./view/num-pad";


const display = new Display(
  document.getElementById('display') as HTMLInputElement
);

const equation = new EquationModel();

const presenter = new Presenter(
  display,
  equation,
);

const numPad = new NumPad(
  presenter,
);