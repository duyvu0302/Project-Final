import {
  GET_HOTEL_DETAIL,
  CREATE_COMMENT_DETAIL,
  GET_COMMENT_DETAIL,
  GET_ROOM
} from '../constants';

export function getHotelDetailList(params) {
  return {
    type:   GET_HOTEL_DETAIL,
    payload: params,
  }
}
export function createComment(params) {
  return {
    type:   CREATE_COMMENT_DETAIL,
    payload: params,
  }
}
export function getCommentDetail(params) {
  return {
    type:   GET_COMMENT_DETAIL,
    payload: params,
  }
}
export function getRoomDetail(params) {
  return {
    type: GET_ROOM,
    payload: params,
  }
}