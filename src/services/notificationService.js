import { MOCK_NOTIFICATIONS } from "../constants/mockData";
import { simulateNetworkDelay } from "./api";
let notificationsState = [...MOCK_NOTIFICATIONS];
const notificationService = {
  async getNotifications() {
    return simulateNetworkDelay([...notificationsState]);
  },
  async markAsRead(id) {
    notificationsState = notificationsState.map(
      (n) => n.id === id ? { ...n, isRead: true } : n
    );
  },
  async markAllAsRead() {
    notificationsState = notificationsState.map((n) => ({ ...n, isRead: true }));
  }
};
export {
  notificationService
};
