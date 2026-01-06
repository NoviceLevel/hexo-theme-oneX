import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';
import Grid from '../grid/grid';
import WelcomeCard from '../welcomeCard/welcomeCard';
import LogoCard from '../logoCard';
import PostCard from '../postCard';
import { RootState, AppDispatch } from '../../store';
import { fetchPosts } from '../../store/slices/postsSlice';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: posts, loading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (!posts) {
      dispatch(fetchPosts({}));
    }
  }, [posts, dispatch]);

  return (
    <Grid>
      <WelcomeCard />
      <LogoCard title="KonoSuba" />
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4, gap: 2 }}>
          <CircularProgress size={24} />
          <span>阿克娅正在努力中...</span>
        </Box>
      )}
      {posts?.data?.map((post) => (
        <PostCard
          key={post.slug}
          title={post.title}
          excerpt={post.excerpt}
          link={post.slug}
          date={post.date}
          categories={post.categories?.map(c => ({ name: c.name || '', path: c.path || '' }))}
        />
      ))}
    </Grid>
  );
}
