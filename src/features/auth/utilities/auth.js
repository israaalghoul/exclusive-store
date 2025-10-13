import { appRoutes } from "../../../routes";
import { userStorage } from "../storage";

export function logoutHelper(fallbackUrl = appRoutes.auth.signUp) {
    userStorage.remove();
    window.location.href = fallbackUrl;
}