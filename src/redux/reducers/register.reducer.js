import {
  CREATE_LOGIN_SUCCESS,
  CREATE_LOGIN_FAIL,
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT_FAIL,
  CHECK_ACCOUNT_REGISTER_SUCCESS,
  CHECK_ACCOUNT_REGISTER_FAIL,
} from '../constants';

const initialState = {
  userList: [],
  account: {},
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_LOGIN_SUCCESS: {
      if(action.payload ==="yes")
      return {
        ...state,
        userList: [
              ...action.payload,
        ]
      }
      return {
        ...state,
        userList: [
          action.payload,
        ]
      }
    }
    case CREATE_LOGIN_FAIL:{
      return state;
    }
    case GET_USER_ACCOUNT_SUCCESS : {
      return {
        ...state,
        account: {
          ...action.payload,
        },
      }
    }
    case GET_USER_ACCOUNT_FAIL:{
      return state;
    }
    case CHECK_ACCOUNT_REGISTER_SUCCESS : {
      return {
        ...state,
        account: {
          ...action.payload,
        },
      }
    }
    case CHECK_ACCOUNT_REGISTER_FAIL:{
      return state;
    }

    default: {
      return state;
    }
  }
}