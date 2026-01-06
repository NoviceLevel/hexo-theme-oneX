import { useState } from 'react';
import { Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, useMediaQuery, Collapse, SvgIcon } from '@mui/material';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArchiveIcon from '@mui/icons-material/Archive';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ColorChoose from '../colorChoose';
import SideHeader from '../sideHeader';
import { RootState } from '../../store';
import { arrayRand } from '../../lib/random';
import { MenuItemI } from '../../store/slices/themeConfigSlice';
import styles from './drawer.less';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  primaryColor?: string;
  onColorChange?: (color: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  home: <HomeIcon />,
  search: <SearchIcon />,
  folder: <CategoryIcon />,
  label: <LocalOfferIcon />,
  archive: <ArchiveIcon />,
  account_circle: <AccountCircleIcon />,
  mail_outline: <MailOutlineIcon />,
  contact_phone: <ContactPhoneIcon />,
  rss_feed: <RssFeedIcon />,
};

function getIcon(icon?: string | { type: string; date: string; style?: Record<string, string>; viewBox?: string }): React.ReactNode {
  if (!icon) return <HomeIcon />;
  if (typeof icon === 'string') {
    return iconMap[icon] || <HomeIcon />;
  }
  if (typeof icon === 'object' && icon.type === 'svg') {
    return (
      <SvgIcon
        viewBox={icon.viewBox || '0 0 24 24'}
        sx={icon.style}
        dangerouslySetInnerHTML={{ __html: icon.date }}
      />
    );
  }
  return <HomeIcon />;
}

export default function Drawer({ open, onClose, primaryColor, onColorChange }: DrawerProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const drawerWidth = isMobile ? 250 : 300;
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const site = useSelector((state: RootState) => state.site.data);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const drawerItems = themeConfig?.drawer || themeConfig?.Drawer || [
    { title: '首页', type: 'sitelink', href: '/', icon: 'home' },
    { title: 'hr', type: 'hr' },
    { title: '搜索', type: 'sitelink', href: '/search', icon: 'search' },
    { title: '分类', type: 'sitelink', href: '/categories', icon: 'folder' },
    { title: '标签', type: 'sitelink', href: '/tags', icon: 'label' },
  ];

  const handleItemClick = (item: MenuItemI) => {
    if (item.nested && item.nested.length > 0) {
      setOpenItems(prev => ({ ...prev, [item.title]: !prev[item.title] }));
      return;
    }
    if (item.type === 'sitelink') {
      window.location.hash = item.href || '/';
    } else if (item.type === 'page') {
      window.location.hash = `/page/${item.name}`;
    } else if (item.type === 'link') {
      window.open(item.href, '_blank');
    }
    onClose();
  };

  const renderItem = (item: MenuItemI, index: number, depth = 0): React.ReactNode => {
    if (item.type === 'hr') {
      return <Divider key={`hr-${index}`} />;
    }

    const hasNested = item.nested && item.nested.length > 0;
    const isOpen = openItems[item.title] || item.initiallyOpen;

    return (
      <div key={`${item.title}-${index}`}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleItemClick(item)} sx={{ pl: 2 + depth * 2 }}>
            <ListItemIcon>{getIcon(item.icon)}</ListItemIcon>
            <ListItemText primary={item.title} />
            {hasNested && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        {hasNested && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.nested!.map((nestedItem, nestedIndex) => renderItem(nestedItem, nestedIndex, depth + 1))}
            </List>
          </Collapse>
        )}
      </div>
    );
  };

  const avatar = arrayRand(themeConfig?.img?.avatar);
  const drawerBg = arrayRand(themeConfig?.img?.drawerHeaderBg);
  const slogan = arrayRand(themeConfig?.uiux?.slogan);
  const showColorPicker = themeConfig?.colorPicker !== false;

  return (
    <MuiDrawer
      anchor="left"
      open={open}
      onClose={onClose}
      disableScrollLock
    >
      <Box sx={{ width: drawerWidth }}>
        <SideHeader
          avatar={avatar}
          name={site?.author || 'KonoSuba'}
          email={slogan}
          background={drawerBg}
        />
        <List>
          {drawerItems.map((item, index) => renderItem(item as MenuItemI, index))}
        </List>
        <Divider />
        <footer className={styles.footer}>
          <span>{site?.title}</span>
          <br />
          <span>Power by {site?.author}</span>
          <br />
          <span>Theme - <a target="_blank" href="https://github.com/NoviceLevel/hexo-theme-oneX" rel="noreferrer">oneX</a></span>
        </footer>
        {showColorPicker && <ColorChoose primaryColor={primaryColor} onColorChange={onColorChange} />}
      </Box>
    </MuiDrawer>
  );
}
