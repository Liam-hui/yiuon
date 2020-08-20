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
    takeLatest(types.LOGOUT_REQUEST, watchLogout),
  ]);
}

// side effect
function* LoginAction(action) {
  let payload = [];
  let loggedIn = false;
  let myType = '';
  let userData = [];
  if(action.payload.status=='success') {
    const { type,id, name, pic, token } = action.payload.payload;
    storage.setToken(token);
    loggedIn = true;
    myType = type;
    userData = {
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

  // const { name, pic,  } = action.payload;
  // let userData;
  // if (username === "admin" && password === "admin") {
  //   userData = {
  //     username: "admin",
  //     name: "admin",
  //     roles: ["admin", "user", "VIP"]
  //   };
  //   const authValues = {
  //     apiToken:
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InRoYW5nIGxlIiwiaWF0IjoxNTE2MjM5MDIyfQ.RwCuXkEg2S1027iFOO3k59f8LFPXNdPrKjvAlLSzIo4",
  //     ...userData
  //   };
  //   localStorage.setItem("auth", JSON.stringify(authValues));
  // }

  yield put({
    type: types.LOGIN_FINISH,
    payload: payload
  });
}

function* watchLogout(action) {
  localStorage.removeItem("auth");
  yield put({
    type: LOGOUT_FINISH
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