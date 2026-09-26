import React, { createContext, useContext, useState } from "react";
const ACTIVE_CASES_ROSTER = [
  {
    id: "case-1",
    caseNumber: "FED-2026-8812",
    title: "OPERATION BLACK BRIAR: Hawala & Burner Telephony Cartel",
    classification: "TOP SECRET // NOFORN // FRE 902(14)",
    status: "ACTIVE",
    leadInvestigator: "Special Agent Elena Rostova",
    badgeNumber: "INV-4421",
    entitiesCount: 48,
    relationshipsCount: 114,
    activeLeadsCount: 12,
    sourcesCount: 7,
    grandJuryProtected: true,
    priority: "CRITICAL"
  },
  {
    id: "case-2",
    caseNumber: "FED-2026-4401",
    title: "OPERATION NIGHTFALL: Cross-Border Synthetic Narcotics Ring",
    classification: "LAW ENFORCEMENT SENSITIVE // TITLE 18",
    status: "ACTIVE",
    leadInvestigator: "SAIC Marcus Vance",
    badgeNumber: "FED-0982",
    entitiesCount: 32,
    relationshipsCount: 68,
    activeLeadsCount: 8,
    sourcesCount: 5,
    grandJuryProtected: false,
    priority: "HIGH"
  },
  {
    id: "case-3",
    caseNumber: "FED-2026-1190",
    title: "OPERATION VIPER: Darknet Arms Trafficking & Shell Accounts",
    classification: "SECRET // FINCEN TASK FORCE",
    status: "PENDING",
    leadInvestigator: "Agent David Kovic",
    badgeNumber: "FED-3120",
    entitiesCount: 24,
    relationshipsCount: 42,
    activeLeadsCount: 5,
    sourcesCount: 4,
    grandJuryProtected: true,
    priority: "MEDIUM"
  }
];
const CaseContext = createContext(void 0);
const CaseProvider = ({ children }) => {
  const [activeCaseId, setActiveCaseIdState] = useState("case-1");
  const activeCase = ACTIVE_CASES_ROSTER.find((c) => c.id === activeCaseId) || ACTIVE_CASES_ROSTER[0];
  const setActiveCaseId = (id) => {
    setActiveCaseIdState(id);
  };
  return /* @__PURE__ */ React.createElement(
    CaseContext.Provider,
    {
      value: {
        activeCase,
        allCases: ACTIVE_CASES_ROSTER,
        setActiveCaseId
      }
    },
    children
  );
};
const useActiveCase = () => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error("useActiveCase must be used within a CaseProvider");
  }
  return context;
};
export {
  ACTIVE_CASES_ROSTER,
  CaseProvider,
  useActiveCase
};
