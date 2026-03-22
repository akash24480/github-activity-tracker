import type { GithubRepo, UserStats, LanguageStat } from "../types/github.types";

export const computeUserStats = (repos: GithubRepo[]): UserStats => {
    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

    const langMap: Record<string, number> = {};

    repos.forEach((repo) => {
        if(repo.language){
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
        }
    });


    const topLanguages: LanguageStat[] = Object.entries(langMap)
        .map(([language, count]) => ({language, count}))
        .sort((a, b) => b.count - a.count)
        .slice(0, 4);

    
    const mostStarredRepo = repos.reduce<GithubRepo | null>((best, repo) => 
        !best || repo.stargazers_count > best.stargazers_count ? repo : best,
        null
    );

    return {
        totalStars,
        topLanguages,
        mostStarredRepo
    }
}