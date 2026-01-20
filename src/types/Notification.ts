// src/types/notification.ts
export type UserRole = "ADMIN" | "SELLER" | "CUSTOMER";

export interface Notification {
  _id: string;
  userId: string;
  role: UserRole;
  title: string;
  message: string;
  type: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}
