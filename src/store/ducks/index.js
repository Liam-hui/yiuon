import { combineReducers,createStore } from 'redux';
import types from "./types";
import actions from "./actions";


const drawerReducer = ( state = false, action ) => {
  switch( action.type ) {
      case types.DRAWER_TURNON:
        return true
      case types.DRAWER_TURNOFF:
        return false
      default: return state;
  }
}

const defaultAuthState = {
  loggedIn:false,
  type: '',
  userData: []
};

const authReducer = (state = defaultAuthState, action) => {
  switch (action.type) {
    case types.LOGIN_FINISH: {
      return {
        ...action.payload,
      };
    }
    // case LOGOUT_FINISH: {
    //   return {
    //     ...state,
    //     username: null,
    //     name: null,
    //     roles: []
    //   };
    // }
    // case INIT_USERDATA: {
    //   const { username, name, roles } = action.payload;
    //   return {
    //     ...state,
    //     username,
    //     name,
    //     roles
    //   };
    // }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  drawer_on: drawerReducer,
  auth_state: authReducer,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default reducers;



// store.subscribe( () => console.log(store.getState() )  );
// store.dispatch(actions.change_title('adfasdf') );

