import React from "react";
import styles from "./Header.module.scss";
import useAuth from "@/hooks/useAuth";
import { Button } from "damnkit";
import { useRouter } from "next/router";
import Link from "next/link";

const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  const router = useRouter();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.title} href="/">KNDRLOS NEWS</Link>
        <div>
          {user && user.email && user?.email?.length > 0 ? (
            <>
              {user.email}
              <Button mixName="primary" type="button" onClick={signOut}> Sign out </Button>
            </>
          ) : (
            <>
              <Link href='/sign-in'className={styles.loginLink}>
                Sign In
              </Link>
              <Link href="/sign-up" className={styles.loginLink}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
