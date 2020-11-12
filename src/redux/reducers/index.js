import { combineReducers } from 'redux';
import hotelReducer from './hotel.reducer';
import registerReducer from './register.reducer';
import hotelDetailReducer from './hotelDetail.reducer';

export default combineReducers({
  hotelReducer,registerReducer,hotelDetailReducer
});
