import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (userData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(userData);
        dispatch({ type: AUTH, data })
        navigate('/');
    } catch (error) {
        console.log(error);
    }
} 

export const signup = (userData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(userData);
        console.log(data);
        dispatch({ type: AUTH, data })
        navigate('/');
    } catch (error) {
        console.log(error);
    }
} 