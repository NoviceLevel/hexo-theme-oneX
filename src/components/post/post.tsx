import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';
import Grid from '../grid/grid';
import PostCard from '../postCard';
import { RootState, AppDispatch } from '../../store';
import { loadPost } from '../../store/slices/postSlice';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const postData = useSelector((state: RootState) => slug ? state.post.posts[slug] : undefined);

  useEffect(() => {
    if (slug && !postData?.content && !postData?.loading) {
      dispatch(loadPost(slug));
    }
  }, [slug, postData, dispatch]);

  if (!slug) return null;

  if (postData?.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid>
      <PostCard
        title={postData?.title}
        content={postData?.content}
        cover={postData?.cover}
        date={postData?.date}
      />
    </Grid>
  );
}
