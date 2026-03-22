import axios from 'axios';

import type { GithubUser, GithubRepo, CommitActivity } from '../types/github.types';


const githubClient = axios.create({
    baseURL:'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(import.meta.env.VITE_GITHUB_TOKEN && {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        }),
    },
});


export const fetchUser = async (username: string): Promise<GithubUser> => {
    const { data } = await githubClient.get(`/users/${username}`);
    return data;
}


export const fetchRepos = async (username: string): Promise<GithubRepo[]> => {
    const { data } = await githubClient.get(`/users/${username}/repos?sort=updated&per_page=100`);
    return data;
}


export const fetchCommitActivity = async (
    username: string,
    repo : string
): Promise<CommitActivity[]> => {

    const { data } = await githubClient.get(`/repos/${username}/${repo}/stats/commit_activity`);

    return data;
}