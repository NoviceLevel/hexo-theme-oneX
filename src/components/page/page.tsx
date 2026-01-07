import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box, useMediaQuery } from '@mui/material';
import Grid from '../grid/grid';
import PostCard from '../postCard';
import Toc from '../toc';
import Comment from '../comment';
import { RootState, AppDispatch } from '../../store';
import { loadPage } from '../../store/slices/postSlice';
import { addBackgroundImage } from '../../store/slices/backgroundSlice';
import { setNavTitle, setBackButton, setFullModel } from '../../store/slices/navSlice';
import { arrayRand } from '../../lib/random';
import styles from './page.less';

export default function Page() {
  const { title } = useParams<{ title: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const pageData = useSelector((state: RootState) => title ? state.post.posts[title] : undefined);
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const site = useSelector((state: RootState) => state.site.data);
  const isDesktop = useMediaQuery('(min-width: 992px)');

  useEffect(() => {
    dispatch(setNavTitle(pageData?.title || title || ''));
    dispatch(setBackButton(true));
    dispatch(setFullModel(true));
  }, [dispatch, pageData?.title, title]);

  useEffect(() => {
    if (title && !pageData?.content && !pageData?.loading) {
      dispatch(loadPage(title));
    }
  }, [title, pageData, dispatch]);

  useEffect(() => {
    if (pageData?.cover) {
      dispatch(addBackgroundImage({ url: pageData.cover, key: `page-${title}` }));
    } else if (themeConfig?.img?.post_thumbnail) {
      dispatch(addBackgroundImage({ url: arrayRand(themeConfig.img.post_thumbnail), key: `page-${title}` }));
    }
  }, [pageData, themeConfig, title, dispatch]);

  if (!title) return null;

  if (pageData?.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 10, gap: 2, color: '#fff' }}>
        <CircularProgress size={24} color="inherit" />
        <span>达克妮丝正在准备...</span>
      </Box>
    );
  }

  const pageUrl = site?.url ? `${site.url}/page/${title}` : undefined;
  const showComments = pageData?.comments !== false;

  return (
    <Grid className={styles.pagePage}>
      <div className={styles.pageContent}>
        <PostCard
          title={pageData?.title}
          content={pageData?.content}
          cover={pageData?.cover}
          date={pageData?.date}
        />
        {showComments && pageData?.title && (
          <Comment
            postId={title}
            postTitle={pageData.title}
            postUrl={pageUrl}
          />
        )}
      </div>
      {isDesktop && pageData?.content && (
        <div className={styles.tocWrapper}>
          <Toc content={pageData.content} />
        </div>
      )}
    </Grid>
  );
}
