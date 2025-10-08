import { Navigate } from "react-router";
import { useIsLoggedIn } from "../hooks/is-logged-in";

export function AuthPageGuard({ children }) {
    const { isLoggedIn } = useIsLoggedIn();

    if (isLoggedIn) {
        return <>{children}</>
    }
    
    return <Navigate to="/login" replace />;
}

export function AuthComponentGuard({ children }) {
    const { isLoggedIn } = useIsLoggedIn();
    
    if (isLoggedIn) {
        return <>{children}</>
    }
    
    return null;
}