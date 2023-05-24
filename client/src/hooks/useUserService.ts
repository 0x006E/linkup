import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { GenericResponse } from "../api/services/AuthService";
import { UserService } from "../api/services/UserService";
import useAuthStore from "../store";


export default  function useUserService() {
  const authStore = useAuthStore();
  
    const useChangePassword = useMutation<void, AxiosError<GenericResponse>, {currentPassword: string, newPassword: string}>(
        async (user) => {
          const {currentPassword, newPassword } = user;
          const {data} = await UserService.changePassword(currentPassword, newPassword);
          toast.success(`${data.message} - Please login again`);
          useAuthStore.setState({details:null,checkAuthenticated: false})
          return;
        }
      );

    const useChangeName = useMutation<void, AxiosError<GenericResponse>, {name:string, email: string}>(
        async (user) => {
            const { name,email } = user;
            const {data} = await UserService.changeName(name, email);
            authStore.setDetails(data);
            return;
         }
    );


    return { useChangePassword,useChangeName };
};