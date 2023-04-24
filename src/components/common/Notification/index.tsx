import clsx from "clsx";
import classes from "./Notification.module.scss";
import Portal from "../Portal";
import { useNotificationContext } from "@/context/NotificationContext";
import { useEffect } from "react";

const Notification = () => {
  const { notification, setNotification } = useNotificationContext();
  const { show, text, title, isError } = notification;

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setNotification({
          show: false,
          title: "",
          text: "",
          isError: false,
        });
      }, 4000);
    }
  }, [setNotification, show]);

  return (
    // <Portal>
      <section className={clsx(classes.section, show ? classes.show : null)}>
        {isError && (
          <div className={clsx(classes.alert, classes.alertDanger)}>
            <div className={classes.bg} />
            <h3 className={classes.alertTitle}>{title}</h3>
            <p className={classes.alertContent}>{text}</p>
          </div>
        )}
        {!isError && (
          <div className={clsx(classes.alert, classes.alertSuccess)}>
            <div className={classes.bg} />
            <h3 className={classes.alertTitle}>{title}</h3>
            <p className={classes.alertContent}>{text}</p>
          </div>
        )}
      </section>
    // </Portal>
  );
};

export default Notification;
