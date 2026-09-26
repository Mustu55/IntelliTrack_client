import { MOCK_DATA_FEEDS } from "../constants/mockData";
import { simulateNetworkDelay } from "./api";
let feedsState = [...MOCK_DATA_FEEDS];
const feedService = {
  async getFeeds() {
    return simulateNetworkDelay([...feedsState]);
  },
  async toggleFeedStatus(feedId) {
    feedsState = feedsState.map((f) => {
      if (f.id === feedId) {
        const nextStatus = f.status === "operational" ? "syncing" : "operational";
        return {
          ...f,
          status: nextStatus,
          lastSyncTimestamp: "Just now"
        };
      }
      return f;
    });
    const updated = feedsState.find((f) => f.id === feedId);
    return simulateNetworkDelay(updated);
  }
};
export {
  feedService
};
