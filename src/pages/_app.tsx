import { AuthProvider } from "@/context/AuthContext";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { NotificationProvider } from "@/context/NotificationContext";
import { DamnProvider } from "damnkit";
import { uiConfig } from "@/config/uiConfig";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DamnProvider config={uiConfig}>
      <AuthProvider>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </AuthProvider>
    </DamnProvider>
  );
}

export default MyApp;
