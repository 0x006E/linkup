import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthService, GenericResponse } from "../api/services/AuthService";
import { UserService } from "../api/services/UserService";
import useAuthStore from "../store";


export default  function useAuthService() {
  const navigate = useNavigate();
    const useLogin = useMutation<void, AxiosError<GenericResponse>, {email: string, password: string}>(
        async (user) => {
          const { email, password } = user;
          const {data} = await AuthService.login(email, password);
          const {data:details} = await UserService.getUserDetails();
          toast.success(data.message);
          useAuthStore.setState({details,checkAuthenticated: true})
          return;
        }
      );

    const useLogout = useMutation<void, AxiosError<GenericResponse>>(
      async () => {
        await AuthService.logout();
        useAuthStore.setState({details: null,checkAuthenticated: false})
        navigate("/login");
        return;
      }
    );

    const useRegister = useMutation<void, AxiosError<GenericResponse>, {name:string, email: string, password: string}>(
      async (user) => {
        const { name,email, password } = user;
        await AuthService.register(name,email, password);
        toast.success("User registered successfully, please login ");
        navigate("/login");
        return ;
      });
    
    const useForgotPassword = useMutation<GenericResponse, AxiosError<GenericResponse>, {email: string, password: string}>(
        async (user) => {
            const { email, password } = user;
            const { data } = await AuthService.forgotPassword(email, password);
            navigate("/login");
            return data;
       }
    );



    return { useRegister,useLogin, useLogout, useForgotPassword };
};