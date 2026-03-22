import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';

interface WeeklyCommit {
  week: string;
  commits: number;
}

interface CommitChartProps {
  data: WeeklyCommit[];
  totalCommits: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#1c2128] border border-[#30363d] rounded-lg px-3 py-2 text-xs">
        <p className="text-[#8b949e] mb-1">{label}</p>
        <p className="text-[#58a6ff] font-semibold">{payload[0].value} commits</p>
      </div>
    );
  }
  return null;
};

export const CommitChart = ({ data, totalCommits }: CommitChartProps) => {
  const last12Weeks = data.slice(-12);

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold">Commit activity</h3>
        <span className="text-xs bg-[#388bfd20] text-[#58a6ff] px-3 py-1 rounded-full font-medium">
          {totalCommits} commits this year
        </span>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={last12Weeks} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: '#8b949e' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#8b949e' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff08' }} />
          <Bar dataKey="commits" fill="#238636" radius={[4, 4, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};