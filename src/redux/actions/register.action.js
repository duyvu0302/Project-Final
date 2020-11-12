import { CREATE_LOGIN, GET_USER_ACCOUNT, CHECK_ACCOUNT_REGISTER } from '../constants';

export function createLogin(params) {
  return {
    type: CREATE_LOGIN,
    payload: params,
  }
}

export function getUserAccount(params) {
  console.log("getUserAccount -> params", params)
  return {
    type: GET_USER_ACCOUNT,
    payload: params,
  }
}
export function checkAccountRegister(params) {
  console.log("getUserAccount -> params", params)
  return {
    type: CHECK_ACCOUNT_REGISTER,
    payload: params,
  }
}