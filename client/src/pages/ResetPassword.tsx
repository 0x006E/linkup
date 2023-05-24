import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthService from "../hooks/useAuthService";
import useAuthStore from "../store";

function ResetPassword() {
    const checkAuthenticated = useAuthStore((state) => state.checkAuthenticated);
    const navigate = useNavigate();
    const { useForgotPassword } = useAuthService();
    const { mutateAsync } = useForgotPassword;
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    });
    if (checkAuthenticated) {
        return <Navigate to="/" />;
    }

    const onSubmit = (data: { email: string, password: string }) => {
        toast.promise(mutateAsync(data), {
            pending: 'Resetng password...',
            success: "Password reset successfully",
            error: "Something went wrong",
        });
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    LinkUp
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Reset your password
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <Label htmlFor="email" >Your email</Label>
                                <TextInput type="email" {...register('email', { required: true })} color={errors.email ? 'failure' : 'gray'} helperText={errors.email?.message} />
                            </div>
                            <div>
                                <Label htmlFor="password" >New password</Label>
                                <TextInput type="password" {...register('password', { required: true })} placeholder="••••••••" color={errors.password ? 'failure' : 'gray'} helperText={errors.password?.message} />
                            </div>
                            <Button type="submit" fullSized>Sign in</Button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Something wrong? <button onClick={() => navigate(-1)} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Go back</button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword