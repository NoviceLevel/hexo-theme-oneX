import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import { useState, MouseEvent } from 'react';
import styles from './logoCard.less';

interface LogoCardProps {
  title?: string;
  imageUrl?: string;
}

export default function LogoCard({ 
  title = 'KonoSuba', 
  imageUrl = 'https://www.loliapi.com/acg/' 
}: LogoCardProps) {
  const [shareAnchor, setShareAnchor] = useState<null | HTMLElement>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleShareClick = (event: MouseEvent<HTMLElement>) => {
    setShareAnchor(event.currentTarget);
  };

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setShareAnchor(null);
    setMenuAnchor(null);
  };

  return (
    <Card className={styles.logoCard}>
      <CardMedia
        className={styles.cardImage}
        image={imageUrl}
        title={title}
      />
      <div className={styles.cardBottom}>
        <CardContent sx={{ flexGrow: 1, py: 1 }}>
          <Typography variant="body1">{title}</Typography>
        </CardContent>
        <IconButton onClick={handleShareClick}>
          <ShareIcon />
        </IconButton>
        <Menu
          anchorEl={shareAnchor}
          open={Boolean(shareAnchor)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem onClick={handleClose}>分享到微博</MenuItem>
          <MenuItem onClick={handleClose}>分享到微信</MenuItem>
          <MenuItem onClick={handleClose}>复制链接</MenuItem>
        </Menu>
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem onClick={handleClose}>刷新</MenuItem>
          <MenuItem onClick={handleClose}>设置</MenuItem>
          <MenuItem onClick={handleClose}>帮助</MenuItem>
        </Menu>
      </div>
    </Card>
  );
}
