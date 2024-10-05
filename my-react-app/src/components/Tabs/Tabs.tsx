import { ReactNode, useState } from 'react';
import styles from './Tabs.module.scss';
import { Divider } from '../UI/Divider/Divider';

interface ITabsProps {
  tabs: Tab[];
}

interface Tab {
  title: string;
  content: ReactNode;
}

export const Tabs = ({ tabs }: ITabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabsHeader}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tabsButton} ${activeTab === index ? styles.tabsActive : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <Divider color="lightgrey" />
      <div className={styles.tabsContent}>{tabs[activeTab].content}</div>
    </div>
  );
};
