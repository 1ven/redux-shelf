export interface IAnyObject {
  [key: string]: any,
}

export interface IAction {
  type: IActionType,
  payload?: IActionPayload,
}

export interface IAsyncActions {
  request: IAction,
  success: IAction,
  failure: IAction,
}

export interface IAsyncActionTypes {
  0: string,
  1: string,
  2: string,
}

export interface IApiConfigurationList {
  [key: IApiName]: IApiConfiguration,
}

export interface IApiConfiguration {
  url: IRequestURL,
  method: IRequestMethod,
  schema?: Normalizr.SchemaType,
  statePath?: string,
  responsePath?: string,
  shouldCreateSaga?: boolean,
}

export interface IShelfData {
  constants: IAsyncActionTypes,
  actions: IAsyncActions,
  reducer: Redux.Reducer<any>,
}

export interface IApiData {
  normalized?: {
    result: (string | number)[],
    entities: IAnyObject,
  },
  result?: IServerResponse,
  receivedAt: number,
}

export interface IShelfSaga {
  task: (requestAction: IAction) => Iterator<any>;
}

export type IApiName = string;

export type IActionPayload = IAnyObject;

export type IActionType = string;

export type IRequestURL = string | () => string;

export type ICallApi = (
  url: IRequestURL,
  method: IRequestMethod,
  schema?: Normalizr.SchemaType,
  data?: IAnyObject
) => Promise<IApiData>;

export type ICallApiWrapper = (payload: IActionPayload) => Promise<IApiData>;
/* export type ICallApiWrapper = (payload: IActionPayload) => ICallApi(); */

export type IRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
