import {produce} from 'immer';

import * as Types from './actionTypes';
import { DoronType } from '../../../typings/formData';


export type State = {
  dorons: DoronType[];
};

export const initialState: State = {
  dorons:[]
};

export default (state: State = initialState, action: Types.DoronTypeActionTypes) =>
  produce(state, (draft: State) => {
    switch (action.type) {
      case Types.SAVE_DORON:
        draft.dorons = action.payload;
        break;
      case Types.REMOVE_DORON:
        draft.dorons = []
        break;
    }
  });
