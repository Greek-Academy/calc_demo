export class Display {
  
  constructor(
    private element: HTMLInputElement,
  ) {
    Object.freeze(this);
  }
  update(message: string) {
    this.element.value = message;
  } 
}