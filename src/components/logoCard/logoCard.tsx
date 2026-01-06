import { useState, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { RootState } from '../../store';
import { MenuItemI, BarMenu } from '../../store/slices/themeConfigSlice';
import styles from './logoCard.less';

interface LogoCardProps {
  title?: string;
  imageUrl?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  rss_feed: <RssFeedIcon fontSize="small" />,
  home: <HomeIcon fontSize="small" />,
  search: <SearchIcon fontSize="small" />,
  more_vert: <MoreVertIcon />,
};

export default function LogoCard({ title, imageUrl }: LogoCardProps) {
  const [menuAnchors, setMenuAnchors] = useState<Record<number, HTMLElement | null>>({});
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const site = useSelector((state: RootState) => state.site.data);

  const homeToolBar = themeConfig?.homeToolBar || [];
  const displayTitle = title || site?.title || 'KonoSuba';
  const displayImage = imageUrl || 'https://www.loliapi.com/acg/';

  const handleMenuClick = (index: number, event: MouseEvent<HTMLElement>) => {
    setMenuAnchors(prev => ({ ...prev, [index]: event.currentTarget }));
  };

  const handleMenuClose = (index: number) => {
    setMenuAnchors(prev => ({ ...prev, [index]: null }));
  };

  const handleItemClick = (item: MenuItemI, menuIndex: number) => {
    if (item.type === 'sitelink') {
      window.location.hash = item.href || '/';
    } else if (item.type === 'page') {
      window.location.hash = `/page/${item.name}`;
    } else if (item.type === 'link') {
      window.open(item.href, '_blank');
    }
    handleMenuClose(menuIndex);
  };

  const renderMenuItems = (items: MenuItemI[], menuIndex: number) => {
    return items.map((item, index) => {
      if (item.type === 'hr') {
        return <Divider key={`hr-${index}`} />;
      }
      return (
        <MenuItem key={`${item.title}-${index}`} onClick={() => handleItemClick(item, menuIndex)}>
          {item.icon && <ListItemIcon>{iconMap[item.icon as string] || <HomeIcon fontSize="small" />}</ListItemIcon>}
          <ListItemText>{item.title}</ListItemText>
        </MenuItem>
      );
    });
  };

  const renderToolBar = (toolBar: BarMenu[]) => {
    return toolBar.map((bar, index) => (
      <div key={index}>
        <IconButton onClick={(e) => handleMenuClick(index, e)}>
          {iconMap[bar.icon] || <MoreVertIcon />}
        </IconButton>
        <Menu
          anchorEl={menuAnchors[index]}
          open={Boolean(menuAnchors[index])}
          onClose={() => handleMenuClose(index)}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          {renderMenuItems(bar.items || [], index)}
        </Menu>
      </div>
    ));
  };

  return (
    <Card className={styles.logoCard}>
      <div>
        <div>
          <div>
            <div
              className={styles.cardImage}
              style={{ backgroundImage: `url(${displayImage})` }}
            />
          </div>
        </div>
        <div className={styles.cardBottom}>
          <CardContent sx={{ flexGrow: 1, py: 1 }}>
            <Typography variant="body1">{displayTitle}</Typography>
          </CardContent>
          {renderToolBar(homeToolBar)}
        </div>
      </div>
    </Card>
  );
}
