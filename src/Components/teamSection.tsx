import { useEffect, useState } from "react";
import Papa from "papaparse";
import { FaLinkedin } from "react-icons/fa";

// Replace with your own published-to-web CSV link:
// Google Sheet -> File -> Share -> Publish to web -> pick the tab -> CSV
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQraEJ5hM1reN8NsvH6CzBxTZQlFHvANx_m5Wn0fWdsV3fLg-TExEW3fSxcHPiXcSftnOr-Q34sG-bk/pub?gid=0&single=true&output=csv";

interface TeamMember {
  name: string;
  role: string;
  photoUrl?: string;
  linkedin?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="relative bg-bg-tertiary rounded-3xl border border-white/15 shadow-sm p-6 flex flex-col items-start text-left">
      {/* avatar: photo if provided, otherwise initials */}
      <div className="relative mb-6">
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={member.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center">
            <span className="text-text-h font-extrabold text-lg">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>

      <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
        {member.role}
      </p>

      <div className="w-full flex items-center justify-between gap-3">
        <h3 className="text-2xl text-text-h">{member.name}</h3>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name}'s LinkedIn`}
            className="shrink-0 border-white/15 flex items-center justify-center text-text-h hover:text-accent transition-colors">
            <FaLinkedin className="w-7 h-7 " />
          </a>
        )}
      </div>
    </div>
  );
}

export default function TeamSection() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csv) => {
        const { data } = Papa.parse<TeamMember>(csv, {
          header: true,
          skipEmptyLines: true,
        });
        setTeam(data.filter((row) => row.name));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-text mt-10">Loading team…</p>;
  }

  if (error || team.length === 0) {
    return (
      <p className="text-text mt-10">
        Team info unavailable right now — check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
      {team.map((member) => (
        <TeamCard key={member.name} member={member} />
      ))}
    </div>
  );
}
