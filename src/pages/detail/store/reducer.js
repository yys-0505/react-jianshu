import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  title: '',
  content: ''
});

const setDetail = (state, action) => {
  return state.merge({
    "title": action.title,
    "content": action.content
  });
};

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case constants.SET_DETAIL:
      return setDetail(state, action);
    default:
      return state;
  }
};

export default reducer;