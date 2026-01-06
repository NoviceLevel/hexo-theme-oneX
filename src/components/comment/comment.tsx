import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card } from '@mui/material';
import { RootState } from '../../store';
import styles from './comment.less';

interface CommentProps {
  postId: string;
  postTitle: string;
  postUrl?: string;
}

export default function Comment({ postId, postTitle, postUrl }: CommentProps) {
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const containerRef = useRef<HTMLDivElement>(null);

  const disqusShortname = themeConfig?.comment?.disqus?.shortName;

  useEffect(() => {
    if (!disqusShortname || !containerRef.current) return;

    const url = postUrl || window.location.href;

    (window as any).disqus_config = function() {
      this.page.url = url;
      this.page.identifier = postId;
      this.page.title = postTitle;
    };

    const script = document.createElement('script');
    script.src = `https://${disqusShortname}.disqus.com/embed.js`;
    script.setAttribute('data-timestamp', String(+new Date()));
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const disqusThread = document.getElementById('disqus_thread');
      if (disqusThread) {
        disqusThread.innerHTML = '';
      }
      script.remove();
    };
  }, [disqusShortname, postId, postTitle, postUrl]);

  if (!disqusShortname) return null;

  return (
    <Card className={styles.comment} ref={containerRef}>
      <Box sx={{ p: 2 }}>
        <div id="disqus_thread" />
      </Box>
    </Card>
  );
}
