import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useState, MouseEvent, useEffect, useRef } from 'react';
import CardHeaderAvatar from '../cardHeaderAvatar/cardHeaderAvatar';
import styles from './postCard.less';

interface PostCardProps {
  title?: string;
  excerpt?: string;
  imageUrl?: string;
  cover?: string;
  author?: string;
  avatar?: string;
  categories?: { name: string; path: string }[];
  tags?: { name: string; path: string }[];
  content?: string;
  link?: string;
  date?: string;
}

function removeHTMLTag(str: string) {
  return str.replace(/<\/?[^>]*>/g, '').replace(/[ | ]*\n/g, '\n').replace(/&nbsp;/ig, '');
}

export default function PostCard({
  title,
  excerpt,
  imageUrl,
  cover,
  author = '作者',
  avatar = '',
  categories = [],
  tags = [],
  content,
  link,
  date,
}: PostCardProps) {
  const [shareAnchor, setShareAnchor] = useState<null | HTMLElement>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const getDisplayImage = () => {
    const img = cover || imageUrl || 'https://www.loliapi.com/acg/';
    if (img.includes('loliapi.com') || img.includes('api.') || img.includes('/random')) {
      return `${img}${img.includes('?') ? '&' : '?'}id=${encodeURIComponent(link || title || Date.now().toString())}`;
    }
    return img;
  };
  const displayImage = getDisplayImage();
  const isDetailView = !!content;

  useEffect(() => {
    if (content && contentRef.current) {
      contentRef.current.innerHTML = content;
    }
  }, [content]);

  const handleShareClick = (event: MouseEvent<HTMLElement>) => setShareAnchor(event.currentTarget);
  const handleMenuClick = (event: MouseEvent<HTMLElement>) => setMenuAnchor(event.currentTarget);
  const handleClose = () => { setShareAnchor(null); setMenuAnchor(null); };

  const imageClassName = isDetailView ? styles.cardImageDetail : styles.cardImage;

  return (
    <Card className={styles.postCard}>
      <div>
        <div>
          <div>
            {(link || title) && (
              <div className={imageClassName} style={{ backgroundImage: `url(${displayImage})` }}>
                {link && <Link href={`#/post/${link}`} className={styles.link} />}
                <Box className={styles.overlay}>
                  <Typography variant="h5" component="h2" color="white">
                    {title}
                  </Typography>
                  {date && (
                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                      {new Date(date).toLocaleDateString()}
                    </Typography>
                  )}
                </Box>
              </div>
            )}
          </div>
        </div>
        <CardContent>
          {isDetailView ? (
            <div ref={contentRef} className={styles.postContent} />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {excerpt ? removeHTMLTag(excerpt) : ''}
            </Typography>
          )}
        </CardContent>
        <div className={styles.cardBottom}>
          <CardHeaderAvatar title={author} avatar={avatar} />
          <Box sx={{ flexGrow: 1 }} />
          <CardContent sx={{ py: 0 }}>
            {tags.map((tag, index) => (
              <span key={tag.name}>
                <Link href={`#/tag/${encodeURIComponent(tag.name)}`} underline="hover">{tag.name}</Link>
                {index < tags.length - 1 && ' '}
              </span>
            ))}
            {tags.length > 0 && categories.length > 0 && ' | '}
            {categories.map((cat, index) => (
              <span key={cat.name}>
                <Link href={`#/category/${encodeURIComponent(cat.name)}`} underline="hover">{cat.name}</Link>
                {index < categories.length - 1 && ' '}
              </span>
            ))}
          </CardContent>
          <IconButton onClick={handleShareClick}><ShareIcon /></IconButton>
          <Menu
            anchorEl={shareAnchor}
            open={Boolean(shareAnchor)}
            onClose={handleClose}
            disableScrollLock
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem onClick={handleClose}>分享到微博</MenuItem>
            <MenuItem onClick={handleClose}>复制链接</MenuItem>
          </Menu>
          <IconButton onClick={handleMenuClick}><MoreVertIcon /></IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleClose}
            disableScrollLock
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem onClick={handleClose}>RSS</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
}
