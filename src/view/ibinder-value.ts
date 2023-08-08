export enum BinderValueKind {
  INPUT_FIELD,
  BUTTON,
};
export interface IBinderValue {
  get kind(): BinderValueKind,
}