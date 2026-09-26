import { MOCK_GRAPH_DATA } from "../constants/mockData";
import { simulateNetworkDelay } from "./api";
const graphService = {
  async getGraphData(caseId) {
    return simulateNetworkDelay({ ...MOCK_GRAPH_DATA });
  },
  async applyCentralityMetric(metric) {
    const updatedNodes = MOCK_GRAPH_DATA.nodes.map((node) => {
      let multiplier = 1;
      if (metric === "degree") multiplier = (node.degree ?? 2) / 6;
      else if (metric === "betweenness") multiplier = node.centralityScore ?? 0.5;
      else if (metric === "closeness") multiplier = ((node.centralityScore ?? 0.5) + 0.1) / 1.1;
      return {
        ...node,
        radius: Math.max(20, Math.min(52, Math.round(24 + multiplier * 24)))
      };
    });
    return simulateNetworkDelay({
      ...MOCK_GRAPH_DATA,
      nodes: updatedNodes
    });
  },
  async filterEntities(types) {
    if (types.length === 0) return simulateNetworkDelay({ ...MOCK_GRAPH_DATA });
    const filteredNodes = MOCK_GRAPH_DATA.nodes.filter((n) => types.includes(n.type));
    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    const filteredEdges = MOCK_GRAPH_DATA.edges.filter(
      (e) => nodeIds.has(e.source) && nodeIds.has(e.target)
    );
    return simulateNetworkDelay({
      ...MOCK_GRAPH_DATA,
      nodes: filteredNodes,
      edges: filteredEdges
    });
  }
};
export {
  graphService
};
