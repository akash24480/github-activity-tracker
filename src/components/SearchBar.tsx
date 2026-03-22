

import { useState } from "react"


interface SearchBarProps {
    onSearch: (username: string) => void;
    isLoading: boolean;
}

export const SearchBar = ({onSearch, isLoading}: SearchBarProps) => {

    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(input.trim()) onSearch(input.trim());
    };




  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search any GitHub username..."
        className="flex-1 px-4 py-3 rounded-xl bg-[#161b22] border border-[#30363d] text-[#e6edf3] text-sm outline-none focus:border-[#58a6ff] transition-colors placeholder:text-[#8b949e]"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="px-6 py-3 rounded-xl bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors whitespace-nowrap"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchBar