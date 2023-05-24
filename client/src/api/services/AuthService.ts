import axiosInstance from "../axiosInstance";




export interface GenericResponse {
    message: string
}

export const AuthService ={
    login: async (email: string, password: string) => {
       return await axiosInstance.post<GenericResponse>("/auth/login", { email, password })
    },
    logout: async () => {
        return await axiosInstance.post<GenericResponse>("/auth/logout")
    },
    forgotPassword: async (email: string, password: string) => {
        return await axiosInstance.post<GenericResponse>("/auth/forgot-password", { email, password })
    },
    register: async (name:string, email: string, password: string) => {
        return await axiosInstance.post<GenericResponse>("/auth/register", { name,email, password })
    }
}