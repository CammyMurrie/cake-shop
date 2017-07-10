export const FETCH_CAKES = 'fetch_cakes';
export const FETCH_CAKE = 'fetch_cake';
export const CREATE_CAKE = 'create-cake';
export const DELETE_CAKE = 'delete_cake';
export const EDIT_CAKE = 'edit_cake';
import axios from 'axios';

export function fetchCakes() {
     
    const request = axios.get('http://localhost:3000/cakes');
    
    return {
        type: FETCH_CAKES,
        payload: request
    };
}

export function fetchCake(id) {
    const request = axios.get(`http://localhost:3000/cakes/${id}`);
    
    return {
        type: FETCH_CAKE,
        payload: request
    };
}

export function createCake(values, callback) {
    const request = axios.post(`http://localhost:3000/cakes`, values)
    .then(() => callback());
    
    return {
        type: CREATE_CAKE,
        payload: request
    }
}

export function deleteCake(id, callback) {
    const request = axios.delete(`http://localhost:3000/cakes/${id}`)
    .then(() => callback());
    
    return {
        type: DELETE_CAKE,
        payload: id
    }
}

export function editCake(id, values, callback) {
    const request = axios.put(`http://localhost:3000/cakes/${id}`, values)
    .then(() => callback());
    
        return {
        type: EDIT_CAKE,
        payload: request
    }
}