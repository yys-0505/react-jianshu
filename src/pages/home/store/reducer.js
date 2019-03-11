import { fromJS } from 'immutable'
import * as constants from './constants'
const defaultState = fromJS({
  topicList: [],
  articleList: [],
  recommendList: [],
  articlePage: 1,
  showScroll: false
});

const setHomeData = (state, action) => {
  return state.merge({
    topicList: fromJS(action.topicList),
    articleList: fromJS(action.articleList),
    recommendList: fromJS(action.recommendList)
  });
};

const setLoadMoreData = (state, action) => {
  return state.merge({
    "articleList": state.get("articleList").concat(action.data),
    "articlePage": action.nextPage
  });
}
const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case constants.SET_HOME_DATA:
      return setHomeData(state, action);
    case constants.SET_LOAD_MORE_DATA:
      return setLoadMoreData(state, action);
    case constants.TOGGLE_SCROLL_TOP:
      return state.set("showScroll", action.flag);
    default:
      return state;
  }
};

export default reducer;