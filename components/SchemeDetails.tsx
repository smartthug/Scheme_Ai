"use client";

import type { Language } from "@/lib/i18n";
import type { MatchedScheme } from "@/lib/schemeLogic";

interface Props {
  scheme: MatchedScheme;
  language: Language;
  applyWhereLabel: string;
  documentsLabel: string;
  stepsLabel: string;
  benefitsLabel: string;
  applicationLinkLabel: string;
  openApplicationLabel: string;
}

export default function SchemeDetails({
  scheme,
  language,
  applyWhereLabel,
  documentsLabel,
  stepsLabel,
  benefitsLabel,
  applicationLinkLabel,
  openApplicationLabel,
}: Props) {
  const applyText =
    scheme.applyWhere === "online"
      ? language === "en"
        ? "Online portal"
        : "ஆன்லைன் தளம்"
      : scheme.applyWhere === "office"
        ? language === "en"
          ? "Government office"
          : "அரசு அலுவலகம்"
        : language === "en"
          ? "Online or office"
          : "ஆன்லைன் அல்லது அலுவலகம்";

  return (
    <div className="mt-4 space-y-3 border-t border-ink/20 pt-4 text-sm text-ink">
      <p className="rounded-lg bg-cream p-3">
        <span className="font-bold">{benefitsLabel}: </span>
        {scheme.benefits[language]}
      </p>

      <div className="rounded-lg border border-ink/10 bg-cream p-3 text-xs">
        <p className="mb-2 font-bold">{applicationLinkLabel}</p>
        <a
          href={scheme.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white"
        >
          {openApplicationLabel}
        </a>
      </div>

      <div>
        <p className="mb-1 font-bold">📄 {documentsLabel}</p>
        <ul className="list-inside list-disc space-y-1">
          {scheme.documents.map((d) => (
            <li key={d.en}>{d[language]}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-bold">📍 {applyWhereLabel}</p>
        <p>{applyText}</p>
      </div>
      <div>
        <p className="mb-1 font-bold">✅ {stepsLabel}</p>
        <ol className="list-inside list-decimal space-y-1">
          {scheme.steps.map((s) => (
            <li key={s.en}>{s[language]}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
