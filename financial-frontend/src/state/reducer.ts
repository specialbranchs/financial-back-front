import { AnyAction, combineReducers } from 'redux';
import currentUser, { State as UserState, initialState as currentUserInitialState } from '../state/user/reducer';
import currentappState, { State as appState, initialState as InitialappState } from '../state/appState/reducer';

import { LOG_OUT } from '../state/actions';

export interface RootState {
  currentUser: UserState;
  currentappState:appState;
}

const appReducer = combineReducers({
  currentUser,
  currentappState,
});

const rootReducer:any = (state: RootState, action: AnyAction) => {
  if (action.type === LOG_OUT) {
    console.log('Logging Out');
    return appReducer(
      {
        ...state,
        currentUser: currentUserInitialState,
        currentappState:InitialappState
      },
      action
    );
  }

  return appReducer(state, action);
};

export default rootReducer;
