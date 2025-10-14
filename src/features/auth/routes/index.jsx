import { lazy } from "react"
import { appRoutes } from "../../../routes";


const SignUpPage = lazy(() => import('../pages/sign-up'));
const LoginPage = lazy(() => import('../pages/login'));

export const authRoutes = [
    {
        path: appRoutes.auth.login,
        element: (
                <LoginPage />
        ),
    },
    {
        path: appRoutes.auth.signUp,
        element: (
                <SignUpPage />
        ),
    },
]