import { useQuery } from "@tanstack/react-query";
import { userStorage } from "../storage";
import AuthServices from './api';

export function useGetMeQuery() {
    const token = userStorage.get();
    return useQuery({
        queryKey: ['users', token],
        queryFn: async () => await AuthServices.getMe()
    })
}