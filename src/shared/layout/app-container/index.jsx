import { useGetMeQuery } from "../../../features/auth/services/queries";
import { Loader } from "../../components/loader";

const style = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }

export function AppContainer({ children }) {
    const { isLoading } = useGetMeQuery()

    if (isLoading) {
        return (
            <div style={style}>
                <Loader />
            </div>
        )
    }

    return <>{children}</>
}
