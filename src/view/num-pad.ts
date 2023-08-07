import { IPresenter } from "../presenter/presenter";

export interface INumPad {

}
export class NumPad  {

  private wrap: Record<string, (event: Event) => void> = {
    buttonClick: (event: Event) => this.onButtonClickHandler(event),
  };

  constructor(
    private presenter: IPresenter,
    private onButtonClick: (buttonValue: string) => void,
  ) {
    this.registeButtons('numberBtn');
    this.registeButtons('actionBtn');
  }

  private registeButtons(cssClassName: string) {
    const buttons: Element[] = Array.from(
      document.getElementsByClassName(cssClassName),
    );

    buttons.forEach((button: Element) => {
      if (!(button instanceof HTMLButtonElement)) {
        throw new Error(`ボタンではない要素に .${cssClassName} が割り当ています。`);
      }
      button.addEventListener('click', this.wrap.buttonClick);
    });
  }

  private onButtonClickHandler(event: Event) {
    // Viewである NumPadからは、IPresenter.onClick() を呼び出す。
    // ここでポイントなのは、Presenterクラスではない、ということ。
    const buttonValue = (event.target as HTMLButtonElement).value as string;
    this.presenter.onClick(buttonValue);
  }
}