import type { GithubRepo } from '../types/github.types';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Go: '#00ADD8',
  Rust: '#dea584',
};

interface RepoCardProps {
  repo: GithubRepo;
}

export const RepoCard = ({ repo }: RepoCardProps) => {
  const langColor = repo.language
    ? (LANG_COLORS[repo.language] ?? '#8b949e')
    : '#8b949e';

  return (
    <div className="bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] rounded-xl p-4 flex flex-col gap-3 transition-colors">
      <div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-[#58a6ff] hover:underline"
        >
          {repo.name}
        </a>
        {repo.description && (
          <p className="text-xs text-[#8b949e] mt-1.5 leading-relaxed line-clamp-2">
            {repo.description}
          </p>
        )}
      </div>

      <div className="flex gap-4 items-center mt-auto">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-xs text-[#c9d1d9]">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: langColor }}
            />
            {repo.language}
          </span>
        )}
        <span className="text-xs text-[#8b949e]">⭐ {repo.stargazers_count}</span>
        <span className="text-xs text-[#8b949e]">🍴 {repo.forks_count}</span>
      </div>
    </div>
  );
};