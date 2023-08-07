export interface IDisplay {
  update(message: string);
}

export class Display implements IDisplay {
  
  constructor(
    private element: HTMLInputElement,
  ) {
    Object.freeze(this);
  }
  update(message: string) {
    this.element.value = message;
  } 
}