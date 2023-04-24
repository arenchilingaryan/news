import { createContext, useContext, useState } from 'react';

interface NotificationType {
  show: boolean;
  text: string;
  title: string;
  isError: boolean;
}

interface NotificationContextValue {
  notification: NotificationType;
  setNotification: (notification: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: React.PropsWithChildren) => {
  const [notification, setNotification] = useState<NotificationType>({
    show: false,
    text: '',
    title: '',
    isError: false
  });

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};