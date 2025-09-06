import React from 'react'
import styles from "../ChatInterface/ChatInterface.module.css";
import { FiSettings } from "react-icons/fi";
const Titlebar = ({setShowConfig, showConfig}) => {
   return (
    <div className={styles.header}>
      {/* Settings icon aligned left */}
      <FiSettings
        className={styles.settingsIcon}
        onClick={() => setShowConfig(!showConfig)}
      />

      {/* Centered Titlebar */}
      <div className={styles.titlebar}>
      <div className={styles.logo}>
        <img src='Logo.svg'></img>
      </div>
    </div>
      <div className={styles.actions}>
        <button className={styles.btn}>⚙ Settings</button>
        <button className={styles.btnPrimary}>🔒 Logout</button>
      </div>
    </div>
    
  );
}

export default Titlebar
