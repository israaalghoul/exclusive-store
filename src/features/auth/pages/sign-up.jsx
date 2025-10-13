import { SignUpForm } from "../components/sign-up-form";
import React from "react";
import { useNavbarStore } from "../../../shared/layout/navbarStore";

function SignUpPage() {
    const setHideIcons = useNavbarStore((s) => s.setHideIcons);
    React.useEffect(() => {
        setHideIcons(true);
        return () => setHideIcons(false);
    }, [setHideIcons]);

    return (
        <SignUpForm />
    )
}

export default SignUpPage;