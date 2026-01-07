import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '../grid';
import { setNavTitle, setBackButton } from '../../store/slices/navSlice';
import { getTags } from '../../lib/hexoApi';
import { Tag } from '../../interfaces/tag';
import { RootState } from '../../store';
import { arrayRand } from '../../lib/random';
import styles from './tags.less';

export default function Tags() {
  const dispatch = useDispatch();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);

  const randomSlogan = useMemo(() => {
    const slogans = themeConfig?.footer?.[1];
    return arrayRand(slogans) || '爆裂魔法才是浪漫！';
  }, [themeConfig?.footer]);

  useEffect(() => {
    dispatch(setNavTitle('标签'));
    dispatch(setBackButton(true));
    getTags()
      .then(setTags)
      .catch(() => setTags([]))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <Grid>
      <Card className={styles.tagsCard}>
        <CardContent>
          <Typography variant="h5" gutterBottom>标签</Typography>
          <div className={styles.tagList}>
            {loading ? (
              <Typography color="text.secondary">加载中...</Typography>
            ) : tags.length > 0 ? (
              tags.map(tag => (
                <Link
                  key={tag.name}
                  href={`#/tag/${encodeURIComponent(tag.name)}`}
                  underline="hover"
                  className={styles.tagItem}
                >
                  {tag.name}
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
