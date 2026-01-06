import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardHeaderAvatar from '../cardHeaderAvatar/cardHeaderAvatar';
import styles from './welcomeCard.less';

interface WelcomeCardProps {
  title?: string;
  subtitle?: string;
  coverImg?: string;
  avatarImg?: string;
  username?: string;
  isMobile?: boolean;
}

export default function WelcomeCard({
  title = 'Konosuba',
  subtitle = '为美好的世界献上祝福！',
  coverImg = 'https://www.loliapi.com/acg/',
  avatarImg = 'https://www.loliapi.com/acg/',
  username = '惠惠',
  isMobile = false,
}: WelcomeCardProps) {
  if (isMobile) {
    return (
      <div className={styles.phone}>
        <img src={avatarImg} className={styles.phoneAvatar} alt={username} />
        <Card className={styles.PhoneWelcomeCard}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className={styles.WelcomeCard}>
      <div>
        <div>
          <div>
            <div
              className={styles.CardImage}
              style={{ backgroundImage: `url(${coverImg})` }}
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
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body2">{subtitle}</Typography>
              </Box>
            </div>
          </div>
        </div>
        <div className={styles.CardBottom}>
          <CardHeaderAvatar title={username} avatar={avatarImg} />
        </div>
      </div>
    </Card>
  );
}
