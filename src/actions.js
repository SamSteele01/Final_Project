// actions.js

// need to set userId, bandId, eventId, calendarEvents, doneMapping, doneMakingCalendarEvents
// unset band and event Ids
// could stash "new" in eventId, or have a seperate variable

export const SET_USER = 'SET_USER';
export const SET_BAND = 'SET_BAND';
export const UNSET_BAND = 'UNSET_BAND';
export const SET_EVENT = 'SET_EVENT';
export const UNSET_EVENT = 'UNSET_EVENT';
export const USER_PROFILE = 'USER_PROFILE';
export const SET_DONE_MAPPING = 'SET_DONE_MAPPING';
export const SET_DONE_MAKING_CALENDAR = 'SET_DONE_MAKING_CALENDAR';
export const SET_CALENDAR_EVENTS = 'SET_CALENDAR_EVENTS';
export const SET_NEW = 'SET_NEW';
export const UNSET_NEW = 'UNSET_NEW';
// not sure: unsets could be toggles, or just sets called with null or false as the action payloads

const makeActionCreator = function (actionType) {
  return function (payload) {
    return {
      type: actionType,
      payload: payload
    }
  }
}

export const setUser = makeActionCreator(SET_USER);
export const setBand = makeActionCreator(SET_BAND);
export const unsetBand = makeActionCreator(UNSET_BAND);
export const setEvent = makeActionCreator(SET_EVENT);
export const unsetEvent = makeActionCreator(UNSET_EVENT);
export const userProfile = makeActionCreator(USER_PROFILE);
export const setDoneMapping = makeActionCreator(SET_DONE_MAPPING);
export const setDoneMakingCalendar = makeActionCreator(SET_DONE_MAKING_CALENDAR);
export const setCalendarEvents = makeActionCreator(SET_CALENDAR_EVENTS);
export const setNew = makeActionCreator(SET_NEW);
export const unsetNew = makeActionCreator(UNSET_NEW);
