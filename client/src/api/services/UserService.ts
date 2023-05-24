import axiosInstance from "../axiosInstance";
import { User } from "../models/User";
import { GenericResponse } from "./AuthService";

export const UserService = {
    getUserDetails: async () => {
        return await axiosInstance.get<User>(`/user`);
    },
    changePassword: async (currentPassword: string, newPassword: string) => {
        return await axiosInstance.post<GenericResponse>(`/user/change-password`, { currentPassword, newPassword });
    },
    changeName: async (name: string, email:string) => {
        return await axiosInstance.put<User>(`/user`, { name, email });
    }   
}