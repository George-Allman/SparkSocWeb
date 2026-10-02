import { useEffect, useState } from "react";
import Papa from "papaparse";
import { FaUserGroup, FaEye, FaInstagram } from "react-icons/fa6";

// Published-to-web CSV of your Stats tab. One row, columns (row 1, exact,
// case-sensitive): members | viewsPerQuarter | instagramFollowers
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQraEJ5hM1reN8NsvH6CzBxTZQlFHvANx_m5Wn0fWdsV3fLg-TExEW3fSxcHPiXcSftnOr-Q34sG-bk/pub?gid=1997435280&single=true&output=csv";

interface Stats {
  members: string;
  viewsPerQuarter: string;
  instagramFollowers: string;
}

function StatTile({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
      <div className="w-12 h-12 rounded-full bg-bg flex items-center justify-center text-accent">
        {icon}
      </div>
      <div className="text-4xl font-extrabold text-text-h">{value}</div>
      <div className="text-sm text-text uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function SocialSection() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csv) => {
        const { data } = Papa.parse<Stats>(csv, {
          header: true,
          skipEmptyLines: true,
        });
        setStats(data[0] ?? null);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-text mt-6">Loading stats…</p>;
  if (error || !stats)
    return (
      <p className="text-text mt-6">
        Stats unavailable right now — check back soon.
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {/* column 1: member tally */}
      <div className="bg-bg-tertiary rounded-3xl border border-white/10 p-8 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full bg-bg flex items-center justify-center text-accent">
          <FaUserGroup className="w-6 h-6" />
        </div>
        <div className="text-4xl font-extrabold text-text-h">
          {stats.members}
        </div>
        <div className="text-sm text-text uppercase tracking-widest">
          Members
        </div>
      </div>

      {/* columns 2-3: views per quarter + instagram followers */}
      <div className="md:col-span-2 bg-bg-tertiary rounded-3xl border border-white/10 p-8 flex flex-col sm:flex-row items-stretch gap-8">
        <StatTile
          icon={<FaInstagram className="w-6 h-6" />}
          value={stats.instagramFollowers}
          label="Instagram followers"
        />
        <div className="hidden sm:block w-px bg-white/10" />
        <StatTile
          icon={<FaEye className="w-6 h-6" />}
          value={stats.viewsPerQuarter}
          label="Views this quarter"
        />
      </div>
    </div>
  );
}
