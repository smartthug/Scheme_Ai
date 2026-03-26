"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initialFormAnswers, type FormAnswers } from "@/lib/types";
import { matchSchemes, type MatchedScheme } from "@/lib/schemeLogic";
import { translations, type Language } from "@/lib/i18n";
import SchemeCard from "./SchemeCard";
import StateSelector from "./StateSelector";

interface Props {
  language: Language;
}

const occupationValues = ["Farmer", "Student", "Worker", "Business", "Unemployed"] as const;
const occupationEmojis = ["🌾", "🎓", "👷", "💼", "🙋"] as const;

const incomeValues = ["Below ₹10,000", "₹10,000 – ₹25,000", "Above ₹25,000"] as const;
const categories = ["SC/ST", "OBC", "General", "Don't know"] as const;

const locationValues = ["Rural", "Urban"] as const;
const locationEmojis = ["🌾", "🏙️"] as const;

const purposeValues = ["Money", "Education", "Farming", "Health", "Job"] as const;
const purposeEmojis = ["💰", "🎓", "🌾", "🏥", "💼"] as const;

const yesNoValues = ["Yes", "No"] as const;
const educationValues = ["Below 10th", "10th–12th", "Graduate", "Postgraduate"] as const;

type OptionItem = {
  value: string;
  label: string;
  emoji?: string;
};

function OptionStep({
  title,
  items,
  selectedValue,
  onSelect,
}: {
  title: string;
  items: OptionItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
        {items.map((it) => (
          <BigButton
            key={it.value}
            active={selectedValue === it.value}
            label={`${it.emoji ? `${it.emoji} ` : ""}${it.label}`}
            onClick={() => onSelect(it.value)}
          />
        ))}
      </div>
    </div>
  );
}

function BigButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border-2 py-4 text-base font-semibold ${
        active ? "border-primary bg-primary text-white" : "border-ink/20 bg-cream text-ink"
      }`}
    >
      {label}
    </button>
  );
}

export default function StepForm({ language }: Props) {
  const t = translations[language];
  const [answers, setAnswers] = useState<FormAnswers>(initialFormAnswers);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"form" | "loading" | "results">("form");
  const [results, setResults] = useState<MatchedScheme[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const raw = localStorage.getItem("scheme-helper-answers");
    if (raw) setAnswers(JSON.parse(raw) as FormAnswers);
  }, []);

  useEffect(() => {
    localStorage.setItem("scheme-helper-answers", JSON.stringify(answers));
  }, [answers]);

  const steps = 10; // 0..9
  const progress = ((step + 1) / steps) * 100;

  const isValidStep = useMemo(() => {
    switch (step) {
      case 0:
        return answers.age !== "" && answers.gender !== "";
      case 1:
        return answers.occupation !== "";
      case 2:
        return answers.income !== "";
      case 3:
        return answers.category !== "";
      case 4:
        return answers.location !== "";
      case 5:
        return answers.purpose !== "";
      case 6:
        if (!answers.scope) return false;
        if (answers.scope === "All India") return true;
        return !!answers.state;
      case 7:
        return answers.bankAccount !== "";
      case 8:
        return answers.aadhaar !== "";
      case 9:
        return answers.educationLevel !== "";
      default:
        return true;
    }
  }, [answers, step]);

  const validateStep = (): string => {
    switch (step) {
      case 0:
        if (answers.age === "") return t.errors.ageRequired;
        if (answers.gender === "") return t.errors.genderRequired;
        return "";
      case 1:
        if (!answers.occupation) return t.errors.occupationRequired;
        return "";
      case 2:
        if (!answers.income) return t.errors.incomeRequired;
        return "";
      case 3:
        if (!answers.category) return t.errors.categoryRequired;
        return "";
      case 4:
        if (!answers.location) return t.errors.locationRequired;
        return "";
      case 5:
        if (!answers.purpose) return t.errors.purposeRequired;
        return "";
      case 6:
        if (!answers.scope) return t.errors.scopeRequired;
        if (answers.scope === "Select State" && !answers.state) return t.errors.stateRequired;
        return "";
      case 7:
        if (!answers.bankAccount) return t.errors.yesNoRequired;
        return "";
      case 8:
        if (!answers.aadhaar) return t.errors.yesNoRequired;
        return "";
      case 9:
        if (!answers.educationLevel) return t.errors.educationRequired;
        return "";
      default:
        return "";
    }
  };

  const goNext = () => {
    const msg = validateStep();
    if (msg) {
      setErrorMsg(msg);
      return;
    }
    setErrorMsg("");

    if (step === steps - 1) {
      setPhase("loading");
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setErrorMsg("");
    setStep((s) => Math.max(0, s - 1));
  };

  useEffect(() => {
    if (phase !== "loading") return;
    const timer = setTimeout(() => {
      setResults(matchSchemes(answers));
      setPhase("results");
    }, 1200);
    return () => clearTimeout(timer);
  }, [phase, answers]);

  const speakResults = () => {
    if (!("speechSynthesis" in window)) return;
    const top = results.slice(0, 5);
    const text = top
      .map((r) => `${r.name[language]}. ${r.aiExplanation[language]}`)
      .join(". ");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = language === "ta" ? "ta-IN" : "en-IN";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const occupationItems: OptionItem[] = occupationValues.map((v, i) => ({
    value: v,
    emoji: occupationEmojis[i],
    label: t.occupation[v],
  }));

  const incomeItems: OptionItem[] = incomeValues.map((v) => ({
    value: v,
    label: t.income[v],
  }));

  const categoryItems: OptionItem[] = categories.map((v) => ({
    value: v,
    label: t.category[v],
  }));

  const locationItems: OptionItem[] = locationValues.map((v, i) => ({
    value: v,
    emoji: locationEmojis[i],
    label: t.location[v],
  }));

  const purposeItems: OptionItem[] = purposeValues.map((v, i) => ({
    value: v,
    emoji: purposeEmojis[i],
    label: t.purpose[v],
  }));

  const yesNoItems: OptionItem[] = yesNoValues.map((v) => ({
    value: v,
    label: t.yesNo[v],
  }));

  const educationItems: OptionItem[] = educationValues.map((v) => ({
    value: v,
    label: t.educationLevel[v],
  }));

  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return results;
    const tokens = q.split(/\s+/).filter(Boolean);
    const score = (scheme: MatchedScheme): number => {
      const haystack = [
        scheme.name[language],
        scheme.shortDescription[language],
        scheme.benefits[language],
        scheme.aiExplanation[language],
        ...scheme.documents.map((d) => d[language]),
      ]
        .join(" ")
        .toLowerCase();
      let total = 0;
      for (const token of tokens) {
        if (haystack.includes(token)) total += 2;
      }
      if (haystack.includes(q)) total += 3;
      return total;
    };

    return [...results]
      .map((scheme) => ({ scheme, score: score(scheme) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || b.scheme.score - a.scheme.score)
      .map((item) => item.scheme);
  }, [results, searchQuery, language]);

  return (
    <section className="mx-auto max-w-xl px-1 sm:px-0 sm:max-w-2xl">
      {phase === "form" && (
        <div className="mb-4">
          <div className="mb-1 flex justify-between text-sm text-ink">
            <span>
              {t.step} {step + 1} {t.of} {steps}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 rounded-full bg-card/70">
            <motion.div className="h-3 rounded-full bg-primary" animate={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === "form" && (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="rounded-2xl border-2 border-ink/20 bg-card p-5"
          >
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-ink">{t.ageQ}</h2>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={120}
                  value={answers.age === "" ? "" : answers.age}
                  placeholder={language === "ta" ? "உதா: 35" : "e.g. 35"}
                  onChange={(e) => {
                    const raw = e.target.value;
                    setAnswers((a) => ({
                      ...a,
                      age: raw === "" ? "" : Math.min(120, Math.max(1, parseInt(raw, 10) || 0)),
                    }));
                  }}
                  className="w-full rounded-xl border-2 border-ink/20 bg-cream px-4 py-4 text-lg text-ink placeholder:text-ink/50"
                />
                <p className="font-semibold text-ink">{t.genderQ}</p>
                <div className="grid grid-cols-2 gap-3">
                  {(["Male", "Female"] as const).map((g) => (
                    <BigButton
                      key={g}
                      active={answers.gender === g}
                      label={t.gender[g]}
                      onClick={() => setAnswers((a) => ({ ...a, gender: g }))}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <OptionStep
                title={t.occupationQ}
                items={occupationItems}
                selectedValue={answers.occupation}
                onSelect={(v) => setAnswers((a) => ({ ...a, occupation: v as FormAnswers["occupation"] }))}
              />
            )}

            {step === 2 && (
              <OptionStep
                title={t.incomeQ}
                items={incomeItems}
                selectedValue={answers.income}
                onSelect={(v) => setAnswers((a) => ({ ...a, income: v as FormAnswers["income"] }))}
              />
            )}

            {step === 3 && (
              <OptionStep
                title={t.categoryQ}
                items={categoryItems}
                selectedValue={answers.category}
                onSelect={(v) => setAnswers((a) => ({ ...a, category: v as FormAnswers["category"] }))}
              />
            )}

            {step === 4 && (
              <OptionStep
                title={t.locationQ}
                items={locationItems}
                selectedValue={answers.location}
                onSelect={(v) => setAnswers((a) => ({ ...a, location: v as FormAnswers["location"] }))}
              />
            )}

            {step === 5 && (
              <OptionStep
                title={t.purposeQ}
                items={purposeItems}
                selectedValue={answers.purpose}
                onSelect={(v) => setAnswers((a) => ({ ...a, purpose: v as FormAnswers["purpose"] }))}
              />
            )}

            {step === 6 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-ink">{t.scopeQ}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <BigButton
                    active={answers.scope === "All India"}
                    onClick={() => setAnswers((a) => ({ ...a, scope: "All India", state: "" }))}
                    label={`${t.allIndia} 🇮🇳`}
                  />
                  <BigButton
                    active={answers.scope === "Select State"}
                    onClick={() => setAnswers((a) => ({ ...a, scope: "Select State" }))}
                    label={`${t.selectState} 📍`}
                  />
                </div>

                {answers.scope === "Select State" && (
                  <StateSelector
                    language={language}
                    value={answers.state}
                    onChange={(s) => setAnswers((a) => ({ ...a, state: s }))}
                    searchLabel={t.searchState}
                  />
                )}
              </div>
            )}

            {step === 7 && (
              <OptionStep
                title={t.bankQ}
                items={yesNoItems}
                selectedValue={answers.bankAccount}
                onSelect={(v) => setAnswers((a) => ({ ...a, bankAccount: v as FormAnswers["bankAccount"] }))}
              />
            )}

            {step === 8 && (
              <OptionStep
                title={t.aadhaarQ}
                items={yesNoItems}
                selectedValue={answers.aadhaar}
                onSelect={(v) => setAnswers((a) => ({ ...a, aadhaar: v as FormAnswers["aadhaar"] }))}
              />
            )}

            {step === 9 && (
              <OptionStep
                title={t.educationQ}
                items={educationItems}
                selectedValue={answers.educationLevel}
                onSelect={(v) => setAnswers((a) => ({ ...a, educationLevel: v as FormAnswers["educationLevel"] }))}
              />
            )}

            {errorMsg && (
              <p className="mt-4 rounded-xl border border-primary/40 bg-cream p-3 text-sm font-semibold text-primary">
                {errorMsg}
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="w-1/2 rounded-xl border-2 border-ink/20 bg-cream py-4 font-semibold text-ink disabled:opacity-50"
              >
                {t.back}
              </button>
              <button
                type="button"
                onClick={goNext}
                className={`w-1/2 rounded-xl bg-primary py-4 font-semibold text-white ${
                  !isValidStep ? "opacity-95" : ""
                }`}
              >
                {step === steps - 1 ? t.results : t.next}
              </button>
            </div>
          </motion.div>
        )}

        {phase === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border-2 border-ink/20 bg-card p-8 text-center"
          >
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-ink/20 border-t-primary" />
            <p className="mt-4 text-lg font-bold text-ink">{t.loading}</p>
            <p className="text-sm text-ink/80">{t.loadingSub}</p>
          </motion.div>
        )}

        {phase === "results" && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="rounded-2xl border-2 border-ink/20 bg-card p-4">
              <h3 className="text-xl font-bold text-ink">{t.results}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary">{t.aiSearchLabel}</p>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchSchemes}
                className="mt-2 w-full rounded-xl border-2 border-ink/20 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/60"
              />
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={speakResults}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
                >
                  {t.voiceRead}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep(0);
                    setPhase("form");
                    setResults([]);
                    setSearchQuery("");
                    setErrorMsg("");
                    setAnswers(initialFormAnswers);
                  }}
                  className="rounded-lg border-2 border-ink/20 bg-cream px-4 py-2 text-sm font-semibold text-ink"
                >
                  {t.startOver}
                </button>
              </div>
            </div>
            {filteredResults.length === 0 && (
              <p className="rounded-xl border border-ink/20 bg-card p-4 text-sm text-ink">{t.noSearchResults}</p>
            )}
            {filteredResults.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} language={language} t={t} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

