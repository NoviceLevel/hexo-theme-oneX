import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '../grid/grid';
import PostCard from '../postCard';
import Tabs from '../tabs';
import { getCategories, getCategoryPosts } from '../../lib/hexoApi';
import { Category as CategoryType } from '../../interfaces/category';
import { Post } from '../../interfaces/post';
import { setNavTitle, setBackButton, setFullModel } from '../../store/slices/navSlice';
import { RootState, AppDispatch } from '../../store';
import { arrayRand } from '../../lib/random';
import styles from './category.less';

export default function Category() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const site = useSelector((state: RootState) => state.site.data);
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const avatar = arrayRand(themeConfig?.img?.avatar);

  useEffect(() => {
    dispatch(setNavTitle(name || '分类'));
    dispatch(setBackButton(true));
    dispatch(setFullModel(true));
  }, [dispatch, name]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (name) {
      getCategoryPosts(name).then(setPosts);
    }
  }, [name]);

  const handleTabChange = (value: string) => {
    navigate(`/category/${value}`);
  };

  return (
    <Box className={styles.category}>
      <Box
        className={styles.categoryNameBox}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
        }}
      >
        <Grid>
          <Typography variant="h1" className={styles.title}>{name}</Typography>
          <Tabs
            items={categories.map(c => c.name)}
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
