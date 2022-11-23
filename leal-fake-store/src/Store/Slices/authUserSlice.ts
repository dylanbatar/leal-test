import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { typeStatus } from "../../global/globales";
import { IAuthUser } from "../../Interfaces/StoreInterface";
import { IUserProfile } from "../../Interfaces/UserInterface";


const basicInfoUser ={
    date: '',
    email:'',
    entity:'',
    id:'',
    lastName:'',
    name:'',
    orderId:'',
    payMethod:'',
    points:0,
    total:'',
    userId:''
}
const initialState : IAuthUser = {
    userInfo: {
        data: basicInfoUser,
        status: typeStatus.none,
        err: {
        msg: "",
        },

    },
};

export const authUsersSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loaderUserInfo: ({userInfo}) =>{userInfo.status = typeStatus.loading},
    getUserInfo: ({userInfo}, action:PayloadAction<IUserProfile>) => {
      userInfo.data = action.payload;
      userInfo.status = typeStatus.success;
    },
    errUserInfo: ({userInfo},action:PayloadAction<{msg:string}>) =>{
      userInfo.data = basicInfoUser;
      userInfo.status = typeStatus.failure;
      userInfo.err.msg = action.payload.msg
    },
  
  },
});

export const {loaderUserInfo, getUserInfo,errUserInfo } = authUsersSlice.actions;

export default authUsersSlice.reducer;
