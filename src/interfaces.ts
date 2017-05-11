export interface IAnyObject {
  [key: string]: any,
}

export interface IAction {
  type: IActionType,
  payload?: IActionPayload,
}

export interface IRequestAction extends IAction {
  payload?: {
    requestParams?: IAnyObject,
    requestData?: IAnyObject,
  },
}

export interface ISuccessAction extends IAction {
  payload: {
    result: IAnyObject,
    receivedAt: number,
    entities?: IAnyObject,
  },
}

export interface IFailureAction extends IAction {
  payload: {
    message: string,
  },
}

export interface IAsyncActions {
  request: IRequestAction,
  success: ISuccessAction,
  failure: IFailureAction,
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
  shouldCreateSaga?: boolean,
  call?: (payload) => Promise<any>,
  state?: {
    path: string,
    responseMap?: (response: any) => any,
  },
  // it should be not here :)
  settings?: {
    apiRoot?: string,
  },
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

export type IRequestURL = () => string | string;

export type ICallApi = (
  url: IRequestURL,
  method: IRequestMethod,
  schema?: Normalizr.SchemaType,
  data?: IAnyObject
) => Promise<IApiData>;

export type ICallApiWrapper = (payload: IActionPayload) => Promise<IApiData>;
/* export type ICallApiWrapper = (payload: IActionPayload) => ICallApi(); */

export type IRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
