import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardHeaderAvatar from '../cardHeaderAvatar/cardHeaderAvatar';
import styles from './welcomeCard.less';

export default function WelcomeCard() {
  return (
    <Card className={styles.WelcomeCard} sx={{ position: 'relative' }}>
      <CardMedia
        className={styles.CardImage}
        image="https://www.loliapi.com/acg/"
        title="Konosuba"
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            p: 2,
          }}
        >
          <Typography variant="h5">Konosuba</Typography>
          <Typography variant="body2">为美好的世界献上祝福！</Typography>
        </Box>
      </CardMedia>
      <div className={styles.CardBottom}>
        <CardHeaderAvatar
          title="惠惠"
          avatar="https://www.loliapi.com/acg/"
        />
      </div>
    </Card>
  );
}
