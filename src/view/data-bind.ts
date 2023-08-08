import { ButtonBinder } from "./button-binder";
import { InputFieldBinder } from "./input-field-binder";

interface IDataBind {
  display: InputFieldBinder,
  zero: ButtonBinder<number>;
  one: ButtonBinder<number>;
  two: ButtonBinder<number>;
  three: ButtonBinder<number>;
  four: ButtonBinder<number>;
  five: ButtonBinder<number>;
  six: ButtonBinder<number>;
  seven: ButtonBinder<number>;
  eight: ButtonBinder<number>;
  nine: ButtonBinder<number>;
  clear: ButtonBinder<string>;
  equal: ButtonBinder<string>;
  add: ButtonBinder<string>;
  subtract: ButtonBinder<string>;
  multiply: ButtonBinder<string>;
  divide: ButtonBinder<string>;
};

export class DataBind implements IDataBind {
  public readonly zero = new ButtonBinder(
    document.getElementById('zero') as HTMLButtonElement,
    0,
  );
  
  public readonly one = new ButtonBinder(
    document.getElementById('one') as HTMLButtonElement,
    1,
  );

  public readonly two = new ButtonBinder(
    document.getElementById('two') as HTMLButtonElement,
    2,
  );

  public readonly three = new ButtonBinder(
    document.getElementById('three') as HTMLButtonElement,
    3,
  );

  public readonly four = new ButtonBinder(
    document.getElementById('four') as HTMLButtonElement,
    4,
  );
  
  public readonly five = new ButtonBinder(
    document.getElementById('five') as HTMLButtonElement,
    5,
  );

  public readonly six = new ButtonBinder(
    document.getElementById('six') as HTMLButtonElement,
    6,
  );

  public readonly seven = new ButtonBinder(
    document.getElementById('seven') as HTMLButtonElement,
    7,
  );

  public readonly eight = new ButtonBinder(
    document.getElementById('eight') as HTMLButtonElement,
    8,
  );

  public readonly nine = new ButtonBinder(
    document.getElementById('nine') as HTMLButtonElement,
    9,
  );
  
  public readonly clear = new ButtonBinder(
    document.getElementById('clear') as HTMLButtonElement,
    'clear',
  );
  
  public readonly add = new ButtonBinder(
    document.getElementById('add') as HTMLButtonElement,
    'add',
  );
  
  public readonly subtract = new ButtonBinder(
    document.getElementById('subtract') as HTMLButtonElement,
    'subtract',
  );
  
  public readonly multiply = new ButtonBinder(
    document.getElementById('multiply') as HTMLButtonElement,
    'multiply',
  );
  
  public readonly divide = new ButtonBinder(
    document.getElementById('divide') as HTMLButtonElement,
    'divide',
  );
  
  public readonly equal = new ButtonBinder(
    document.getElementById('equal') as HTMLButtonElement,
    'equal',
  );

  public readonly display = new InputFieldBinder(
    document.getElementById('display') as HTMLInputElement,
    '',
  );

  constructor() {
    Object.freeze(this);
  }
}