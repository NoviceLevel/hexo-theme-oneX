import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '../grid';
import { setNavTitle, setBackButton } from '../../store/slices/navSlice';
import { getTags } from '../../lib/hexoApi';
import { Tag } from '../../interfaces/tag';
import styles from './tags.less';

export default function Tags() {
  const dispatch = useDispatch();
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    dispatch(setNavTitle('标签'));
    dispatch(setBackButton(true));
    getTags().then(setTags);
  }, [dispatch]);

  return (
    <Grid>
      <Card className={styles.tagsCard}>
        <CardContent>
          <Typography variant="h5" gutterBottom>标签</Typography>
          <div className={styles.tagList}>
            {tags.map(tag => (
              <Link
                key={tag.name}
                href={`#/tag/${encodeURIComponent(tag.name)}`}
                underline="hover"
                className={styles.tagItem}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
