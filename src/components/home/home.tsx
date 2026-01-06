import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box, useMediaQuery } from '@mui/material';
import Grid from '../grid/grid';
import WelcomeCard from '../welcomeCard/welcomeCard';
import LogoCard from '../logoCard';
import PostCard from '../postCard';
import DisplayTrigger from '../displayTrigger';
import { RootState, AppDispatch } from '../../store';
import { fetchPosts } from '../../store/slices/postsSlice';
import { addBackgroundImage } from '../../store/slices/backgroundSlice';
import { arrayRand } from '../../lib/random';
import styles from './home.less';

const PAGE_SIZE = 10;

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: posts, loading } = useSelector((state: RootState) => state.posts);
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const site = useSelector((state: RootState) => state.site.data);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  useEffect(() => {
    if (!posts) {
      dispatch(fetchPosts({}));
    }
  }, [posts, dispatch]);

  useEffect(() => {
    if (themeConfig?.img?.left_pic) {
      dispatch(addBackgroundImage({ url: arrayRand(themeConfig.img.left_pic), key: 'home' }));
    }
  }, [themeConfig, dispatch]);

  const loadMore = useCallback(() => {
    if (posts?.data && displayCount < posts.data.length) {
      setDisplayCount(prev => Math.min(prev + PAGE_SIZE, posts.data?.length || 0));
    }
  }, [posts, displayCount]);

  const displayedPosts = posts?.data?.slice(0, displayCount) || [];
  const hasMore = posts?.data && displayCount < posts.data.length;

  const leftPic = arrayRand(themeConfig?.img?.left_pic);
  const rightPic = arrayRand(themeConfig?.img?.right_pic);
  const avatar = arrayRand(themeConfig?.img?.avatar);

  return (
    <Grid>
      <WelcomeCard
        title={site?.title || 'Konosuba'}
        subtitle={themeConfig?.uiux?.slogan}
        coverImg={leftPic}
        avatarImg={avatar}
        username={site?.author || '惠惠'}
        isMobile={isMobile}
      />
      {!isMobile && <LogoCard title={site?.title || 'KonoSuba'} imageUrl={rightPic} />}
      {displayedPosts.map((post) => (
        <PostCard
          key={post.slug}
          title={post.title}
          excerpt={post.excerpt}
          link={post.slug}
          date={post.date}
          categories={post.categories?.map(c => ({ name: c.name || '', path: c.path || '' }))}
        />
      ))}
      <DisplayTrigger onDisplay={loadMore} className={styles.Loading}>
        {(loading || hasMore) && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4, gap: 2, width: '100%' }}>
            <CircularProgress size={24} />
            <span>阿克娅正在努力中...</span>
          </Box>
        )}
      </DisplayTrigger>
    </Grid>
  );
}
