import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box, useMediaQuery } from '@mui/material';
import Grid from '../grid/grid';
import PostCard from '../postCard';
import Toc from '../toc';
import Comment from '../comment';
import { RootState, AppDispatch } from '../../store';
import { loadPost } from '../../store/slices/postSlice';
import { addBackgroundImage } from '../../store/slices/backgroundSlice';
import { setNavTitle, setBackButton, setFullModel } from '../../store/slices/navSlice';
import { arrayRand } from '../../lib/random';
import styles from './post.less';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const postData = useSelector((state: RootState) => slug ? state.post.posts[slug] : undefined);
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const site = useSelector((state: RootState) => state.site.data);
  const isDesktop = useMediaQuery('(min-width: 992px)');

  useEffect(() => {
    dispatch(setNavTitle(postData?.title || ''));
    dispatch(setBackButton(true));
    dispatch(setFullModel(true));
  }, [dispatch, postData?.title]);

  useEffect(() => {
    if (slug && !postData?.content && !postData?.loading) {
      dispatch(loadPost(slug));
    }
  }, [slug, postData, dispatch]);

  useEffect(() => {
    if (postData?.cover) {
      dispatch(addBackgroundImage({ url: postData.cover, key: `post-${slug}` }));
    } else if (themeConfig?.img?.post_thumbnail) {
      dispatch(addBackgroundImage({ url: arrayRand(themeConfig.img.post_thumbnail), key: `post-${slug}` }));
    }
  }, [postData, themeConfig, slug, dispatch]);

  if (!slug) return null;

  if (postData?.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 10, gap: 2 }}>
        <CircularProgress size={24} />
        <span>惠惠正在咏唱...</span>
      </Box>
    );
  }

  const postUrl = site?.url ? `${site.url}/post/${slug}` : undefined;

  return (
    <Grid className={styles.postPage}>
      <div className={styles.postContent}>
        <PostCard
          title={postData?.title}
          content={postData?.content}
          cover={postData?.cover}
          date={postData?.date}
        />
        {postData?.title && (
          <Comment
            postId={slug}
            postTitle={postData.title}
            postUrl={postUrl}
          />
        )}
      </div>
      {isDesktop && postData?.content && (
        <div className={styles.tocWrapper}>
          <Toc content={postData.content} />
        </div>
      )}
    </Grid>
  );
}
