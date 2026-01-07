import { useEffect, useState, useCallback, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import styles from './scrollbar.less';

export default function Scrollbar() {
  const theme = useTheme();
  const [scrollPercent, setScrollPercent] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);
  const hideTimer = useRef<number | null>(null);

  const primaryColor = theme.palette.primary.main;
  const primaryDark = theme.palette.primary.dark;

  const updateScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    setScrollPercent(percent);
    const viewportRatio = window.innerHeight / document.documentElement.scrollHeight;
    setThumbHeight(Math.max(viewportRatio * 100, 10));
    setIsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setIsVisible(false), 1500);
  }, []);

  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const percent = (clickY / rect.height) * 100;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (percent / 100) * scrollHeight, behavior: 'smooth' });
  }, []);

  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartScroll.current = window.scrollY;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaY = e.clientY - dragStartY.current;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const trackHeight = window.innerHeight;
      const scrollDelta = (deltaY / trackHeight) * scrollHeight;
      window.scrollTo({ top: dragStartScroll.current + scrollDelta });
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    updateScroll();
    window.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [updateScroll]);

  const thumbTop = (scrollPercent / 100) * (100 - thumbHeight);

  return (
    <div className={`${styles.scrollbar} ${isVisible || isDragging ? styles.visible : ''}`} onClick={handleTrackClick}>
      <div
        className={styles.thumb}
        style={{
          height: `${thumbHeight}%`,
          top: `${thumbTop}%`,
          background: `linear-gradient(180deg, ${primaryColor}, ${primaryDark})`,
        }}
        onMouseDown={handleThumbMouseDown}
      />
    </div>
  );
}
