import { useState } from "react";
import styles from "./ConfigSection.module.css";
import { FaKey } from "react-icons/fa";
const ConfigSection = ({ showConfig }) => {
  const [ApiKey, setApiKey] = useState("nfkrjbbelbv");
  const [selectModel, setSelectModel] = useState("gemini-2.0-flash");
  return (
    <div className={`${styles.sidenav} ${showConfig ? styles.active : ""}`}>
      <h2>Agent Settings</h2>
      <ul>
        <li>
          <label>
            <FaKey/> API Key
          </label>
          <input
              type="text"
              value={ApiKey}
              onChange={(e) => setApiKey(e.target.value)}
          />
        </li>
        <li>
          <label className={styles.label}>Select Model</label>
          <select value={selectModel}
            onChange={(e)=>setSelectModel(e.target.value)}
            >
              <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
              <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
          </select>
        </li>
      </ul>
    </div>
  );
};

export default ConfigSection;