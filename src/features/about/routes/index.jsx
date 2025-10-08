import { lazy } from "react"
import { appRoutes } from "../../../routes";

const AboutPage = lazy(() => import('../pages'));

export const aboutRoutes = [
    {
        path: appRoutes.about,
        element: (
                <AboutPage />
        ),
    },
]