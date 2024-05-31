import user from './user/actions';
import appState from './appState/actions'
import gallary from './gallary/actions';

export const LOG_OUT = 'LOG_OUT';

export interface LogOutAction {
  type: typeof LOG_OUT;
}

const logOut = (): LogOutAction => ({
  type: LOG_OUT
});

const actions = {
  user,
  appState,
  gallary,
  logOut
};

export default actions;
