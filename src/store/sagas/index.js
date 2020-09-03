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
  let auth = {};
  const loggedIn = true;
  let userType = '';
  let userData = [];
  
  const { type,id, name, member_number, pic,token } = action.payload;
  storage.setAuth(JSON.stringify(action.payload));
  userType = type;
  userData = {
    member_number: member_number,
    id: id,
    name: name,
    pic: pic,
  };
  auth = {
    loggedIn,
    userType,
    userData,
  }  
    // RootNavigation.navigate('Main');
  

  yield put({
    type: types.LOGIN_FINISH,
    payload: auth
  });
}

function* LogoutAction(action) {
  storage.removeAuth();
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