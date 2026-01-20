// src/api/notification.api.ts
import axios from "axios";
import type { Notification } from "../types/Notification";

export const getNotifications = async (): Promise<Notification[]> => {
  const res = await axios.get("/api/notifications", { withCredentials: true });
  return res.data;
};

export const markAsRead = async (id: string): Promise<void> => {
  await axios.put(`/api/notifications/${id}/read`);
};
