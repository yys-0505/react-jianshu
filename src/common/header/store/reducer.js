import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  focused: false,
  entered: false,
  list: [],
  currPage: 1,
  pageSize: 10,
  totalPage: 0
});

const reducer = (state=defaultState, action) => {
  switch (action.type) {
    case constants.SEARCH_FOCUS:
      return state.set('focused', true);
    case constants.SEARCH_BLUR:
      return state.set('focused', false);
    case constants.SET_LIST:
      return state.merge({
        list: action.list,
        totalPage: action.totalPage
      });
    case constants.MOUSE_ENTER:
      return state.set('entered', true);
    case constants.MOUSE_LEAVE:
      return state.set('entered', false);
    case constants.CHANGE_CURR_PAGE:
      return state.set('currPage', action.page);
    default:
      return state;
  }
};

export default reducer;