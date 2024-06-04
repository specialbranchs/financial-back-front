import user from './user/actions';
import appState from './appState/actions'
import gallary from './gallary/actions';
import catagorry from './catagory/actions'
import doron from './doron/actions'
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
  catagorry,
  doron,
  logOut
};

export default actions;
