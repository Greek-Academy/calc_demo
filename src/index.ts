import { EquationModel } from "./model/equation-model";
import { DataBind } from "./view";
import { ViewModel } from "./viewModel/viewModel";

const equation = new EquationModel();
const binder = new DataBind();

new ViewModel(
  equation,
  binder,
);


