import { Plus, Download } from "lucide-react";

import styles from './TopBar.module.css';

const TopBar = () => {
  return (
    <div className={styles.TopBar}>
      <div className={styles.leftGroup}>
        <button className={styles.button}>
          <Plus size={20} />
        </button>
        <button className={styles.button}>
          <Download size={20} />
        </button>
      </div>

      <div className={styles.centerTitle}>
        <h3 className={styles.title}>
          Color Changer
        </h3>
      </div>
    </div>
  )
}

export default TopBar;