import { CustomCollection, SimpleCalculator } from './domain';
import { MainViewDataBind, MainViewViewModel } from './interface-adapter';
import { IButtonValue } from './usecase';

const dataBind = new MainViewDataBind();
const equation = new CustomCollection<IButtonValue>();
const calculator = new SimpleCalculator();
const app = new MainViewViewModel(dataBind, equation, calculator);

window.addEventListener('load', () => {
  app.start();
});

window.addEventListener('unload', () => {
  app.destroy();
});
