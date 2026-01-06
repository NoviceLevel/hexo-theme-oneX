import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useState, MouseEvent } from 'react';
import CardHeaderAvatar from '../cardHeaderAvatar/cardHeaderAvatar';
import styles from './postCard.less';

interface PostCardProps {
  title?: string;
  excerpt?: string;
  imageUrl?: string;
  author?: string;
  avatar?: string;
  categories?: { name: string; path: string }[];
}

export default function PostCard({
  title = '文章标题',
  excerpt = '文章摘要...',
  imageUrl = 'https://www.loliapi.com/acg/',
  author = '作者',
  avatar = '',
  categories = [],
}: PostCardProps) {
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
    <Card className={styles.postCard}>
      <CardMedia className={styles.cardImage} image={imageUrl} title={title}>
        <Box className={styles.overlay}>
          <Typography variant="h5" component="h2" color="white">
            {title}
          </Typography>
        </Box>
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {excerpt}
        </Typography>
      </CardContent>
      <div className={styles.cardBottom}>
        <CardHeaderAvatar title={author} avatar={avatar} />
        <Box sx={{ flexGrow: 1 }} />
        <CardContent sx={{ py: 0 }}>
          {categories.map((cat, index) => (
            <span key={cat.name}>
              <Link href={`#${cat.path}`} underline="hover">
                {cat.name}
              </Link>
              {index < categories.length - 1 && ' | '}
            </span>
          ))}
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
          <MenuItem onClick={handleClose}>阅读全文</MenuItem>
          <MenuItem onClick={handleClose}>收藏</MenuItem>
        </Menu>
      </div>
    </Card>
  );
}
