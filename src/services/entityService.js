import { MOCK_POIS } from "../constants/mockData";
import { simulateNetworkDelay } from "./api";
import { generateHash } from "../utils/crypto";
let poisState = [...MOCK_POIS];
const entityService = {
  async getAllPOIs() {
    return simulateNetworkDelay([...poisState]);
  },
  async getPOIById(id) {
    const found = poisState.find((p) => p.id === id);
    return simulateNetworkDelay(found);
  },
  async createPOI(newPoi) {
    const id = `POI-${Math.floor(1e4 + Math.random() * 9e4)}`;
    const poi = {
      id,
      partitionId: "DOM-SEC-0498",
      legalName: newPoi.legalName || "Unknown Legal Subject",
      primaryAlias: newPoi.primaryAlias || "Subject X",
      aliases: newPoi.aliases || [],
      dob: newPoi.dob || "1985-01-01",
      gender: newPoi.gender || "unknown",
      nationalId: newPoi.nationalId || "XXX-XX-XXXX",
      passportNumber: newPoi.passportNumber,
      telecoms: newPoi.telecoms || [],
      emails: newPoi.emails || [],
      dropAddresses: newPoi.dropAddresses || [],
      biometrics: newPoi.biometrics || {
        heightCm: 180,
        weightKg: 75,
        eyeColor: "Brown",
        hairColor: "Black",
        distinguishingMarks: "",
        facialVectorHash: generateHash(`BIO-FACE-${id}`),
        fingerprintHash: generateHash(`BIO-FP-${id}`),
        biometricConfidence: 0.92
      },
      riskLevel: newPoi.riskLevel || "medium",
      typologies: newPoi.typologies || ["Transnational Organized Crime"],
      remarksMO: newPoi.remarksMO || "",
      associatedCaseIds: newPoi.associatedCaseIds || [],
      resolutionStatus: "candidate_match",
      entityMatchConfidence: 0.85,
      candidateMatches: [
        {
          matchedEntityId: "POI-88219",
          matchedName: "Konstantin Valkov",
          overallConfidence: 0.88,
          phoneticScore: 0.92,
          telecomScore: 0.84,
          biometricScore: 0.88,
          reasons: ["Co-location at Dry Dock 3", "Shared CDR routing cluster", "Jaro-Winkler Soundex phonetic correlation"]
        }
      ],
      registrationDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      custodialHash: generateHash(`POI-CUSTODY-${id}`)
    };
    poisState.unshift(poi);
    return simulateNetworkDelay(poi);
  },
  async resolveCandidateMatch(poiId, matchedEntityId) {
    poisState = poisState.map((p) => {
      if (p.id === poiId) {
        return {
          ...p,
          resolutionStatus: "resolved",
          entityMatchConfidence: 0.98,
          aliases: Array.from(/* @__PURE__ */ new Set([...p.aliases, `Linked:${matchedEntityId}`]))
        };
      }
      return p;
    });
    const updated = poisState.find((p) => p.id === poiId);
    return simulateNetworkDelay(updated);
  }
};
export {
  entityService
};
