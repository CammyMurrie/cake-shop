import _ from 'lodash';
import {FETCH_CAKES, FETCH_CAKE, CREATE_CAKE, DELETE_CAKE} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case DELETE_CAKE:
            return _.omit(state, action.payload);
        case FETCH_CAKES:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_CAKE:
            return {...state, [action.payload.data.id]: action.payload.data };
        default:
            return state;
    }
}