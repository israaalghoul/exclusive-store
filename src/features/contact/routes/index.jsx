import { lazy } from "react"
import { appRoutes } from "../../../routes";

const ContactPage = lazy(() => import('../pages'));

export const contactRoutes = [
    {
        path: appRoutes.contact,
        element: (
                <ContactPage />
        ),
    },
]