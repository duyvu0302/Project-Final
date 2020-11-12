import {
  GET_HOTEL_DETAIL_SUCCESS,
  GET_HOTEL_DETAIL_FAIL,
  CREATE_COMMENT_DETAIL_SUCCESS,
  CREATE_COMMENT_DETAIL_FAIL,
  GET_COMMENT_DETAIL_SUCCESS,
  GET_COMMENT_DETAIL_FAIL,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAIL
} from '../constants';

const initialState = {
  hotelDetailList: [],
  commentList: [],
  roomDetail:[]
};

export default function hotelDetailReducer(state = initialState, action) {
  switch (action.type) {
    case   GET_HOTEL_DETAIL_SUCCESS: {
      return {
        ...state,
        hotelDetailList: [
          ...action.payload,
        ],
      }
    }
    case  GET_HOTEL_DETAIL_FAIL:{
      return state;
    }
    case   CREATE_COMMENT_DETAIL_SUCCESS: {
      return {
        ...state,
        commentList: [
          action.payload,
          ...state.commentList
        ],
      }
    }
    case  CREATE_COMMENT_DETAIL_FAIL:{
      return state;
    }
    case   GET_COMMENT_DETAIL_SUCCESS: {
      return {
        ...state,
        commentList: [
          ...action.payload,

        ],
      }
    }
    case  GET_COMMENT_DETAIL_FAIL:{
      return state;
    }
    case GET_ROOM_SUCCESS: {
      return {
        ...state,
        roomDetail: [
          ...action.payload,
        ],
      }
    }
    case GET_ROOM_FAIL: {
      return state;
    }


    default: {
      return state;
    }
    
  }
}