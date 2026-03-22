import type { LanguageStat } from '../types/github.types';

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

interface LanguageBarProps {
  languages: LanguageStat[];
}

export const LanguageBar = ({ languages }: LanguageBarProps) => {
  const total = languages.reduce((s, l) => s + l.count, 0);

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 mb-6">
      <h3 className="text-sm font-semibold mb-4">Top languages</h3>

      <div className="flex h-2 rounded-full overflow-hidden gap-0.5 mb-4">
        {languages.map((lang) => (
          <div
            key={lang.language}
            className="rounded-full"
            style={{
              flex: lang.count,
              background: LANG_COLORS[lang.language] ?? '#8b949e',
            }}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {languages.map((lang) => (
          <div key={lang.language} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: LANG_COLORS[lang.language] ?? '#8b949e' }}
            />
            <span className="text-xs text-[#c9d1d9]">{lang.language}</span>
            <span className="text-xs text-[#8b949e]">
              {Math.round((lang.count / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};