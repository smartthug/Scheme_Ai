"use client";

import { useState } from "react";
import type { Language } from "@/lib/i18n";
import type { MatchedScheme } from "@/lib/schemeLogic";
import SchemeDetails from "./SchemeDetails";

interface Props {
  scheme: MatchedScheme;
  language: Language;
  t: {
    viewDetails: string;
    hideDetails: string;
    whyForYou: string;
    applyWhere: string;
    documents: string;
    stepsApply: string;
    benefits: string;
    applicationLink: string;
    openApplication: string;
  };
}

export default function SchemeCard({ scheme, language, t }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-2xl border-2 border-ink/20 bg-card p-5 shadow-sm sm:p-6 lg:p-7">
      <h3 className="text-lg font-bold text-ink sm:text-xl">{scheme.name[language]}</h3>
      <p className="mt-2 text-sm text-ink sm:text-base">{scheme.shortDescription[language]}</p>
      <p className="mt-3 rounded-lg bg-cream p-3 text-sm text-ink sm:p-4">
        <span className="font-semibold text-primary">{t.whyForYou} </span>
        {scheme.aiExplanation[language]}
      </p>

      <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-cream p-3 text-xs">
        <span className="font-semibold text-ink">{t.applicationLink}</span>
        <a
          href={scheme.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white"
        >
          {t.openApplication}
        </a>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-4 w-full rounded-xl bg-primary py-4 text-base font-semibold text-white sm:py-5"
      >
        {open ? t.hideDetails : t.viewDetails}
      </button>

      {open && (
        <SchemeDetails
          scheme={scheme}
          language={language}
          applyWhereLabel={t.applyWhere}
          documentsLabel={t.documents}
          stepsLabel={t.stepsApply}
          benefitsLabel={t.benefits}
          applicationLinkLabel={t.applicationLink}
          openApplicationLabel={t.openApplication}
        />
      )}
    </article>
  );
}
