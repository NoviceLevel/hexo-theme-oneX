import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardHeaderAvatar from '../cardHeaderAvatar/cardHeaderAvatar';
import styles from './welcomeCard.less';

export default function WelcomeCard() {
  return (
    <Card className={styles.WelcomeCard}>
      <div>
        <div>
          <div>
            <div
              className={styles.CardImage}
              style={{ backgroundImage: 'url(https://www.loliapi.com/acg/)' }}
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
            </div>
          </div>
        </div>
        <div className={styles.CardBottom}>
          <CardHeaderAvatar
            title="惠惠"
            avatar="https://www.loliapi.com/acg/"
          />
        </div>
      </div>
    </Card>
  );
}
