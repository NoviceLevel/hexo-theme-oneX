import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box, useMediaQuery } from '@mui/material';
import Grid from '../grid/grid';
import WelcomeCard from '../welcomeCard/welcomeCard';
import LogoCard from '../logoCard';
import PostCard from '../postCard';
import DisplayTrigger from '../displayTrigger';
import { RootState, AppDispatch } from '../../store';
import { fetchPosts, appendPosts } from '../../store/slices/postsSlice';
import { addBackgroundImage } from '../../store/slices/backgroundSlice';
import { setNavTitle, setBackButton, setFullModel } from '../../store/slices/navSlice';
import { arrayRand } from '../../lib/random';
import styles from './home.less';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: posts, loading } = useSelector((state: RootState) => state.posts);
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const site = useSelector((state: RootState) => state.site.data);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [currentPage, setCurrentPage] = useState(1);
  const loadingRef = useRef(false);

  useEffect(() => {
    dispatch(setNavTitle(site?.title || ''));
    dispatch(setBackButton(false));
    dispatch(setFullModel(false));
  }, [dispatch, site?.title]);

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
    if (loadingRef.current || loading) return;
    if (!posts || currentPage >= (posts.pageCount || 1)) return;
    
    loadingRef.current = true;
    const nextPage = currentPage + 1;
    dispatch(appendPosts({ index: nextPage })).then(() => {
      setCurrentPage(nextPage);
      loadingRef.current = false;
    });
  }, [posts, currentPage, loading, dispatch]);

  const displayedPosts = posts?.data || [];
  const hasMore = posts && currentPage < (posts.pageCount || 1);

  const leftPic = useMemo(() => arrayRand(themeConfig?.img?.left_pic), [themeConfig?.img?.left_pic]);
  const rightPic = useMemo(() => arrayRand(themeConfig?.img?.right_pic), [themeConfig?.img?.right_pic]);
  const avatar = useMemo(() => arrayRand(themeConfig?.img?.avatar), [themeConfig?.img?.avatar]);
  const slogan = useMemo(() => arrayRand(themeConfig?.uiux?.slogan), [themeConfig?.uiux?.slogan]);

  return (
    <Grid>
      <WelcomeCard
        title={site?.title || 'Konosuba'}
        subtitle={slogan}
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
          author={site?.author || '作者'}
          avatar={avatar}
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
