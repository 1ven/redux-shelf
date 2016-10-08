const apis = {
  fetchTodos: {
    url: '/api/todos',
    method: 'get',
    schema: TODOS_ARRAY,
    statePath: 'data.todos',
    shouldCreateSaga: true, // default
  },
};

interface IShelfApi {
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  schema?: any,
  statePath?: string,
  shouldCreateSaga?: boolean,
}
