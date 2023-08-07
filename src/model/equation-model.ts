type properties = 'lhs' | 'rhs';
enum CalcMode {
  NONE,
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  NEED_RESET_IF_APPEND,
}

export interface IEquationModel {
  add(): void;
  append(digit: string): void;
  subtract(): void;
  multiply(): void;
  divide(): void;
  clear(): void;
  equal(): void;
}

export class EquationModel implements IEquationModel {

  private values: Record<properties, number> = {
    lhs: 0,
    rhs: 0,
  };
  private mode: CalcMode = CalcMode.NONE;

  constructor(
    private onChanged: (message: string) => void,
  ) {}

  clear() {
    this.values.lhs = 0;
    this.values.rhs = 0;
    this.mode = CalcMode.NONE;

    this.update(0);
  }

  append(digit: string) {
    if (!/^[0-9]$/.test(digit)) {
      throw new Error('append()には 0-9の半角数字のみ与えます');
    }

    const d = parseInt(digit);

    switch (this.mode) {
      case CalcMode.NEED_RESET_IF_APPEND:
        this.values.lhs = d;
        this.update(this.values.lhs);
        this.mode = CalcMode.NONE;
        break;

      case CalcMode.NONE:
        this.values.lhs = this.values.lhs * 10 + d;
        this.update(this.values.lhs);
        break;
      
      default:
        this.values.rhs = this.values.rhs * 10 + d;
        this.update(this.values.rhs);
        break;
    }
  }

  add() {
    this.calculate();
    this.mode = CalcMode.ADD;
  }

  subtract() {
    this.calculate();
    this.mode = CalcMode.SUBTRACT;
  }

  multiply() {
    this.calculate();
    this.mode = CalcMode.MULTIPLY;
  }

  divide() {
    this.calculate();
    this.mode = CalcMode.DIVIDE;
  }

  private calculate() {
    switch(this.mode) {
      case CalcMode.ADD:
        this.values.lhs += this.values.rhs;
        this.values.rhs = 0;
        this.update(this.values.lhs);
        this.mode = CalcMode.NONE;
        break;
        
      case CalcMode.SUBTRACT:
        this.values.lhs -= this.values.rhs;
        this.values.rhs = 0;
        this.update(this.values.lhs);
        this.mode = CalcMode.NONE;
        break;
        
      case CalcMode.MULTIPLY:
        this.values.lhs *= this.values.rhs;
        this.values.rhs = 0;
        this.update(this.values.lhs);
        this.mode = CalcMode.NONE;
        break;
          
      case CalcMode.DIVIDE:
        if (this.values.rhs === 0) {
          this.update('0除算エラー');
          return;
        }

        this.values.lhs /= this.values.rhs;
        this.values.rhs = 0;
        this.update(this.values.lhs);
        this.mode = CalcMode.NONE;
        break;
      
      case CalcMode.NONE:
        this.update(this.values.lhs);
        break;

      case CalcMode.NEED_RESET_IF_APPEND:
        // Do nothing here.
        break;
      
      default:
        throw new Error(`実装されていないモードが指定されました: ${this.mode}`);
    }
  }

  equal() {
    this.calculate();
    this.mode = CalcMode.NEED_RESET_IF_APPEND;
  }

  private update(message: number | string) {
    // Equationモデルから、'onDisplayUpdate' を呼び出すということ。
    // そこから先はどうなっているのかが分からない。
    this.onChanged(message.toString());
  }
}
