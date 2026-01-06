import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { setNavTitle, setBackButton, setFullModel } from '../../store/slices/navSlice';
import { AppDispatch } from '../../store';
import styles from './notFound.less';

export default function NotFound() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    dispatch(setNavTitle('404'));
    dispatch(setBackButton(true));
    dispatch(setFullModel(true));
  }, [dispatch]);

  return (
    <Box className={styles.container} sx={{ backgroundColor: theme.palette.primary.main }}>
      <Typography variant="h1" className={styles.code}>
        404
      </Typography>
      <Typography variant="h5" className={styles.message}>
        Explosion！页面被惠惠炸没了...
      </Typography>
      <Typography variant="body1" className={styles.subtitle}>
        这个页面可能已经不存在，或者从未存在过
      </Typography>
      <Button
        variant="outlined"
        onClick={() => navigate('/')}
        sx={{
          mt: 4,
          color: '#fff',
          borderColor: '#fff',
          '&:hover': {
            borderColor: '#fff',
            backgroundColor: 'rgba(255,255,255,0.1)',
          },
        }}
      >
        返回首页
      </Button>
    </Box>
  );
}
