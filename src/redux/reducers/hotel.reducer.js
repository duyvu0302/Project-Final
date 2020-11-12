import {
  GET_HOTEL_LIST_SUCCESS,
  GET_HOTEL_LIST_FAIL,
  GET_SEARCH_LIST_SUCCESS,
  GET_SEARCH_LIST_FAIL,
  
} from '../constants';

const initialState = {
  hotelList: [],
  listSearch:[],
};

export default function hotelReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOTEL_LIST_SUCCESS: {
      return {
        ...state,
        hotelList: [
          ...action.payload,
        ],
      }
    }
    case GET_HOTEL_LIST_FAIL: {
      return state;
    }

    case GET_SEARCH_LIST_SUCCESS:{
      return {
        ...state,
        listSearch:[
          ...action.payload,
        ],
      }
    }
    case   GET_SEARCH_LIST_FAIL: {
      return state;
    }
    default: {
      return state;
    }
    
  }
}
