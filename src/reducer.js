// reducer.js
import update from 'immutability-helper';
import {SET_USER, SET_BAND, UNSET_BAND, SET_EVENT, UNSET_EVENT, SET_DONE_MAPPING, SET_DONE_MAKING_CALENDAR, SET_CALENDAR_EVENTS, SET_NEW, UNSET_NEW} from "./actions";

const initialState = {
    token: null,
    userId: null,
    bandsId: null,
    eventId: null,
    doneMapping: false,
    doneMakingCalendarEvents: false,
    calendarEvents: [],
    displayNew: false
}

// need setUserSession({userId: user_id, token: token}), this.props.setEventInfo();
const reducer = function(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return update(state, {
              userId: action.payload
            })
        case SET_BAND:
            return update(state, {
              bandsId: { $set: action.payload }
            })
        case UNSET_BAND:
            return update(state, {
              bandsId: null
            })
        case SET_EVENT:
            return update(state, {
              eventId: { $set: action.payload }
            })
        case UNSET_EVENT:
            return update(state, {
              eventId: null
            })
        case SET_DONE_MAPPING:
            return update(state, {
              doneMapping: true
            })
        case SET_DONE_MAKING_CALENDAR:
            return update(state, {
              doneMakingCalendarEvents: true
            })
        // case TOGGLE_TODO:
        //     const idx = state.todos.findIndex((todo) =>
        //       todo.id === action.payload);
        //     return update(state, {
        //         todos: {
        //             [idx]: {
        //                 done: {
        //                     $apply: (done) => !done
        //                 }
        //             }
        //         }
        //     })
        // case FILTER_TODOS:
        //     return update(state, {
        //         filter: {
        //             $set: action.payload
        //         }
        //     })
        default:
            return state;
    }
}

export default reducer;
