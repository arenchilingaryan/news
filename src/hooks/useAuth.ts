import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNotificationContext } from "@/context/NotificationContext";
import { useRouter } from "next/router";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const authInstance = getAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const { setNotification } = useNotificationContext();
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(
        authInstance,
        email,
        password
      );
      if (!res) {
        setNotification({
          isError: true,
          show: true,
          text: "Email or password is incorrect",
          title: "ERROR",
        });
      } else {
        router.push("/");
        setNotification({
          isError: false,
          show: true,
          text: "Signing in was successful",
          title: "Congratulations!",
        });
      }
    } catch (error) {
      setNotification({
        isError: true,
        show: true,
        text: "Email or password is incorrect",
        title: "ERROR",
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password
      );
      if (!res) {
        setNotification({
          isError: true,
          show: true,
          text: "Something went wrong",
          title: "ERROR",
        });
      } else {
        router.push("/");
        setNotification({
          isError: false,
          show: true,
          text: "Account has been created",
          title: "Congratulations!",
        });
      }
    } catch (error) {
      setNotification({
        isError: true,
        show: true,
        text: "Something went wrong",
        title: "ERROR",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    ...context,
    signIn,
    signUp,
    loading,
    error,
  };
};

export default useAuth;
