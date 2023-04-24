import React, { useState } from "react";
import Input from "../common/Input";
import styles from "./SignUp.module.scss";
import useAuth from "@/hooks/useAuth";
import { Button } from "damnkit";

const SignUp: React.FC = () => {
  const { signUp, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signUp(email, password)
  };

  return (
    <>
      <h1 className={styles.title}>Sign up</h1>
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
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

export default SignUp;
