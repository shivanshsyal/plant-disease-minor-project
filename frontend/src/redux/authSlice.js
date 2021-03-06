import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
    },
    reducers: {
        loginStart: (state, action) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        }
    }

})

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;


export const loginThunk = (res) => async (dispatch) => {
    dispatch(loginStart());
    if (res.success) {
        const { success, ...user } = res;
        dispatch(loginSuccess(user));
    } else {
        dispatch(loginFailure(res));
    }
}

export const logoutThunk = () => async (dispatch) => {
    dispatch({ type: 'LOGOUT' });

}