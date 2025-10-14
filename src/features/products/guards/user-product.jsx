import { Navigate } from "react-router-dom";

const user = {
    isAuth: true,
}
export function UserProductGuard({ children }) {
    if (user.isAuth) {
        return <>{children}</>
    }

    return <Navigate to='/login' replace />;
}