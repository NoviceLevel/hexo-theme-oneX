import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Paper, Box, Typography, Link, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import lunr from 'lunr';
import Grid from '../grid/grid';
import { RootState, AppDispatch } from '../../store';
import { fetchPosts } from '../../store/slices/postsSlice';
import { Post } from '../../interfaces';
import styles from './search.less';

function removeHTMLTag(str: string) {
  return str.replace(/<\/?[^>]*>/g, '').replace(/[ | ]*\n/g, '\n').replace(/&nbsp;/ig, '');
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { data: posts } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (!posts) {
      dispatch(fetchPosts({}));
    }
  }, [posts, dispatch]);

  const index = useMemo(() => {
    if (!posts?.data?.length) return null;
    const postsData = posts.data;
    return lunr(function () {
      this.field('title', { boost: 10 });
      this.field('excerpt', { boost: 3 });
      this.ref('slug');
      postsData.forEach((post) => {
        this.add({
          title: post.title || '',
          excerpt: removeHTMLTag(post.excerpt || ''),
          slug: post.slug || '',
        });
      });
    });
  }, [posts]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (!index || !value.trim() || !posts?.data?.length) {
      setResults([]);
      return;
    }
    try {
      const searchTerm = value.trim().split(/\s+/).map(term => `${term}* ${term}`).join(' ');
      const searchResults = index.search(searchTerm);
      const postsData = posts.data;
      const matched = searchResults
        .slice(0, 20)
        .map((r) => postsData.find((p) => p.slug === r.ref))
        .filter(Boolean) as Post[];
      setResults(matched);
    } catch {
      setResults([]);
    }
  }, [index, posts]);

  const theme = useTheme();

  return (
    <Box className={styles.searchPage}>
      <Paper 
        className={styles.searchBar} 
        elevation={2}
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <TextField
          fullWidth
          placeholder="在异世界寻找..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#fff' }} />
              </InputAdornment>
            ),
          }}
          variant="standard"
          sx={{ 
            '& input': { fontSize: '2rem', py: 2, color: '#fff' },
            '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.5)' },
            '& .MuiInput-underline:hover:before': { borderBottomColor: '#fff' },
            '& .MuiInput-underline:after': { borderBottomColor: '#fff' },
            '& input::placeholder': { color: 'rgba(255,255,255,0.7)', opacity: 1 },
          }}
        />
      </Paper>
      <Grid className={styles.postsList}>
        {results.length > 0 ? (
          results.map((post) => (
            <Paper key={post.slug} className={styles.resultItem} elevation={1}>
              <Typography variant="h6">
                <Link href={`#/post/${post.slug}`} underline="hover">{post.title}</Link>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {post.date && new Date(post.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {removeHTMLTag(post.excerpt || '').slice(0, 150)}...
              </Typography>
            </Paper>
          ))
        ) : query && (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            Explosion！...什么都没炸出来
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
