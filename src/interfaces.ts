export interface IAnyObject {
  [key: string]: any,
}

export interface IAction {
  type: IActionType,
  payload?: any,
}

export interface IAsyncActionTypes {
  0: string,
  1: string,
  2: string,
}

export type IActionPayload = IAnyObject;

export type IActionType = string;

export type IRequestURL = string | () => string;

export type IRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
