import {produce} from 'immer';

import * as Types from './actionTypes';
import { CatagoryType } from '../../../typings/formData';


export type State = {
  catagories: CatagoryType[];
};

export const initialState: State = {
  catagories: []
};

export default (state: State = initialState, action: Types.CatagoryTypeActionTypes) =>
  produce(state, (draft: State) => {
    switch (action.type) {
      case Types.SAVE_CATAGORY:
        draft.catagories = action.payload;
        break;
      case Types.REMOVE_CATAGORY:
        draft.catagories = []
        break;
    }
  });
