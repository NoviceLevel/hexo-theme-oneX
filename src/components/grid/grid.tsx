import { ReactNode } from 'react';
import styles from './grid.less';

interface GridProps {
  children?: ReactNode;
  className?: string;
}

export default function Grid({ children, className }: GridProps) {
  return <div className={`${styles.Grid} ${className || ''}`}>{children}</div>;
}
