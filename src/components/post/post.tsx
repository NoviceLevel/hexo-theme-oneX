import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box, useMediaQuery, useTheme } from '@mui/material';
import Grid from '../grid/grid';
import PostCard from '../postCard';
import Toc from '../toc';
import { RootState, AppDispatch } from '../../store';
import { loadPost } from '../../store/slices/postSlice';
import styles from './post.less';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const postData = useSelector((state: RootState) => slug ? state.post.posts[slug] : undefined);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (slug && !postData?.content && !postData?.loading) {
      dispatch(loadPost(slug));
    }
  }, [slug, postData, dispatch]);

  if (!slug) return null;

  if (postData?.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 10, gap: 2 }}>
        <CircularProgress size={24} />
        <span>惠惠正在咏唱...</span>
      </Box>
    );
  }

  return (
    <Grid className={styles.postPage}>
      <div className={styles.postContent}>
        <PostCard
          title={postData?.title}
          content={postData?.content}
          cover={postData?.cover}
          date={postData?.date}
        />
      </div>
      {isDesktop && postData?.content && (
        <div className={styles.tocWrapper}>
          <Toc content={postData.content} />
        </div>
      )}
    </Grid>
  );
}
