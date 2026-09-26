import { MOCK_LEDGER_BLOCKS } from "../constants/mockData";
import { simulateNetworkDelay } from "./api";
import { computeMerkleRoot } from "../utils/crypto";
let ledgerState = [...MOCK_LEDGER_BLOCKS];
const auditService = {
  async getLedgerBlocks() {
    return simulateNetworkDelay([...ledgerState]);
  },
  async verifyMerkleIntegrity() {
    const hashes = ledgerState.map((b) => b.eventHash);
    const root = computeMerkleRoot(hashes);
    return simulateNetworkDelay({
      verified: true,
      computedRoot: root,
      expectedRoot: root,
      totalBlocksChecked: ledgerState.length,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      hsmSealValid: true
    }, 600);
  },
  async logEvent(actionCode, targetDocket, actorBadge, actorRole) {
    const prevBlock = ledgerState[0];
    const newBlockNumber = prevBlock ? prevBlock.blockNumber + 1 : 94822;
    const newBlock = {
      blockNumber: newBlockNumber,
      blockId: `#${newBlockNumber.toLocaleString()}-E`,
      timestampZulu: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19) + " UTC",
      actorId: "usr-active",
      actorBadge,
      actorRole,
      actionCode,
      targetDocket,
      partitionNode: "DOM-SEC-0498",
      eventHash: `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
      previousBlockHash: prevBlock ? prevBlock.eventHash : "0x0000",
      merkleLeafIndex: ledgerState.length,
      complianceRule: "CJIS 5.4 / 28 CFR Part 23"
    };
    ledgerState.unshift(newBlock);
    return simulateNetworkDelay(newBlock);
  }
};
export {
  auditService
};
