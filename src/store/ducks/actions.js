import types from "./types";

const drawer_turnon = () => {
    return {
      type: types.DRAWER_TURNON
  };
}

const drawer_turnoff = () => {
  return {
    type: types.DRAWER_TURNOFF
};
}

const loginAction = loginValues => {
  return { type: types.LOGIN_REQUEST, payload: loginValues };
};

const logoutAction = () => {
  return { type: types.LOGOUT_REQUEST };
};

export default {
  drawer_turnon,
  drawer_turnoff,
  loginAction,
  logoutAction,
};