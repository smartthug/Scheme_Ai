import type { FormAnswers, IncomeLevel, Occupation, Purpose } from "./types";

export interface LocalText {
  en: string;
  ta: string;
}

export interface SchemeDetail {
  id: string;
  name: LocalText;
  shortDescription: LocalText;
  benefits: LocalText;
  documents: LocalText[];
  applyWhere: "online" | "office" | "both";
  applyUrl: string;
  steps: LocalText[];
  stateTags?: string[];
}

export interface MatchedScheme extends SchemeDetail {
  score: number;
  aiExplanation: LocalText;
}

const LOW_INCOMES: IncomeLevel[] = ["Below ₹10,000", "₹10,000 – ₹25,000"];
const isLowIncome = (income: IncomeLevel) => LOW_INCOMES.includes(income);

const SCHEMES: SchemeDetail[] = [
  {
    id: "pm-kisan",
    name: { en: "PM-KISAN", ta: "பிஎம்-கிசான்" },
    shortDescription: { en: "Income support for farmers.", ta: "விவசாயிகளுக்கு வருமான உதவி." },
    benefits: { en: "Direct transfer support to farmer families.", ta: "விவசாயி குடும்பங்களுக்கு நேரடி பண உதவி." },
    documents: [{ en: "Land record", ta: "நில ஆவணம்" }, { en: "Aadhaar", ta: "ஆதார்" }, { en: "Bank passbook", ta: "வங்கி புத்தகம்" }],
    applyWhere: "online",
    applyUrl: "https://pmkisan.gov.in/",
    steps: [{ en: "Open PM-KISAN portal.", ta: "PM-KISAN தளம் திறக்கவும்." }, { en: "Fill details and submit.", ta: "விவரங்களை நிரப்பி சமர்ப்பிக்கவும்." }, { en: "Track application status.", ta: "விண்ணப்ப நிலையை பார்க்கவும்." }],
    stateTags: ["All"],
  },
  {
    id: "national-scholarship",
    name: { en: "National Scholarship", ta: "தேசிய கல்வி உதவித்தொகை" },
    shortDescription: { en: "Scholarship support for low-income students.", ta: "குறைந்த வருமான மாணவர்களுக்கு உதவித்தொகை." },
    benefits: { en: "Reduces education expenses.", ta: "கல்விச் செலவை குறைக்க உதவும்." },
    documents: [{ en: "Income certificate", ta: "வருமானச் சான்று" }, { en: "Marksheet", ta: "மதிப்பெண் பட்டியல்" }],
    applyWhere: "online",
    applyUrl: "https://scholarships.gov.in/",
    steps: [{ en: "Open NSP portal.", ta: "NSP தளத்தை திறக்கவும்." }, { en: "Register and choose scheme.", ta: "பதிவு செய்து திட்டத்தை தேர்வு செய்யவும்." }, { en: "Upload docs and submit.", ta: "ஆவணங்களை பதிவேற்றி சமர்ப்பிக்கவும்." }],
    stateTags: ["All"],
  },
  {
    id: "ayushman",
    name: { en: "Ayushman Bharat", ta: "ஆயுஷ்மான் பாரத்" },
    shortDescription: { en: "Health support for eligible families.", ta: "தகுதி உள்ள குடும்பங்களுக்கு சுகாதார உதவி." },
    benefits: { en: "Major hospital expenses are reduced.", ta: "மருத்துவ செலவுகள் குறையும்." },
    documents: [{ en: "Aadhaar", ta: "ஆதார்" }, { en: "Ration card", ta: "ரேஷன் கார்டு" }],
    applyWhere: "both",
    applyUrl: "https://www.pmjay.gov.in/",
    steps: [{ en: "Check eligibility online.", ta: "ஆன்லைனில் தகுதி பார்க்கவும்." }, { en: "Get card at center.", ta: "மையத்தில் அட்டை பெறவும்." }, { en: "Use in listed hospital.", ta: "அங்கீகரிக்கப்பட்ட மருத்துவமனையில் பயன்படுத்தவும்." }],
    stateTags: ["All"],
  },
  {
    id: "mgnrega",
    name: { en: "MGNREGA", ta: "MGNREGA" },
    shortDescription: { en: "Rural work guarantee support.", ta: "கிராமப்புற வேலை உறுதி உதவி." },
    benefits: { en: "Job and wage support in village.", ta: "கிராமத்தில் வேலை மற்றும் ஊதிய உதவி." },
    documents: [{ en: "Address proof", ta: "முகவரி சான்று" }, { en: "Aadhaar", ta: "ஆதார்" }],
    applyWhere: "office",
    applyUrl: "https://nrega.nic.in/",
    steps: [{ en: "Visit Panchayat office.", ta: "பஞ்சாயத்து அலுவலகத்துக்குச் செல்லவும்." }, { en: "Apply for job card.", ta: "வேலை அட்டைக்கு விண்ணப்பிக்கவும்." }, { en: "Request work.", ta: "வேலை கோரவும்." }],
    stateTags: ["All"],
  },
  {
    id: "skill-india",
    name: { en: "Skill India PMKVY", ta: "ஸ்கில் இந்தியா PMKVY" },
    shortDescription: { en: "Job skill training for youth.", ta: "இளைஞர்களுக்கு வேலைத் திறன் பயிற்சி." },
    benefits: { en: "Improves chances of employment.", ta: "வேலை வாய்ப்பை உயர்த்தும்." },
    documents: [{ en: "Aadhaar", ta: "ஆதார்" }, { en: "Education proof", ta: "கல்விச் சான்று" }],
    applyWhere: "online",
    applyUrl: "https://www.skillindia.gov.in/",
    steps: [{ en: "Open Skill India portal.", ta: "Skill India தளத்தை திறக்கவும்." }, { en: "Select training center.", ta: "பயிற்சி மையம் தேர்வு செய்யவும்." }, { en: "Enroll and complete training.", ta: "சேர்ந்து பயிற்சியை முடிக்கவும்." }],
    stateTags: ["All"],
  },
  {
    id: "tn-farmer",
    name: { en: "Tamil Nadu Farmer Welfare", ta: "தமிழ்நாடு விவசாயி நலத் திட்டம்" },
    shortDescription: { en: "State scheme for Tamil Nadu farmers.", ta: "தமிழ்நாடு விவசாயிகளுக்கான மாநில திட்டம்." },
    benefits: { en: "Extra state support and subsidy.", ta: "கூடுதல் மாநில மானியம் மற்றும் உதவி." },
    documents: [{ en: "Farmer ID", ta: "விவசாயி அட்டை" }, { en: "Aadhaar", ta: "ஆதார்" }],
    applyWhere: "office",
    applyUrl: "https://www.tn.gov.in/",
    steps: [{ en: "Visit agriculture office.", ta: "வேளாண்மை அலுவலகத்துக்குச் செல்லவும்." }, { en: "Submit details.", ta: "விவரங்களை சமர்ப்பிக்கவும்." }, { en: "Track status.", ta: "நிலையை சரிபார்க்கவும்." }],
    stateTags: ["Tamil Nadu"],
  },
  {
    id: "pm-kusum",
    name: { en: "PM-KUSUM (Solar for Farmers)", ta: "பிஎம்-குஸும் (சூரிய உதவி)" },
    shortDescription: { en: "Support to install solar pumps for farming.", ta: "விவசாயத்திற்கு சூரிய பம்புகளை அமைக்க உதவி." },
    benefits: { en: "Reduces electricity cost for irrigation.", ta: "மின்சார செலவை குறைக்க உதவும்." },
    documents: [{ en: "Land record", ta: "நில ஆவணம்" }, { en: "Aadhaar", ta: "ஆதார்" }, { en: "Bank passbook", ta: "வங்கி புத்தகம்" }],
    applyWhere: "both",
    applyUrl: "https://pmkusum.mnre.gov.in/",
    steps: [
      { en: "Find your state KUSUM portal/office info.", ta: "உங்கள் மாநிலத்தில் KUSUM தளம்/அலுவலக தகவலை காணவும்." },
      { en: "Fill the farmer solar pump application.", ta: "விவசாயி சூரிய பம்ப் விண்ணப்பத்தை நிரப்பவும்." },
      { en: "Submit documents and track approval.", ta: "ஆவணங்களை சமர்ப்பித்து ஒப்புதல் நிலையை பார்க்கவும்." },
    ],
    stateTags: ["All"],
  },
  {
    id: "pm-kisan-credit",
    name: { en: "Kisan Credit Card (KCC)", ta: "விவசாய கடன் அட்டை (KCC)" },
    shortDescription: { en: "Loan support for farmers through banks.", ta: "வங்கிகள் மூலம் விவசாயிகளுக்கு கடன் உதவி." },
    benefits: { en: "Helps during crop needs at easier interest.", ta: "பயிர் தேவைகளுக்கு எளிய வட்டியில் உதவும்." },
    documents: [{ en: "Land documents", ta: "நில ஆவணங்கள்" }, { en: "Aadhaar", ta: "ஆதார்" }, { en: "Bank account", ta: "வங்கி கணக்கு" }],
    applyWhere: "both",
    applyUrl: "https://www.nabard.org/",
    steps: [
      { en: "Apply at a nearby bank branch.", ta: "அருகிலுள்ள வங்கி கிளையில் விண்ணப்பிக்கவும்." },
      { en: "Fill KCC form with land and crop details.", ta: "நிலம் மற்றும் பயிர் விவரங்களுடன் KCC படிவத்தை நிரப்பவும்." },
      { en: "Bank verifies and issues the card.", ta: "வங்கி சரிபார்த்து அட்டையை வழங்கும்." },
    ],
    stateTags: ["All"],
  },
  {
    id: "pm-svanidhi",
    name: { en: "PM SVANidhi (Street Vendors)", ta: "பிஎம் ஸ்வானிதி (கடை வியாபாரிகள்)" },
    shortDescription: { en: "Small loans for street vendors in cities.", ta: "நகரங்களில் கடை வியாபாரிகளுக்கு சிறு கடன்." },
    benefits: { en: "Helps start or grow your business.", ta: "வியாபாரம் தொடங்க/வளர உதவும்." },
    documents: [{ en: "ID proof", ta: "அடையாள சான்று" }, { en: "Local body proof", ta: "உள்ளூர் சான்று" }, { en: "Bank account", ta: "வங்கி கணக்கு" }],
    applyWhere: "online",
    applyUrl: "https://svanidhi.mohua.gov.in/",
    steps: [
      { en: "Go to the PM SVANidhi portal.", ta: "PM SVANidhi தளத்துக்குச் செல்லவும்." },
      { en: "Register with local body proof.", ta: "உள்ளூர் சான்றுடன் பதிவு செய்யவும்." },
      { en: "Apply for loan and track status.", ta: "கடனுக்கு விண்ணப்பித்து நிலையை கண்காணிக்கவும்." },
    ],
    stateTags: ["All"],
  },
  {
    id: "pmay",
    name: { en: "PM Awas Yojana (PMAY-U/Gramin)", ta: "பிஎம் ஆவாஸ் யோஜனா (PMAY)" },
    shortDescription: { en: "Support for housing for eligible families.", ta: "தகுதி உள்ள குடும்பங்களுக்கு வீட்டு உதவி." },
    benefits: { en: "Helps with affordable home improvement/building.", ta: "குறைந்த செலவில் வீட்டு மேம்பாடு/கட்டுமானத்திற்கு உதவும்." },
    documents: [{ en: "Aadhaar", ta: "ஆதார்" }, { en: "Income certificate", ta: "வருமானச் சான்று" }, { en: "Address proof", ta: "முகவரி சான்று" }],
    applyWhere: "office",
    applyUrl: "https://pmaymis.gov.in/",
    steps: [
      { en: "Check your eligibility through local office.", ta: "உங்கள் தகுதியை உள்ளூர் அலுவலகத்தில் பார்க்கவும்." },
      { en: "Submit form with required documents.", ta: "தேவையான ஆவணங்களுடன் படிவத்தை சமர்ப்பிக்கவும்." },
      { en: "Track application progress.", ta: "விண்ணப்ப முன்னேற்றத்தை பார்க்கவும்." },
    ],
    stateTags: ["All"],
  },
  {
    id: "ujjwala",
    name: { en: "Ujjwala Yojana", ta: "உஜ்ஜ்வாலா யோஜனா" },
    shortDescription: { en: "Financial help for LPG connection for low-income families.", ta: "குறைந்த வருமான குடும்பங்களுக்கு LPG இணைப்பு உதவி." },
    benefits: { en: "Safer cooking with clean fuel support.", ta: "சுத்தமான எரிபொருள் மூலம் பாதுகாப்பான சமையல்." },
    documents: [{ en: "Aadhaar", ta: "ஆதார்" }, { en: "Ration card/income proof", ta: "ரேஷன் கார்டு/வருமானச் சான்று" }],
    applyWhere: "both",
    applyUrl: "https://www.pmuy.gov.in/",
    steps: [
      { en: "Apply through distributor or local office/online.", ta: "டிஸ்ட்ரிப்யூட்டர் அல்லது உள்ளூர் அலுவலகம்/ஆன்லைனில் விண்ணப்பிக்கவும்." },
      { en: "Submit documents for verification.", ta: "சரிபார்ப்புக்கான ஆவணங்களை சமர்ப்பிக்கவும்." },
      { en: "After approval, get LPG connection.", ta: "ஒப்புதலுக்குப் பிறகு LPG இணைப்பு பெறவும்." },
    ],
    stateTags: ["All"],
  },
];

