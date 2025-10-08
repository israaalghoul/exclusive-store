import { useGetMeQuery } from "../services/queries";

export function useIsLoggedIn() {
   const { data: user, isLoading } = useGetMeQuery()
//    console.log(Boolean(user));
    return { isLoggedIn: Boolean(user), isLoading 
        
    }
}