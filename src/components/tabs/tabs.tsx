import { Tabs as MuiTabs, Tab } from '@mui/material';
import styles from './tabs.less';

interface TabsProps {
  items: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function Tabs({ items, value, onChange }: TabsProps) {
  return (
    <div className={styles.tabScrollBox}>
      <MuiTabs
        value={value}
        onChange={(_, v) => onChange(v)}
        variant="scrollable"
        scrollButtons="auto"
        className={styles.tabs}
      >
        {items.map((item) => (
          <Tab key={item} label={item} value={item} className={styles.tab} />
        ))}
      </MuiTabs>
    </div>
  );
}
