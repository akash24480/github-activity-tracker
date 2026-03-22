export interface GithubUser {
    login: string;
    name: string;
    avatar_url: string;
    html_url: string;
    location: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
}


export interface GithubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
    topics: string[];
}


export interface CommitActivity {
    week:number;
    days: number[];
    total: number;
}


export interface LanguageStat{
    language: string;
    count: number;
}

export interface UserStats {
    totalStars: number;
    topLanguages: LanguageStat[];
    mostStarredRepo: GithubRepo | null;
}