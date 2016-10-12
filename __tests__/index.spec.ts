import { handleReducers, handleActions, handleConstants, handleSagas } from '../src';

describe('handleReducers', () => {
  it('should return reducers tree by given input object', () => {
    const apis = {
      fetchTodos: {
        reducer: 'todosReducer',
        config: {
          statePath: 'data.todos',
        },
      },
      fetchUsers: {
        reducer: 'usersReducer',
        config: {
          statePath: 'data.users',
        },
      },
      fetchRecentArticles: {
        reducer: 'recentArticles',
        config: {
          statePath: 'data.articles.recent',
        },
      },
      fetchPopularArticles: {
        reducer: 'popularArticles',
        config: {
          statePath: 'data.articles.popular',
        },
      },
      fetchNotifications: {
        reducer: 'notificationsReducer',
        config: {
          statePath: 'notifications',
        },
      },
      fetchIndexPage: {
        reducer: 'indexPageReducer',
        config: {},
      },
    };
    expect(handleReducers(apis)).toEqual({
      data: {
        articles: {
          recent: 'recentArticles',
          popular: 'popularArticles',
        },
        users: 'usersReducer',
        todos: 'todosReducer',
      },
      notifications: 'notificationsReducer',
    });
  });
});

describe('handleActions', () => {
  it('should return actions creators object', () => {
    const apis = {
      fetchTodos: {
        actionsCreators: 'fetchTodosActionsCreators',
      },
      fetchArticles: {
        actionsCreators: 'fetchArticlesActionsCreators',
      },
    };
    expect(handleActions(apis)).toEqual({
      fetchTodos: 'fetchTodosActionsCreators',
      fetchArticles: 'fetchArticlesActionsCreators',
    });
  });
});

describe('handleConstants', () => {
  it('should return constants object', () => {
    const apis = {
      fetchTodos: {
        constants: [
          'FETCH_TODOS_REQUEST',
          'FETCH_TODOS_SUCCESS',
          'FETCH_TODOS_FAILURE',
        ],
      },
      fetchArticles: {
        constants: [
          'FETCH_ARTICLES_REQUEST',
          'FETCH_ARTICLES_SUCCESS',
          'FETCH_ARTICLES_FAILURE',
        ],
      },
      fetchRepos: {
        constants: [
          'FETCH_REPOS_REQUEST',
          'FETCH_REPOS_SUCCESS',
          'FETCH_REPOS_FAILURE',
        ],
      },
    };
    expect(handleConstants(apis)).toEqual({
      FETCH_TODOS_REQUEST: 'FETCH_TODOS_REQUEST',
      FETCH_TODOS_SUCCESS: 'FETCH_TODOS_SUCCESS',
      FETCH_TODOS_FAILURE: 'FETCH_TODOS_FAILURE',
      FETCH_ARTICLES_REQUEST: 'FETCH_ARTICLES_REQUEST',
      FETCH_ARTICLES_SUCCESS: 'FETCH_ARTICLES_SUCCESS',
      FETCH_ARTICLES_FAILURE: 'FETCH_ARTICLES_FAILURE',
      FETCH_REPOS_REQUEST: 'FETCH_REPOS_REQUEST',
      FETCH_REPOS_SUCCESS: 'FETCH_REPOS_SUCCESS',
      FETCH_REPOS_FAILURE: 'FETCH_REPOS_FAILURE',
    });
  });
});

describe('handleSagas', () => {
  it('should create sagas array', () => {
    const apis = {
      fetchTodos: {
        saga: {
          watcher: () => 'fetchTodosSagaWatcher',
        },
        config: {
          shouldCreateSaga: true,
        },
      },
      fetchArticles: {
        saga: {
          watcher: () => 'fetchArticlesSagaWatcher',
        },
        config: {
          shouldCreateSaga: true,
        },
      },
      fetchRepos: {
        saga: {
          watcher: () => 'fetchReposSagaWatcher',
        },
        config: {
          shouldCreateSaga: true,
        },
      },
    };
    expect(handleSagas(apis)).toEqual([
      'fetchTodosSagaWatcher',
      'fetchArticlesSagaWatcher',
      'fetchReposSagaWatcher',
    ]);
  });
});
