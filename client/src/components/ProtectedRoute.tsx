import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store";

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const isAuth = useAuthStore((state) => state.checkAuthenticated);
    if (!isAuth) {
        return <Navigate to="/login" />;
    }
    return children as React.ReactElement;
};