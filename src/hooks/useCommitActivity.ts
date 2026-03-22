import { useQuery } from '@tanstack/react-query';
import { fetchCommitActivity } from '../api/github.api';
import type { CommitActivity } from '../types/github.types';

interface WeeklyCommit {
  week: string;
  commits: number;
}

interface UseCommitActivityResult {
  raw: CommitActivity[];
  chartData: WeeklyCommit[];
  totalCommitsLastYear: number;
}

export const useCommitActivity = (username: string, repo: string) => {
  return useQuery<UseCommitActivityResult, Error>({
    queryKey: ['commits', username, repo],
    queryFn: async () => {
      const raw = await fetchCommitActivity(username, repo);

      const chartData: WeeklyCommit[] = raw.map((week) => ({
        week: new Date(week.week * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        commits: week.total,
      }));

      const totalCommitsLastYear = raw.reduce((sum, w) => sum + w.total, 0);

      return { raw, chartData, totalCommitsLastYear };
    },
    enabled: !!username.trim() && !!repo.trim(),
    staleTime: 10 * 60 * 1000,
  });
};