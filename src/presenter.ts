import { Equation } from "./model";
import { Display } from "./view/display";
import { NumPad } from "./view/num-pad";

export class Presenter {
  
  readonly wrapOnClick = (...args: any[]) => this.onClick.apply(this, args);
  readonly wrapOnDisplay = (...args: any[]) => this.onDisplay.apply(this, args);

  readonly current: Equation = new Equation();
  
  private numPad = new NumPad();
  private display = new Display(document.getElementById('display') as HTMLInputElement);

  constructor() {
    this.initView();
  }

  private initView() {
    this.current.on('result', this.wrapOnDisplay);
    this.numPad.on('click', this.wrapOnClick);
    Object.freeze(this);
  }

  onDisplay(...args: any[]) {
    this.display.update(args[0]);
  }

  onClick(...args: any[]) {
    const buttonValue: string = args[0];

    switch(buttonValue) {
      case 'clear':
        this.current.clear();
        break;
      case 'add':
        this.current.add();
        break;
      case 'subtract':
        this.current.subtract();
        break;
        
      case 'multiply':
        this.current.multiply();
        break;
      case 'divide':
        this.current.divide();
        break;
      case 'equal':
        this.current.equal();
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
        this.current.append(buttonValue);
        break;
      
      default:
        throw new Error(`${buttonValue} が未対応です`)
    }

  }
}