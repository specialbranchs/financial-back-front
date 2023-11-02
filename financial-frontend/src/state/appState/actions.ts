
import * as Types from './actionTypes';
import { AppState } from '../../../typings/formData';

const saveAppState = (appState: AppState): Types.SaveAppStateAction => ({
  type: Types.SAVE_APPSTATE,
  payload: appState
});

const removeAppState = (): Types.RemoveAppStateAction => ({
  type: Types.REMOVE_APPSTATE
});

export default { saveAppState, removeAppState };
