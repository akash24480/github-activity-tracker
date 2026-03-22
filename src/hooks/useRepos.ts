import { useQuery } from "@tanstack/react-query";
import { fetchRepos } from "../api/github.api";
import { computeUserStats } from "../api/helpers";
import type { GithubRepo, UserStats } from "../types/github.types";


interface UseReposResult {
    repos: GithubRepo[];
    topRepos: GithubRepo[];
    stats:UserStats;
}


export const useRepos = (username: string) => {
    return useQuery<UseReposResult, Error>({
        queryKey: ['repos', username],
        queryFn: async () => {
            const repos = await fetchRepos(username);
            const topRepos = [...repos]
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 5);
            const stats = computeUserStats(repos);
            return { repos, topRepos, stats}
        },

        enabled: !!username.trim(),
        staleTime: 5 * 60 * 1000,
    });
};

