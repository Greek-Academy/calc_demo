import { BinderValueKind, IBinderValue } from "./ibinder-value";

export class InputFieldBinder implements IBinderValue {
  private valueProp: string = '';

  get kind() {
    return BinderValueKind.INPUT_FIELD;
  }

  constructor(
    private elementRef: HTMLInputElement,
    value: string,
  ) {

    this.elementRef.value = value;

    this.elementRef.addEventListener('change', () => {
      this.valueProp = elementRef.value;
    })
  }

  set value(newValue: string) {
    this.valueProp = newValue;
    this.elementRef.value = newValue;
  }

  get value(): string {
    return this.valueProp;
  }

}