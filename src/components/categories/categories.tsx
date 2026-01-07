import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '../grid';
import { setNavTitle, setBackButton } from '../../store/slices/navSlice';
import { getCategories } from '../../lib/hexoApi';
import { Category } from '../../interfaces/category';
import { RootState } from '../../store';
import { arrayRand } from '../../lib/random';
import styles from './categories.less';

export default function Categories() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);

  const randomSlogan = useMemo(() => {
    const slogans = themeConfig?.footer?.[1];
    return arrayRand(slogans) || '爆裂魔法才是浪漫！';
  }, [themeConfig?.footer]);

  useEffect(() => {
    dispatch(setNavTitle('分类'));
    dispatch(setBackButton(true));
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <Grid>
      <Card className={styles.categoriesCard}>
        <CardContent>
          <Typography variant="h5" gutterBottom>分类</Typography>
          <div className={styles.categoryList}>
            {loading ? (
              <Typography color="text.secondary">加载中...</Typography>
            ) : categories.length > 0 ? (
              categories.map(cat => (
                <Link
                  key={cat.name}
                  href={`#/category/${encodeURIComponent(cat.name)}`}
                  underline="hover"
                  className={styles.categoryItem}
                >
                  {cat.name}
                </Link>
              ))
            ) : (
              <Typography color="text.secondary">{randomSlogan}</Typography>
            )}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
