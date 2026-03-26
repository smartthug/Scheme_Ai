export type Gender = "Male" | "Female" | "";

export type Occupation =
  | "Farmer"
  | "Student"
  | "Worker"
  | "Business"
  | "Unemployed"
  | "";

export type IncomeLevel =
  | "Below ₹10,000"
  | "₹10,000 – ₹25,000"
  | "Above ₹25,000"
  | "";

export type Category = "SC/ST" | "OBC" | "General" | "Don't know" | "";

export type Location = "Rural" | "Urban" | "";

export type Purpose =
  | "Money"
  | "Education"
  | "Farming"
  | "Health"
  | "Job"
  | "";

export type YesNo = "Yes" | "No" | "";

export type EducationLevel =
  | "Below 10th"
  | "10th–12th"
  | "Graduate"
  | "Postgraduate"
  | "";

export type SchemeScope = "All India" | "Select State" | "";

export interface FormAnswers {
  age: number | "";
  gender: Gender;
  occupation: Occupation;
  income: IncomeLevel;
  category: Category;
  location: Location;
  purpose: Purpose;
  scope: SchemeScope;
  state: string;
  bankAccount: YesNo;
  aadhaar: YesNo;
  educationLevel: EducationLevel;
}

export const initialFormAnswers: FormAnswers = {
  age: "",
  gender: "",
  occupation: "",
  income: "",
  category: "",
  location: "",
  purpose: "",
  scope: "",
  state: "",
  bankAccount: "",
  aadhaar: "",
  educationLevel: "",
};
