import React, { useState } from "react";
import styles from "./Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // eye icons

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>🔐 Welcome Back</h2>
        <form className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
          />

          {/* Password input with icon inside */}
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>

        <div style={{ color: "#ff7e29" }}>
          <a href="/signup" style={{ color: "inherit", textDecoration: "none" }}>
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
