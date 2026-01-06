import { ReactNode } from 'react';
import styles from './grid.less';

interface GridProps {
  children?: ReactNode;
}

export default function Grid({ children }: GridProps) {
  return <div className={styles.Grid}>{children}</div>;
}
