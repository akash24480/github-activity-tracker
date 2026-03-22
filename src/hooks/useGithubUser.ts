import {useQuery} from '@tanstack/react-query'
import { fetchUser } from '../api/github.api'
import type { GithubUser } from '../types/github.types'


export const useGitHubUser = (username:string) => {
    return useQuery<GithubUser, Error>({
        queryKey: ['user', username],
        queryFn: () => fetchUser(username),
        enabled: !!username.trim(),
        staleTime: 5 * 60 * 1000,
    })
}