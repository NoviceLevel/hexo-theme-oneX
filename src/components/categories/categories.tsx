import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '../grid';
import { setNavTitle, setBackButton } from '../../store/slices/navSlice';
import { getCategories } from '../../lib/hexoApi';
import { Category } from '../../interfaces/category';
import styles from './categories.less';

export default function Categories() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    dispatch(setNavTitle('分类'));
    dispatch(setBackButton(true));
    getCategories().then(setCategories);
  }, [dispatch]);

  return (
    <Grid>
      <Card className={styles.categoriesCard}>
        <CardContent>
          <Typography variant="h5" gutterBottom>分类</Typography>
          <div className={styles.categoryList}>
            {categories.map(cat => (
              <Link
                key={cat.name}
                href={`#/category/${encodeURIComponent(cat.name)}`}
                underline="hover"
                className={styles.categoryItem}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
