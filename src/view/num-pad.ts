import { Controller } from "../controller";

export class NumPad {

  private wrapOnClick = (event: Event) => this.onButtonClick(event);

  constructor(
    private controller: Controller,
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
      button.addEventListener('click', this.wrapOnClick);
    });
  }

  private onButtonClick(event: Event) {
    // Controller側の onClick() を呼び出す
    const buttonValue = (event.target as HTMLButtonElement).value as String;
    this.controller.onClick(buttonValue);
  }
}