function scoreScheme(scheme: SchemeDetail, answers: FormAnswers): { score: number; match: boolean } {
  let score = 0;
  let match = false;
  const occ = answers.occupation as Occupation;
  const pur = answers.purpose as Purpose;
  const inc = answers.income as IncomeLevel;

  if (scheme.id === "pm-kisan" || scheme.id === "tn-farmer") {
    if (occ === "Farmer") {
      score += 4;
      match = true;
    }
    if (pur === "Farming" || pur === "Money") score += 2;
    if (isLowIncome(inc)) score += 1;
  }
  if (scheme.id === "pm-kusum") {
    if (occ === "Farmer") {
      score += 3;
      match = true;
    }
    if (pur === "Farming") score += 2;
    if (isLowIncome(inc)) score += 1;
  }
  if (scheme.id === "pm-kisan-credit") {
    if (occ === "Farmer") {
      score += 4;
      match = true;
    }
    if (pur === "Farming" || pur === "Money") score += 2;
    if (isLowIncome(inc)) score += 1;
  }
  if (scheme.id === "national-scholarship") {
    if (occ === "Student") {
      score += 4;
      match = true;
    }
    if (pur === "Education") score += 2;
    if (isLowIncome(inc)) score += 2;
  }
  if (scheme.id === "ayushman") {
    if (pur === "Health") {
      score += 4;
      match = true;
    }
    if (isLowIncome(inc)) score += 1;
  }
  if (scheme.id === "mgnrega") {
    if (answers.location === "Rural") {
      score += 3;
      match = true;
    }
    if (occ === "Unemployed" || occ === "Worker") score += 2;
  }
  if (scheme.id === "pm-svanidhi") {
    if (occ === "Business") {
      score += 4;
      match = true;
    }
    if (answers.location === "Urban") score += 2;
    if (pur === "Money") score += 1;
  }
  if (scheme.id === "pmay") {
    if (isLowIncome(inc)) {
      score += 3;
      match = true;
    }
    if (pur === "Money") score += 1;
    if (answers.location === "Urban" || answers.location === "Rural") score += 0.5;
  }
  if (scheme.id === "ujjwala") {
    if (isLowIncome(inc)) {
      score += 3;
      match = true;
    }
    if (pur === "Money") score += 1;
  }
  if (scheme.id === "skill-india") {
    if (pur === "Job" || occ === "Unemployed" || occ === "Student") {
      score += 3;
      match = true;
    }
  }
  if (scheme.id === "tn-farmer" && answers.state === "Tamil Nadu") score += 2;

  if (answers.bankAccount === "Yes") score += 0.5;
  if (answers.aadhaar === "Yes") score += 0.5;
  return { score, match };
}

export function matchSchemes(answers: FormAnswers): MatchedScheme[] {
  const byState = SCHEMES.filter((s) => {
    if (answers.scope === "All India" || !answers.state) return true;
    if (!s.stateTags || s.stateTags.length === 0) return true;
    return s.stateTags.includes("All") || s.stateTags.includes(answers.state);
  });

  const scored = byState
    .map((scheme) => {
      const { score, match } = scoreScheme(scheme, answers);
      return {
        ...scheme,
        score,
        match,
        aiExplanation: {
          en: `You may be eligible because your profile matches ${scheme.name.en}. This can reduce your expenses.`,
          ta: `உங்கள் விவரங்கள் ${scheme.name.ta} திட்டத்துடன் பொருந்துகின்றன. இது உங்கள் செலவை குறைக்க உதவும்.`,
        },
      };
    })
    .sort((a, b) => b.score - a.score);

  const strong = scored
    .filter((s) => s.match && s.score >= 3)
    .map(({ match: _m, ...rest }) => rest);
  if (strong.length > 0) return strong;
  // If nothing matches strongly, show all ranked suggestions (no hard cap)
  return scored
    .filter((s) => s.score > 0)
    .map(({ match: _m, ...rest }) => rest);
}
