import {
  GET_HOTEL_LIST,
  GET_SEARCH_LIST,
} from '../constants';

export function getHotelList(params) {
  return {
    type: GET_HOTEL_LIST,
    payload: params,
  }
}
export function getSearchList(params) {
  return {
    type: GET_SEARCH_LIST,
    payload: params,
  }
}

