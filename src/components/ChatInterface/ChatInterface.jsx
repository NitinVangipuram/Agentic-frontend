import React, { useState } from 'react';
import ConfigSection from "../ConfigSection/ConfigSection";
import PlotSection from "../PlotSection/PlotSection";
import Titlebar from "../Titlebar/Titlebar";
import ChatSection from "../ChatSection/ChatSection";
import styles from "./ChatInterface.module.css";

const ChatInterface = () => {
  const [showConfig, setShowConfig] = useState(false);
  return (
    <div className={styles.entirepage}>
      {/* Header */}
      <div>
        <Titlebar setShowConfig={setShowConfig} showConfig={showConfig}/>
      </div>  

      <div className={styles.page}>
        {/* Sidebar */}
        <div className={`${styles.ConfigSection} ${!showConfig ? styles.hidden : ""}`}>
          <ConfigSection showConfig={showConfig}/>
        </div>

        {/* Main content area (2 columns) */}
        <div className={styles.content}>
          <div className={styles.PlotSection}>
            <PlotSection />
          </div>
          <div className={styles.ChatSection}>
            <ChatSection />
          </div>
        </div>
      </div>
    </div>
      
  );
}

export default ChatInterface