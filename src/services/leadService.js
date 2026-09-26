import { MOCK_LEADS } from "../constants/mockData";
import { simulateNetworkDelay } from "./api";
let leadsState = [...MOCK_LEADS];
const leadService = {
  async getLeads() {
    return simulateNetworkDelay([...leadsState]);
  },
  async updateTriageStatus(leadId, status, assignedDetective) {
    leadsState = leadsState.map((lead) => {
      if (lead.id === leadId) {
        return {
          ...lead,
          triageStatus: status,
          assignedDetective: assignedDetective || lead.assignedDetective
        };
      }
      return lead;
    });
    const updated = leadsState.find((l) => l.id === leadId);
    return simulateNetworkDelay(updated);
  }
};
export {
  leadService
};
