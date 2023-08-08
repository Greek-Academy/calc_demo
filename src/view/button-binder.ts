import { BinderValueKind, IBinderValue } from "./ibinder-value";

export type ButtonBinderListener<T> = (value: T) => void;

export class ButtonBinder<T> implements IBinderValue {
  private listener?: ButtonBinderListener<T>;

  get kind() {
    return BinderValueKind.BUTTON;
  }
  
  constructor(
    elementRef: HTMLButtonElement,
    value: T,
  ) {

    elementRef.addEventListener('click', () => {
      if (!this.listener) {
        return;
      }

      this.listener(value);
    })
  }

  set onClick(listener: ButtonBinderListener<T>) {
    this.listener = listener;
  }
}