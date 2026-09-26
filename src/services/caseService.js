import { MOCK_CASES } from "../constants/mockData";
import { simulateNetworkDelay } from "./api";
import { generateHash } from "../utils/crypto";
let casesState = [...MOCK_CASES];
const caseService = {
  async getAllCases() {
    return simulateNetworkDelay([...casesState]);
  },
  async getCaseById(id) {
    const found = casesState.find((c) => c.id === id || c.caseNumber === id);
    return simulateNetworkDelay(found);
  },
  async createCase(newCase) {
    const docket = {
      id: newCase.caseNumber || `CR-2026-${Math.floor(1e3 + Math.random() * 9e3)}`,
      caseNumber: newCase.caseNumber || `#CR-2026-${Math.floor(1e3 + Math.random() * 9e3)}`,
      codeName: newCase.codeName || "Operation Vanguard",
      title: newCase.title || "Untitled Case Docket",
      summary: newCase.summary || "",
      priority: newCase.priority || "medium",
      status: "active",
      tier: newCase.tier || "Tier 2",
      dateOpened: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      jurisdiction: newCase.jurisdiction || "Special Investigations Division",
      leadInvestigator: newCase.leadInvestigator || "Det. Jack Miller",
      leadInvestigatorBadge: newCase.leadInvestigatorBadge || "#8042",
      chainOfCustodyVerified: true,
      custodyHash: generateHash(`CASE-${Date.now()}`),
      lastUpdated: "Just now",
      associatedPOIs: [],
      evidenceFiles: [],
      milestones: [
        {
          id: `ms-${Date.now()}`,
          timestamp: "Just now",
          type: "sensor_alert",
          title: "Case Initialized",
          description: "Case docket committed to immutable ledger.",
          severity: "primary"
        }
      ],
      notes: [],
      assignedAgents: []
    };
    casesState.unshift(docket);
    return simulateNetworkDelay(docket);
  },
  async addEvidenceFile(caseId, file) {
    const newFile = {
      id: `ev-${Date.now()}`,
      name: file.name || "Forensic_Evidence_Export.bin",
      type: file.type || "document",
      size: file.size || "14.2 MB",
      sha256: generateHash(`FILE-${file.name}-${Date.now()}`),
      legalStandard: file.legalStandard || "FRE 902(14)",
      uploadDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    casesState = casesState.map((c) => {
      if (c.id === caseId) {
        return {
          ...c,
          evidenceFiles: [newFile, ...c.evidenceFiles || []],
          lastUpdated: "Just now"
        };
      }
      return c;
    });
    return simulateNetworkDelay(newFile);
  },
  async addMilestone(caseId, milestone) {
    const newMs = {
      id: `ms-${Date.now()}`,
      timestamp: "Just now",
      type: milestone.type || "sensor_alert",
      title: milestone.title || "Operational Event Logged",
      description: milestone.description || "",
      severity: milestone.severity || "primary"
    };
    casesState = casesState.map((c) => {
      if (c.id === caseId) {
        return {
          ...c,
          milestones: [newMs, ...c.milestones || []],
          lastUpdated: "Just now"
        };
      }
      return c;
    });
    return simulateNetworkDelay(newMs);
  },
  async addNote(caseId, content, authorName, authorBadge) {
    const newNote = {
      id: `nt-${Date.now()}`,
      authorName,
      authorBadge,
      timestamp: "Just now",
      content,
      signatureHash: generateHash(`NOTE-${content}-${Date.now()}`, "SHA-512: 0x"),
      clearanceLevel: "SEC CLEARANCE 4"
    };
    casesState = casesState.map((c) => {
      if (c.id === caseId) {
        return {
          ...c,
          notes: [newNote, ...c.notes || []],
          lastUpdated: "Just now"
        };
      }
      return c;
    });
    return simulateNetworkDelay(newNote);
  }
};
export {
  caseService
};
