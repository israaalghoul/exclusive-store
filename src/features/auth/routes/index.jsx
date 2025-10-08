import { lazy } from "react"


const SignUpPage = lazy(() => import('../pages/sign-up'));
const LoginPage = lazy(() => import('../pages/login'));

export const authRoutes = [
    {
        path: "/login",
        element: (
                <LoginPage />
        ),
    },
    {
        path: "/sign-up",
        element: (
                <SignUpPage />
        ),
    },
]