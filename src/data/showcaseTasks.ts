export interface TaskFile {
  name: string;
  type: "docx" | "xlsx" | "pdf" | "png" | "jpg" | "jpeg" | "mp4" | "mp3" | "xml";
  path: string;
  viewPath?: string;
}

export interface RubricCriterion {
  name: string;
  points: number;
  description: string;
}

export interface ShowcaseTask {
  id: string;
  title: string;
  occupation: string;
  industry: string;
  summary: string;
  fullInstructionPath: string;
  estimatedHours: number;
  totalPoints: number;
  rubric: RubricCriterion[];
  inputFiles: TaskFile[];
  outputFiles: TaskFile[];
}

const BASE = "tasks";

export const showcaseTasks: ShowcaseTask[] = [
  {
    id: "thai-arbitration-legal-research",
    title: "Thai Arbitration Legal Research",
    occupation: "Lawyers",
    industry: "Legal Services",
    summary:
      "Analyze an international arbitration dispute involving Singapore and Thai law. Research legal precedents, identify sub-issues, and produce a structured legal memorandum with cited international decisions.",
    fullInstructionPath: `${BASE}/thai-arbitration-legal-research/instruction.html`,
    estimatedHours: 7,
    totalPoints: 40,
    rubric: [
      { name: "Relevancy of Judgements", points: 10, description: "Cites relevant international decisions with proper citations" },
      { name: "Comprehensiveness", points: 10, description: "Thorough review of each legal issue with primary and secondary authorities" },
      { name: "Accuracy", points: 10, description: "Verified, current sources with accurate legal citations" },
      { name: "Integration & Review", points: 10, description: "Connects case law to facts with persuasive analysis" },
    ],
    inputFiles: [
      { name: "facts.docx", type: "docx", path: `${BASE}/thai-arbitration-legal-research/input/facts.docx`, viewPath: `${BASE}/thai-arbitration-legal-research/input/facts.html` },
    ],
    outputFiles: [
      { name: "solutions.docx", type: "docx", path: `${BASE}/thai-arbitration-legal-research/output/solutions.docx`, viewPath: `${BASE}/thai-arbitration-legal-research/output/solutions.html` },
    ],
  },
  {
    id: "early-retirement-plan",
    title: "Early Retirement Financial Plan",
    occupation: "Financial Advisors",
    industry: "Finance & Insurance",
    summary:
      "Develop a comprehensive financial plan for a 58-year-old client evaluating an early retirement package. Analyze retirement accounts, Social Security strategies, tax implications, and produce a planning model with a written recommendation.",
    fullInstructionPath: `${BASE}/early-retirement-plan/instruction.html`,
    estimatedHours: 7,
    totalPoints: 30,
    rubric: [
      { name: "Analytical Rigor & Model Accuracy", points: 10, description: "Accurate financial projections and calculations" },
      { name: "Comprehensiveness & Integration", points: 10, description: "Covers all financial dimensions with integrated analysis" },
      { name: "Professional Judgment & Communication", points: 10, description: "Clear recommendations with sound reasoning" },
    ],
    inputFiles: [
      { name: "client_profile.docx", type: "docx", path: `${BASE}/early-retirement-plan/input/client_profile.docx`, viewPath: `${BASE}/early-retirement-plan/input/client_profile.html` },
      { name: "current_financial_statements.xlsx", type: "xlsx", path: `${BASE}/early-retirement-plan/input/current_financial_statements.xlsx`, viewPath: `${BASE}/early-retirement-plan/input/current_financial_statements.html` },
      { name: "goals_worksheet.docx", type: "docx", path: `${BASE}/early-retirement-plan/input/goals_worksheet.docx`, viewPath: `${BASE}/early-retirement-plan/input/goals_worksheet.html` },
      { name: "insurance_policies.docx", type: "docx", path: `${BASE}/early-retirement-plan/input/insurance_policies.docx`, viewPath: `${BASE}/early-retirement-plan/input/insurance_policies.html` },
      { name: "retirement_accounts.xlsx", type: "xlsx", path: `${BASE}/early-retirement-plan/input/retirement_accounts.xlsx`, viewPath: `${BASE}/early-retirement-plan/input/retirement_accounts.html` },
      { name: "severance_package.docx", type: "docx", path: `${BASE}/early-retirement-plan/input/severance_package.docx`, viewPath: `${BASE}/early-retirement-plan/input/severance_package.html` },
      { name: "social_security_statements.docx", type: "docx", path: `${BASE}/early-retirement-plan/input/social_security_statements.docx`, viewPath: `${BASE}/early-retirement-plan/input/social_security_statements.html` },
      { name: "tax_summary.xlsx", type: "xlsx", path: `${BASE}/early-retirement-plan/input/tax_summary.xlsx`, viewPath: `${BASE}/early-retirement-plan/input/tax_summary.html` },
    ],
    outputFiles: [
      { name: "Financial_Planning_Model.xlsx", type: "xlsx", path: `${BASE}/early-retirement-plan/output/Financial_Planning_Model.xlsx`, viewPath: `${BASE}/early-retirement-plan/output/Financial_Planning_Model.html` },
      { name: "Recommendation_Memo.pdf", type: "pdf", path: `${BASE}/early-retirement-plan/output/Recommendation_Memo.pdf` },
    ],
  },
  {
    id: "fashion-brand-tech-teaser",
    title: "Fashion Brand Tech Teaser Video",
    occupation: "Film & Video Editors",
    industry: "Media & Information",
    summary:
      "Create a short cinematic video for a fashion brand's AirFlex line. Produce cloth motion, macro particle effects, and logo reveals with professional lighting and depth of field transitions.",
    fullInstructionPath: `${BASE}/fashion-brand-tech-teaser/instruction.html`,
    estimatedHours: 7,
    totalPoints: 40,
    rubric: [
      { name: "Visual Quality & Aesthetics", points: 10, description: "Professional-grade visual output and composition" },
      { name: "Animation Concepts", points: 10, description: "Cloth motion, particle effects, and camera movement" },
      { name: "Variation & Creativity", points: 10, description: "Creative interpretation and unique visual elements" },
      { name: "Lighting & Technical Execution", points: 10, description: "Proper lighting, materials, and technical polish" },
    ],
    inputFiles: [
      { name: "KavaraLogo.png", type: "png", path: `${BASE}/fashion-brand-tech-teaser/input/KavaraLogo.png` },
    ],
    outputFiles: [
      { name: "KAVARA CLOTH.mp4", type: "mp4", path: `${BASE}/fashion-brand-tech-teaser/output/KAVARA CLOTH.mp4` },
    ],
  },
  {
    id: "dermatology-cases-analysis",
    title: "Dermatology Cases Diagnosis",
    occupation: "Doctors",
    industry: "Healthcare",
    summary:
      "Diagnose seven dermatological cases at a health camp screening. Analyze clinical images, histopathology slides, and patient histories to produce diagnosis reports with treatment plans.",
    fullInstructionPath: `${BASE}/dermatology-cases-analysis/instruction.html`,
    estimatedHours: 7,
    totalPoints: 30,
    rubric: [
      { name: "Final Diagnosis", points: 10, description: "Correct identification of each dermatological condition" },
      { name: "Laboratory & Histopathological Examination", points: 10, description: "Appropriate lab tests and histopathology interpretation" },
      { name: "Treatment & Follow-up", points: 10, description: "Evidence-based treatment plans and follow-up protocols" },
    ],
    inputFiles: [
      { name: "patient_one_clinical.jpeg", type: "jpeg", path: `${BASE}/dermatology-cases-analysis/input/patient_one_clinical.jpeg` },
      { name: "patient_one_info.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/input/patient_one_info.pdf` },
      { name: "patient_two_clinical.jpeg", type: "jpeg", path: `${BASE}/dermatology-cases-analysis/input/patient_two_clinical.jpeg` },
      { name: "patient_two_histo.png", type: "png", path: `${BASE}/dermatology-cases-analysis/input/patient_two_histo.png` },
      { name: "patient_two_info.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/input/patient_two_info.pdf` },
      { name: "patient_three_clinical_image.png", type: "png", path: `${BASE}/dermatology-cases-analysis/input/patient_three_clinical_image.png` },
      { name: "patient_three_histo.png", type: "png", path: `${BASE}/dermatology-cases-analysis/input/patient_three_histo.png` },
      { name: "patient_three_info.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/input/patient_three_info.pdf` },
      { name: "patient_four_clinical_image.jpeg", type: "jpeg", path: `${BASE}/dermatology-cases-analysis/input/patient_four_clinical_image.jpeg` },
      { name: "patient_four_histo.png", type: "png", path: `${BASE}/dermatology-cases-analysis/input/patient_four_histo.png` },
      { name: "patient_four_info.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/input/patient_four_info.pdf` },
      { name: "patient_five_clinical_image.jpeg", type: "jpeg", path: `${BASE}/dermatology-cases-analysis/input/patient_five_clinical_image.jpeg` },
      { name: "patient_five_info.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/input/patient_five_info.pdf` },
      { name: "patient_six_histo.jpeg", type: "jpeg", path: `${BASE}/dermatology-cases-analysis/input/patient_six_histo.jpeg` },
      { name: "patient_six_info.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/input/patient_six_info.pdf` },
      { name: "patient_seven_info.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/input/patient_seven_info.pdf` },
    ],
    outputFiles: [
      { name: "patient_one_diagnosis.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/output/patient_one_diagnosis.pdf` },
      { name: "patient_two_diagnosis.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/output/patient_two_diagnosis.pdf` },
      { name: "patient_three_diagnosis.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/output/patient_three_diagnosis.pdf` },
      { name: "patient_four_diagnosis.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/output/patient_four_diagnosis.pdf` },
      { name: "patient_five_diagnosis.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/output/patient_five_diagnosis.pdf` },
      { name: "patient_six_diagnosis.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/output/patient_six_diagnosis.pdf` },
      { name: "patient_seven_diagnosis.pdf", type: "pdf", path: `${BASE}/dermatology-cases-analysis/output/patient_seven_diagnosis.pdf` },
    ],
  },
  {
    id: "wing-aero-performance",
    title: "Hypercar Wing Aero Performance",
    occupation: "Mechanical Engineers",
    industry: "Manufacturing",
    summary:
      "Perform CFD analysis on a hypercar rear wing using Ansys Fluent. Calculate downforce, drag, and pressure distributions at multiple speeds, including flow control effects from high-velocity jet actuation.",
    fullInstructionPath: `${BASE}/wing-aero-performance/instruction.html`,
    estimatedHours: 7,
    totalPoints: 30,
    rubric: [
      { name: "Aerodynamic, CFD & Engineering Accuracy", points: 10, description: "Correct aerodynamic calculations and CFD methodology" },
      { name: "Force, Load, Flow-Control & Result Integrity", points: 10, description: "Accurate force/load values with flow control analysis" },
      { name: "Output Presentation & Documentation", points: 10, description: "Clear engineering documentation with proper units" },
    ],
    inputFiles: [
      { name: "CAD details.pdf", type: "pdf", path: `${BASE}/wing-aero-performance/input/CAD details.pdf` },
    ],
    outputFiles: [
      { name: "150.png", type: "png", path: `${BASE}/wing-aero-performance/output/150.png` },
      { name: "150 velocity.png", type: "png", path: `${BASE}/wing-aero-performance/output/150 velocity.png` },
      { name: "200.png", type: "png", path: `${BASE}/wing-aero-performance/output/200.png` },
      { name: "200 velocity.png", type: "png", path: `${BASE}/wing-aero-performance/output/200 velocity.png` },
      { name: "250.png", type: "png", path: `${BASE}/wing-aero-performance/output/250.png` },
      { name: "250 velocity.png", type: "png", path: `${BASE}/wing-aero-performance/output/250 velocity.png` },
      { name: "Lift.png", type: "png", path: `${BASE}/wing-aero-performance/output/Lift.png` },
      { name: "Drag.png", type: "png", path: `${BASE}/wing-aero-performance/output/Drag.png` },
      { name: "Pressure Contour.png", type: "png", path: `${BASE}/wing-aero-performance/output/Pressure Contour.png` },
      { name: "Velocity Contour.png", type: "png", path: `${BASE}/wing-aero-performance/output/Velocity Contour.png` },
      { name: "contour-1.png", type: "png", path: `${BASE}/wing-aero-performance/output/contour-1.png` },
      { name: "contour-2.png", type: "png", path: `${BASE}/wing-aero-performance/output/contour-2.png` },
      { name: "pathlines-1.png", type: "png", path: `${BASE}/wing-aero-performance/output/pathlines-1.png` },
      { name: "output doc v3.pdf", type: "pdf", path: `${BASE}/wing-aero-performance/output/output doc v3.pdf` },
      { name: "report.xml", type: "xml", path: `${BASE}/wing-aero-performance/output/report.xml` },
    ],
  },
  {
    id: "cinematic-trailer-bgm",
    title: "Cinematic Trailer BGM",
    occupation: "Audio Technicians",
    industry: "Media & Information",
    summary:
      "Produce a cinematic background music score for a fantasy trailer. Edit, arrange, mix, and master orchestral and drum stems into a suspenseful theme with dark orchestration and epic atmosphere.",
    fullInstructionPath: `${BASE}/cinematic-trailer-bgm/instruction.html`,
    estimatedHours: 7,
    totalPoints: 30,
    rubric: [
      { name: "Musical Arrangement & Mood", points: 10, description: "Effective tension building with appropriate orchestration" },
      { name: "Sound Design & Mixing Quality", points: 10, description: "Clean mix with balanced dynamics and spatial depth" },
      { name: "Mastering & Final Polish", points: 10, description: "Professional loudness, clarity, and cohesive sound" },
    ],
    inputFiles: [
      { name: "drumsnbass.mp3", type: "mp3", path: `${BASE}/cinematic-trailer-bgm/input/drumsnbass.mp3` },
      { name: "piano&orchest.mp3", type: "mp3", path: `${BASE}/cinematic-trailer-bgm/input/piano&orchest.mp3` },
    ],
    outputFiles: [
      { name: "output.mp3", type: "mp3", path: `${BASE}/cinematic-trailer-bgm/output/output.mp3` },
    ],
  },
];
