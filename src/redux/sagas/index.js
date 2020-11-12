import { fork } from 'redux-saga/effects';

import hotelSaga from './hotel.saga';
import registerSaga from './register.saga';

export default function* mySaga() {
  yield fork(hotelSaga);
  yield fork(registerSaga);
}
