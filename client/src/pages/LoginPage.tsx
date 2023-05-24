import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import useAuthService from "../hooks/useAuthService";
import useAuthStore from "../store";

function LoginPage() {
    const checkAuthenticated = useAuthStore((state) => state.checkAuthenticated);
    const { useLogin } = useAuthService();
    const { mutate } = useLogin;
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
        mutate(data);
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
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <Label htmlFor="email" >Your email</Label>
                                <TextInput type="email" {...register("email", { required: true })} color={errors.email ? 'failure' : 'gray'} helperText={errors.email?.message} />
                            </div>
                            <div>
                                <Label htmlFor="password" >Password</Label>
                                <TextInput type="password" {...register("password", { required: true })} placeholder="••••••••" color={errors.email ? 'failure' : 'gray'} helperText={errors.email?.message} />
                            </div>
                            <div className="flex items-center justify-between">

                                <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                            </div>
                            <Button type="submit" fullSized>Sign in</Button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage