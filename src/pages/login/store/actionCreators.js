import axios from 'axios'
import * as constants from './constants'

const setLogin = () => ({
  type: constants.SET_LOGIN,
  value: true
});

export const logout = () => ({
  type: constants.LOGOUT,
  value: false
});

export const login = (account, password) => {
  return (dispatch) => {
    axios.get(`./api/login.json?account=${account}&password=${password}`).then(res => {
      let r = res.data;
      if (r.success) {
        dispatch(setLogin());
      }
    });
  }
}