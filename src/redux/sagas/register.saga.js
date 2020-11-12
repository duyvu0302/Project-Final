import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from "../../util/history";
import {  message} from "antd";

import {
  CREATE_LOGIN,
  CREATE_LOGIN_SUCCESS,
  CREATE_LOGIN_FAIL,
  GET_USER_ACCOUNT,
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT_FAIL,
} from '../constants';

function* createLoginSaga(action) {
  const apiUrl = 'http://localhost:3001';
  try {
    const {email} = action.payload;
    const responseCheck = yield axios.get(`${apiUrl}/register?email=${email}`);
    const dataCheck = responseCheck.data;
    console.log("function*createLoginSaga -> dataCheck.length", dataCheck.length)
    if(dataCheck.length>0){
      yield put ({
        type: CREATE_LOGIN_SUCCESS,
        payload: "yes"
      })
    }
    else{
      const response = yield axios.post(`${apiUrl}/register`, action.payload);
      const data = response.data;
      let user = JSON.stringify(data)
      localStorage.setItem("user", user)
      yield put({
        type: CREATE_LOGIN_SUCCESS,
        payload: data,
      });
      history.push("/")
    }
  }
  catch (error) {
    yield put({
      type: CREATE_LOGIN_FAIL,
      payload: error,
    });
  }
}

function* getUserAccount(action) {
  const { email, password } = action.payload;
  const apiUrl = 'http://localhost:3001';
  const response = yield axios.get(`${apiUrl}/register?email=${email}&password=${password}`);
  const data = response.data;
  if (data.length) {
    let user = JSON.stringify(data[0])
    localStorage.setItem("user", user)
    yield put({
      type: GET_USER_ACCOUNT_SUCCESS,
      payload: data[0],
    });
  }
  else {
    message.error('Tài khoản không đúng');

    // alert("Tài khoản không đúng !")
    yield put({
      type: GET_USER_ACCOUNT_FAIL,
    });
  }
}

export default function* productSaga() {
  yield takeEvery(CREATE_LOGIN, createLoginSaga);
  yield takeEvery(GET_USER_ACCOUNT, getUserAccount);
}