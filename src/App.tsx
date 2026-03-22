import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { UserCard } from './components/UserCard';
import { StatCard } from './components/StatCard';
import { RepoCard } from './components/RepoCard';
import { CommitChart } from './components/CommitChart';
import { LanguageBar } from './components/LanguageBar';
import { useGitHubUser } from './hooks/useGithubUser';
import { useRepos } from './hooks/useRepos';
import { useCommitActivity } from './hooks/useCommitActivity';

function App() {
  const [searched, setSearched] = useState('');

  const { data: user, isLoading: userLoading, isError } = useGitHubUser(searched);
  const { data: repoData, isLoading: reposLoading } = useRepos(searched);

  const mostStarredRepoName = repoData?.stats.mostStarredRepo?.name ?? '';
  const { data: commitData } = useCommitActivity(searched, mostStarredRepoName);

  const isLoading = userLoading || reposLoading;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <div className="max-w-4xl mx-auto px-4 py-10">

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">GitHub Activity Tracker</h1>
          <p className="text-sm text-[#8b949e]">
            Search any GitHub user to explore their activity
          </p>
        </div>

        <SearchBar onSearch={setSearched} isLoading={isLoading} />

        {isError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm text-center">
            User not found. Check the username and try again.
          </div>
        )}

        {isLoading && (
          <p className="text-center text-[#8b949e] py-16 text-sm">
            Loading GitHub data...
          </p>
        )}

        {user && repoData && !isLoading && (
          <>
            <UserCard user={user} />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <StatCard label="Public repos" value={user.public_repos} accent="#58a6ff" />
              <StatCard label="Followers" value={user.followers} accent="#3fb950" />
              <StatCard label="Following" value={user.following} accent="#d2a8ff" />
              <StatCard label="Total stars" value={repoData.stats.totalStars} accent="#e3b341" />
            </div>

            {repoData.stats.topLanguages.length > 0 && (
              <LanguageBar languages={repoData.stats.topLanguages} />
            )}

            {commitData && (
              <CommitChart
                data={commitData.chartData}
                totalCommits={commitData.totalCommitsLastYear}
              />
            )}

            <h3 className="text-sm font-semibold mb-3">Top repositories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {repoData.topRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </>
        )}

        {!searched && !isLoading && (
          <div className="text-center py-20 text-[#8b949e]">
            <p className="text-5xl mb-4">⚡</p>
            <p className="text-base">Search a GitHub username to get started</p>
            <p className="text-sm mt-2">
              Try searching{' '}
              <span className="text-[#58a6ff] font-medium">google</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;