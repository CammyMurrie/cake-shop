import { combineReducers } from 'redux';
import CakesReducer from './reducer_cakes';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  cakes: CakesReducer,
    form: formReducer
});

export default rootReducer;
