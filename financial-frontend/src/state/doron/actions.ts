
import * as Types from './actionTypes';
import { DoronType } from '../../../typings/formData';

const saveDoronType = (dorons: DoronType[]): Types.SaveDoronTypeAction => ({
  type: Types.SAVE_DORON,
  payload: dorons
});

const removeDoronType = (): Types.RemoveDoronTypeAction => ({
  type: Types.REMOVE_DORON
});

export default { saveDoronType, removeDoronType };
