export interface IAnyObject {
  [key: string]: any,
}

export type IRequestURL = string | () => string;

export type IRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
