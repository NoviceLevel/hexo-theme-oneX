import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box, useMediaQuery, useTheme } from '@mui/material';
import Grid from '../grid/grid';
import PostCard from '../postCard';
import Toc from '../toc';
import { RootState, AppDispatch } from '../../store';
import { loadPost } from '../../store/slices/postSlice';
import styles from './page.less';

export default function Page() {
  const { title } = useParams<{ title: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const pageData = useSelector((state: RootState) => title ? state.post.posts[title] : undefined);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (title && !pageData?.content && !pageData?.loading) {
      dispatch(loadPost(title));
    }
  }, [title, pageData, dispatch]);

  if (!title) return null;

  if (pageData?.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 10, gap: 2 }}>
        <CircularProgress size={24} />
        <span>达克妮丝正在准备...</span>
      </Box>
    );
  }

  return (
    <Grid className={styles.pagePage}>
      <div className={styles.pageContent}>
        <PostCard
          title={pageData?.title}
          content={pageData?.content}
          cover={pageData?.cover}
          date={pageData?.date}
        />
      </div>
      {isDesktop && pageData?.content && (
        <div className={styles.tocWrapper}>
          <Toc content={pageData.content} />
        </div>
      )}
    </Grid>
  );
}
