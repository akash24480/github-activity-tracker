
import type { GithubUser } from "../types/github.types"


interface UserCardProps {
    user: GithubUser;
}

export const UserCard = ({user}: UserCardProps) => {
  return (
    <div className="flex gap-6 items-start bg-[#161b22] border border-[#30363d] rounded-xl p-6 mb-6">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-20 h-20 rounded-full border-2 border-[#30363d] shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-bold mb-1">
          {user.name || user.login}
        </h2>
        <p className="text-[#8b949e] text-sm mb-2">@{user.login}</p>
        {user.bio && (
          <p className="text-sm text-[#c9d1d9] leading-relaxed mb-3">
            {user.bio}
          </p>
        )}
        <div className="flex gap-4 flex-wrap">
          {user.location && (
            <span className="text-xs text-[#8b949e]">
              📍 {user.location}
            </span>
          )}
<a  
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#58a6ff] hover:underline"
          >
            View on GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserCard