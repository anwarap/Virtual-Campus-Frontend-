import { createSlice } from "@reduxjs/toolkit";

const isUserStored = localStorage.getItem('user');
const isUser = isUserStored ? JSON.parse(isUserStored) :null;

const isTeacherStored = localStorage.getItem('teacher');
const isTeacher = isTeacherStored ? JSON.parse(isTeacherStored) :null;

const isAdminStored = localStorage.getItem('admin');
const isAdmin = isAdminStored ? JSON.parse(isAdminStored) :null;

const initialState  = {
    isUser:isUser,
    isTeacher:isTeacher,
    isAdmin:isAdmin
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginUser :(state,action)=>{
            state.isUser = action.payload
            localStorage.setItem('user',JSON.stringify(action.payload));
        },
        logoutUser :(state)=>{
            state.isUser = null;
            localStorage.removeItem('user');
        },
        loginTeacher :(state,action)=>{
            state.isTeacher = action.payload
            localStorage.setItem('teacher',JSON.stringify(action.payload));
        },
        logoutTeacher :(state)=>{
            state.isTeacher = null;
            localStorage.removeItem('teacher')
        },
        loginAdmin : (state,action)=>{
            state.isAdmin = action.payload;
            localStorage.setItem('admin',JSON.stringify(action.payload));
        },
        logoutAdmin :(state)=>{
            state.isAdmin = null;
            localStorage.removeItem('admin');
        }
    }
})


export const {loginUser,logoutUser,loginTeacher,logoutTeacher,loginAdmin,logoutAdmin} = authSlice.actions;

export default authSlice.reducer;