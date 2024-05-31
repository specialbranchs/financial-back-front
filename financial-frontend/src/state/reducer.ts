import { AnyAction, combineReducers } from 'redux';
import currentUser, { State as UserState, initialState as currentUserInitialState } from '../state/user/reducer';
import currentappState, { State as appState, initialState as InitialappState } from '../state/appState/reducer';
import currentgallaryState, { State as gallaryState, initialState as InitialgallaryState } from '../state/gallary/reducer';

import { LOG_OUT } from '../state/actions';

export interface RootState {
  currentUser: UserState;
  currentappState:appState;
  currentgallaryState:gallaryState;
}

const appReducer = combineReducers({
  currentUser,
  currentappState,
  currentgallaryState
});

const rootReducer:any = (state: RootState, action: AnyAction) => {
  if (action.type === LOG_OUT) {
    console.log('Logging Out');
    return appReducer(
      {
        ...state,
        currentUser: currentUserInitialState,
        currentappState:InitialappState,
        currentgallaryState:InitialgallaryState
      },
      action
    );
  }

  return appReducer(state, action);
};

export default rootReducer;
