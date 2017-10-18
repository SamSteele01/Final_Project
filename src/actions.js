// actions.js

// need to set userId, bandId, eventId, calendarEvents, doneMapping, doneMakingCalendarEvents
// unset band and event Ids
// could stash "new" in eventId, or have a seperate variable
export const CREATE_TODO = 'CREATE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const FILTER_TODOS = 'FILTER_TODOS';

const makeActionCreator = function (actionType) {
  return function (payload) {
    return {
      type: actionType,
      payload: payload
    }
  }
}

export const createTodo = makeActionCreator(CREATE_TODO);
export const toggleTodo = makeActionCreator(TOGGLE_TODO);
export const filterTodos = makeActionCreator(FILTER_TODOS);
