interface StatCardProps {
  label: string;
  value: number | string;
  accent: string;
}

export const StatCard = ({ label, value, accent }: StatCardProps) => {
  return (
    <div
      className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 text-center"
      style={{ borderTop: `3px solid ${accent}` }}
    >
      <p className="text-3xl font-bold mb-1" style={{ color: accent }}>
        {value}
      </p>
      <p className="text-xs text-[#8b949e] font-medium">{label}</p>
    </div>
  );
};