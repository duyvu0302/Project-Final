import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_HOTEL_LIST,
  GET_HOTEL_LIST_SUCCESS,
  GET_HOTEL_LIST_FAIL,
  GET_SEARCH_LIST,
  GET_SEARCH_LIST_SUCCESS,
  GET_SEARCH_LIST_FAIL,
  GET_HOTEL_DETAIL,
  GET_HOTEL_DETAIL_SUCCESS,
  GET_HOTEL_DETAIL_FAIL,
  CREATE_COMMENT_DETAIL,
  CREATE_COMMENT_DETAIL_SUCCESS,
  CREATE_COMMENT_DETAIL_FAIL,
  GET_COMMENT_DETAIL_SUCCESS,
  GET_COMMENT_DETAIL_FAIL,
  GET_COMMENT_DETAIL,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAIL,
  GET_ROOM
} from '../constants';

function* getHotelList(action){
  try {
    const { page, limit,place } = action.payload;
    const response = yield axios({
      method:'GET',
      url:'http://localhost:3001/hotels',
      params:{
        place:place,
        _page: page,
        _limit: limit
      }
    })
    const data = response.data;
    yield put({
      type: GET_HOTEL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_HOTEL_LIST_FAIL,
      payload: error,
    });
  }
}
function* getSearchList(action){
  try {
    const { rate,soft,page,rangePrice,place,softPoint,softRate,softAsc} = action.payload;
    const response = yield axios(
      {
        method: 'GET',
        url: 'http://localhost:3001/hotels',
        params: {
        place:place,
          _page: page,
          _limit: 10,
          rate: rate,
          ...soft && {_sort:"defaultPrice"||"point",_order:soft},
          ...softPoint && {_sort:"point",_order:softPoint},
          ...softRate && {_sort:"rate",_order:softRate},
          ...softAsc && {_sort:"defaultPrice",_order:softAsc},
          ...rangePrice && {defaultPrice_gte:rangePrice[0],defaultPrice_lte:rangePrice[1]},

        }
      }
    );
    const data = response.data;
    yield put({
      type:   GET_SEARCH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type:   GET_SEARCH_LIST_FAIL,
      payload: error,
    });
  }
}
function* getCommentDetailSaga(action){
  try {
    const {id,page  } = action.payload;
    const response = yield axios.get(`http://localhost:3001/comments?commentId=${id}&_page=${page}&_limit=3`);
    const data = response.data;
    yield put({
      type: GET_COMMENT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_COMMENT_DETAIL_FAIL,
      payload: error,
    });
  }
}
function* createCommentSaga(action){
  try {
    const response = yield axios.post(`http://localhost:3001/comments`,action.payload);
    const data = response.data;
    yield put({
      type: CREATE_COMMENT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: CREATE_COMMENT_DETAIL_FAIL,
      payload: error,
    });
  }
}



function* getHotelDetailList(action){
  try {
    const {id} = action.payload;
    const response = yield axios(
      {
        method: 'GET',
        url: `http://localhost:3001/hotels?id=${id}`,
      }
    );
    const responseDetail = yield axios(
      {
        method: 'GET',
        url: `http://localhost:3001/roms?hotelId=${id}`,
      }
    );
    const responseData = yield axios(
      {
        method: 'GET',
        url: `http://localhost:3001/comments?commentId=${id}`,
      }
    );

    const dataHotels = response.data;
    const dataComments = responseData.data;
    const dataDetail = responseDetail.data;
    const data = [...dataHotels,...dataComments,...dataDetail]
    yield put({
      type:   GET_HOTEL_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type:   GET_HOTEL_DETAIL_FAIL,
      payload: error,
    });
  }
}
function* getRoomDetailSaga(action){
  try {
    const {idRoom,idHotel} = action.payload;
    const responseHotelDetail = yield axios(
      {
        method: 'GET',
        url: `http://localhost:3001/hotels?id=${idHotel}`,
      }
    );
    const dataHotel = responseHotelDetail.data;
    const responseRoomDetail = yield axios(
      {
        method: 'GET',
        url: `http://localhost:3001/roms?id=${idRoom}`,
      }
    );
    const dataRoom =responseRoomDetail.data;
    const data = [...dataHotel,...dataRoom]
    yield put({
      type:   GET_ROOM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type:   GET_ROOM_FAIL,
      payload: error,
    });
  }
}

export default function* productSaga(){
  yield takeEvery(GET_HOTEL_LIST, getHotelList);
  yield takeEvery(GET_SEARCH_LIST,getSearchList);
  yield takeEvery(GET_HOTEL_DETAIL,getHotelDetailList);
  yield takeEvery(GET_ROOM,getRoomDetailSaga);
  yield takeEvery(CREATE_COMMENT_DETAIL,createCommentSaga);
  yield takeEvery(GET_COMMENT_DETAIL,getCommentDetailSaga);
}