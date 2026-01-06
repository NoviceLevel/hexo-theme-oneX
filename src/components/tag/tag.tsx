import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '../grid/grid';
import PostCard from '../postCard';
import Tabs from '../tabs';
import { getTags, getTagPosts } from '../../lib/hexoApi';
import { Tag as TagType } from '../../interfaces/tag';
import { Post } from '../../interfaces/post';
import styles from './tag.less';

export default function Tag() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [tags, setTags] = useState<TagType[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

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
          />
        ))}
      </Grid>
    </Box>
  );
}
