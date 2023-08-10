import {
  ActionType,
  ActionValue,
  CustomCollection,
  IActionValue,
  ICalculator,
  INumberValue,
  NumberValue,
  ValueKind,
} from '../../domain';
import { IButtonValue } from '../../usecase/';
import { MainViewDataBind } from './mainview-databind';

enum MainViewStatus {
  ALIVE,
  DESTROYED,
}

export interface IMainViewViewModel {
  // start() と destroy() メソッドを必ず実装する
  start(): void;
  destroy(): void;
}

export class MainViewViewModel implements IMainViewViewModel {
  private appStatus: MainViewStatus = MainViewStatus.ALIVE;

  // JavaScript特有の理由で、this をキープするために関数をラップする必要がある
  private wrapOnButtonClick: (value: IButtonValue) => void = value =>
    this.onButtonClick(value);

  constructor(
    // HTML側を抽象化したレイヤー
    private bind: MainViewDataBind,

    // どのボタンが押されたかを保持する
    private equation: CustomCollection<IButtonValue>,

    // 計算処理のロジックを担当する部分
    private calculator: ICalculator
  ) {
    this.equation.clear();
    this.equation.push(NumberValue.ZERO);
  }

  // このアプリケーションのインスタンスが破棄されていないかをチェック
  private assertAppIsAlive() {
    if (this.appStatus === MainViewStatus.DESTROYED) {
      throw new Error('このアプリケーションインスタンスは既に破棄されています');
    }
  }

  // アプリケーションを開始
  start() {
    this.assertAppIsAlive();

    // 各ボタンと処理するロジックを関連付ける
    this.bind.buttonNames.forEach(buttonName => {
      const padButton = this.bind.buttons[buttonName];
      padButton.onclick = this.wrapOnButtonClick;
    });
  }

  destroy() {
    this.assertAppIsAlive();

    // UI側と抽象化レイヤーの関連付けを解除する
    this.bind.unbindAll();

    // このインスタンスが終了したことを示すフラグを立てる
    this.appStatus = MainViewStatus.DESTROYED;
  }

  // 計算結果をクリアする
  private resetCalculation(initialValue: IButtonValue = NumberValue.ZERO) {
    this.equation.clear();
    this.equation.push(initialValue);
    this.equation.push(new ActionValue(
      ActionType.EQUAL,
    ));

    this.updateOutput(initialValue);
  }

  private updateOutput(value: IButtonValue) {
    this.bind.display.setValue(value);
  }

  // ボタンが押されたときの処理
  private onButtonClick(buttonValue: IButtonValue) {

    // 前回の操作が [=]ボタン で、今回の操作が [数字]ボタンの場合、
    // 新しい数字からスタートする
    if (!this.equation.isEmpty()) {
      const last = this.equation.peek()!;
      if (
        (last.value as ActionType === ActionType.EQUAL)  &&
        (buttonValue.kind === ValueKind.NUMBER)
      ) {
        this.equation.clear();
        this.equation.push(buttonValue);
        this.updateOutput(this.equation.peek() as INumberValue);
        return;
      }
    }

    // 前回の操作が [数字]ボタン 以外なら、排除する
    while (
      !this.equation.isEmpty() &&
      this.equation.peek()?.kind === ValueKind.ACTION
    ) {
      this.equation.pop();
    }
    
    // もし式が空になったら、0 を入れる
    if (this.equation.isEmpty()) {
      this.equation.push(NumberValue.ZERO);
    }

    // 今回の操作が [数字]ボタン なら、最後の数字に追加する
    if (buttonValue.kind === ValueKind.NUMBER) {

      const leftHandValue = this.equation.pop() as INumberValue;
      this.equation.push(leftHandValue.append(buttonValue as INumberValue));
      this.updateOutput(this.equation.peek() as INumberValue);
      return;
    }

    // 今回の操作が [演算子] or [操作]ボタンの場合の処理
    switch (buttonValue.value) {
      case ActionType.ADD:
      case ActionType.SUBTRACT:
      case ActionType.MULTIPLY:
      case ActionType.DIVIDE: {
        this.equation.push(buttonValue);
        this.equation.push(NumberValue.ZERO);
        this.updateOutput(this.equation.peek() as IActionValue);
        break;
      }

      case ActionType.EQUAL: {
        const total = this.calculator.calculate(this.equation);
        this.resetCalculation(total);
        break;
      }

      case ActionType.CLEAR: {
        this.resetCalculation();
        break;
      }

      default:
        throw new Error('不明なボタンが押されました');
    }
  }
}
