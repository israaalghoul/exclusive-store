import { LoginForm } from "../components/login-form";
import React from "react";
import { useNavbarStore } from "../../../shared/layout/navbarStore";

function LoginPage() {
    const setHideIcons = useNavbarStore((s) => s.setHideIcons);
    React.useEffect(() => {
        setHideIcons(true);
        return () => setHideIcons(false);
    }, [setHideIcons]);

    return (
        <LoginForm />
    )
}

export default LoginPage;