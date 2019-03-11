import axios from 'axios'
import * as constants from './constants'

const setDetail = (title, content) => ({
  type: constants.SET_DETAIL,
  title,
  content
})

export const getDetail = (id) => {
  return (dispatch) => {
    axios.get("./api/detail.json?id" + id).then(res => {
      let r = res.data;
      if (r.success) {
        dispatch(setDetail(r.data.title, r.data.content));
      }
    });
  }
};