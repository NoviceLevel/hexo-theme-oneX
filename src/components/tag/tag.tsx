import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '../grid/grid';
import PostCard from '../postCard';
import Tabs from '../tabs';
import { getTags, getTagPosts } from '../../lib/hexoApi';
import { Tag as TagType } from '../../interfaces/tag';
import { Post } from '../../interfaces/post';
import { setNavTitle, setBackButton, setFullModel } from '../../store/slices/navSlice';
import { RootState, AppDispatch } from '../../store';
import { arrayRand } from '../../lib/random';
import styles from './tag.less';

export default function Tag() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const [tags, setTags] = useState<TagType[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const site = useSelector((state: RootState) => state.site.data);
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const avatar = arrayRand(themeConfig?.img?.avatar);

  useEffect(() => {
    dispatch(setNavTitle(name || '标签'));
    dispatch(setBackButton(true));
    dispatch(setFullModel(true));
  }, [dispatch, name]);

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  useEffect(() => {
    if (name) {
      getTagPosts(name).then(setPosts);
    }
  }, [name]);

  const handleTabChange = (value: string) => {
    navigate(`/tag/${value}`);
  };

  return (
    <Box className={styles.tag}>
      <Box
        className={styles.tagNameBox}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
        }}
      >
        <Grid>
          <Typography variant="h1" className={styles.title}>{name}</Typography>
          <Tabs
            items={tags.map(t => t.name)}
            value={name || ''}
            onChange={handleTabChange}
          />
        </Grid>
      </Box>
      <Grid>
        {posts.map((post) => (
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
      </Grid>
    </Box>
  );
}
