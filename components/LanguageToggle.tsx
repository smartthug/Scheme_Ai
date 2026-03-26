"use client";

import type { Language } from "@/lib/i18n";

interface Props {
  language: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageToggle({ language, onChange }: Props) {
  const englishLabel = language === "ta" ? "ஆங்கிலம்" : "English";
  const tamilLabel = language === "en" ? "Tamil" : "தமிழ்";
  return (
    <div className="inline-flex rounded-xl border-2 border-ink/20 bg-card p-1">
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`rounded-lg px-4 py-2 text-sm font-semibold ${language === "en" ? "bg-primary text-white" : "text-ink"}`}
      >
        {englishLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("ta")}
        className={`rounded-lg px-4 py-2 text-sm font-semibold ${language === "ta" ? "bg-primary text-white" : "text-ink"}`}
      >
        {tamilLabel}
      </button>
    </div>
  );
}
