import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Redux Toolkit/Store";
import { fetchNotifications, markNotificationRead } from "../Redux Toolkit/Features/Notification/notificationSlice";

export const useNotification = () => {
  const dispatch = useAppDispatch();
  const { items, unreadCount, loading } = useAppSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(fetchNotifications());

    const interval = setInterval(() => {
      dispatch(fetchNotifications());
    }, 8000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const markRead = (id: string) => {
    dispatch(markNotificationRead(id));
  };

  return {
    notifications: items,
    unreadCount,
    loading,
    markRead,
  };
};
