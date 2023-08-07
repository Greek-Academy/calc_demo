import { Controller } from "./controller";
import { EquationModel } from "./model/equation-model";
import { Display } from "./view/display";
import { NumPad } from "./view/num-pad";

// [numPad] → [controller]に依存
// [controler] -> [equation] に依存
// [equation] -> [display] に依存
const display = new Display(
  document.getElementById('display') as HTMLInputElement,
);
const equation = new EquationModel(display);
const controller = new Controller(equation);

const numPad = new NumPad(controller);