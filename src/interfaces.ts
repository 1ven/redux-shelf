export interface IAnyObject {
  [key: string]: any,
}

export interface IAction {
  type: IActionType,
  payload?: any,
}

export type IActionPayload = IAnyObject;

export type IActionType = string;

export type IRequestURL = string | () => string;

export type IRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
