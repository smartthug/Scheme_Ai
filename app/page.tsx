"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import StepForm from "@/components/StepForm";
import LanguageToggle from "@/components/LanguageToggle";
import { translations, type Language } from "@/lib/i18n";

const HeroThree = dynamic(() => import("@/components/HeroThree"), { ssr: false });

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];

  const heroTitle = useMemo(
    () => (language === "en" ? "Step-by-Step Scheme Finder" : "படி-படி திட்ட தேடல்"),
    [language],
  );
  const heroSub = useMemo(
    () =>
      language === "en"
        ? "Answer easy questions. Get matching schemes."
        : "எளிய கேள்விகளுக்கு பதில். பொருந்தும் திட்டங்களை பாருங்கள்.",
    [language],
  );

  return (
    <main id="top" className="min-h-screen bg-cream px-3 pb-12 pt-4 sm:px-6 md:pt-6">
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="flex justify-center">
          <LanguageToggle language={language} onChange={setLanguage} />
        </div>
        <HeroThree title={heroTitle} subtitle={heroSub} hint={t.startHint} />
        <h1 className="text-center text-2xl font-extrabold text-ink">{t.appTitle}</h1>
        <StepForm language={language} />
        <footer className="text-center text-xs text-ink/80">{t.footer}</footer>
      </div>
    </main>
  );
}
