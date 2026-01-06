import Grid from '../grid/grid';
import WelcomeCard from '../welcomeCard/welcomeCard';
import LogoCard from '../logoCard';
import PostCard from '../postCard';

export default function Home() {
  return (
    <Grid>
      <WelcomeCard />
      <LogoCard title="KonoSuba" />
      <PostCard 
        title="为美好的世界献上祝福！"
        excerpt="我叫佐藤和真，是一个死后转生到异世界的冒险者。本以为能过上开挂人生，结果却带着一个没用的女神、一个只会爆裂魔法的魔法师、还有一个抖M圣骑士开始了这段充满欢乐的冒险..."
        author="佐藤和真"
        categories={[{ name: '异世界', path: 'categories/isekai' }, { name: '冒险', path: 'categories/adventure' }]}
      />
    </Grid>
  );
}
