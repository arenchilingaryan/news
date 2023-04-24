import React from "react";
import styles from "./Login.module.scss";
import useAuth from "@/hooks/useAuth";
import { Button, Input } from "damnkit";

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn, error, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  return (
    <>
      <h1 className={styles.title}>Sign in</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          mixName="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          mixName="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button mixName="primary" disabled={loading} type="submit" isLoading={loading}>Sign In</Button>
        {typeof error === "string" && (
          <p className={styles.errorMessage}>Error: {error}</p>
        )}
      </form>
    </>
  );
};

export default Login;
