import { useEffect, useState } from "react";
import Papa from "papaparse";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQraEJ5hM1reN8NsvH6CzBxTZQlFHvANx_m5Wn0fWdsV3fLg-TExEW3fSxcHPiXcSftnOr-Q34sG-bk/pub?gid=2085222177&single=true&output=csv";

interface Sponsor {
  name: string;
  logoUrl: string;
  tier: string;
}

const TIER_ORDER = ["Platinum", "Gold", "Silver"];

interface Sponsor {
  name: string;
  logoUrl: string;
  tier: string;
  url?: string;
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const card = (
    <div className="bg-white rounded-3xl border border-white/15 shadow-sm overflow-hidden transition-transform duration-200 hover:-translate-y-1 h-40 flex items-center justify-center p-6">
      <img
        src={sponsor.logoUrl}
        alt={sponsor.name}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );

  if (!sponsor.url) return card;

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={sponsor.name}
      className="block">
      {card}
    </a>
  );
}
function TierGroup({ tier, sponsors }: { tier: string; sponsors: Sponsor[] }) {
  if (sponsors.length === 0) return null;

  return (
    <div className="mb-14">
      <p className="text-xl text-text-h font-bold tracking-widest text-text uppercase mb-20">
        {tier} Sponsors
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-6">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csv) => {
        const { data } = Papa.parse<Sponsor>(csv, {
          header: true,
          skipEmptyLines: true,
        });
        setSponsors(data.filter((row) => row.name));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-text mt-10">Loading sponsors…</p>;
  }

  if (error || sponsors.length === 0) {
    return (
      <p className="text-text mt-10">
        Sponsor info unavailable right now — check back soon.
      </p>
    );
  }

  return (
    <div className="mt-10">
      {TIER_ORDER.map((tier) => (
        <TierGroup
          key={tier}
          tier={tier}
          sponsors={sponsors.filter((s) => s.tier === tier)}
        />
      ))}
    </div>
  );
}
