import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
   isAuth: boolean
}

const initialState: UserState = {
   isAuth: !!localStorage.getItem('token')
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
           if(action.payload.login === "admin" && action.payload.password === "password") {
            state.isAuth = true;
            localStorage.setItem('token', 'qwerty')
           } else {
            state.isAuth = false;
           }
        },
        logout: (state) => {
         state.isAuth = false;
         localStorage.removeItem('token')
        }
    }
});

export const {login, logout} = userSlice.actions

export default userSlice.reducer;