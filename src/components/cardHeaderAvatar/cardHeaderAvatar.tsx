import { CSSProperties, ReactNode } from 'react';
import styles from './cardHeaderAvatar.less';

interface CardHeaderAvatarProps {
  style?: CSSProperties;
  className?: string;
  title?: ReactNode;
  avatar?: string;
}

export default function CardHeaderAvatar({ style, className, title, avatar }: CardHeaderAvatarProps) {
  return (
    <div className={`${styles.CardHeaderAvatar} ${className || ''}`} style={style}>
      {avatar && <img src={avatar} alt="" className={styles.Avatar} />}
      {title && <span className={styles.Title}>{title}</span>}
    </div>
  );
}
