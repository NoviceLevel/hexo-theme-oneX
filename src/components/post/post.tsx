import Grid from '../grid/grid';
import PostCard from '../postCard';

interface PostProps {
  slug?: string;
}

export default function Post({ slug }: PostProps) {
  return (
    <Grid>
      <PostCard />
    </Grid>
  );
}
