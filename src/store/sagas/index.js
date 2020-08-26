import types from "@/store/ducks/types";
import storage from '@/utils/storage';
import * as RootNavigation from '@/navigation/RootNavigation';

import {
  all,
  put,
  takeLatest,
} from 'redux-saga/effects';

// import { SessionTypes } from '../ducks/session';
// import { getSessionRequest } from './session';

export default function* rootSaga() {
  // const navigation = useNavigation();
  
  yield all([
    takeLatest(types.LOGIN_REQUEST, LoginAction),
    takeLatest(types.LOGOUT_REQUEST, LogoutAction),
  ]);
}

function* LoginAction(action) {
  let payload = [];
  let loggedIn = false;
  let myType = '';
  let userData = [];
  if(action.payload.status=='success') {
    const { type,id, name, member_number, pic, token } = action.payload.payload;
    storage.setToken(token);
    loggedIn = true;
    myType = type;
    userData = {
      member_number: member_number,
      id: id,
      name: name,
      pic: pic,
    };
    RootNavigation.navigate('Main');
  }
  else console.log(action.payload.msg);

  RootNavigation.navigate('Main');

  payload = {
    loggedIn,
    myType,
    userData,
  }

  yield put({
    type: types.LOGIN_FINISH,
    payload: payload
  });
}

function* LogoutAction(action) {
  storage.removeToken();
  RootNavigation.navigate('Auth');

  yield put({
    type: types.LOGOUT_FINISH,
  });
}


export function* initUserData() {
  const userData = JSON.parse(localStorage.getItem("auth"));
  if (userData) {
    yield put({
      type: INIT_USERDATA,
      payload: userData
    });
  }
}