"use client";

import { useMemo, useState } from "react";
import { INDIAN_STATES } from "@/lib/states";
import type { Language } from "@/lib/i18n";

interface Props {
  value: string;
  onChange: (state: string) => void;
  language: Language;
  searchLabel: string;
}

export default function StateSelector({ value, onChange, searchLabel }: Props) {
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () => INDIAN_STATES.filter((s) => s.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={searchLabel}
        className="w-full rounded-xl border-2 border-ink/20 bg-cream px-4 py-3 text-ink"
      />
      <div className="max-h-52 overflow-y-auto rounded-xl border-2 border-ink/20 bg-cream p-2 sm:max-h-60 md:max-h-64">
        {filtered.map((state) => (
          <button
            key={state}
            type="button"
            onClick={() => onChange(state)}
            className={`mb-2 w-full rounded-lg px-3 py-3 text-left text-sm font-semibold ${value === state ? "bg-primary text-white" : "bg-card text-ink"}`}
          >
            {state}
          </button>
        ))}
      </div>
    </div>
  );
}
