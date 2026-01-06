import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Paper, Box, Typography, Link, InputAdornment, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';
import { fetchPosts } from '../../store/slices/postsSlice';
import { setNavTitle, setBackButton, setFullModel } from '../../store/slices/navSlice';
import { Post } from '../../interfaces';
import Footer from '../footer';
import styles from './search.less';

function removeHTMLTag(str: string) {
  return str.replace(/<\/?[^>]*>/g, '').replace(/[ | ]*\n/g, '\n').replace(/&nbsp;/ig, '');
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

function searchPosts(posts: Post[], query: string): Post[] {
  if (!query.trim()) return [];
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  return posts
    .map(post => {
      const title = (post.title || '').toLowerCase();
      const excerpt = removeHTMLTag(post.excerpt || '').toLowerCase();
      const content = removeHTMLTag(post.content || '').toLowerCase();
      
      let score = 0;
      for (const term of searchTerms) {
        if (title.includes(term)) score += 10;
        if (excerpt.includes(term)) score += 3;
        if (content.includes(term)) score += 1;
      }
      
      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(item => item.post);
}

export default function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<Post[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { data: posts } = useSelector((state: RootState) => state.posts);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setNavTitle('搜索'));
    dispatch(setBackButton(true));
    dispatch(setFullModel(true));
  }, [dispatch]);

  useEffect(() => {
    if (!posts) {
      dispatch(fetchPosts({}));
    }
  }, [posts, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!posts?.data?.length || !debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    const matched = searchPosts(posts.data, debouncedQuery);
    setResults(matched);
  }, [debouncedQuery, posts]);

  const theme = useTheme();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box className={styles.searchPage}>
      <IconButton 
        onClick={handleBack}
        sx={{ 
          position: 'absolute', 
          top: 12, 
          left: 12, 
          color: '#fff',
          zIndex: 10
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Paper 
        className={styles.searchBar} 
        elevation={2}
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <TextField
          fullWidth
          placeholder="在异世界寻找..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          inputRef={inputRef}
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
      <Box className={styles.postsList}>
        <Box className={styles.resultsWrapper}>
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
        </Box>
        <Box className={styles.footerWrapper}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
