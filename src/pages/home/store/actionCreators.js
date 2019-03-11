import axios from 'axios'
import * as constants from './constants'
import { fromJS } from 'immutable';

const setHomeData = (result) => ({
  type: constants.SET_HOME_DATA,
  topicList: result.topicList,
  articleList: result.articleList,
  recommendList: result.recommendList
});

const setLoadMoreData = (data, nextPage) => ({
  type: constants.SET_LOAD_MORE_DATA,
  data: fromJS(data),
  nextPage
});

export const queryHomeData = () => {
  return (dispatch) => {
    axios.get('./api/home.json').then(res => {
      let r = res.data;
      if (r.success) {
        dispatch(setHomeData(r.data));
      }
    });
  }
};

export const loadMore = (page) => {
  return (dispatch) => {
    axios.get("./api/homeList.json?page=" + page).then(res => {
      let r = res.data;
      if(r.success) {
        dispatch(setLoadMoreData(r.data, page + 1));
      }
    });
  }
};

export const toggleTopShow = (flag) => ({
  type: constants.TOGGLE_SCROLL_TOP,
  flag
});